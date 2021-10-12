import TableTextBox from '../../components/RecycleComponents/TableTextBox';
import {LINK} from '../data';

export const usersColumns = [
	{
		accessor: 'id',
		Header: '사용자계정',
		id: LINK,
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

export const addTagsToUserColumns = [
	{
		Header: 'Key(태그명)',
		accessor: 'name',
		// eslint-disable-next-line react/display-name,react/react-in-jsx-scope
		Cell: (cellObj) => <TableTextBox obj={cellObj} />,

		id: LINK,
	},
	{
		Header: '값(태그)',
		accessor: 'value',
		// eslint-disable-next-line react/display-name,react/react-in-jsx-scope
		Cell: (cellObj) => <TableTextBox obj={cellObj} />,
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
		id: LINK,
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
