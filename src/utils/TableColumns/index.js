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
} from './users';
import {
	groupColumns,
	groupTypeColumns,
	usersIncludedInGroupOnAddPageColumns,
} from './groups';

// 형식 { key : columns }
export let getColumnsAsKey;
getColumnsAsKey = {
	/* users */
	users: usersColumns,
	addTagsToUserOnAddPage: addTagsToUserOnAddPageColumns,
	addTagsToUser: addTagsToUserColumns,
	rolesIncludedInUserOnAddPage: rolesIncludedInUserOnAddPageColumns,
	rolesExcludedFromUserOnAddPage: rolesExcludedFromUserOnAddPageColumns,
	userGroupsSummary: userGroupsSummaryColumns,
	userAuthSummary: userAuthSummaryColumns,
	userRolesSummary: userRolesSummaryColumns,
	userTagsSummary: userTagsSummaryColumns,
	/* groups */
	groups: groupColumns,
	groupTypes: groupTypeColumns,
	usersIncludedInGroupOnAddPage: usersIncludedInGroupOnAddPageColumns,
};
