import React, {useCallback, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../utils/tableDataConverter';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {tableKeys} from '../../../utils/data';

const _Tables = styled.div`
	display: flex;
`;

const AssignRoleToGroup = () => {
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
		setRightDataIds(
			rightDataIds.filter((v) => !selectedIncludedRoles.includes(v)),
		);
	}, [rightDataIds, selectedIncludedRoles]);

	const onClickAddRolesToGroup = useCallback(() => {
		setRightDataIds([...rightDataIds, ...selectedExcludedRoles]);
	}, [rightDataIds, selectedExcludedRoles]);

	return (
		<>
			<div>권한 추가</div>
			<_Tables>
				<Table
					data={dataLeft}
					tableKey={tableKeys.rolesExcludedFromGroupOnAddPage}
					columns={
						getColumnsAsKey[
							tableKeys.rolesExcludedFromGroupOnAddPage
						]
					}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					dndKey={'role'}
					isSearchable
					// select={selectedExcludedRoles}
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
						tableKey={tableKeys.rolesIncludedInGroupOnAddPage}
						columns={
							getColumnsAsKey[
								tableKeys.rolesIncludedInGroupOnAddPage
							]
						}
						isSortable
						isSelectable
						isDnDPossible
						dndKey={'role'}
						setData={setRightDataIds}
						select={selectedIncludedRoles}
						setSelect={setSelectedIncludedRoles}
					/>
				</div>
			</_Tables>
		</>
	);
};

export default AssignRoleToGroup;
