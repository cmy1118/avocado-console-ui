import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../utils/tableDataConverter';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {tableKeys} from '../../../utils/data';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import Table from '../../Table/Table';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';

const GroupRolesTab = ({groupId}) => {
	const dispatch = useDispatch();

	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {roles} = useSelector(IAM_ROLES.selector);

	const [selectedExcludedRoles, setSelectedExcludedRoles] = useState();
	const [selectedIncludedRoles, setSelectedIncludedRoles] = useState();

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);

	const includedRoles = useMemo(() => {
		return roles
			.filter((v) => group.roles.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
			}));
	}, [roles, group]);

	const excludedRoles = useMemo(() => {
		return roles
			.filter((v) => !group.roles.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
			}));
	}, [roles, group]);

	const onClickDeleteRolesFromGroup = useCallback(() => {
		if (selectedIncludedRoles.length > 0) {
			dispatch(
				IAM_USER_GROUP.action.deleteRolesFromGroup({
					id: groupId,
					roles: selectedIncludedRoles,
				}),
			);
			dispatch(
				IAM_ROLES.action.deleteRolesFromGroup({
					id: groupId,
					roles: selectedIncludedRoles,
				}),
			);
		}
	}, [dispatch, selectedIncludedRoles, groupId]);

	const onClickAddRolesToGroup = useCallback(() => {
		if (selectedExcludedRoles.length > 0) {
			dispatch(
				IAM_USER_GROUP.action.addRolesToGroup({
					id: groupId,
					roles: selectedExcludedRoles,
				}),
			);
			dispatch(
				IAM_ROLES.action.addRolesToGroup({
					id: groupId,
					roles: selectedExcludedRoles,
				}),
			);
		}
	}, [dispatch, selectedExcludedRoles, groupId]);

	return (
		<>
			<div>
				이 그룹의 권한 : {includedRoles.length}
				<button onClick={onClickDeleteRolesFromGroup}>삭제</button>
			</div>
			<Table
				data={includedRoles}
				tableKey={tableKeys.rolesIncludedInGroupOnDescPage}
				columns={
					getColumnsAsKey[tableKeys.rolesIncludedInGroupOnDescPage]
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
				이 그룹의 다른권한 : {excludedRoles.length}
				<button onClick={onClickAddRolesToGroup}>권한 추가</button>
			</div>
			<Table
				data={excludedRoles}
				tableKey={tableKeys.rolesExcludedFormGroupOnDescPage}
				columns={
					getColumnsAsKey[tableKeys.rolesExcludedFormGroupOnDescPage]
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

GroupRolesTab.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupRolesTab;
