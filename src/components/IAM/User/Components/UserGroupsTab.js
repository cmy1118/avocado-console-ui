import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import Table from '../../../Table/Table';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {parentGroupConverter} from '../../../../utils/tableDataConverter';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
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
import {dummyDates} from '../../../../utils/dummyData';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';

const UserGroupsTab = ({userId, space, isFold, setIsFold, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {page} = useSelector(PAGINATION.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const [select, setSelect] = useState({});
	const user = useMemo(() => users.find((v) => v.userUid === userId), [
		users,
		userId,
	]);

	const [includedDataIds, setIncludedDataIds] = useState(
		user?.groupIds || [],
	);

	console.log(includedDataIds);
	console.log(groups);

	const includedData = useMemo(() => {
		return (
			groups
				.filter((v) => includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					name: v.name,
					type: v.userGroupType.name,
					parentGroup: v.parentGroup.name,
				})) || []
		);
	}, [groups, includedDataIds]);

	const excludedData = useMemo(() => {
		return (
			groups
				.filter((v) => !includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					name: v.name,
					type: v.userGroupType.name,
					parentGroup: v.parentGroup.name,
				})) || []
		);
	}, [groups, includedDataIds]);
	//삭제
	const onClickDeleteRolesFromUser = useCallback(() => {
		console.log(select[tableKeys.users.summary.tabs.groups.include]);
		select[tableKeys.users.summary.tabs.groups.include].forEach((v) => {
			dispatch(
				IAM_USER_GROUP_MEMBER.asyncAction.disjointAction({
					groupId: v.id,
					userUid: [userId],
				}),
			);
		});
	}, [dispatch, select, userId]);

	const onClickAddRolesToUser = useCallback(() => {
		select[tableKeys.users.summary.tabs.groups.exclude].forEach((v) => {
			dispatch(
				IAM_USER_GROUP_MEMBER.asyncAction.joinAction({
					groupId: v.id,
					userUid: [userId],
				}),
			);
		});
	}, [dispatch, select, userId]);

	useEffect(() => {
		console.log(page[tableKeys.users.summary.tabs.groups.include]);
		if (
			!isSummaryOpened &&
			page[tableKeys.users.summary.tabs.groups.include] &&
			user
		) {
			dispatch(
				IAM_USER_GROUP.asyncAction.findAllAction({
					// ids: user.groupIds,
					range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			);
		}
	}, [dispatch, isSummaryOpened, page, user]);

	// useEffect(() => {
	// 	setIncludedDataIds(user.groups);
	// }, [user.groups]);

	return (
		<TabContentContainer>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.users.summary.tabs.groups.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<TableTitle>
					이 사용자의 그룹: {includedData.length}{' '}
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={onClickDeleteRolesFromUser}
					>
						삭제
					</TransparentButton>
				</TableTitle>
				<TableContainer
					data={includedData}
					tableKey={tableKeys.users.summary.tabs.groups.include}
					columns={
						tableColumns[
							tableKeys.users.summary.tabs.groups.include
						]
					}
				>
					<TableOptionsBar />
					<Table setSelect={setSelect} isDraggable />
				</TableContainer>
				<FoldableContainer>
					<TableFold
						title={
							<>이 사용자의 다른그룹 : {excludedData.length}</>
						}
						space={'UserGroupsTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<NormalButton
							margin='0px 0px 0px 5px'
							onClick={onClickAddRolesToUser}
						>
							그룹 추가
						</NormalButton>
					</TableFold>
					{isFold[space] && (
						<>
							<TableOptionText data={'groups'} />
							<TableContainer
								data={excludedData}
								tableKey={
									tableKeys.users.summary.tabs.groups.exclude
								}
								columns={
									tableColumns[
										tableKeys.users.summary.tabs.groups
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

UserGroupsTab.propTypes = {
	userId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default UserGroupsTab;
