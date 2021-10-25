import React from 'react';
import TableTextBox from '../ColumnCells/TableTextBox';
import TableLink from '../ColumnCells/TableLink';
import SelectionOption from '../../components/Table/Options/Search/SelectionOption';
import TextBoxOption from '../../components/Table/Options/Search/TextBoxOption';
import {statusConverter} from '../tableDataConverter';
import CalenderOption from '../../components/Table/Options/Search/CalenderOption';

export const usersColumns = [
	{
		accessor: 'id',
		Header: '사용자계정',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
		disableFilters: true,
	},
	{
		accessor: 'name',
		Header: '이름',
		disableFilters: true,
	},
	{
		accessor: 'groups',
		Header: '그룹',
		disableFilters: true,
	},
	{
		accessor: 'status',
		Header: '계정 상태',
		filter: 'equals',
		Filter: SelectionOption,
		Cell: function Component(v) {
			return <div>{statusConverter(v.value)}</div>;
		},
	},
	{
		accessor: 'authType',
		Header: '인증유형',
		filter: 'equals',
		Filter: SelectionOption,
	},
	{
		accessor: 'MFA',
		Header: 'MFA',
		filter: 'equals',
		Filter: SelectionOption,
	},
	{
		accessor: 'passwordExpiryTime',
		Header: '비밀번호 수명',
		filter: 'equals',
		Filter: TextBoxOption,
		Cell: function Component(v) {
			return <div>{v.value}일전</div>;
		},
	},
	{
		accessor: 'tags',
		Header: '태그',
		disableFilters: true,
	},
	{
		accessor: 'lastConsoleLogin',
		Header: '마지막 콘솔 로그인',
		filter: 'dateBetween',
		Filter: CalenderOption,
	},
	{
		accessor: 'creationDate',
		Header: '생성 일시',
		filter: 'dateBetween',
		Filter: CalenderOption,
	},
];

export const addTagsToUserOnAddPageColumns = [
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

export const addTagToUserOnDescPageColumns = [
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

export const groupsIncludedInUserOnAddPageColumns = [
	{
		Header: '그룹명',
		accessor: 'name',
	},
	{
		Header: '그룹 유형',
		accessor: 'clientGroupTypeId',
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
		Header: '생성 일시',
		accessor: 'creationDate',
	},
];
export const groupsExcludedFromUserOnAddPageColumns = [
	{
		Header: '그룹명',
		accessor: 'name',
	},
	{
		Header: '그룹유형',
		accessor: 'clientGroupTypeId', //has to be changed
	},
];

export const rolesExcludedFromUserOnAddPageColumns = [
	{
		Header: '역할 이름',
		accessor: 'name',
		// id: LINK,
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

export const rolesIncludedInUserOnAddPageColumns = [
	{
		Header: '역할 이름',
		accessor: 'name',
	},
	{
		Header: '역할 유형',
		accessor: 'type',
	},
];

export const userGroupsSummaryColumns = [
	{
		Header: '그룹 이름',
		accessor: 'name',
	},
	{
		Header: '그룹 유형',
		accessor: 'clientGroupType',
	},
	{
		Header: '권한 수',
		accessor: 'numberOfRoles',
	},
	{
		Header: '상위 그룹',
		accessor: 'parentGroup',
	},
	{
		Header: '생성 일시',
		accessor: 'creationDate',
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

export const userAuthSummaryColumns = [
	{
		Header: '인증 유형',
		accessor: 'type',
	},
	{
		Header: '대체 인증',
		accessor: 'alterAuth',
	},
	{
		Header: 'MFA(다중인증)',
		accessor: 'mfa',
	},
	{
		Header: '본인 확인 인증',
		accessor: 'verification',
	},
	{
		Header: 'Fail Over',
		accessor: 'failOver',
	},
];

export const userRolesSummaryColumns = [
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

export const userTagsSummaryColumns = [
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
export const addUsersToGroupColumns = [
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
];

export const rolesIncludedInUserOnDescPageColumns = [
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

export const rolesExcludedFormUserOnDescPageColumns = [
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
