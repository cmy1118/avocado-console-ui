import React, {useMemo} from 'react';
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

const AssignRoleToGroup = ({selectedRoles, setSelectedRoles}) => {
	const {roles} = useSelector(IAM_ROLES.selector);

	const data1 = useMemo(() => {
		return roles
			.filter((v) => !selectedRoles.includes(v.id))
			.map((v) => ({...v, type: roleTypeConverter(v.companyId)}));
	}, [roles]);

	const data2 = useMemo(() => {
		return roles
			.filter((v) => selectedRoles.includes(v.id))
			.map((v) => ({...v, type: roleTypeConverter(v.companyId)}));
	}, [roles]);

	return (
		<>
			<div>권한 추가</div>
			<_Tables>
				<Table
					data={data1}
					tableKey={tableKeys.rolesIncludedInUserOnAddPage}
					columns={
						getColumnsAsKey[tableKeys.rolesIncludedInUserOnAddPage]
					}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
				/>
				<div>
					<div>추가 Roles: {selectedRoles.length}건</div>
					<Table
						data={data2}
						tableKey={tableKeys.rolesExcludedFromUserOnAddPage}
						columns={
							getColumnsAsKey[
								tableKeys.rolesExcludedFromUserOnAddPage
							]
						}
						isSortable
					/>
				</div>
			</_Tables>
		</>
	);
};

AssignRoleToGroup.propTypes = {
	selectedRoles: PropTypes.array.isRequired,
	setSelectedRoles: PropTypes.func.isRequired,
};

export default AssignRoleToGroup;
