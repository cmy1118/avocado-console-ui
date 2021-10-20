import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../utils/tableDataConverter';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {tableKeys} from '../../../utils/data';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import Table from '../../Table/Table';

const UserRolesTab = ({userId}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {roles} = useSelector(IAM_ROLES.selector);

	const [selectedExcludedRoles, setSelectedExcludedRoles] = useState();
	const [selectedIncludedRoles, setSelectedIncludedRoles] = useState();

	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const includedRoles = useMemo(() => {
		return roles
			.filter((v) => user.roles.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}));
	}, [roles, user]);

	const excludedRoles = useMemo(() => {
		return roles
			.filter((v) => !user.roles.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}));
	}, [roles, user]);

	const onClickDeleteRolesFromUser = useCallback(() => {
		if (selectedIncludedRoles.length > 0) {
			dispatch(
				IAM_USER.action.deleteRolesFromUser({
					uid: userId,
					roles: selectedIncludedRoles,
				}),
			);
			dispatch(
				IAM_ROLES.action.deleteRolesFromUser({
					uid: userId,
					roles: selectedIncludedRoles,
				}),
			);
		}
	}, [dispatch, selectedIncludedRoles, userId]);

	const onClickAddRolesToUser = useCallback(() => {
		console.log(selectedExcludedRoles);

		if (selectedExcludedRoles.length > 0) {
			dispatch(
				IAM_USER.action.addRolesToUser({
					uid: userId,
					roles: selectedExcludedRoles,
				}),
			);
			dispatch(
				IAM_ROLES.action.addRolesToUser({
					uid: userId,
					roles: selectedExcludedRoles,
				}),
			);
		}
	}, [dispatch, selectedExcludedRoles, userId]);

	return (
		<>
			<div>
				이 사용자의 권한 : {includedRoles.length}{' '}
				<button onClick={onClickDeleteRolesFromUser}>삭제</button>
			</div>
			<Table
				data={includedRoles}
				tableKey={tableKeys.rolesIncludedInUserOnDescPage}
				columns={
					getColumnsAsKey[tableKeys.rolesIncludedInUserOnDescPage]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				selected={selectedIncludedRoles}
				setSelected={setSelectedIncludedRoles}
				isDnDPossible
				dndKey={'role'}
			/>
			<div>
				이 사용자의 다른권한 : {excludedRoles.length}{' '}
				<button onClick={onClickAddRolesToUser}>권한 추가</button>
			</div>
			<Table
				data={excludedRoles}
				tableKey={tableKeys.rolesExcludedFormUserOnDescPage}
				columns={
					getColumnsAsKey[tableKeys.rolesExcludedFormUserOnDescPage]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				selected={selectedExcludedRoles}
				setSelected={setSelectedExcludedRoles}
				isDnDPossible
				dndKey={'role'}
			/>
		</>
	);
};

UserRolesTab.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserRolesTab;
