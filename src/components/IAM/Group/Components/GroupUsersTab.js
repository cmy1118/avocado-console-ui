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
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../reducers/api/IAM/User/Role/GrantRole/group';

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
	const [search, setSearch] = useState('');
	const [members, setMembers] = useState([]);
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [excludedDataIds, setExcludedDataIds] = useState([]);

	const includedData = useMemo(() => {
		//	console.log(includedDataIds);
		return includedDataIds
			? includedDataIds.map((v) => ({
					...v,
					id: v.userId,
					name: v.userName,
					numberOfGroups: v.groups ? v.groups.length : 0,
					createdTime: v.createdTag ? v.createdTag.createdTime : '',
					[DRAGGABLE_KEY]: v.userUid,
			  }))
			: [];
	}, [includedDataIds]);

	const excludedData = useMemo(() => {
		return excludedDataIds
			? excludedDataIds.map((v) => ({
					...v,
					numberOfGroups: v.groups ? v.groups.length : 0,
					createdTime: v.createdTag.createdTime,
					[DRAGGABLE_KEY]: v.userUid,
			  }))
			: [];
	}, [excludedDataIds]);

	//그룹에 부여된 사용자 조회 (포함안함 - 기능 없음 )
	const groupUserApi = useCallback(async () => {
		try {
			//포함
			const includeGrantUser = await dispatch(
				IAM_USER_GROUP_MEMBER.asyncAction.findAllAction({
					groupId: groupId,
					range: 'elements=0-50',
				}),
			).unwrap();
			console.log('includeGrantUser:', includeGrantUser);
			//비포함 (전체 - 포함)
			const allGrantUser = await dispatch(
				IAM_USER.asyncAction.findAllAction({
					range: 'elements=0-50',
				}),
			).unwrap();
			console.log('allGrantUser:', allGrantUser);
			const excludeGrantUser = await allGrantUser['data'].filter(
				(x) =>
					!includeGrantUser['data']
						.map((v) => v.userUid)
						.includes(x.userUid),
			);
			console.log('excludeGrantUser:', excludeGrantUser);

			//api 요청 데이터 삽입
			await setIncludedDataIds(includeGrantUser.data);
			await setExcludedDataIds(excludeGrantUser);
			// await setExcludedDataIds(excludeGrantUser.data);
			await console.log('includeGrantRole:', includeGrantUser.data);
			await console.log('excludeGrantRole:', excludeGrantUser);
		} catch (err) {
			alert('그룹에 부여된 사용자 조회 에러');
			console.log(err);
		}
	}, [dispatch, groupId]);

	const onClickDeleteUsersFromGroup = useCallback(
		async (data) => {
			await dispatch(
				IAM_USER_GROUP_MEMBER.asyncAction.disjointAction({
					groupId: groupId,
					userUid: data,
				}),
			).unwrap();
			await groupUserApi();
		},
		[dispatch, groupId, groupUserApi],
	);

	const onClickAddUsersToGroup = useCallback(
		async (data) => {
			await dispatch(
				IAM_USER_GROUP_MEMBER.asyncAction.joinAction({
					groupId: groupId,
					userUid: data,
				}),
			);
			await groupUserApi();
		},
		[dispatch, groupId],
	);

	useEffect(() => {
		groupUserApi();
	}, [groupUserApi]);

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
					setSearch={setSearch}
				/>
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
								setSearch={setSearch}
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
