import React from 'react';

import SelectionOption from '../../components/Table/Options/Search/SelectionOption';
import CalenderOption from '../../components/Table/Options/Search/CalenderOption';
import TableLink from '../../components/Table/ColumnCells/TableLink';
import {statusConverter} from '../tableDataConverter';
import {RowDiv} from '../../styles/components/style';

export const ROLE_COLUMN = [
	{
		accessor: 'name',
		Header: '역할 이름',
		Cell: function Component(cell) {
			return <TableLink cell={cell} />;
		},
		disableFilters: true,
	},
	{
		accessor: 'roleType',
		Header: '역할 유형',
		filter: 'equals',
		Filter: SelectionOption,
	},
	{
		accessor: 'description',
		Header: '설명',
		disableFilters: true,
		width: 400,
	},
	{
		accessor: 'numberOfPermissions',
		Header: '권한 부여수',
		disableFilters: true,
	},
	{
		accessor: 'creationDate',
		Header: '생성 일시',
		filter: 'dateBetween',
		Filter: CalenderOption,
	},
];

export const ROLE_SUMMARY_PERMISSION_COLUMN = [
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
							<RowDiv
								alignItems={'center'}
								height={'30px'}
								key={i}
							>
								{v}
							</RowDiv>
						);
					})}
				</div>
			);
		},
	},
	{
		Header: '유형',
		accessor: 'type',
	},
	{
		Header: '정책 이름',
		accessor: 'policyName',
	},
	{
		accessor: 'creationDate',
		Header: '생성 일시',
	},
	{
		accessor: 'grantUser',
		Header: '부여 사용자',
		Cell: function Component(v) {
			return <div>{v.value?.name + '(' + v.value?.id + ')'}</div>;
		},
	},
];
export const ROLE_SUMMARY_USER_COLUMN = [
	{accessor: 'id', Header: '사용자 계정'},
	{accessor: 'name', Header: '사용자 이름'},
	{accessor: 'numberOfGroups', Header: '그룹 수'},
	{
		accessor: 'status',
		Header: '계정 상태',
		Cell: function Component(v) {
			return <div>{statusConverter(v.value)}</div>;
		},
	},
	{accessor: 'lastConsoleLogin', Header: '마지막 콘솔 로그인'},
	{accessor: 'creationDate', Header: '생성 일시'},
	{accessor: 'grantDate', Header: '부여 일시'},
	{
		accessor: 'grantUser',
		Header: '부여 사용자',
		Cell: function Component(v) {
			return <div>{v.value?.name + '(' + v.value?.id + ')'}</div>;
		},
	},
];
export const ROLE_SUMMARY_GROUP_COLUMN = [
	{accessor: 'name', Header: '그룹 이름'},
	{accessor: 'clientGroupType', Header: '그룹 유형'},
	{accessor: 'numberOfPermissions', Header: '권한 수'},
	{accessor: 'parentGroup', Header: '상위 그룹'},
	{accessor: 'creationDate', Header: '생성 일시'},
	{accessor: 'grantDate', Header: '부여 일시'},
	{
		accessor: 'grantUser',
		Header: '부여 사용자',
		Cell: function Component(v) {
			return <div>{v.value?.name + '(' + v.value?.id + ')'}</div>;
		},
	},
];

export const ROLE_SUMMARY_PERMISSIONS_INCLUDE_COLUMN = [
	{accessor: 'name', Header: '정책 이름'},
	{accessor: 'type', Header: ' 유형'},
	{accessor: 'description', Header: '설명', width: 400},
	{accessor: 'numberOfRoles', Header: '역할 연결 수'},
	{accessor: 'creationDate', Header: '생성 일시'},
];

export const ROLE_SUMMARY_PERMISSIONS_EXCLUDE_COLUMN = [
	{accessor: 'name', Header: '정책 이름'},
	{accessor: 'type', Header: ' 유형'},
	{accessor: 'description', Header: '설명', width: 400},
	{accessor: 'numberOfRoles', Header: '역할 연결 수'},
	{accessor: 'creationDate', Header: '생성 일시'},
];

export const ROLE_SUMMARY_USERS_INCLUDE_COLUMN = [
	{accessor: 'id', Header: '사용자 계정'},
	{accessor: 'name', Header: '사용자 이름'},
	{accessor: 'numberOfGroups', Header: '그룹 수'},
	{accessor: 'lastConsoleLogin', Header: '마지막 콘솔 로그인'},
	{accessor: 'creationDate', Header: '생성 일시'},
	{
		accessor: 'grantUser',
		Header: '부여 사용자',
		Cell: function Component(v) {
			return <div>{v.value?.name + '(' + v.value?.id + ')'}</div>;
		},
	},
];

export const ROLE_SUMMARY_USERS_EXCLUDE_COLUMN = [
	{accessor: 'id', Header: '사용자 계정'},
	{accessor: 'name', Header: '사용자 이름'},
	{accessor: 'numberOfGroups', Header: '그룹 수'},
	{accessor: 'lastConsoleLogin', Header: '마지막 콘솔 로그인'},
	{accessor: 'creationDate', Header: '생성 일시'},
];

export const ROLE_SUMMARY_GROUPS_INCLUDE_COLUMN = [
	{accessor: 'name', Header: '그룹 명'},
	{accessor: 'type', Header: '그룹 유형'},
	{accessor: 'numberOfPermissions', Header: '권한 수'},
	{Header: '상위 그룹', accessor: 'parentGroup'},
	{accessor: 'creationDate', Header: '생성 일시'},
	{accessor: 'grantDate', Header: '부여 일시'},
	{
		accessor: 'grantUser',
		Header: '부여 사용자',
		Cell: function Component(v) {
			return <div>{v.value?.name + '(' + v.value?.id + ')'}</div>;
		},
	},
];

export const ROLE_SUMMARY_GROUPS_EXCLUDE_COLUMN = [
	{accessor: 'name', Header: '그룹 명'},
	{accessor: 'type', Header: '그룹 유형'},
	{accessor: 'numberOfPermissions', Header: '권한 수'},
	{Header: '상위 그룹', accessor: 'parentGroup'},
	{accessor: 'creationDate', Header: '생성 일시'},
];
