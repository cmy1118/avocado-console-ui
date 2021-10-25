import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Table from '../../Table/Table';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';

const GroupUsersTab = ({groupId}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {users} = useSelector(IAM_USER.selector);
	const [select, setSelect] = useState([]);

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);
	const [rightDataIds, setRightDataIds] = useState(group.members);

	const dataLeft = useMemo(() => {
		return users
			.filter((v) => rightDataIds.includes(v.uid))
			.map((v) => ({
				...v,
			}));
	}, [users, rightDataIds]);

	const dataRight = useMemo(() => {
		return users
			.filter((v) => !rightDataIds.includes(v.uid))
			.map((v) => ({
				...v,
			}));
	}, [users, rightDataIds]);

	const onClickDeleteRolesFromGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.deleteUsersFromGroup({
				id: groupId,
				users: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.exclude],
				),
			}),
		);
		dispatch(
			IAM_USER.action.deleteUsersFromGroup({
				id: groupId,
				users: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.exclude],
				),
			}),
		);
	}, [dispatch, groupId, select]);

	const onClickAddRolesToGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.addUsersToGroup({
				id: groupId,
				users: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.include],
				),
			}),
		);
		dispatch(
			IAM_USER.action.addUsersToGroup({
				id: groupId,
				users: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.include],
				),
			}),
		);
	}, [dispatch, groupId, select]);
	useEffect(() => {
		setRightDataIds(group.members);
	}, [group.members]);
	return (
		<>
			<div>
				이 그룹의 권한 : {dataLeft.length}
				<button onClick={onClickDeleteRolesFromGroup}>삭제</button>
			</div>
			<Table
				data={dataLeft}
				tableKey={tableKeys.groups.summary.tabs.roles.include}
				columns={
					tableColumns[tableKeys.groups.summary.tabs.roles.include]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={'role'}
				setSelect={setSelect}
				setData={setRightDataIds}
			/>
			<div>
				이 그룹의 다른권한 : {dataRight.length}
				<button onClick={onClickAddRolesToGroup}>권한 추가</button>
			</div>
			<Table
				data={dataRight}
				tableKey={tableKeys.groups.summary.tabs.roles.exclude}
				columns={
					tableColumns[tableKeys.groups.summary.tabs.roles.exclude]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={'role'}
				setSelect={setSelect}
				setData={setRightDataIds}
				control
			/>
		</>
	);
};

GroupUsersTab.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupUsersTab;
