import React, {useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../utils/tableDataConverter';
import styled from 'styled-components';
import DropButton from '../../Table/DropButton';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';

const _Tables = styled.div`
	display: flex;
`;

const AssignRoleToUser = () => {
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
					tableKey={tableKeys.users.add.roles.include}
					columns={tableColumns[tableKeys.users.add.roles.include]}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					isSearchable
					dndKey={tableKeys.users.add.roles.dnd}
					setSelect={setSelect}
					setData={setRightDataIds}
				/>

				<DropButton
					leftTableKey={tableKeys.users.add.roles.include}
					RightTableKey={tableKeys.users.add.roles.exclude}
					select={select}
					rightDataIds={rightDataIds}
					setRightDataIds={setRightDataIds}
				/>
				<div>
					<div>추가 Roles: {rightDataIds.length}건</div>
					<Table
						data={dataRight}
						tableKey={tableKeys.users.add.roles.exclude}
						columns={
							tableColumns[tableKeys.users.add.roles.exclude]
						}
						isSortable
						isSelectable
						isDnDPossible
						dndKey={tableKeys.users.add.roles.dnd}
						setData={setRightDataIds}
						setSelect={setSelect}
						control
					/>
				</div>
			</_Tables>
		</>
	);
};

export default AssignRoleToUser;
