import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../utils/tableDataConverter';
import DropButton from '../../Table/DropButton';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {_Tables, RowDiv, TableHeader} from '../../../styles/components/div';
import DragContainer from '../../Table/DragContainer';

const AssignRoleToUser = () => {
	const dispatch = useDispatch();
	const {roles} = useSelector(IAM_ROLES.selector);
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [select, setSelect] = useState({});

	const excludedData = useMemo(() => {
		return roles
			.filter((v) => !includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}));
	}, [roles, includedDataIds]);

	const includedData = useMemo(() => {
		return roles
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
			}));
	}, [roles, includedDataIds]);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.users.add.roles.exclude,
				data: includedData,
			}),
		);
	}, [includedData, dispatch]);

	return (
		<DragContainer
			selected={select}
			data={includedDataIds}
			setData={setIncludedDataIds}
			includedKey={tableKeys.users.add.roles.include}
			excludedData={excludedData}
			includedData={includedData}
		>
			<div>권한 추가</div>
			<_Tables>
				<Table
					data={excludedData}
					tableKey={tableKeys.users.add.roles.exclude}
					columns={tableColumns[tableKeys.users.add.roles.exclude]}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					isSearchable
					dndKey={tableKeys.users.add.roles.dnd}
					setSelect={setSelect}
					setData={setIncludedDataIds}
					isDraggable={true}
				/>
				<RowDiv alignItems={'center'}>
					<DropButton
						leftTableKey={tableKeys.users.add.roles.exclude}
						RightTableKey={tableKeys.users.add.roles.include}
						select={select}
						dataLeft={excludedData}
						dataRight={includedData}
						rightDataIds={includedDataIds}
						setRightDataIds={setIncludedDataIds}
					/>
				</RowDiv>
				<div>
					<TableHeader>
						추가 Roles: {includedDataIds.length}건
					</TableHeader>
					<Table
						data={includedData}
						tableKey={tableKeys.users.add.roles.include}
						columns={
							tableColumns[tableKeys.users.add.roles.include]
						}
						isSortable
						isSelectable
						isDnDPossible
						dndKey={tableKeys.users.add.roles.dnd}
						setData={setIncludedDataIds}
						setSelect={setSelect}
						isDraggable={true}
					/>
				</div>
			</_Tables>
		</DragContainer>
	);
};

export default AssignRoleToUser;
