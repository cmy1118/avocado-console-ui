//페이지 범위
import {
	groupsExcludedFromUserOnDescPageColumns,
	groupsIncludedInUserOnDescPageColumns,
} from './TableColumns/users';

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
	rolesIncludedInUserOnDescPage: 'rolesIncludedInUserOnDescPage',
	rolesExcludedFormUserOnDescPage: 'rolesExcludedFormUserOnDescPage',
	groupsIncludedInUserOnDescPage: 'groupsIncludedInUserOnDescPage', // 이 사용자의 그룹
	groupsExcludedFromUserOnDescPage: 'groupsExcludedFromUserOnDescPage', //이 사용자의 다른그룹
	/* groups */
	groupTypes: 'groupTypes', // 그룹 유형 관리
	groups: 'groups', // 사용자 그룹
	//사용자 그룹에 추가
	usersIncludedInGroupOnAddPage: 'usersIncludedInGroupOnAddPage',
	usersExcludedFromGroupOnAddPage: 'usersExcludedFromGroupOnAddPage',
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
