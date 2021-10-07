// accessor : 해당 열을 data 객체의 어느 속성을 읽어야하는지를 명시
// Header   : 테이블 헤더에 보여줄 텍스트를 명시

import TableInput from './TableInput';

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

export const groupColumns = [
	{
		Header: '그룹 이름',
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

export const addTagsToUserColumns = [
	{
		Header: 'Key(태그명)',
		accessor: 'name',
		// eslint-disable-next-line react/display-name,react/react-in-jsx-scope
		Cell: (cellObj) => <TableInput obj={cellObj} />,
	},
	{
		Header: '값(태그)',
		accessor: 'value',
		// eslint-disable-next-line react/display-name,react/react-in-jsx-scope
		Cell: (cellObj) => <TableInput obj={cellObj} />,
	},
	{
		Header: '권한 수',
		accessor: 'rolesLength',

		// eslint-disable-next-line react/display-name
		// Cell: (callObj) => (
		// eslint-disable-next-line react/react-in-jsx-scope
		// <button onClick={() => console.log(callObj)}>하이</button>
		// ),
	},
];
