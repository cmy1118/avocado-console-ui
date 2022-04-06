//TODO: pam rule 데이터 세팅시 삭제 예정
export const dummyPamRule = [
	{
		categoryType: {code: 'categoryType1'},
		description: '자원 접속 인증',
		id: 'KR-2020-0001:202202:0001',
		name: '자원 접속 인증',
		resource: '*',
	},
	{
		categoryType: {code: 'categoryType2'},
		description: '다중인증(MFA)',
		id: '2',
		name: '다중인증(MFA)',
		resource: '*',
	},
	{
		categoryType: {code: 'categoryType3'},
		description: '자원 접근 정책',
		id: '3',
		name: '자원 접근 정책',
		resource: '*',
	},
	{
		categoryType: {code: 'categoryType4'},
		description: '접속 사유 정책',
		id: '4',
		name: '접속 사유 정책',
		resource: '*',
	},
	{
		categoryType: {code: 'categoryType5'},
		description: '명령어 제어 정책',
		id: '5',
		name: '명령어 제어 정책',
		resource: '*',
	},
	{
		categoryType: {code: 'categoryType6'},
		description: '파일 접근 권한',
		id: '6',
		name: '파일 접근 권한',
		resource: '*',
	},
];
