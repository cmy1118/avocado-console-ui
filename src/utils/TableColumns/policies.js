import React from 'react';
import TableCheckbox from '../../components/Table/Options/TableCheckbox';
import checkboxColumn from '../../components/Table/tableCheckboxColumn';
import {tableKeys} from '../../Constants/Table/keys';

export const POLICY_ADD_USER_MANAGEMEN_COLUMN = [
	{
		accessor: 'item',
		Header: '항목',
		disableFilters: true,
		disableChangeVisible: true,
	},
	checkboxColumn({
		header: '전체 권한',
		// tableKey: '1',
	}),
	// checkboxColumn({
	// 	header: '생성/추가',
	// 	tableKey: '2',
	// }),
	// checkboxColumn({
	// 	header: '조회',
	// 	tableKey: '3',
	// }),
	// checkboxColumn({
	// 	header: '수정',
	// 	tableKey: '4',
	// }),
	// checkboxColumn({
	// 	header: '삭제/예외',
	// 	tableKey: '5',
	// }),

	// {
	// 	accessor: 'fullAuth',
	// 	Header: '전체 권한',
	// 	Cell: function Component(row, cell) {
	// 		return (
	// 			<div style={{'text-align': 'center'}}>
	// 				<input
	// 					onClick={() => console.log('click-rowInfo:', row)}
	// 					type='checkbox'
	// 					// defaultChecked={row.value == "Yes" ? true : false}
	// 					defaultChecked={() =>
	// 						console.log('click-rowInfo:', row)
	// 					}
	// 					// onBlur={(event) => updateMyData(parseInt(row.row.id), row.column.id, event.target.checked ? "Yes" : "No")}
	// 				/>
	// 			</div>
	// 		);
	// 	},
	// 	// Cell: function Component(cell) {
	// 	// 	return <TableCheckbox cell={cell} />;
	// 	// },
	//
	// 	disableFilters: true,
	// 	disableChangeVisible: true,
	// },
	// {
	// 	accessor: 'create',
	// 	Header: '생성/추가',
	// 	Cell: function Component(row, cell) {
	// 		return (
	// 			<TableCheckbox
	// 				tableKey={tableKeys.policy.policies.userManagement}
	// 				{...row}
	// 			/>
	// 		);
	// 	},
	// 	disableFilters: true,
	// 	disableChangeVisible: true,
	// },
	// {
	// 	accessor: 'read',
	// 	Header: '조회',
	// 	// Cell: function Component(cell) {
	// 	// 	return <TableCheckbox cell={cell} />;
	// 	// },
	// 	// width: 400,
	// 	disableFilters: true,
	// 	disableChangeVisible: true,
	// },
	// {
	// 	accessor: 'update',
	// 	Header: '수정',
	// 	// Cell: function Component(cell) {
	// 	// 	return <TableCheckbox cell={cell} />;
	// 	// },
	// 	disableFilters: true,
	// 	disableChangeVisible: true,
	// },
	// {
	// 	accessor: 'delete',
	// 	Header: '삭제/예외',
	// 	// Cell: function Component(cell) {
	// 	// 	return <TableCheckbox cell={cell} />;
	// 	// },
	// 	disableFilters: true,
	// 	disableChangeVisible: true,
	// },
	// {
	// 	accessor: 'description',
	// 	Header: '설명',
	// 	disableFilters: true,
	// 	disableChangeVisible: true,
	// },
];
