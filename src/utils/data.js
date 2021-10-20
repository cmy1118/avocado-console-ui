//페이지 범위
export const selectedPageSize = [3, 7, 100, 200];
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
	/* groups */
	groupTypes: 'groupTypes', // 그룹 유형 관리
	groups: 'groups', // 사용자 그룹
	//사용자 그룹에 추가
	usersIncludedInGroupOnAddPage: 'usersIncludedInGroupOnAddPage',
	usersExcludedFromGroupOnAddPage: 'usersExcludedFromGroupOnAddPage',
	addTagsToGroupOnAddPage: 'addTagsToGroupOnAddPage',
	groupUsersSummary: 'groupUsersSummary',
	groupRolesSummary: 'groupRolesSummary',
	groupTagsSummary: 'groupTagsSummary',
};

export const formKeys = {
	addUserForm: 'add-user-form',
	addGroupForm: 'add-group-form',
	userInfoForm: 'user-info-form',
};
