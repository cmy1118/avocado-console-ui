export const dummyDatesLastInfo = [
	{
		lastTime: '2021-06-01T13:04:42.59+09:00',
		lastActiv: '사용자 접근 정책 변경',
		lastUser: 'jinwoo',
	},
	{
		lastTime: '2021-10-20T01:06:42.59+09:00',
		lastActiv: '권한 접근 정책 변경',
		lastUser: 'myhee',
	},
	{
		lastTime: '2021-11-11T11:22:42.59+09:00',
		lastActiv: '권한 접근 정책 추가',
		lastUser: 'user',
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
			userUid: 'user6',
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
		grantDate: '2021.12.01 19:23:02',
		grantUser: {
			userUid: 'user6',
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
		grantDate: '2020.12.14 16:20:14',
		grantUser: {
			userUid: 'user5',
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
		grantDate: '2020.01.05 12:00:02',
		grantUser: {
			userUid: 'user6',
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
			userUid: 'user5',
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
			userUid: 'user6',
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
			userUid: 'user6',
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
			userUid: 'user6',
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
			userUid: 'user6',
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
			userUid: 'user5',
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
			userUid: 'user6',
			id: 'minmin2',
			name: '박민수',
		},
	},
];

export const dummyPolicyOnRole = [
	{
		id: 'policy1',
		name: '사용자',
		description:
			'사용자 : 생성/수정/삭제/조회\n' +
			'태그 : 추가/수정/삭제/조회\n' +
			'역할 : 설정/삭제/조회',
		type: '사용자 관리권한',
		policyName: 'AdminUser',
		createdTime: '2021.09.03 15:35:55',
		grantUser: {
			userUid: 'user6',
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
		type: '사용자 그룹 관리 권한',
		policyName: 'AdminUserGrp',
		createdTime: '2021.09.03 15:35:55',
		grantUser: {
			userUid: 'user6',
			id: 'minmin2',
			name: '박민수',
		},
	},
	{
		id: 'policy3',
		name: '역할',
		description: '역할 : 추가/수정/삭제/조회\n' + '권한 : 설정/삭제/조회',
		type: '역할 관리 권한',
		policyName: 'AdminRole',
		createdTime: '2021.09.03 15:35:55',
		grantUser: {
			userUid: 'user6',
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
		type: '계정처리 정책',
		policyName: 'AdminAccount',
		createdTime: '2021.09.03 15:35:58',
		grantUser: {
			userUid: 'user5',
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
		type: '사용자 접근',
		policyName: 'DefaultAccess',
		createdTime: '2021.09.03 15:35:58',
		grantUser: {
			userUid: 'user6',
			id: 'minmin2',
			name: '박민수',
		},
	},
];

export const dummyPermission = [
	{
		id: 'permission1',
		name: 'admin-permission',
		type: 'PAM 정책',
		description:
			'사용자 레벨의 최고 관리자인 Manager에게 부여된 역할 (기본제공)',
		numberOfRoles: 1,
		createdTime: '2019.01.12 14:24:28',
	},
	{
		id: 'permission2',
		name: 'guest-permission',
		type: 'IAM 권한',
		description: 'Admin 사용자에게 부여 하는 역할',
		numberOfRoles: 2,
		createdTime: '2019.02.21 16:02:46',
	},
	{
		id: 'permission3',
		name: 'role-permission',
		type: 'IAM 권한',
		description: '정책을 일반 User에게 부여 하는 역할',
		numberOfRoles: 4,
		createdTime: '2019.06.24 15:46:02',
	},
	{
		id: 'permission4',
		name: 'userRole-permission',
		type: 'PAM 정책',
		description: '일반 User의 역할을 부을 하는 역할',
		numberOfRoles: 2,
		createdTime: '2019.04.30 21:23:43',
	},
	{
		id: 'permission5',
		name: 'tempPolicy-permission',
		type: 'PAM 정책',
		description: '일반 User에게 임시로 부여 하는 역할',
		numberOfRoles: 10,
		createdTime: '2020.01.06 14:03:25',
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
