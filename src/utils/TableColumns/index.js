import {
	addTagsToUserColumns,
	usersColumns,
	groupsIncludedInUserOnAddPageColumns,
	groupsExcludedFromUserOnAddPageColumns,
} from './users';
import {addUsersToGroupColumns, groupColumns, groupTypeColumns} from './groups';

// 형식 { key : columns }
export const getColumnsAsKey = {
	/* users */
	users: usersColumns,
	addTagsToUser: addTagsToUserColumns,
	groupsIncludedInUserOnAddPageColumns: groupsIncludedInUserOnAddPageColumns,
	groupsExcludedFromUserOnAddPageColumns: groupsExcludedFromUserOnAddPageColumns,
	/* groups */
	groups: groupColumns,
	groupTypes: groupTypeColumns,
	addUsersToGroup: addUsersToGroupColumns,
};
