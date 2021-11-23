import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Table from '../../../Table/Table';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {TableTitle} from '../../../../styles/components/table';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableFold from '../../../Table/Options/TableFold';
import TableContainer from '../../../Table/TableContainer';
import DragContainer from '../../../Table/DragContainer';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';
import {usePrevState} from '../../../../hooks/usePrevState';

const GroupUsersTab = ({groupId, space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {members} = useSelector(IAM_USER_GROUP_MEMBER.selector);
	const {users} = useSelector(IAM_USER.selector);
	const [select, setSelect] = useState({});
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
		return users
			.filter((v) => includedDataIds.includes(v.userUid))
			.map((v) => ({
				...v,
				numberOfGroups: v.groupIds ? v.groupIds.length : 0,
				createdTime: v.createdTag.createdTime,
				DRAGGABLE_KEY: v.userUid,
			}));
	}, [includedDataIds, users]);

	const excludedData = useMemo(() => {
		return users
			.filter((v) => !includedDataIds.includes(v.userUid))
			.map((v) => ({
				...v,
				numberOfGroups: v.groupIds ? v.groupIds.length : 0,
				createdTime: v.createdTag.createdTime,
				DRAGGABLE_KEY: v.userUid,
			}));
	}, [includedDataIds, users]);

	const onClickDeleteUsersFromGroup = useCallback(
		(data) => {
			console.log(data);
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
			console.log(data);
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
		dispatch(
			IAM_USER.asyncAction.findAllAction({
				range: 'elements=0-50',
			}),
		);
	}, [dispatch]);

	useEffect(() => {
		dispatch(
			IAM_USER_GROUP_MEMBER.asyncAction.findAllAction({
				groupId: groupId,
				range: 'elements=0-50',
			}),
		);
	}, [dispatch, groupId]);

	// useEffect(() => {
	// 	console.log('✅ prevIncludedDataIds:', prevIncludedDataIds);
	// 	console.log('✅ includedDataIds:', includedDataIds);
	// }, [includedDataIds]);
	//
	// useEffect(() => {
	// 	console.log('🅾️ prevSelect:', prevSelect);
	// 	console.log('🅾️ select:', select);
	// }, [select]);

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
				<TableContainer
					data={includedData}
					tableKey={tableKeys.groups.summary.tabs.users.include}
					columns={
						tableColumns[
							tableKeys.groups.summary.tabs.users.include
						]
					}
				>
					<TableOptionsBar />
					<Table setSelect={setSelect} isDraggable />
				</TableContainer>
				<FoldableContainer>
					<TableFold
						title={
							<>이 그룹의 다른 사용자 : {excludedData.length}</>
						}
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

							<TableContainer
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
							>
								<TableOptionsBar />
								<Table setSelect={setSelect} isDraggable />
							</TableContainer>
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
};

export default GroupUsersTab;
