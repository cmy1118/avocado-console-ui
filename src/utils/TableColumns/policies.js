import SelectionOption from '../../components/Table/Options/Search/searchFilters/SelectionOption';
import CalenderOption from '../../components/Table/Options/Search/searchFilters/CalenderOption';
import React from 'react';
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
		filter: 'equals',
		Filter: SelectionOption,
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
	},
	{
		accessor: 'grantCount',
		Header: '역할 연결 수',
		// filter: 'equals',
		// Filter: SelectionOption,
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
	},
	{
		accessor: 'detail',
		Header: '상세',
	},
	{
		accessor: 'value',
		Header: '설정값',
	},
];

export const POLICY_SUMMARY_PERMISSION_COLUMN = [
	{
		accessor: 'name',
		Header: '정책 이름',
	},
	{
		accessor: 'detail',
		Header: '규칙/권한',
	},
	{
		accessor: 'value',
		Header: '설정값',
	},
];

export const POLICY_SUMMARY_RERMISSION_COLUMN = [
	{
		accessor: 'name',
		Header: '역할 이름',
		type: 'roles',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		accessor: 'type',
		Header: '역할 유형',
	},
	{
		accessor: 'maxGrants',
		Header: '부여 제한',
	},
	{
		accessor: 'description',
		Header: '설명',
	},
	{
		accessor: 'grantedCount',
		Header: '정책 연결 수',
	},
	{
		accessor: 'grantUser',
		Header: '연결자',
		type: 'users',
		Cell: function Component(cell) {
			return (
				<TableLink
					cell={cell}
					text={cell.value?.name + '(' + cell.value?.id + ')'}
				/>
			);
		},
	},
];

export const POLICY_SUMMARY_TAG_COLUMN = [
	{
		accessor: 'key',
		Header: 'key(태그)',
	},
	{
		accessor: 'value',
		Header: '값(태그)',
	},
	{
		accessor: 'numberOfPolicy',
		Header: '정책 연결 수',
	},
	{
		accessor: 'user/Group',
		Header: '사용자 / 사용자 그룹 이름',
	},
	{
		accessor: 'grantUser',
		Header: '연결자',
	},
];

export const POLICY_SUMMARY_PERMISSION_TAB_COLUMN = [
	{
		accessor: 'name',
		Header: '정책 이름',
	},
	{
		accessor: 'detail',
		Header: '규칙/권한',
	},
	{
		accessor: 'value',
		Header: '설정값',
	},
];

export const POLICY_SUMMARY_ROLE_INCLUDE_COLUMN = [
	{
		accessor: 'name',
		Header: '역할 이름',
		type: 'roles',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		accessor: 'type',
		Header: '역할 유형',
	},
	{
		accessor: 'maxGrants',
		Header: '부여 제한',
	},
	{
		accessor: 'description',
		Header: '설명',
	},
	{
		accessor: 'grantedCount',
		Header: '권한 연결 수',
	},
	{
		accessor: 'grantUser',
		Header: '연결자',
		type: 'users',
		Cell: function Component(cell) {
			return (
				<TableLink
					cell={cell}
					text={cell.value?.name + '(' + cell.value?.id + ')'}
				/>
			);
		},
	},
];
export const POLICY_SUMMARY_ROLE_EXCLUDE_COLUMN = [
	{
		accessor: 'name',
		Header: '역할 이름',
		type: 'roles',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		accessor: 'type',
		Header: '역할 유형',
	},
	{
		accessor: 'maxGrants',
		Header: '부여 제한',
	},
	{
		accessor: 'description',
		Header: '설명',
	},
	{
		accessor: 'grantedCount',
		Header: '정책 연결 수',
	},
	{
		accessor: 'grantUser',
		Header: '연결자',
		type: 'users',
		Cell: function Component(cell) {
			return (
				<TableLink
					cell={cell}
					text={cell.value?.name + '(' + cell.value?.id + ')'}
				/>
			);
		},
	},
];

export const POLICY_SUMMARY_TAG_INCLUDE_COLUMN = [
	{
		accessor: 'key',
		Header: 'key(태그)',
	},
	{
		accessor: 'value',
		Header: '값(태그)',
	},
	{
		accessor: 'numberOfPolicy',
		Header: '정책 연결 수',
	},
	{
		accessor: 'user/Group',
		Header: '사용자 / 사용자 그룹 이름',
	},
	{
		accessor: 'grantUser',
		Header: '연결자',
	},
];
export const POLICY_SUMMARY_TAG_EXCLUDE_COLUMN = [
	{
		accessor: 'key',
		Header: 'key(태그)',
	},
	{
		accessor: 'value',
		Header: '값(태그)',
	},
	{
		accessor: 'numberOfPolicy',
		Header: '정책 연결 수',
	},
	{
		accessor: 'user/Group',
		Header: '사용자 / 사용자 그룹 이름',
	},
	{
		accessor: 'grantUser',
		Header: '연결자',
	},
];

export const POLICY_ADD_USER_MANAGEMEN_COLUMN = [
	{
		accessor: 'item',
		Header: '항목',
		disableFilters: true,
		disableChangeVisible: true,
	},
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
export const PAM_TEMPLATE_RESOURCE_ACCESS_COLUMN = [
	{
		accessor: 'group',
		Header: '그룹',
		disableFilters: true,
		disableChangeVisible: true,
	},
	{
		accessor: 'name',
		Header: '자원 이름',
		disableFilters: true,
		disableChangeVisible: true,
	},
	{
		accessor: 'address',
		Header: '주소',
		disableFilters: true,
		disableChangeVisible: true,
	},
	{
		accessor: 'protocol',
		Header: '프로토콜',
		disableFilters: true,
		disableChangeVisible: true,
	},
	{
		accessor: 'port',
		Header: '포트',
		disableFilters: true,
		disableChangeVisible: true,
	},
	{
		accessor: 'accessAccount',
		Header: '접속계정',
		disableFilters: true,
		disableChangeVisible: true,
	},
	{
		accessor: 'suAccess',
		Header: 'SU 접속',
		disableFilters: true,
		disableChangeVisible: true,
	},
];
