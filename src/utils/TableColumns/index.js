import {addTagsToUserColumns, usersColumns} from './users';
import {addUsersToGroupColumns, groupColumns, groupTypeColumns} from './groups';

// columnsAsType 형식 { key : columns }
export const getColumnsAsKey = {
	/* users */
	users: usersColumns,
	addTagsToUser: addTagsToUserColumns,
	/* groups */
	groups: groupColumns,
	groupTypes: groupTypeColumns,
	addUsersToGroup: addUsersToGroupColumns,
};
