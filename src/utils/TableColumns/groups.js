import {LINK} from '../data';
import TableTextBox from '../ColumnCells/TableTextBox';
import CURRENT_TARGET from '../../reducers/currentTarget';
import React from 'react';
import TableLink from '../ColumnCells/TableLink';

export const groupColumns = [
	{
		Header: '그룹 이름',
		accessor: 'name',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		Header: '그룹 유형',
		accessor: 'clientGroupType',
	},
	{
		Header: '사용자 수',
		accessor: 'numberOfUsers',
	},
	{
		Header: '권한',
		accessor: 'roles',
	},
	{
		Header: '상위 그룹',
		accessor: 'parentId',
	},
	{
		Header: '생성 일시',
		accessor: 'creationDate',
	},
];

export const groupTypeColumns = [
	{
		Header: '그룹 유형',
		accessor: 'name',
		// id: LINK,
	},
	{
		Header: '그룹 수',
		accessor: 'numberOfGroups',
	},
	{
		Header: '설명',
		accessor: 'description',
	},
	{
		Header: '생성 일시',
		accessor: 'creationDate',
	},
];

export const rolesExcludedFromGroupOnAddPageColumns = [
	{
		Header: '역할 이름',
		accessor: 'name',
	},
	{
		Header: '역할 유형',
		accessor: 'type',
	},
	{
		Header: '사용자 수',
		accessor: 'numberOfUsers',
	},
	{
		Header: '생성 일시',
		accessor: 'creationDate',
	},
];

export const rolesIncludedInGroupOnAddPageColumns = [
	{
		Header: '역할 이름',
		accessor: 'name',
	},
	{
		Header: '역할 유형',
		accessor: 'type',
	},
];

export const addTagsToGroupOnAddPageColumns = [
	{
		Header: 'Key(태그명)',
		accessor: 'name',
		Cell: function Component(cell) {
			return <TableTextBox cell={cell} />;
		},
	},
	{
		Header: '값(태그)',
		accessor: 'value',
		Cell: function Component(cell) {
			return <TableTextBox cell={cell} />;
		},
	},
	{
		Header: '권한 수',
		accessor: 'numberOfPermissions',
	},
];

export const groupUsersSummaryColumns = [
	{
		Header: '사용자 계정',
		accessor: 'id',
	},
	{
		Header: '사용자 이름',
		accessor: 'name',
	},
	{
		Header: '그룹 수',
		accessor: 'groupsLength',
	},
	{
		Header: '마지막 콘솔 로그인',
		accessor: 'lastConsoleLogin',
	},
	{
		Header: '생성 일시',
		accessor: 'creationDate',
	},
	{
		Header: '부여 사용자',
		accessor: 'grantUser',
	},
];

export const groupRolesSummaryColumns = [
	{
		Header: '권한',
		accessor: 'name',
	},
	{
		Header: '권한 상세',
		accessor: 'description',
	},
	{
		Header: '정책 명',
		accessor: 'policyName',
	},
	{
		Header: 'Role 이름',
		accessor: 'roleName',
	},
	{
		Header: '부여 대상',
		accessor: 'authTarget',
	},
	{
		Header: '부여 일시',
		accessor: 'grantData',
	},
	{
		Header: '부여 사용자',
		accessor: 'grantUser',
	},
];

export const groupTagsSummaryColumns = [
	{
		Header: 'key(태그명)',
		accessor: 'name',
	},
	{
		Header: '값(태그)',
		accessor: 'value',
	},
	{
		Header: '권한 수',
		accessor: 'numberOfPermissions',
	},
	{
		Header: '생성 일시',
		accessor: 'creationDate',
	},
];
export const usersIncludedInGroupOnAddPageColumns = [
	{
		//:TODO  uid-> id , id->_id
		Header: '사용자 계정',
		accessor: '_id',
	},
	{
		Header: '사용자 명',
		accessor: 'name',
	},
	{
		Header: '그룹 수',
		accessor: 'groupsLength',
	},
	{
		Header: '마지막 콘솔 로그인 ',
		accessor: 'lastConsoleLogin',
	},
	{
		Header: '생성 일시',
		accessor: 'creationDate',
	},
];
export const usersExcludedFromGroupOnAddPageColumns = [
	{
		//:TODO  uid-> id , id->_id
		Header: '사용자 계정',
		accessor: '_id',
	},
	{
		Header: '사용자 명',
		accessor: 'name', //has to be changed
	},
];

export const rolesIncludedInGroupOnDescPageColumns = [
	{
		Header: '역할 이름',
		accessor: 'name',
	},
	{
		Header: '역할 유형',
		accessor: 'type',
	},
	{
		Header: '사용자 수',
		accessor: 'numberOfUsers',
	},
	{
		Header: '생성 일시',
		accessor: 'creationDate',
	},
];
export const rolesExcludedFormGroupOnDescPageColumns = [
	{
		Header: '역할 이름',
		accessor: 'name',
	},
	{
		Header: '역할 유형',
		accessor: 'type',
	},
	{
		Header: '사용자 수',
		accessor: 'numberOfUsers',
	},
	{
		Header: '생성 일시',
		accessor: 'creationDate',
	},
];
