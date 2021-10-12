import {
	addTagsToUserColumns,
	usersColumns,
	groupsIncludedInUserOnAddPageColumns,
} from './users';
import {addUsersToGroupColumns, groupColumns, groupTypeColumns} from './groups';

// 형식 { key : columns }
export const getColumnsAsKey = {
	/* users */
	users: usersColumns,
	addTagsToUser: addTagsToUserColumns,
	groupsIncludedInUserOnAddPageColumns: groupsIncludedInUserOnAddPageColumns,
	/* groups */
	groups: groupColumns,
	groupTypes: groupTypeColumns,
	addUsersToGroup: addUsersToGroupColumns,
};
