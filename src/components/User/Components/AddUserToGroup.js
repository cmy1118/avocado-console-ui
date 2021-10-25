import React, {useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import DropButton from '../../Table/DropButton';
import styled from 'styled-components';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';

const _Tables = styled.div`
	display: flex;
`;

const AddUserToGroup = () => {
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const [rightDataIds, setRightDataIds] = useState([]);
	const [select, setSelect] = useState([]);

	const dataLeft = useMemo(() => {
		const dropDataTypeId = groups
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => v.clientGroupTypeId);
		return groups
			.filter((v) => !dropDataTypeId.includes(v.clientGroupTypeId))
			.map((v) => ({
				...v,
				numberOfUsers: v.members.length,
			}));
	}, [groups, rightDataIds]);

	const dataRight = useMemo(() => {
		return groups
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
			}));
	}, [groups, rightDataIds]);

	return (
		<>
			<div>그룹에 사용자에 추가</div>
			<_Tables>
				<Table
					tableKey={tableKeys.users.add.groups.exclude}
					columns={tableColumns[tableKeys.users.add.groups.exclude]}
					data={dataLeft}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					isSearchable
					dndKey={tableKeys.users.add.groups.dnd}
					setData={setRightDataIds}
					setSelect={setSelect}
				/>
				<DropButton
					leftTableKey={tableKeys.users.add.groups.exclude}
					RightTableKey={tableKeys.users.add.groups.include}
					select={select}
					rightDataIds={rightDataIds}
					setRightDataIds={setRightDataIds}
				/>
				<div>
					<div>추가 그룹: {rightDataIds.length}건</div>
					<Table
						tableKey={tableKeys.users.add.groups.include}
						columns={
							tableColumns[tableKeys.users.add.groups.include]
						}
						data={dataRight}
						isPageable
						isNumberOfRowsAdjustable
						isColumnFilterable
						isSortable
						isSelectable
						isDnDPossible
						dndKey={tableKeys.users.add.groups.dnd}
						setData={setRightDataIds}
						setSelect={setSelect}
						control
					/>
				</div>
			</_Tables>
		</>
	);
};

export default AddUserToGroup;
