import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import Table from '../../Table/Table';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';

const UserGroupsTab = ({userId}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const [select, setSelect] = useState([]);
	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const [rightDataIds, setRightDataIds] = useState(user.groups);

	const dataLeft = useMemo(() => {
		return groups
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type:v.clientGroupTypeId,
				numberOfRoles: v.roles.length,
			}));
	}, [groups, rightDataIds]);

	const dataRight = useMemo(() => {
		return groups
			.filter((v) => !rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type:v.clientGroupTypeId,
				numberOfRoles: v.roles.length,
			}));
	}, [groups, rightDataIds]);
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
		setRightDataIds(user.groups);
	}, [user.groups]);

	return (
		<>
			<div>
				이 사용자의 그룹: {dataLeft.length}{' '}
				<button onClick={onClickDeleteRolesFromUser}>삭제</button>
			</div>
			<Table
				data={dataLeft}
				tableKey={tableKeys.users.summary.tabs.groups.include}
				columns={
					tableColumns[tableKeys.users.summary.tabs.groups.include]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={tableKeys.users.summary.tabs.groups.dnd}
				setSelect={setSelect}
				setData={setRightDataIds}
			/>
			<div>
				이 사용자의 다른그룹 : {dataRight.length}{' '}
				<button onClick={onClickAddRolesToUser}>그룹 추가</button>
			</div>
			<Table
				data={dataRight}
				tableKey={tableKeys.users.summary.tabs.groups.exclude}
				columns={
					tableColumns[tableKeys.users.summary.tabs.groups.exclude]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={tableKeys.users.summary.tabs.groups.dnd}
				setSelect={setSelect}
				setData={setRightDataIds}
				control
			/>
		</>
	);
};

UserGroupsTab.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserGroupsTab;
