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

const AssignRoleToUser = ({addedRoles, setAddedRoles}) => {
	const {roles} = useSelector(IAM_ROLES.selector);

	const [selectedExcludedRoles, setSelectedExcludedRoles] = useState([]);
	const [selectedIncludedRoles, setSelectedIncludedRoles] = useState([]);

	const excludedRoles = useMemo(() => {
		return roles
			.filter((v) => !addedRoles.includes(v.id))
			.map((v) => ({...v, type: roleTypeConverter(v.companyId)}));
	}, [roles, addedRoles]);

	const includedRoles = useMemo(() => {
		return roles
			.filter((v) => addedRoles.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
			}));
	}, [roles, addedRoles]);

	const onClickDeleteRolesFromUser = useCallback(() => {
		setAddedRoles(
			addedRoles.filter((v) => !selectedIncludedRoles.includes(v)),
		);
	}, [setAddedRoles, addedRoles, selectedIncludedRoles]);

	const onClickAddRolesToUser = useCallback(() => {
		setAddedRoles([...addedRoles, ...selectedExcludedRoles]);
	}, [setAddedRoles, addedRoles, selectedExcludedRoles]);

	return (
		<>
			<div>권한 추가</div>
			<_Tables>
				<Table
					data={excludedRoles}
					tableKey={tableKeys.rolesExcludedFromUserOnAddPage}
					columns={
						getColumnsAsKey[
							tableKeys.rolesExcludedFromUserOnAddPage
						]
					}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					dndKey={'role'}
					selected={selectedExcludedRoles}
					setSelected={setSelectedExcludedRoles}
				/>

				<div>
					<button onClick={onClickAddRolesToUser}>-&gt;</button>
					<button onClick={onClickDeleteRolesFromUser}>&lt;-</button>
				</div>

				<div>
					<div>추가 Roles: {addedRoles.length}건</div>
					<Table
						data={includedRoles}
						tableKey={tableKeys.rolesIncludedInUserOnAddPage}
						columns={
							getColumnsAsKey[
								tableKeys.rolesIncludedInUserOnAddPage
							]
						}
						isSortable
						isSelectable
						isDnDPossible
						dndKey={'role'}
						setData={setAddedRoles}
						selected={selectedIncludedRoles}
						setSelected={setSelectedIncludedRoles}
					/>
				</div>
			</_Tables>
		</>
	);
};

AssignRoleToUser.propTypes = {
	addedRoles: PropTypes.array.isRequired,
	setAddedRoles: PropTypes.func.isRequired,
};

export default AssignRoleToUser;
