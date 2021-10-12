import {
	addTagsToUserColumns,
	rolesExcludedFromUserOnAddPageColumns,
	rolesIncludedInUserOnAddPageColumns,
	usersColumns,
} from './users';
import {addUsersToGroupColumns, groupColumns, groupTypeColumns} from './groups';

// 형식 { key : columns }
export const getColumnsAsKey = {
	/* users */
	users: usersColumns,
	addTagsToUser: addTagsToUserColumns,
	rolesIncludedInUserOnAddPage: rolesIncludedInUserOnAddPageColumns,
	rolesExcludedFromUserOnAddPage: rolesExcludedFromUserOnAddPageColumns,
	/* groups */
	groups: groupColumns,
	groupTypes: groupTypeColumns,
	addUsersToGroup: addUsersToGroupColumns,
};
