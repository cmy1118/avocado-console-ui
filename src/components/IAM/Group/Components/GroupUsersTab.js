import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Table from '../../../Table/Table';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {TableTitle} from '../../../../styles/components/table';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableFold from '../../../Table/Options/TableFold';
import DragContainer from '../../../Table/DragContainer';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';
import {usePrevState} from '../../../../hooks/usePrevState';
import PAGINATION from '../../../../reducers/pagination';
import {totalNumberConverter} from '../../../../utils/tableDataConverter';

const GroupUsersTab = ({
	groupId,
	space,
	isFold,
	setIsFold,
	isSummaryOpened,
}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {page} = useSelector(PAGINATION.selector);
	const {users} = useSelector(IAM_USER.selector);
	const [select, setSelect] = useState({});
	const [otherMembers, setOtherMembers] = useState(0);
	const [members, setMembers] = useState([]);

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);

	const [includedDataIds, setIncludedDataIds] = useState(
		members.map((v) => v.userUid) || [],
	);

	const prevIncludedDataIds = usePrevState(includedDataIds);
	const prevSelect = usePrevState(select);

	// console.log(users);
	// console.log(members);

	const includedData = useMemo(() => {
		//	console.log(includedDataIds);
		return members
			.filter((v) => includedDataIds.includes(v.userUid))
			.map((v) => ({
				...v,
				numberOfGroups: v.groups ? v.groups.length : 0,
				createdTime: v.createdTag.createdTime,
				[DRAGGABLE_KEY]: v.userUid,
			}));
	}, [includedDataIds, members]);

	const excludedData = useMemo(() => {
		return users
			.filter((v) => !includedDataIds.includes(v.userUid))
			.map((v) => ({
				...v,
				numberOfGroups: v.groups ? v.groups.length : 0,
				createdTime: v.createdTag.createdTime,
				[DRAGGABLE_KEY]: v.userUid,
			}));
	}, [includedDataIds, users]);

	const onClickDeleteUsersFromGroup = useCallback(
		(data) => {
			//	console.log(data);
			dispatch(
				IAM_USER_GROUP_MEMBER.asyncAction.disjointAction({
					groupId: groupId,
					userUid: data,
				}),
			);
		},
		[dispatch, groupId],
	);

	const onClickAddUsersToGroup = useCallback(
		(data) => {
			//	console.log(data);
			dispatch(
				IAM_USER_GROUP_MEMBER.asyncAction.joinAction({
					groupId: groupId,
					userUid: data,
				}),
			);
		},
		[dispatch, groupId],
	);

	useEffect(() => {
		if (!isSummaryOpened) {
			dispatch(
				IAM_USER.asyncAction.findAllAction({
					range: 'elements=0-50',
				}),
			)
				.unwrap()
				.then((groups) => {
					setOtherMembers(
						totalNumberConverter(groups.headers['content-range']) -
							includedDataIds.length,
					);
				});
		}
	}, [dispatch, includedDataIds, isSummaryOpened, page]);

	useEffect(() => {
		if (
			!isSummaryOpened &&
			page[tableKeys.groups.summary.tabs.users.include]
		) {
			dispatch(
				IAM_USER_GROUP_MEMBER.asyncAction.findAllAction({
					groupId: groupId,
					range: page[tableKeys.groups.summary.tabs.users.include],
				}),
			)
				.unwrap()
				.then((members) => {
					const arr = [];
					members.data.forEach((member) => {
						dispatch(
							IAM_USER.asyncAction.findByUidAction({
								userUid: member.userUid,
							}),
						)
							.unwrap()
							.then((user) => {
								arr.push(user);
								if (arr.length === members.data.length) {
									setMembers(arr);
									setIncludedDataIds(
										arr.map((v) => v.userUid),
									);
								}
							});
					});
				});
		}
	}, [page, dispatch, groupId, isSummaryOpened]);

	return (
		<TabContentContainer>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.groups.summary.tabs.users.include}
				excludedData={excludedData}
				includedData={includedData}
				joinFunction={onClickAddUsersToGroup}
				disjointFunction={onClickDeleteUsersFromGroup}
			>
				<TableTitle>
					이 그룹의 사용자 : {includedData.length}
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={() =>
							onClickDeleteUsersFromGroup(
								select[
									tableKeys.groups.summary.tabs.users.include
								].map((v) => v.userUid),
							)
						}
					>
						사용자 삭제
					</TransparentButton>
				</TableTitle>
				<Table
					setSelect={setSelect}
					isDraggable
					data={includedData}
					tableKey={tableKeys.groups.summary.tabs.users.include}
					columns={
						tableColumns[
							tableKeys.groups.summary.tabs.users.include
						]
					}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>
				<FoldableContainer>
					<TableFold
						title={<>이 그룹의 다른 사용자 : {otherMembers}</>}
						space={'GroupUsersTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<NormalButton
							margin='0px 0px 0px 5px'
							onClick={() =>
								onClickAddUsersToGroup(
									select[
										tableKeys.groups.summary.tabs.users
											.exclude
									].map((v) => v.userUid),
								)
							}
						>
							사용자 추가
						</NormalButton>
					</TableFold>
					{isFold[space] && (
						<>
							<TableOptionText data={'usersGroups'} />

							<Table
								setSelect={setSelect}
								isDraggable
								data={excludedData}
								tableKey={
									tableKeys.groups.summary.tabs.users.exclude
								}
								columns={
									tableColumns[
										tableKeys.groups.summary.tabs.users
											.exclude
									]
								}
								isPaginable
								isSearchable
								isSearchFilterable
								isColumnFilterable
							/>
						</>
					)}
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

GroupUsersTab.propTypes = {
	groupId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default GroupUsersTab;
