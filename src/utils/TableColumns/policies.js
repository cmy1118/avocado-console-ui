import SelectionOption from '../../components/Table/Options/Search/SelectionOption';
import CalenderOption from '../../components/Table/Options/Search/CalenderOption';
import React from 'react';
import checkboxColumn from '../../components/Table/tableCheckboxColumn';
import TableLink from '../../components/Table/ColumnCells/TableLink';

export const POLICY_COLUMN = [
	{
		accessor: 'name',
		Header: '정책 이름',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
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
		accessor: 'grantCount',
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

export const POLICY_ADD_PREVIEW_COLUMN = [
	{
		accessor: 'policy',
		Header: '정책',
		// disableFilters: true,
		// disableChangeVisible: true,
	},
	{
		accessor: 'detail',
		Header: '상세',
		// disableFilters: true,
		// disableChangeVisible: true,
	},
	{
		accessor: 'value',
		Header: '설정값',
		// disableFilters: true,
		// disableChangeVisible: true,
	},
];

export const POLICY_SUMMARY_POLICY_COLUMN = [];

export const POLICY_SUMMARY_RERMISSION_COLUMN = [
	{
		accessor: 'name',
		Header: '역할 이름',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
		disableFilters: true,
		disableChangeVisible: true,
	},
	{
		accessor: 'manageCategory',
		Header: '관리 구분',
		disableFilters: true,
	},
	{
		accessor: 'grantRegulation',
		Header: '부여 제한',
		disableFilters: true,
	},
	{
		accessor: 'numberOfPermissions',
		Header: '권한 부여수',
		disableFilters: true,
	},
	{
		accessor: 'description',
		Header: '설명',
		disableFilters: true,
	},
	{
		accessor: 'createdTime',
		Header: '생성 일시',
		disableFilters: true,
	},
	{
		accessor: 'grantUser',
		Header: '연결자',
		disableFilters: true,
	},
];

export const POLICY_SUMMARY_TAG_COLUMN = [
	{
		accessor: 'key',
		Header: 'key(태그)',
		disableFilters: true,
	},
	{
		accessor: 'value',
		Header: '값(태그)',
		disableFilters: true,
	},
	{
		accessor: 'numberOfPolicy',
		Header: '정책 연결 수',
		disableFilters: true,
	},
	{
		accessor: 'user/Group',
		Header: '사용자 / 사용자 그룹 이름',
		disableFilters: true,
	},
	{
		accessor: 'grantUser',
		Header: '연결자',
		disableFilters: true,
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

export const PAM_TEMPLATE_RESOURCE_GROUP_COLUMN = [
	{
		accessor: 'namePath',
		Header: '자원 그룹 경로',
		disableFilters: true,
	},
	{
		accessor: 'name',
		Header: '그룹 이름',
		disableFilters: true,
	},
];

export const PAM_TEMPLATE_RESOURCE_COLUMN = [
	{
		accessor: 'group',
		Header: '그룹',
		disableFilters: true,
	},
	{
		accessor: 'name',
		Header: '자원 이름',
		disableFilters: true,
	},
	{
		accessor: 'address',
		Header: '주소',
		disableFilters: true,
	},
	{
		accessor: 'protocol',
		Header: '프로토콜',
		disableFilters: true,
	},
];
