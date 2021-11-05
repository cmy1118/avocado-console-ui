import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import Table from '../../Table/Table';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {parentGroupConverter} from '../../../utils/tableDataConverter';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import TableContainer from '../../Table/TableContainer';
import DragContainer from '../../Table/DragContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';

const UserGroupsTab = ({userId}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const [select, setSelect] = useState({});
	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const [includedDataIds, setIncludedDataIds] = useState(user.groups);

	const excludedData = useMemo(() => {
		return groups
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: groupTypes.find((val) => val.id === v.clientGroupTypeId)
					?.name,
				numberOfRoles: v.roles.length,
				parentGroup: parentGroupConverter(
					groups.find((val) => val.id === v.parentId)?.name,
				),
			}));
	}, [groupTypes, groups, includedDataIds]);

	const includedData = useMemo(() => {
		return groups
			.filter((v) => !includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: groupTypes.find((val) => val.id === v.clientGroupTypeId)
					?.name,
				numberOfRoles: v.roles.length,
				parentGroup: parentGroupConverter(
					groups.find((val) => val.id === v.parentId)?.name,
				),
			}));
	}, [groups, groupTypes, includedDataIds]);
	//삭제
	const onClickDeleteRolesFromUser = useCallback(() => {
		dispatch(
			IAM_USER.action.deleteGroupsFromUser({
				uid: userId,
				groups: Object.keys(
					select[tableKeys.users.summary.tabs.groups.include],
				),
			}),
		);
		dispatch(
			IAM_USER_GROUP.action.deleteGroupsFromUser({
				uid: userId,
				groups: Object.keys(
					select[tableKeys.users.summary.tabs.groups.include],
				),
			}),
		);
	}, [dispatch, select, userId]);

	const onClickAddRolesToUser = useCallback(() => {
		dispatch(
			IAM_USER.action.addGroupsToUser({
				uid: userId,
				groups: Object.keys(
					select[tableKeys.users.summary.tabs.groups.exclude],
				),
			}),
		);
		dispatch(
			IAM_USER_GROUP.action.addGroupsToUser({
				uid: userId,
				groups: Object.keys(
					select[tableKeys.users.summary.tabs.groups.exclude],
				),
			}),
		);
	}, [dispatch, select, userId]);

	useEffect(() => {
		setIncludedDataIds(user.groups);
	}, [user.groups]);

	return (
		<DragContainer
			selected={select}
			data={includedDataIds}
			setData={setIncludedDataIds}
			includedKey={tableKeys.users.summary.tabs.groups.include}
			excludedData={excludedData}
			includedData={includedData}
		>
			<div>
				이 사용자의 그룹: {excludedData.length}{' '}
				<button onClick={onClickDeleteRolesFromUser}>삭제</button>
			</div>
			<TableContainer
				data={excludedData}
				tableKey={tableKeys.users.summary.tabs.groups.include}
				columns={
					tableColumns[tableKeys.users.summary.tabs.groups.include]
				}
			>
				<TableOptionsBar />
				<Table setSelect={setSelect} isDraggable />
			</TableContainer>
			<div>
				이 사용자의 다른그룹 : {includedData.length}{' '}
				<button onClick={onClickAddRolesToUser}>그룹 추가</button>
			</div>
			<TableContainer
				data={includedData}
				tableKey={tableKeys.users.summary.tabs.groups.exclude}
				columns={
					tableColumns[tableKeys.users.summary.tabs.groups.exclude]
				}
			>
				<TableOptionsBar />
				<Table setSelect={setSelect} isDraggable />
			</TableContainer>
		</DragContainer>
	);
};

UserGroupsTab.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserGroupsTab;
