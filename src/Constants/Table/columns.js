import {
	USER_ADD_GROUPS_EXCLUDE_COLUMN,
	USER_ADD_GROUPS_INCLUDE_COLUMN,
	USER_ADD_ROLES_EXCLUDE_COLUMN,
	USER_ADD_ROLES_INCLUDE_COLUMN,
	USER_ADD_TAG_COLUMN,
	USER_COLUMN,
	USER_SUMMARY_AUTH_COLUMN,
	USER_SUMMARY_GROUP_COLUMN,
	USER_SUMMARY_PERMISSION_COLUMNS,
	USER_SUMMARY_TABS_GROUPS_EXCLUDE_COLUMN,
	USER_SUMMARY_TABS_GROUPS_INCLUDE_COLUMN,
	USER_SUMMARY_TABS_PERMISSION_COLUMN,
	USER_SUMMARY_TABS_ROLES_EXCLUDE_COLUMN,
	USER_SUMMARY_TABS_ROLES_INCLUDE_COLUMN,
	USER_SUMMARY_TABS_TAG_COLUMN,
	USER_SUMMARY_TAG_COLUMN,
} from '../../utils/TableColumns/users';
import {
	GROUP_ADD_ROLES_EXCLUDE_COLUMN,
	GROUP_ADD_ROLES_INCLUDE_COLUMN,
	GROUP_ADD_TAG_COLUMN,
	GROUP_TYPE_COLUMN,
	GROUP_ADD_USERS_EXCLUDE_COLUMN,
	GROUP_ADD_USERS_INCLUDE_COLUMN,
	GROUP_COLUMN,
	GROUP_SUMMARY_PERMISSION_COLUMN,
	GROUP_SUMMARY_TABS_PERMISSION_COLUMN,
	GROUP_SUMMARY_TABS_ROLES_EXCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_ROLES_INCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_TAG_COLUMN,
	GROUP_SUMMARY_TABS_USERS_EXCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_USERS_INCLUDE_COLUMN,
	GROUP_SUMMARY_TAG_COLUMN,
	GROUP_SUMMARY_USER_COLUMN,
} from '../../utils/TableColumns/groups';
import {
	ROLE_COLUMN,
	ROLE_SUMMARY_GROUP_COLUMN,
	ROLE_SUMMARY_GROUPS_EXCLUDE_COLUMN,
	ROLE_SUMMARY_GROUPS_INCLUDE_COLUMN,
	ROLE_SUMMARY_PERMISSION_COLUMN,
	ROLE_SUMMARY_PERMISSIONS_EXCLUDE_COLUMN,
	ROLE_SUMMARY_PERMISSIONS_INCLUDE_COLUMN,
	ROLE_SUMMARY_USER_COLUMN,
	ROLE_SUMMARY_USERS_EXCLUDE_COLUMN,
	ROLE_SUMMARY_USERS_INCLUDE_COLUMN,
} from '../../utils/TableColumns/roles';

export const tableColumns = Object.freeze({
	// user
	USER: USER_COLUMN, // 기본
	USER_ADD_GROUPS_INCLUDE: USER_ADD_GROUPS_INCLUDE_COLUMN, //submit 되는 테이블 => include
	USER_ADD_GROUPS_EXCLUDE: USER_ADD_GROUPS_EXCLUDE_COLUMN,
	USER_ADD_ROLES_INCLUDE: USER_ADD_ROLES_INCLUDE_COLUMN,
	USER_ADD_ROLES_EXCLUDE: USER_ADD_ROLES_EXCLUDE_COLUMN,
	USER_ADD_TAG: USER_ADD_TAG_COLUMN,
	USER_SUMMARY_GROUP: USER_SUMMARY_GROUP_COLUMN,
	USER_SUMMARY_AUTH: USER_SUMMARY_AUTH_COLUMN,
	USER_SUMMARY_PERMISSION: USER_SUMMARY_PERMISSION_COLUMNS,
	USER_SUMMARY_TAG: USER_SUMMARY_TAG_COLUMN,
	USER_SUMMARY_TABS_GROUPS_INCLUDE: USER_SUMMARY_TABS_GROUPS_INCLUDE_COLUMN,
	USER_SUMMARY_TABS_GROUPS_EXCLUDE: USER_SUMMARY_TABS_GROUPS_EXCLUDE_COLUMN,
	USER_SUMMARY_TABS_ROLES_INCLUDE: USER_SUMMARY_TABS_ROLES_INCLUDE_COLUMN,
	USER_SUMMARY_TABS_ROLES_EXCLUDE: USER_SUMMARY_TABS_ROLES_EXCLUDE_COLUMN,
	USER_SUMMARY_TABS_TAG: USER_SUMMARY_TABS_TAG_COLUMN,
	USER_SUMMARY_TABS_PERMISSION: USER_SUMMARY_TABS_PERMISSION_COLUMN,

	// group
	GROUP: GROUP_COLUMN,
	GROUP_TYPE: GROUP_TYPE_COLUMN,
	GROUP_ADD_USERS_INCLUDE: GROUP_ADD_USERS_INCLUDE_COLUMN,
	GROUP_ADD_USERS_EXCLUDE: GROUP_ADD_USERS_EXCLUDE_COLUMN,
	GROUP_ADD_ROLES_INCLUDE: GROUP_ADD_ROLES_INCLUDE_COLUMN,
	GROUP_ADD_ROLES_EXCLUDE: GROUP_ADD_ROLES_EXCLUDE_COLUMN,
	GROUP_ADD_TAG: GROUP_ADD_TAG_COLUMN,
	GROUP_SUMMARY_USER: GROUP_SUMMARY_USER_COLUMN,
	GROUP_SUMMARY_PERMISSION: GROUP_SUMMARY_PERMISSION_COLUMN,
	GROUP_SUMMARY_TAG: GROUP_SUMMARY_TAG_COLUMN,
	GROUP_SUMMARY_TABS_USERS_INCLUDE: GROUP_SUMMARY_TABS_USERS_INCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_USERS_EXCLUDE: GROUP_SUMMARY_TABS_USERS_EXCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_ROLES_INCLUDE: GROUP_SUMMARY_TABS_ROLES_INCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_ROLES_EXCLUDE: GROUP_SUMMARY_TABS_ROLES_EXCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_TAG: GROUP_SUMMARY_TABS_TAG_COLUMN,
	GROUP_SUMMARY_TABS_PERMISSION: GROUP_SUMMARY_TABS_PERMISSION_COLUMN,

	// roles
	ROLE: ROLE_COLUMN,
	ROLE_ADD_POLICIES_INCLUDE: 'ROLE_ADD_POLICIES_INCLUDE',
	ROLE_ADD_POLICIES_EXCLUDE: 'ROLE_ADD_POLICIES_EXCLUDE',
	ROLE_ADD_PERMISSIONS_INCLUDE: 'ROLE_ADD_PERMISSIONS_INCLUDE',
	ROLE_ADD_PERMISSIONS_EXCLUDE: 'ROLE_ADD_PERMISSIONS_EXCLUDE',
	ROLE_SUMMARY_PERMISSION: ROLE_SUMMARY_PERMISSION_COLUMN,
	ROLE_SUMMARY_USER: ROLE_SUMMARY_USER_COLUMN,
	ROLE_SUMMARY_GROUP: ROLE_SUMMARY_GROUP_COLUMN,
	ROLE_SUMMARY_PERMISSIONS_INCLUDE: ROLE_SUMMARY_PERMISSIONS_INCLUDE_COLUMN,
	ROLE_SUMMARY_PERMISSIONS_EXCLUDE: ROLE_SUMMARY_PERMISSIONS_EXCLUDE_COLUMN,
	ROLE_SUMMARY_POLICIES_INCLUDE: 'ROLE_SUMMARY_POLICIES_INCLUDE_COLUMN',
	ROLE_SUMMARY_POLICIES_EXCLUDE: 'ROLE_SUMMARY_POLICIES_EXCLUDE_COLUMN',
	ROLE_SUMMARY_USERS_INCLUDE: ROLE_SUMMARY_USERS_INCLUDE_COLUMN,
	ROLE_SUMMARY_USERS_EXCLUDE: ROLE_SUMMARY_USERS_EXCLUDE_COLUMN,
	ROLE_SUMMARY_GROUPS_INCLUDE: ROLE_SUMMARY_GROUPS_INCLUDE_COLUMN,
	ROLE_SUMMARY_GROUPS_EXCLUDE: ROLE_SUMMARY_GROUPS_EXCLUDE_COLUMN,

	// policy and permission
	policyAndPermission: {}, // 아직 설계 없음. 우선 네이밍 저렇게 할게요..
});
