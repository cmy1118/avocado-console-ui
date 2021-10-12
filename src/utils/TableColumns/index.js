import {addTagsToUserOnAddPageColumns, usersColumns} from './users';
import {
	usersIncludedInGroupOnAddPageColumns,
	groupColumns,
	groupTypeColumns,
} from './groups';

// 형식 { key : columns }
export const getColumnsAsKey = {
	/* users */
	users: usersColumns,
	addTagsToUserOnAddPage: addTagsToUserOnAddPageColumns,
	/* groups */
	groups: groupColumns,
	groupTypes: groupTypeColumns,
	usersIncludedInGroupOnAddPage: usersIncludedInGroupOnAddPageColumns,
};
