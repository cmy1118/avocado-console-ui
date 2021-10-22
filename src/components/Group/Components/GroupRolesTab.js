import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../utils/tableDataConverter';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {tableKeys} from '../../../utils/data';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import Table from '../../Table/Table';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';

const RightTableKey = tableKeys.rolesIncludedInGroupOnDescPage;
const leftTableKey = tableKeys.rolesExcludedFormGroupOnDescPage;

const GroupRolesTab = ({groupId}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {roles} = useSelector(IAM_ROLES.selector);
	const [select, setSelect] = useState([]);

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);
	const [rightDataIds, setRightDataIds] = useState(group.roles);

	const dataLeft = useMemo(() => {
		return roles
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
			}));
	}, [roles, rightDataIds]);

	const dataRight = useMemo(() => {
		return roles
			.filter((v) => !rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
			}));
	}, [roles, rightDataIds]);

	const onClickDeleteRolesFromGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.deleteRolesFromGroup({
				id: groupId,
				roles: Object.keys(select[RightTableKey]),
			}),
		);
		dispatch(
			IAM_ROLES.action.deleteRolesFromGroup({
				id: groupId,
				roles: Object.keys(select[RightTableKey]),
			}),
		);
	}, [dispatch, groupId, select]);

	const onClickAddRolesToGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.addRolesToGroup({
				id: groupId,
				roles: Object.keys(select[leftTableKey]),
			}),
		);
		dispatch(
			IAM_ROLES.action.addRolesToGroup({
				id: groupId,
				roles: Object.keys(select[leftTableKey]),
			}),
		);
	}, [dispatch, groupId, select]);
	useEffect(() => {
		setRightDataIds(group.roles);
	}, [group.roles]);
	return (
		<>
			<div>
				이 그룹의 권한 : {dataLeft.length}
				<button onClick={onClickDeleteRolesFromGroup}>삭제</button>
			</div>
			<Table
				data={dataLeft}
				tableKey={RightTableKey}
				columns={getColumnsAsKey[RightTableKey]}
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
				tableKey={leftTableKey}
				columns={getColumnsAsKey[leftTableKey]}
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

GroupRolesTab.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupRolesTab;
