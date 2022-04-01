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

export const dummyDates = [
	'2021.10.11 14:10:21',
	'2021.09.20 11:26:02',
	'2021.09.21 09:58:55',
	'2021.07.08 17:51:20',
	'2021.08.12 17:55:30',
	'2021.08.01 18:23:13',
	'2021.05.07 16:45:32',
	'2021.01.17 16:02:24',
	'2021.08.29 12:50:55',
];

export const dummyUsers = [
	{
		userUid: 'user5',
		id: 'kyoung634',
		name: '김영우',
	},
	{
		userUid: 'user6',
		id: 'minmin2',
		name: '박민수',
	},
	{
		userUid: 'user5',
		id: 'kyoung634',
		name: '김영우',
	},
	{
		userUid: 'user6',
		id: 'minmin2',
		name: '박민수',
	},
	{
		userUid: 'user5',
		id: 'kyoung634',
		name: '김영우',
	},
	{
		userUid: 'user6',
		id: 'minmin2',
		name: '박민수',
	},
];

export const dummyPolicyOnDialogBox = [
	{
		id: 'policy1',
		name: '사용자',
		description:
			'사용자 : 생성/수정/삭제/조회\n' +
			'태그 : 추가/수정/삭제/조회\n' +
			'역할 : 설정/삭제/조회',
		policyName: '사용자 관리권한',
		roleName: 'AdminRole',
		grantTarget: '사용자',
	},
	{
		id: 'policy2',
		name: '사용자 그룹',
		description:
			'사용자 그룹 : 생성/수정/삭제/조회\n' +
			'태그 : 추가/수정/삭제/조회\n' +
			'역할 : 설정/삭제/조회',
		policyName: '사용자 그룹 관리 권한',
		roleName: 'AdminUserGrp',
		grantTarget: '그룹(Admin)',
	},
	{
		id: 'policy3',
		name: '역할',
		description: '역할 : 추가/수정/삭제/조회\n' + '권한 : 설정/삭제/조회',
		policyName: '역할 관리 권한',
		roleName: 'AdminRole',
		grantTarget: '사용자',
	},
	{
		id: 'policy4',
		name: '비밀번호 사용기간',
		description:
			'사용기간 : 200일\n' +
			'계정처리 방법 : 잠금\n' +
			'해제 조건 : 본인확인인증',
		type: '계정처리 정책',
		policyName: 'AdminAccount',
		createdTime: '2021.09.03 15:35:58',
		grantTarget: '태그(type)',
	},
	{
		id: 'policy5',
		name: '서비스 사용기간',
		description:
			'접근 유형 : Console/Webterm\n' +
			'이용시간 : 09:00 ~ 18:00\n' +
			'요일 : 월~금',
		type: '사용자 접근',
		policyName: 'DefaultAccess',
		createdTime: '2021.09.03 15:35:58',
		grantTarget: '태그(type)',
	},
];

export const getRandomNum = (min, max) => {
	console.log(parseInt(Math.random() * (max - min) + min));
	return parseInt(Math.random() * (max - min) + min);
};
