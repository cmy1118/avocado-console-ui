export const dummyDates = [
	'2021.10.11 14:10:21',
	'2021.09.20 11:26:02',
	'2021.09.21 09:58:55',
	'2021.07.08 17:51:20',
	'2021.08.12 17:55:30',
	'2021.08.21 16:40:10',
];

export const dummyUsers = [
	{
		uid: 'user1',
		id: 'kyoung634',
		name: '김영우',
	},
	{
		uid: 'user3',
		id: 'minmin2',
		name: '박민수',
	},
	{
		uid: 'user1',
		id: 'kyoung634',
		name: '김영우',
	},
	{
		uid: 'user3',
		id: 'minmin2',
		name: '박민수',
	},
	{
		uid: 'user1',
		id: 'kyoung634',
		name: '김영우',
	},
	{
		uid: 'user3',
		id: 'minmin2',
		name: '박민수',
	},
];

export const dummyPolicyOnUser = [
	{
		id: 'policy0',
		name: '인증',
		description:
			'인증유형 : ID/Password\n' +
			'대체인증 : 사용하지 않음\n' +
			'MFA(다중인증) : Email(OTP)\n' +
			'본인확인인증 : Email\n' +
			'Fail Over : 사용 안함',
		policyName: '인증',
		roleName: 'AdminRole',
		authTarget: '사용자',
		grantDate: '2021.09.03 15:35:58',
		grantUser: {
			uid: 'user3',
			id: 'minmin2',
			name: '박민수',
		},
	},
	{
		id: 'policy1',
		name: '사용자',
		description:
			'사용자 : 생성/수정/삭제/조회\n' +
			'태그 : 추가/수정/삭제/조회\n' +
			'역할 : 설정/삭제/조회',
		policyName: '사용자 관리권한',
		roleName: 'AdminRole',
		authTarget: '사용자',
		grantDate: '2021.09.03 15:35:55',
		grantUser: {
			uid: 'user3',
			id: 'minmin2',
			name: '박민수',
		},
	},
	{
		id: 'policy2',
		name: '사용자 그룹',
		description:
			'사용자 그룹 : 생성/수정/삭제/조회\n' +
			'태그 : 추가/수정/삭제/조회\n' +
			'역할 : 설정/삭제/조회',
		policyName: '사용자 그룹 관리 권한',
		roleName: 'AdminRole',
		authTarget: '그룹(Admin)',
		grantDate: '2021.09.03 15:35:55',
		grantUser: {
			uid: 'user1',
			id: 'kyoung634',
			name: '김영우',
		},
	},
	{
		id: 'policy3',
		name: '역할',
		description: '역할 : 추가/수정/삭제/조회\n' + '권한 : 설정/삭제/조회',
		policyName: '역할 관리 권한',
		roleName: 'AdminRole',
		authTarget: '사용자',
		grantDate: '2021.09.03 15:35:55',
		grantUser: {
			uid: 'user3',
			id: 'minmin2',
			name: '박민수',
		},
	},
	{
		id: 'policy4',
		name: '비밀번호 사용기간',
		description:
			'사용기간 : 200일\n' +
			'계정처리 방법 : 잠금\n' +
			'해제 조건 : 본인확인인증',
		policyName: '인증',
		roleName: 'AdminRole',
		authTarget: '계정처리 정책',
		grantDate: '2021.09.03 15:35:58',
		grantUser: {
			uid: 'user1',
			id: 'kyoung634',
			name: '김영우',
		},
	},
	{
		id: 'policy5',
		name: '서비스 사용기간',
		description:
			'접근 유형 : Console/Webterm\n' +
			'이용시간 : 09:00 ~ 18:00\n' +
			'요일 : 월~금',
		policyName: '사용자 접근',
		roleName: '',
		authTarget: '태그(type)',
		grantDate: '2021.09.03 15:35:58',
		grantUser: {
			uid: 'user3',
			id: 'minmin2',
			name: '박민수',
		},
	},
];

export const dummyPolicyOnGroup = [
	{
		id: 'policy1',
		name: '사용자',
		description:
			'사용자 : 생성/수정/삭제/조회\n' +
			'태그 : 추가/수정/삭제/조회\n' +
			'역할 : 설정/삭제/조회',
		policyName: '사용자 관리권한',
		roleName: 'AdminRole',
		authTarget: '사용자',
		grantDate: '2021.09.03 15:35:55',
		grantUser: {
			uid: 'user3',
			id: 'minmin2',
			name: '박민수',
		},
	},
	{
		id: 'policy2',
		name: '사용자 그룹',
		description:
			'사용자 그룹 : 생성/수정/삭제/조회\n' +
			'태그 : 추가/수정/삭제/조회\n' +
			'역할 : 설정/삭제/조회',
		policyName: '사용자 그룹 관리 권한',
		roleName: 'AdminRole',
		authTarget: '그룹(Admin)',
		grantDate: '2021.09.03 15:35:55',
		grantUser: {
			uid: 'user3',
			id: 'minmin2',
			name: '박민수',
		},
	},
	{
		id: 'policy3',
		name: '역할',
		description: '역할 : 추가/수정/삭제/조회\n' + '권한 : 설정/삭제/조회',
		policyName: '역할 관리 권한',
		roleName: 'AdminRole',
		authTarget: '사용자',
		grantDate: '2021.09.03 15:35:55',
		grantUser: {
			uid: 'user3',
			id: 'minmin2',
			name: '박민수',
		},
	},
	{
		id: 'policy4',
		name: '비밀번호 사용기간',
		description:
			'사용기간 : 200일\n' +
			'계정처리 방법 : 잠금\n' +
			'해제 조건 : 본인확인인증',
		policyName: '계정처리 정책',
		roleName: '',
		authTarget: '태그(type)',
		grantDate: '2021.09.03 15:35:58',
		grantUser: {
			uid: 'user1',
			id: 'kyoung634',
			name: '김영우',
		},
	},
	{
		id: 'policy5',
		name: '서비스 사용기간',
		description:
			'접근 유형 : Console/Webterm\n' +
			'이용시간 : 09:00 ~ 18:00\n' +
			'요일 : 월~금',
		policyName: '사용자 접근',
		roleName: '',
		authTarget: '태그(type)',
		grantDate: '2021.09.03 15:35:58',
		grantUser: {
			uid: 'user3',
			id: 'minmin2',
			name: '박민수',
		},
	},
];
