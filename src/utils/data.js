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

export const policyTypes = {
	iam: 'iam*',
	pam: 'pam*',
};

export const policyManageTypes = {
	Avocado: 0,
	Client: 1,
};

export const controlTypes = {
	RBAC: 1,
	ABAC: 2,
};

//페이지 범위
export const selectedPageSize = [3, 7, 100, 200];

//Link Columns 설정값
export const LINK = 'link';

export const formKeys = {
	addUserForm: 'add-userAuth-form',
	addGroupForm: 'add-group-form',
	userInfoForm: 'userAuth-info-form',
};
