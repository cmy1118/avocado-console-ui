import {
	addTagsToUserOnAddPageColumns,
	rolesExcludedFromUserOnAddPageColumns,
	rolesIncludedInUserOnAddPageColumns,
	userAuthSummaryColumns,
	userGroupsSummaryColumns,
	userRolesSummaryColumns,
	usersColumns,
	userTagsSummaryColumns,

	addTagsToUserColumns,
	groupsIncludedInUserOnAddPageColumns,
	groupsExcludedFromUserOnAddPageColumns,
} from './users';
import {
	groupColumns,
	groupRolesSummaryColumns,
	groupTagsSummaryColumns,
	addTagsToGroupOnAddPageColumns,
	groupTypeColumns,
	groupUsersSummaryColumns,
	usersIncludedInGroupOnAddPageColumns,
	addUsersToGroupColumns,
} from './groups';

// 형식 { key : columns }
export let getColumnsAsKey;
getColumnsAsKey = {
	/* users */
	users: usersColumns, // 사용자
	addTagsToUserOnAddPage: addTagsToUserOnAddPageColumns, // 사용자 생성페이지 태그 추가
	rolesIncludedInUserOnAddPage: rolesIncludedInUserOnAddPageColumns, // 사용자 생성 페이지 권한 추가 (왼)
	rolesExcludedFromUserOnAddPage: rolesExcludedFromUserOnAddPageColumns, // 사용자 생성 페이지 권한 추가 (오)
	userGroupsSummary: userGroupsSummaryColumns,
	userAuthSummary: userAuthSummaryColumns,
	userRolesSummary: userRolesSummaryColumns,
	userTagsSummary: userTagsSummaryColumns,

	addTagsToUser: addTagsToUserColumns,
	groupsIncludedInUserOnAddPageColumns: groupsIncludedInUserOnAddPageColumns,
	groupsExcludedFromUserOnAddPageColumns: groupsExcludedFromUserOnAddPageColumns,
	/* groups */
	groups: groupColumns,
	groupTypes: groupTypeColumns,
	addTagsToGroupOnAddPage: addTagsToGroupOnAddPageColumns, // 그룹 생성페이지 태그 추가
	usersIncludedInGroupOnAddPage: usersIncludedInGroupOnAddPageColumns,
	groupUsersSummary: groupUsersSummaryColumns,
	groupRolesSummary: groupRolesSummaryColumns,
	groupTagsSummary: groupTagsSummaryColumns,
};
