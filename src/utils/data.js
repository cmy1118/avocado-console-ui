export const status = {
	NORMAL: 0,
	LOCKED: 1,
	WAITING: 2,
	DELETED: 3,
	UNAUTHORIZED: 4,
};
export const authType = {ID: 0, GOOGLE: 1, APPLE: 2, NAVER: 3, KAKAO: 4};
export const mfa = {
	NONE: null,
	EMAIL: 0,
	SMS: 1,
	MOBILE: 2,
	FINGER_PRINT: 3,
	FACE_ID: 4,
};

//페이지 범위
export const selectedPageSize = [3, 7, 100, 200];
//계정 상태
export const tableSearchSelectOptions = {
	status: [
		{value: status.NORMAL, label: '정상'},
		{value: status.LOCKED, label: '잠김'},
		{value: status.WAITING, label: '대기'},
		{value: status.DELETED, label: '삭제'},
		{value: status.UNAUTHORIZED, label: '미승인'},
	],
	authType: [
		{value: authType.ID, label: 'ID/PWD'},
		{value: authType.GOOGLE, label: '대체인증(Google)'},
		{value: authType.APPLE, label: '대체인증(Apple)'},
		{value: authType.NAVER, label: '대체인증(Naver)'},
		{value: authType.KAKAO, label: '대체인증(Kakao)'},
	],
	MFA: [
		{value: mfa.EMAIL, label: 'Email(OTP)'},
		{value: mfa.SMS, label: 'SMS(OTP)'},
		{value: mfa.MOBILE, label: 'Mobile(OTP)'},
		{value: mfa.FINGER_PRINT, label: 'Finger Print'},
		{value: mfa.FACE_ID, label: 'Face ID'},
	],
	roleType: [
		{value: 'Public', label: 'Public'},
		{value: 'Private', label: 'Private'},
	],
};

//Link Columns 설정값
export const LINK = 'link';

export const formKeys = {
	addUserForm: 'add-user-form',
	addGroupForm: 'add-group-form',
	userInfoForm: 'user-info-form',
};

//테이블 unfold 데이터
export const FOLD_DATA = {
	//ADD_USER_SPACE
	AddUserToGroup: false,
	AssignRoleToUser: false,
	AddTagToUser: false,

	//USER_TAP_SPACE
	UserGroupsTab: false,
	UserRolesTab: false,
	UserOnDescPageTags: false,

	//ADD_GROUP_SPACE
	UsersIncludedInGroup: false,
	AssignRoleToGroup: false,
	AddTagToGroup: false,

	//GROUP_TAP_SPACE
	GroupUsersTab: false,
	GroupRolesTab: false,
	GroupOnDescPageTags: false,

	//ADD_ROLE_SPACE
	RolePolicyTab: false,
	RoleUserTab: false,
	RoleGroupTab: false,

};
