//페이지 범위
export const selectedPageSize = [3, 7, 100, 200];
//계정 상태
export const tableSearchSelectOptions = {
	status: [
		{value: 0, label: '정상'},
		{value: 1, label: '잠김'},
		{value: 2, label: '대기'},
		{value: 3, label: '삭제'},
		{value: 4, label: '미승인'},
	],
	authType: [
		{value: 'ID/PWD', label: 'ID/PWD'},
		{value: '대체인증(Google)', label: '대체인증(Google)'},
		{value: '대체인증(Apple)', label: '대체인증(Apple)'},
		{value: '대체인증(Naver)', label: '대체인증(Naver)'},
		{value: '대체인증(Kakao)', label: '대체인증(Kakao)'},
	],
	MFA: [
		{value: 'Email(OTP)', label: 'Email(OTP)'},
		{value: 'SMS(OTP)', label: 'SMS(OTP)'},
		{value: 'Mobile(OTP)', label: 'Mobile(OTP)'},
		{value: 'Finger Print', label: 'Finger Print'},
		{value: 'Face ID', label: 'Face ID'},
	],
};

//Link Columns 설정값
export const LINK = 'link';

export const tableKeys = {
	/* users */
	users: 'users', // 사용자
	addTagsToUserOnAddPage: 'addTagsToUserOnAddPage', // 사용자 생성시 태그 추가
	addTagsToUser: 'addTagsToUser',
	addTagToUserOnDescPage: 'addTagToUserOnDescPage', // 사용자 상세페이지 탭 태그 추가
	rolesIncludedInUserOnAddPage: 'rolesIncludedInUserOnAddPage',
	rolesExcludedFromUserOnAddPage: 'rolesExcludedFromUserOnAddPage',
	userGroupsSummary: 'userGroupsSummary',
	userAuthSummary: 'userAuthSummary',
	userRolesSummary: 'userRolesSummary',
	userTagsSummary: 'userTagsSummary',
	rolesIncludedInUserOnDescPage: 'rolesIncludedInUserOnDescPage',
	rolesExcludedFormUserOnDescPage: 'rolesExcludedFormUserOnDescPage',
	/* groups */
	groupTypes: 'groupTypes', // 그룹 유형 관리
	groups: 'groups', // 사용자 그룹
	usersIncludedInGroupOnAddPage: 'usersIncludedInGroupOnAddPage',
	rolesIncludedInGroupOnAddPage: 'rolesIncludedInGroupOnAddPage',
	rolesExcludedFromGroupOnAddPage: 'rolesExcludedFromGroupOnAddPage',
	addTagsToGroupOnAddPage: 'addTagsToGroupOnAddPage',
	groupUsersSummary: 'groupUsersSummary',
	groupRolesSummary: 'groupRolesSummary',
	groupTagsSummary: 'groupTagsSummary',
	rolesIncludedInGroupOnDescPage: 'rolesIncludedInGroupOnDescPage',
	rolesExcludedFormGroupOnDescPage: 'rolesExcludedFormGroupOnDescPage',
};

export const formKeys = {
	addUserForm: 'add-user-form',
	addGroupForm: 'add-group-form',
	userInfoForm: 'user-info-form',
};
