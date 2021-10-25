import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../utils/tableDataConverter';
import styled from 'styled-components';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../reducers/currentTarget';

const _Tables = styled.div`
	display: flex;
`;

const AssignRoleToGroup = () => {
	const dispatch = useDispatch();
	const {roles} = useSelector(IAM_ROLES.selector);
	const [rightDataIds, setRightDataIds] = useState([]);

	const [selectedExcludedRoles, setSelectedExcludedRoles] = useState([]);
	const [selectedIncludedRoles, setSelectedIncludedRoles] = useState([]);

	const dataLeft = useMemo(() => {
		return roles
			.filter((v) => !rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}));
	}, [roles, rightDataIds]);

	const dataRight = useMemo(() => {
		return roles
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({...v, type: roleTypeConverter(v.companyId)}));
	}, [roles, rightDataIds]);

	const onClickDeleteRolesFromGroup = useCallback(() => {
		alert('에러 있어서 막아놨습니다.');
		// setRightDataIds(
		// 	rightDataIds.filter((v) => !selectedIncludedRoles.includes(v)),
		// );
	}, []);

	const onClickAddRolesToGroup = useCallback(() => {
		alert('에러 있어서 막아놨습니다.');
		// setRightDataIds([...rightDataIds, ...selectedExcludedRoles]);
	}, []);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.groups.add.roles.include,
				data: dataRight,
			}),
		);
	}, [dataRight, dispatch]);

	return (
		<>
			<div>권한 추가</div>
			<_Tables>
				<Table
					data={dataLeft}
					tableKey={tableKeys.groups.add.roles.include}
					columns={tableColumns[tableKeys.groups.add.roles.include]}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					dndKey={tableKeys.groups.add.roles.dnd}
					isSearchable
					setData={setRightDataIds}
					setSelect={setSelectedExcludedRoles}
				/>

				<div>
					<button onClick={onClickAddRolesToGroup}>-&gt;</button>
					<button onClick={onClickDeleteRolesFromGroup}>&lt;-</button>
				</div>

				<div>
					<div>추가 Roles: {rightDataIds.length}건</div>
					<Table
						data={dataRight}
						tableKey={tableKeys.groups.add.roles.exclude}
						columns={
							tableColumns[tableKeys.groups.add.roles.exclude]
						}
						isSortable
						isSelectable
						isDnDPossible
						dndKey={tableKeys.groups.add.roles.dnd}
						setData={setRightDataIds}
						control
						setSelect={setSelectedIncludedRoles}
					/>
				</div>
			</_Tables>
		</>
	);
};

export default AssignRoleToGroup;
