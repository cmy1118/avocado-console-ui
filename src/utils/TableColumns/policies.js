import SelectionOption from '../../components/Table/Options/Search/SelectionOption';
import {statusConverter} from '../tableDataConverter';
import CalenderOption from '../../components/Table/Options/Search/CalenderOption';
import React from 'react';
import TableCheckbox from '../../components/Table/Options/TableCheckbox';
import checkboxColumn from '../../components/Table/tableCheckboxColumn';
import {tableKeys} from '../../Constants/Table/keys';


export const POLICY_COLUMN = [
	// {
	// 	accessor: 'id',
	// 	Header: '사용자 계정',
	// 	Cell: function Component(cell) {
	// 		return <TableLink cell={cell} />;
	// 	},
	// 	disableFilters: true,
	// 	disableChangeVisible: true,
	// },
	{
		accessor: 'name',
		Header: '정책 이름',
		disableFilters: true,
		disableChangeVisible: true,
	},
	{
		accessor: 'manageCategory',
		Header: '관리 구분',
		disableFilters: true,
	},
	{
		accessor: 'policyType',
		Header: '정책 유형',
		filter: 'equals',
		Filter: SelectionOption,
	},
	{
		accessor: 'description',
		Header: '설명',
		filter: 'equals',
		Filter: SelectionOption,
	},
	{
		accessor: 'link',
		Header: '역할 연결 수',
		filter: 'equals',
		Filter: SelectionOption,
	},
	{
		accessor: 'createdTime',
		Header: '생성 일시',
		filter: 'dateBetween',
		Filter: CalenderOption,
	},
];

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
];