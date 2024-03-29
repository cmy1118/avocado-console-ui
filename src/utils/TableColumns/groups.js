import TableTextBox from '../../components/Table/ColumnCells/TableTextBox';
import React from 'react';
import TableLink from '../../components/Table/ColumnCells/TableLink';
import CalenderOption from '../../components/Table/Options/Search/searchFilters/CalenderOption';
import {statusConverter} from '../tableDataConverter';
import {RowDiv} from '../../styles/components/style';

export const GROUP_COLUMN = [
	{
		Header: '그룹 이름',
		accessor: 'name',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
		disableFilters: true,
		disableChangeVisible: true,
	},
	{
		Header: '그룹 유형',
		accessor: 'userGroupType',
		disableFilters: true,
	},
	{
		Header: '사용자 수',
		accessor: 'numberOfUsers',
		disableFilters: true,
	},
	{
		Header: '권한',
		accessor: 'roles',
		disableFilters: true,
	},
	{
		Header: '상위 그룹',
		accessor: 'parentGroup',
		disableFilters: true,
	},
	{
		Header: '생성 일시',
		accessor: 'createdTime',
		filter: 'dateBetween',
		Filter: CalenderOption,
	},
];

export const GROUP_TYPE_COLUMN = [
	{
		Header: '그룹 유형',
		accessor: 'name',
		Cell: function Component(cell) {
			return <TableTextBox cell={cell} />;
		},
	},
	{
		Header: '그룹 수',
		accessor: 'groupCount',
		// Cell: function Component(cell) {
		// 	return <TableTextBox cell={cell} />;
		// },
	},
	{
		Header: '설명',
		accessor: 'description',
		Cell: function Component(cell) {
			return <TableTextBox cell={cell} />;
		},
		width: 400,
	},

	{
		Header: '생성 일시',
		accessor: 'createdTime',
	},
];

export const GROUP_ADD_ROLES_EXCLUDE_COLUMN = [
	{
		Header: '역할 이름',
		accessor: 'name',
		type: 'roles',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		Header: '역할 유형',
		accessor: 'roleType',
	},
	{
		Header: '설명',
		accessor: 'description',
		width: 400,
	},
	{
		Header: '사용자 수',
		accessor: 'grantedCount',
	},
	{
		Header: '생성 일시',
		accessor: 'createdTime',
	},
];

export const GROUP_ADD_ROLES_INCLUDE_COLUMN = [
	{
		Header: '역할 이름',
		accessor: 'name',
		type: 'roles',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		Header: '역할 유형',
		accessor: 'roleType',
	},
];

export const GROUP_ADD_TAG_COLUMN = [
	{
		Header: 'Key(태그명)',
		accessor: 'name',
		Cell: function Component(cell) {
			return <TableTextBox cell={cell} isEditable={false} />;
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
		accessor: 'grantCount',
	},
];

export const GROUP_SUMMARY_USER_COLUMN = [
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
		Header: '계정 상태',
		accessor: 'status',
		Cell: function Component(v) {
			return <div>{statusConverter(v.value)}</div>;
		},
	},
	{
		Header: '마지막 콘솔 로그인',
		accessor: 'lastConsoleLogin',
	},
	{
		Header: '생성 일시',
		accessor: 'createdTime',
	},
	{
		Header: '부여 사용자',
		accessor: 'grantUser',
		type: 'users',
		Cell: function Component(cell) {
			// console.log('v?:', cell);
			return (
				<TableLink
					cell={cell}
					text={cell.value?.name + '(' + cell.value?.id + ')'}
				/>
			);
			// <div>{cell.value?.name + '(' + cell.value?.id + ')'}</div>;
		},
	},
];

export const GROUP_SUMMARY_PERMISSION_COLUMN = [
	{
		Header: '권한',
		accessor: 'name',
	},
	{
		Header: '권한 상세',
		accessor: 'description',
		width: 200,
		Cell: function Component(v) {
			return (
				<div>
					{v.value
						? v.value.split('\n').map((v, i) => {
								return (
									<RowDiv
										alignItems={'center'}
										height={'30px'}
										key={i}
									>
										{v}
									</RowDiv>
								);
						  })
						: ''}
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
		type: 'users',
		Cell: function Component(cell) {
			// console.log('v?:', cell);
			return (
				<TableLink
					cell={cell}
					text={cell.value?.name + '(' + cell.value?.id + ')'}
				/>
			);
			// <div>{cell.value?.name + '(' + cell.value?.id + ')'}</div>;
		},
	},
];

export const GROUP_SUMMARY_TAG_COLUMN = [
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
		accessor: 'createdTime',
	},
];
export const GROUP_SUMMARY_TABS_TAG_COLUMN = [
	{
		Header: 'key(태그명)',
		accessor: 'name',
		Cell: function Component(cell) {
			return <TableTextBox cell={cell} isEditable={false} />;
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
		accessor: 'grantCount',
	},
	// {
	// 	Header: '생성 일시',
	// 	accessor: 'createdTime',
	// },
];
export const GROUP_ADD_USERS_EXCLUDE_COLUMN = [
	{
		//:TODO  uid-> id , id->_id
		Header: '사용자 계정',
		accessor: 'id',
		type: 'users',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		Header: '사용자 이름',
		accessor: 'name',
	},
	{
		Header: '그룹 수',
		accessor: 'grantedCount',
	},
	{
		Header: '마지막 콘솔 로그인 ',
		accessor: 'lastConsoleLoginTime',
	},
	{
		Header: '생성 일시',
		accessor: 'createdTime',
	},
];

export const GROUP_ADD_USERS_INCLUDE_COLUMN = [
	{
		//:TODO  uid-> id , id->_id
		Header: '사용자 계정',
		accessor: 'id',
		type: 'users',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		Header: '사용자 이름',
		accessor: 'name', //has to be changed
	},
];

export const GROUP_SUMMARY_TABS_ROLES_INCLUDE_COLUMN = [
	{
		Header: '역할 이름',
		accessor: 'name',
		type: 'roles',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		Header: '역할 유형',
		accessor: 'type',
	},
	{
		Header: '설명',
		accessor: 'description',
		width: 400,
	},
	{
		Header: '사용자 수',
		accessor: 'grantedCount',
	},
	{
		Header: '생성 일시',
		accessor: 'createdTime',
	},
];
export const GROUP_SUMMARY_TABS_ROLES_EXCLUDE_COLUMN = [
	{
		Header: '역할 이름',
		accessor: 'name',
		type: 'roles',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		Header: '역할 유형',
		accessor: 'type',
	},
	{
		Header: '설명',
		accessor: 'description',
		width: 400,
	},
	{
		Header: '사용자 수',
		accessor: 'grantedCount',
	},
	{
		Header: '생성 일시',
		accessor: 'createdTime',
	},
];
export const GROUP_SUMMARY_TABS_USERS_INCLUDE_COLUMN = [
	{
		Header: '사용자 계정',
		accessor: 'id',
		type: 'users',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		Header: '사용자 명',
		accessor: 'name',
	},
	{
		Header: '그룹 수',
		accessor: 'numberOfGroups',
	},
	{
		Header: '마지막 콘솔 로그인',
		accessor: 'lastConsoleLogin',
	},
	{
		Header: '생성일시',
		accessor: 'createdTime',
	},
];
export const GROUP_SUMMARY_TABS_USERS_EXCLUDE_COLUMN = [
	{
		Header: '사용자 계정',
		accessor: 'id',
		type: 'users',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
	},
	{
		Header: '사용자 명',
		accessor: 'name',
	},
	{
		Header: '그룹 수',
		accessor: 'numberOfGroups',
	},
	{
		Header: '마지막 콘솔 로그인',
		accessor: 'lastConsoleLogin',
	},
	{
		Header: '생성일시',
		accessor: 'createdTime',
	},
];

export const GROUP_SUMMARY_TABS_PERMISSION_COLUMN = [
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
		Header: '부여 대상',
		accessor: 'grantTag',
	},
	{
		Header: '부여 일시',
		accessor: 'grantData',
	},
];

export const GROUP_SUMMARY_TABS_TAG_PERMISSIONS_INCLUDE_COLUMN = [
	{
		Header: '정책 이름',
		accessor: 'name',
	},
	{
		Header: '유형',
		accessor: 'type',
	},
	{
		Header: '설명',
		accessor: 'description',
		width: 400,
	},
	{
		Header: '권한 연결 수',
		accessor: 'numberOfPermissions',
	},
	{
		Header: '생성 일시',
		accessor: 'createdTime',
	},
];

export const GROUP_SUMMARY_TABS_TAG_PERMISSIONS_EXCLUDE_COLUMN = [
	{
		Header: '정책 이름',
		accessor: 'name',
	},
	{
		Header: '유형',
		accessor: 'type',
	},
	{
		Header: '설명',
		accessor: 'description',
		width: 400,
	},
	{
		Header: '권한 연결 수',
		accessor: 'numberOfPermissions',
	},
	{
		Header: '생성 일시',
		accessor: 'createdTime',
	},
];
