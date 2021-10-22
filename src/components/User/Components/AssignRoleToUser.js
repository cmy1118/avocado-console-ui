import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../utils/tableDataConverter';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {tableKeys} from '../../../utils/data';
import AddUser from './AddUser';
import {rolesExcludedFromUserOnAddPageColumns} from '../../../utils/TableColumns/users';

const _Tables = styled.div`
	display: flex;
`;
const AssignRoleToUser = ({setAllData}) => {
	const {roles} = useSelector(IAM_ROLES.selector);
	const [rightDataIds, setRightDataIds] = useState([]);
	const [select, setSelect] = useState([]);
	const leftTableKey = tableKeys.rolesExcludedFromUserOnAddPage;
	const RightTableKey = tableKeys.rolesIncludedInUserOnAddPage;

	const excludedRoles = useMemo(() => {
		return roles
			.filter((v) => !rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}));
	}, [roles, rightDataIds]);

	const includedRoles = useMemo(() => {
		return roles
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
			}));
	}, [roles, rightDataIds]);

	const onClickLeftDropButton = useCallback(() => {
		console.log('select??:', select);
		console.log('select id ??', select[leftTableKey]);
		console.log(
			'select id object key  ??',
			Object.keys(select[leftTableKey]),
		);
		console.log('???', rightDataIds);
		setRightDataIds(
			// ...rightDataIds.map((v) => v.id),
			// ...Object.key(select[leftTableKey]),
			Object.keys(select[leftTableKey]),
		);
		console.log('!!!', rightDataIds);
	}, [leftTableKey, rightDataIds, select, setRightDataIds]);

	const onClickRightDropButton = useCallback(
		(e) => {
			// console.log('!!!!!!!!!right - select??:', select);
			// const arr = rows.filter((v) => !v.isSelected).map((x) => x.id);
			// // console.log(':::arr:', arr);
			// setData && setData(arr);
		},
		[select],
	);

	useEffect(() => {
		setAllData({
			key: tableKeys.rolesIncludedInUserOnAddPage,
			data: includedRoles,
		});
	}, [setAllData, includedRoles]);

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
					setSelect={setSelect}
				/>

				<div>
					<button onClick={onClickLeftDropButton}>-&gt;</button>
					<button onClick={onClickRightDropButton}>&lt;-</button>
				</div>

				<div>
					<div>추가 Roles: {rightDataIds.length}건</div>
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
