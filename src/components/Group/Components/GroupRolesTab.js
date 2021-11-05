import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../utils/tableDataConverter';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import Table from '../../Table/Table';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {TransparentButton} from '../../../styles/components/buttons';
import TableContainer from '../../Table/TableContainer';
import DragContainer from '../../Table/DragContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';

const GroupRolesTab = ({groupId}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {roles} = useSelector(IAM_ROLES.selector);
	const [select, setSelect] = useState({});
	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);
	const [includedDataIds, setIncludedDataIds] = useState(group.roles);

	const excludedData = useMemo(() => {
		return roles
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
			}));
	}, [roles, includedDataIds]);

	const includedData = useMemo(() => {
		return roles
			.filter((v) => !includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
			}));
	}, [roles, includedDataIds]);

	const onClickDeleteRolesFromGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.deleteRolesFromGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.include],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.deleteRolesFromGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.include],
				),
			}),
		);
	}, [dispatch, groupId, select]);

	const onClickAddRolesToGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.addRolesToGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.exclude],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.addRolesToGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.exclude],
				),
			}),
		);
	}, [dispatch, groupId, select]);

	useEffect(() => {
		setIncludedDataIds(group.roles);
	}, [group.roles]);
	return (
		<DragContainer
			selected={select}
			data={includedDataIds}
			setData={setIncludedDataIds}
			includedKey={tableKeys.groups.summary.tabs.roles.include}
			excludedData={excludedData}
			includedData={includedData}
		>
			<div>
				이 그룹의 권한 : {excludedData.length}
				<TransparentButton onClick={onClickDeleteRolesFromGroup}>
					삭제
				</TransparentButton>
			</div>
			<TableContainer
				data={excludedData}
				tableKey={tableKeys.groups.summary.tabs.roles.include}
				columns={
					tableColumns[tableKeys.groups.summary.tabs.roles.include]
				}
			>
				<TableOptionsBar />
				<Table setSelect={setSelect} isDraggable />
			</TableContainer>
			<div>
				이 그룹의 다른권한 : {includedData.length}
				<button onClick={onClickAddRolesToGroup}>권한 추가</button>
			</div>
			<TableContainer
				data={includedData}
				tableKey={tableKeys.groups.summary.tabs.roles.exclude}
				columns={
					tableColumns[tableKeys.groups.summary.tabs.roles.exclude]
				}
			>
				<TableOptionsBar />
				<Table setSelect={setSelect} isDraggable />
			</TableContainer>
		</DragContainer>
	);
};

GroupRolesTab.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupRolesTab;
