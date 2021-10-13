//페이지 범위
import {
	addTagsToUserColumns,
	addTagsToUserOnAddPageColumns,
	rolesExcludedFromUserOnAddPageColumns,
	rolesIncludedInUserOnAddPageColumns,
	userAuthSummaryColumns,
	userGroupsSummaryColumns,
	userRolesSummaryColumns,
	usersColumns,
	userTagsSummaryColumns,
} from './TableColumns/users';

export const selectedPageSize = [10, 50, 100, 200];
//Link Columns 설정값
export const LINK = 'link';

export const tableKeys = {
	/* users */
	users: 'users', // 사용자
	addTagsToUserOnAddPage: 'addTagsToUserOnAddPage', // 사용자 생성시 태그 추가
	addTagsToUser: 'addTagsToUser',
	rolesIncludedInUserOnAddPage: 'rolesIncludedInUserOnAddPage',
	rolesExcludedFromUserOnAddPage: 'rolesExcludedFromUserOnAddPage',
	userGroupsSummary: 'userGroupsSummary',
	userAuthSummary: 'userAuthSummary',
	userRolesSummary: 'userRolesSummary',
	userTagsSummary: 'userTagsSummary',
	/* groups */
	groupTypes: 'groupTypes', // 그룹 유형 관리
	groups: 'groups', // 사용자 그룹
	usersIncludedInGroupOnAddPage: 'usersIncludedInGroupOnAddPage',
};
