export const usersColumns = [
	// accessor : 해당 열을 data 객체의 어느 속성을 읽어야하는지를 명시
	// Header   : 테이블 헤더에 보여줄 텍스트를 명시
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
