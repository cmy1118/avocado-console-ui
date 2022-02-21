import React from 'react';
import Table from '../../../../Table/Table';
import {tableColumns} from '../../../../../Constants/Table/columns';
import {TableMode} from '../../../../../Constants/Table/mode';
import checkboxColumn from '../../../../Table/tableCheckboxColumn';
import TableCheckbox from '../../../../Table/Options/TableCheckbox';
import {tableKeys} from '../../../../../Constants/Table/keys';
import CheckBox from '../../../../RecycleComponents/New/CheckBox';
import TableAllCheckbox from '../../../../Table/Options/TableAllCheckbox';

const constants = {
	main: '사용자 관리 권한',
	title: '',
	templates: {},

	tempTableData: [
		{
			id: 1,
			item: '사용자',
			fullAuth: '전체 권한',
			create: '생성/추가',
			read: '조회 ',
			update: '수정',
			delete: '삭제/제외',
			description: '1',
		},
		{
			id: 2,
			item: '사용자 태그',
			fullAuth: 'fullAuth',
			create: 'create',
			read: 'read',
			update: 'update',
			delete: 'delete',
			description: '2',
		},
		{
			id: 3,
			item: '사용자 그룹',
			fullAuth: 'fullAuth',
			create: 'create',
			read: 'read',
			update: 'update',
			delete: 'delete',
			description: '3',
		},
	],
};
const POLICY_ADD_USER_MANAGEMEN_COLUMN = [
	{
		accessor: 'item',
		Header: '항목',
		disableFilters: true,
		disableChangeVisible: true,
	},
	{
		accessor: 'fullAuth',
		Header: '전체 권한',
		disableFilters: true,
		disableChangeVisible: true,
		Cell: function Component(row, cell, e) {
			return (
				<TableAllCheckbox row={row} />
				// <div style={{'text-align': 'center'}}>
				// 	<input
				// 		onClick={() => {
				// 			console.log('click-rowInfo:', row);
				// 			console.log('click-cellInfo:', cell);
				// 		}}
				// 		type='checkbox'
				// 		// defaultChecked={row.value == "Yes" ? true : false}
				// 		defaultChecked={() =>
				// 			console.log('click-rowInfo:', row)
				// 		}
				// 		// onBlur={(event) => updateMyData(parseInt(row.row.id), row.column.id, event.target.checked ? "Yes" : "No")}
				// 	/>
				// </div>
			);
		},
	},
	{
		accessor: 'create',
		Header: '생성/추가',
		disableFilters: true,
		disableChangeVisible: true,
		Cell: function Component(row, cell, getToggleAllPageRowsSelectedProps) {
			return (
				<TableCheckbox
					// eslint-disable-next-line react/prop-types,react/display-name
					{...getToggleAllPageRowsSelectedProps()}
					// disabled={disabled}
					// tablekey={tableKey}
				/>
			);
		},
	},
	{
		accessor: 'read',
		Header: '조회',
		disableFilters: true,
		disableChangeVisible: true,
		Cell: function Component(row, cell) {
			return (
				<div style={{'text-align': 'center'}}>
					<input
						onClick={() => console.log('click-rowInfo:', row)}
						type='checkbox'
						// defaultChecked={row.value == "Yes" ? true : false}
						defaultChecked={() =>
							console.log('click-rowInfo:', row)
						}
						// onBlur={(event) => updateMyData(parseInt(row.row.id), row.column.id, event.target.checked ? "Yes" : "No")}
					/>
				</div>
			);
		},
	},

	// constants.tempTableData.map((v) => {
	//  return checkboxColumn({
	// 	 header: '전체 권한',ㅇ
	// 	 id: v.id,
	//  });
	// }),
];
console.log('Table-data:', constants.tempTableData);
const UserManagement = () => {
	return (
		<div>
			<Table
				tableKey={tableKeys.policy.policies.userManagement}
				columns={POLICY_ADD_USER_MANAGEMEN_COLUMN}
				data={constants.tempTableData}
				mode={TableMode.CHECKBOX}
			/>
		</div>
	);
};

export default UserManagement;
