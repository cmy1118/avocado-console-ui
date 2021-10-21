import {
	addTagsToUserOnAddPageColumns,
	addTagToUserOnDescPageColumns,
	rolesExcludedFromUserOnAddPageColumns,
	rolesIncludedInUserOnAddPageColumns,
	userAuthSummaryColumns,
	userGroupsSummaryColumns,
	userRolesSummaryColumns,
	usersColumns,
	userTagsSummaryColumns,
	addUsersToGroupColumns,
	groupsIncludedInUserOnAddPageColumns,
	groupsExcludedFromUserOnAddPageColumns,
	rolesIncludedInUserOnDescPageColumns,
	rolesExcludedFormUserOnDescPageColumns,
	groupsIncludedInUserOnDescPageColumns, // 이 사용자의 그룹
	groupsExcludedFromUserOnDescPageColumns, //이 사용자의 다른그룹
} from './users';
import {
	groupColumns,
	groupRolesSummaryColumns,
	groupTagsSummaryColumns,
	addTagsToGroupOnAddPageColumns,
	groupTypeColumns,
	groupUsersSummaryColumns,
	usersIncludedInGroupOnAddPageColumns,
	usersExcludedFromGroupOnAddPageColumns,
	rolesIncludedInGroupOnAddPageColumns,
	rolesExcludedFromGroupOnAddPageColumns,
	rolesIncludedInGroupOnDescPageColumns,
	rolesExcludedFormGroupOnDescPageColumns,
	usersIncludedInGroupOnDescPageColumns, // 그룹 상세페이지 사용자Tab
	usersExcludedFromGroupOnDescPageColumns, // 그룹 상세페이지 사용자Tab
} from './groups';

// 형식 { key : columns }
export let getColumnsAsKey;

getColumnsAsKey = {
	/* users */
	users: usersColumns,
	addTagsToUserOnAddPage: addTagsToUserOnAddPageColumns, // 사용자 생성페이지 태그 추가
	rolesIncludedInUserOnAddPage: rolesIncludedInUserOnAddPageColumns, // 사용자 생성 페이지 권한 추가 (왼)
	rolesExcludedFromUserOnAddPage: rolesExcludedFromUserOnAddPageColumns, // 사용자 생성 페이지 권한 추가 (오)
	userGroupsSummary: userGroupsSummaryColumns,
	userAuthSummary: userAuthSummaryColumns,
	userRolesSummary: userRolesSummaryColumns,
	userTagsSummary: userTagsSummaryColumns,
	addUsersToGroup: addUsersToGroupColumns,
	groupsIncludedInUserOnAddPageColumns: groupsIncludedInUserOnAddPageColumns,
	groupsExcludedFromUserOnAddPageColumns: groupsExcludedFromUserOnAddPageColumns,

	rolesIncludedInUserOnDescPage: rolesIncludedInUserOnDescPageColumns,
	rolesExcludedFormUserOnDescPage: rolesExcludedFormUserOnDescPageColumns,
	groupsIncludedInUserOnDescPage: groupsIncludedInUserOnDescPageColumns, // 이 사용자의 그룹
	groupsExcludedFromUserOnDescPage: groupsExcludedFromUserOnDescPageColumns, //이 사용자의 다른그룹
	/* groups */
	groups: groupColumns,
	groupTypes: groupTypeColumns,
	addTagsToGroupOnAddPage: addTagsToGroupOnAddPageColumns, // 그룹 생성페이지 태그 추가
	usersIncludedInGroupOnAddPage: usersIncludedInGroupOnAddPageColumns,
	rolesIncludedInGroupOnAddPage: rolesIncludedInGroupOnAddPageColumns,
	rolesExcludedFromGroupOnAddPage: rolesExcludedFromGroupOnAddPageColumns,
	groupUsersSummary: groupUsersSummaryColumns,
	groupRolesSummary: groupRolesSummaryColumns,
	groupTagsSummary: groupTagsSummaryColumns,
	addTagToUserOnDescPage: addTagToUserOnDescPageColumns,
	usersIncludedInGroupOnAddPageColumns: usersIncludedInGroupOnAddPageColumns,
	usersExcludedFromGroupOnAddPageColumns: usersExcludedFromGroupOnAddPageColumns,
	rolesIncludedInGroupOnDescPage: rolesIncludedInGroupOnDescPageColumns,
	rolesExcludedFormGroupOnDescPage: rolesExcludedFormGroupOnDescPageColumns,
	usersIncludedInGroupOnDescPage: usersIncludedInGroupOnDescPageColumns, // 그룹 상세페이지 사용자Tab
	usersExcludedFromGroupOnDescPage: usersExcludedFromGroupOnDescPageColumns, // 그룹 상세페이지 사용자Tab
};
