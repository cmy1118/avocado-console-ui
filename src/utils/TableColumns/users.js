import React from 'react';
import TableTextBox from '../../components/Table/ColumnCells/TableTextBox';
import TableLink from '../../components/Table/ColumnCells/TableLink';
import SelectionOption from '../../components/Table/Options/Search/SelectionOption';
import TextBoxOption from '../../components/Table/Options/Search/TextBoxOption';
import {
	authTypeConverter,
	mfaConverter,
	statusConverter,
} from '../tableDataConverter';
import CalenderOption from '../../components/Table/Options/Search/CalenderOption';

export const USER_COLUMN = [
	{
		accessor: 'id',
		Header: '사용자계정',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
		disableFilters: true,
		disableChangeVisible: true,
	},
	{
		accessor: 'name',
		Header: '이름',
		disableFilters: true,
		disableChangeVisible: true,
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
		Cell: function Component(v) {
			return <div>{authTypeConverter(v.value)}</div>;
		},
		Filter: SelectionOption,
	},
	{
		accessor: 'MFA',
		Header: 'MFA',
		filter: 'equals',
		Cell: function Component(v) {
			return <div>{mfaConverter(v.value)}</div>;
		},
		Filter: SelectionOption,
	},
	{
		accessor: 'passwordExpired',
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

export const USER_ADD_TAG_COLUMN = [
	{
		Header: 'Key(태그명)',
		accessor: 'name',
		Cell: function Component(cell) {
			return <TableTextBox cell={cell} isFocus />;
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

export const USER_SUMMARY_TABS_TAG_COLUMN = [
	{
		Header: 'Key(태그명)',
		accessor: 'name',
		Cell: function Component(cell) {
			return <TableTextBox cell={cell} isFocus />;
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

export const USER_ADD_GROUPS_EXCLUDE_COLUMN = [
	{
		Header: '그룹명',
		accessor: 'name',
	},
	{
		Header: '그룹 유형',
		accessor: 'type',
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
export const USER_ADD_GROUPS_INCLUDE_COLUMN = [
	{
		Header: '그룹명',
		accessor: 'name',
	},
	{
		Header: '그룹 유형',
		accessor: 'type', //has to be changed
	},
];

export const USER_ADD_ROLES_EXCLUDE_COLUMN = [
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

export const USER_ADD_ROLES_INCLUDE_COLUMN = [
	{
		Header: '역할 이름',
		accessor: 'name',
	},
	{
		Header: '역할 유형',
		accessor: 'type',
	},
];

export const USER_SUMMARY_GROUP_COLUMN = [
	{
		Header: '그룹 이름',
		accessor: 'name',
	},
	{
		Header: '그룹 유형',
		accessor: 'type',
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
		accessor: 'grantDate',
	},
	{
		Header: '부여 사용자',
		accessor: 'grantUser',
		Cell: function Component(v) {
			return <div>{v.value.name + '(' + v.value.id + ')'}</div>;
		},
	},
];

export const USER_SUMMARY_AUTH_COLUMN = [
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

export const USER_SUMMARY_PERMISSION_COLUMNS = [
	{
		Header: '권한',
		accessor: 'name',
	},
	{
		Header: '권한 상세',
		accessor: 'description',
		Cell: function Component(v) {
			return (
				<div>
					{v.value.split('\n').map((v, i) => {
						return (
							<div key={i}>
								{v}
								<br />
							</div>
						);
					})}
				</div>
			);
		},
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
		accessor: 'grantDate',
	},
	{
		Header: '부여 사용자',
		accessor: 'grantUser',
		Cell: function Component(v) {
			return <div>{v.value.name + '(' + v.value.id + ')'}</div>;
		},
	},
];

export const USER_SUMMARY_TABS_PERMISSION_COLUMN = [
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
		Header: '부여 태그',
		accessor: 'grantTag',
	},
	{
		Header: '부여 일시',
		accessor: 'grantData',
	},
];

export const USER_SUMMARY_TAG_COLUMN = [
	{
		Header: 'key(태그명)',
		accessor: 'name',
		Cell: function Component(cell) {
			return <TableTextBox cell={cell} isFocus />;
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

export const USER_SUMMARY_TABS_ROLES_EXCLUDE_COLUMN = [
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

export const USER_SUMMARY_TABS_ROLES_INCLUDE_COLUMN = [
	{
		Header: '역할 이름',
		accessor: 'name',
	},
	{
		Header: '역할 유형',
		accessor: 'type',
	},
];
// 이 사용자의 그룹
export const USER_SUMMARY_TABS_GROUPS_INCLUDE_COLUMN = [
	{
		Header: '그룹 명',
		accessor: 'name',
	},
	{
		Header: '그룹 유형',
		accessor: 'type',
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
];
//이 사용자의 다른그룹
export const USER_SUMMARY_TABS_GROUPS_EXCLUDE_COLUMN = [
	{
		Header: '그룹 명',
		accessor: 'name',
	},
	{
		Header: '그룹 유형',
		accessor: 'type',
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
];
