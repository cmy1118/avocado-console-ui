import React from 'react';
import TableTextBox from '../../components/RecycleComponents/TableTextBox';
import CURRENT_TARGET from '../../reducers/currentTarget';

export const usersColumns = [
	{
		accessor: 'id',
		Header: '사용자계정',
	},
	{
		accessor: 'name',
		Header: '이름',
	},
	{
		accessor: 'groups',
		Header: '그룹',
	},
	{
		accessor: 'status',
		Header: '계정상태',
	},
	{
		accessor: 'authType',
		Header: '인증유형',
	},
	{
		accessor: 'MFA',
		Header: 'MFA',
	},
	{
		accessor: 'passwordExpiryTime',
		Header: '비밀번호 수명',
	},
	{
		accessor: 'tags',
		Header: '태그',
	},
	{
		accessor: 'lastConsoleLogin',
		Header: '마지막 콘솔 로그인',
	},
	{
		accessor: 'creationDate',
		Header: '생성 일시',
	},
];

export const addTagsToUserOnAddPageColumns = [
	{
		Header: 'Key(태그명)',
		accessor: 'name',
		Cell: function Component(cellObj) {
			return (
				<TableTextBox
					cellObj={cellObj}
					onSubmit={CURRENT_TARGET.action.saveTagDataOnAddUser}
				/>
			);
		},
		// id: LINK,
	},
	{
		Header: '값(태그)',
		accessor: 'value',
		Cell: function Component(cellObj) {
			return (
				<TableTextBox
					cellObj={cellObj}
					onSubmit={CURRENT_TARGET.action.saveTagDataOnAddUser}
				/>
			);
		},
	},
	{
		Header: '권한 수',
		accessor: 'rolesLength',
	},
];

export const rolesIncludedInUserOnAddPageColumns = [
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

export const rolesExcludedFromUserOnAddPageColumns = [
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
