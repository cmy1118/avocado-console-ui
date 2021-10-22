import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../utils/tableDataConverter';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {tableKeys} from '../../../utils/data';
import DropButton from '../../Table/DropButton';
import AddUser from './AddUser';
import {rolesExcludedFromUserOnAddPageColumns} from '../../../utils/TableColumns/users';

const _Tables = styled.div`
	display: flex;
`;
const leftTableKey = tableKeys.rolesExcludedFromUserOnAddPage;
const RightTableKey = tableKeys.rolesIncludedInUserOnAddPage;

const AssignRoleToUser = () => {
const AssignRoleToUser = ({setAllData}) => {
	const {roles} = useSelector(IAM_ROLES.selector);
	const [rightDataIds, setRightDataIds] = useState([]);
	const [select, setSelect] = useState([]);

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
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
			}));
	}, [roles, rightDataIds]);

	return (
		<>
			<div>권한 추가</div>
			<_Tables>
				<Table
					data={dataLeft}
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
					isSearchable
					dndKey={'role'}
					setSelect={setSelect}
				/>

				<DropButton
					leftTableKey={leftTableKey}
					RightTableKey={RightTableKey}
					select={select}
					rightDataIds={rightDataIds}
					setRightDataIds={setRightDataIds}
				/>
				<div>
					<div>추가 Roles: {rightDataIds.length}건</div>
					<Table
						data={dataRight}
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
						setData={setRightDataIds}
						setSelect={setSelect}
					/>
				</div>
			</_Tables>
		</>
	);
};
AssignRoleToUser.propTypes = {
	setAllData: PropTypes.func.isRequired,
};

export default AssignRoleToUser;
