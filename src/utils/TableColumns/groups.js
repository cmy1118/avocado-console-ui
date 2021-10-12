import {LINK} from '../data';

export const groupColumns = [
	{
		Header: '그룹 이름',
		accessor: 'name',
		id: LINK,
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
		id: LINK,
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

export const addUsersToGroupColumns = [
	{
		Header: '사용자 계정',
		accessor: 'id',
		id: LINK,
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
