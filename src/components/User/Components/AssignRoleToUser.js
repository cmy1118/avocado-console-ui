import React, {useMemo} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../utils/tableDataConverter';
import PropTypes from 'prop-types';

const AssignRoleToUser = ({selectedRoles, setSelectedRoles}) => {
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

			<Table
				data={data1}
				tableKey={'rolesIncludedInUserOnAddPage'}
				columns={getColumnsAsKey['rolesIncludedInUserOnAddPage']}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
			/>
			<div>추가 Roles: {selectedRoles.length}건</div>
			<Table
				data={data2}
				tableKey={'rolesExcludedFromUserOnAddPage'}
				columns={getColumnsAsKey['rolesExcludedFromUserOnAddPage']}
				isSortable
			/>
		</>
	);
};

AssignRoleToUser.propTypes = {
	selectedRoles: PropTypes.array.isRequired,
	setSelectedRoles: PropTypes.func.isRequired,
};

export default AssignRoleToUser;
