import {
	USER_ADD_GROUPS_EXCLUDE_COLUMN,
	USER_ADD_GROUPS_INCLUDE_COLUMN,
	USER_ADD_PERMISSTIOMS_COLUMN,
	USER_ADD_ROLES_EXCLUDE_COLUMN,
	USER_ADD_ROLES_INCLUDE_COLUMN,
	USER_ADD_TAG_COLUMN,
	USER_COLUMN,
	USER_SUMMARY_AUTH_COLUMN,
	USER_SUMMARY_GROUP_COLUMN,
	USER_SUMMARY_PERMISSION_COLUMNS,
	USER_SUMMARY_TABS_GROUPS_EXCLUDE_COLUMN,
	USER_SUMMARY_TABS_GROUPS_INCLUDE_COLUMN,
	USER_SUMMARY_TABS_PERMISSIONS_EXCLUDE_COLUMN,
	USER_SUMMARY_TABS_PERMISSIONS_INCLUDE_COLUMN,
	USER_SUMMARY_TABS_ROLES_EXCLUDE_COLUMN,
	USER_SUMMARY_TABS_ROLES_INCLUDE_COLUMN,
	USER_SUMMARY_TABS_TAG_COLUMN,
	USER_SUMMARY_TAG_COLUMN,
} from '../../utils/TableColumns/users';
import {
	GROUP_ADD_ROLES_EXCLUDE_COLUMN,
	GROUP_ADD_ROLES_INCLUDE_COLUMN,
	GROUP_ADD_TAG_COLUMN,
	GROUP_ADD_USERS_EXCLUDE_COLUMN,
	GROUP_ADD_USERS_INCLUDE_COLUMN,
	GROUP_COLUMN,
	GROUP_SUMMARY_PERMISSION_COLUMN,
	GROUP_SUMMARY_TABS_PERMISSION_COLUMN,
	GROUP_SUMMARY_TABS_PERMISSIONS_EXCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_PERMISSIONS_INCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_ROLES_EXCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_ROLES_INCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_TAG_COLUMN,
	GROUP_SUMMARY_TABS_USERS_EXCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_USERS_INCLUDE_COLUMN,
	GROUP_SUMMARY_TAG_COLUMN,
	GROUP_SUMMARY_USER_COLUMN,
	GROUP_TYPE_COLUMN,
} from '../../utils/TableColumns/groups';
import {
	ROLE_ADD_GROUP_EXCLUDE_COLUMN,
	ROLE_ADD_GROUP_INCLUDE_COLUMN,
	ROLE_ADD_POLICIES_EXCLUDE_COLUMN,
	ROLE_ADD_POLICIES_INCLUDE_COLUMN,
	ROLE_ADD_USER_EXCLUDE_COLUMN,
	ROLE_ADD_USER_INCLUDE_COLUMN,
	ROLE_COLUMN,
	ROLE_SUMMARY_GROUP_COLUMN,
	ROLE_SUMMARY_PERMISSION_COLUMN,
	ROLE_SUMMARY_TABS_GROUPS_EXCLUDE_COLUMN,
	ROLE_SUMMARY_TABS_GROUPS_INCLUDE_COLUMN,
	ROLE_SUMMARY_TABS_PERMISSIONS_EXCLUDE_COLUMN,
	ROLE_SUMMARY_TABS_PERMISSIONS_INCLUDE_COLUMN,
	ROLE_SUMMARY_TABS_USERS_EXCLUDE_COLUMN,
	ROLE_SUMMARY_TABS_USERS_INCLUDE_COLUMN,
	ROLE_SUMMARY_USER_COLUMN,
} from '../../utils/TableColumns/roles';
import {
	PAM_TEMPLATE_RESOURCE_ACCESS_COLUMN,
	PAM_TEMPLATE_RESOURCE_COLUMN,
	PAM_TEMPLATE_RESOURCE_GROUP_COLUMN,
	POLICY_ADD_PREVIEW_COLUMN,
	POLICY_ADD_USER_MANAGEMEN_COLUMN,
	POLICY_COLUMN,
	POLICY_SUMMARY_PERMISSION_COLUMN,
	POLICY_SUMMARY_PERMISSION_TAB_COLUMN,
	POLICY_SUMMARY_RERMISSION_COLUMN,
	POLICY_SUMMARY_ROLE_EXCLUDE_COLUMN,
	POLICY_SUMMARY_ROLE_INCLUDE_COLUMN,
	POLICY_SUMMARY_TAG_COLUMN,
	POLICY_SUMMARY_TAG_EXCLUDE_COLUMN,
	POLICY_SUMMARY_TAG_INCLUDE_COLUMN,
} from '../../utils/TableColumns/policies';

export const tableColumns = Object.freeze({
	/**********************************************************************
	 * 사용자
	 **********************************************************************/
	USER: USER_COLUMN, // 기본
	USER_ADD_GROUPS_INCLUDE: USER_ADD_GROUPS_INCLUDE_COLUMN, //submit 되는 테이블 => include
	USER_ADD_GROUPS_EXCLUDE: USER_ADD_GROUPS_EXCLUDE_COLUMN,
	USER_ADD_ROLES_INCLUDE: USER_ADD_ROLES_INCLUDE_COLUMN,
	USER_ADD_ROLES_EXCLUDE: USER_ADD_ROLES_EXCLUDE_COLUMN,
	USER_ADD_PERMISSTIOMS: USER_ADD_PERMISSTIOMS_COLUMN,
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
	USER_SUMMARY_TABS_PERMISSIONS_INCLUDE: USER_SUMMARY_TABS_PERMISSIONS_INCLUDE_COLUMN,
	USER_SUMMARY_TABS_PERMISSIONS_EXCLUDE: USER_SUMMARY_TABS_PERMISSIONS_EXCLUDE_COLUMN,

	/**********************************************************************
	 * 그룹
	 **********************************************************************/
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
	GROUP_SUMMARY_TABS_PERMISSIONS_INCLUDE: GROUP_SUMMARY_TABS_PERMISSIONS_INCLUDE_COLUMN,
	GROUP_SUMMARY_TABS_PERMISSIONS_EXCLUDE: GROUP_SUMMARY_TABS_PERMISSIONS_EXCLUDE_COLUMN,

	/**********************************************************************
	 * 역할
	 **********************************************************************/
	ROLE: ROLE_COLUMN,
	//역할 생성
	ROLE_ADD_POLICIES_INCLUDE: ROLE_ADD_POLICIES_INCLUDE_COLUMN,
	ROLE_ADD_POLICIES_EXCLUDE: ROLE_ADD_POLICIES_EXCLUDE_COLUMN,
	ROLE_ADD_USER_INCLUDE: ROLE_ADD_USER_INCLUDE_COLUMN,
	ROLE_ADD_USER_EXCLUDE: ROLE_ADD_USER_EXCLUDE_COLUMN,
	ROLE_ADD_GROUP_INCLUDE: ROLE_ADD_GROUP_INCLUDE_COLUMN,
	ROLE_ADD_GROUP_EXCLUDE: ROLE_ADD_GROUP_EXCLUDE_COLUMN,
	//역할상세
	ROLE_SUMMARY_PERMISSION: ROLE_SUMMARY_PERMISSION_COLUMN,
	ROLE_SUMMARY_USER: ROLE_SUMMARY_USER_COLUMN,
	ROLE_SUMMARY_GROUP: ROLE_SUMMARY_GROUP_COLUMN,
	ROLE_SUMMARY_PERMISSIONS_INCLUDE: ROLE_SUMMARY_TABS_PERMISSIONS_INCLUDE_COLUMN,
	ROLE_SUMMARY_PERMISSIONS_EXCLUDE: ROLE_SUMMARY_TABS_PERMISSIONS_EXCLUDE_COLUMN,
	ROLE_SUMMARY_POLICIES_INCLUDE: 'ROLE_SUMMARY_POLICIES_INCLUDE_COLUMN',
	ROLE_SUMMARY_POLICIES_EXCLUDE: 'ROLE_SUMMARY_POLICIES_EXCLUDE_COLUMN',
	ROLE_SUMMARY_USERS_INCLUDE: ROLE_SUMMARY_TABS_USERS_INCLUDE_COLUMN,
	ROLE_SUMMARY_USERS_EXCLUDE: ROLE_SUMMARY_TABS_USERS_EXCLUDE_COLUMN,
	ROLE_SUMMARY_GROUPS_INCLUDE: ROLE_SUMMARY_TABS_GROUPS_INCLUDE_COLUMN,
	ROLE_SUMMARY_GROUPS_EXCLUDE: ROLE_SUMMARY_TABS_GROUPS_EXCLUDE_COLUMN,

	// policy and permission
	policyAndPermission: {}, // 아직 설계 없음. 우선 네이밍 저렇게 할게요..
	/**********************************************************************
	 * 정책
	 **********************************************************************/
	POLICY: POLICY_COLUMN,

	//정책 생성
	POLICY_ADD_PREVIEW: POLICY_ADD_PREVIEW_COLUMN,
	//정책 상세
	POLICY_SUMMARY_PERMISSION: POLICY_SUMMARY_PERMISSION_COLUMN,
	POLICY_SUMMARY_ROLE: POLICY_SUMMARY_RERMISSION_COLUMN,
	POLICY_SUMMARY_TAG: POLICY_SUMMARY_TAG_COLUMN,
	POLICY_SUMMARY_PERMISSION_TAB: POLICY_SUMMARY_PERMISSION_TAB_COLUMN,
	POLICY_SUMMARY_ROLE_INCLUDE: POLICY_SUMMARY_ROLE_INCLUDE_COLUMN,
	POLICY_SUMMARY_ROLE_EXCLUDE: POLICY_SUMMARY_ROLE_EXCLUDE_COLUMN,
	POLICY_SUMMARY_TAG_INCLUDE: POLICY_SUMMARY_TAG_INCLUDE_COLUMN,
	POLICY_SUMMARY_TAG_EXCLUDE: POLICY_SUMMARY_TAG_EXCLUDE_COLUMN,
	// policy
	POLICY_ADD_USER_MANAGEMENT: POLICY_ADD_USER_MANAGEMEN_COLUMN,
	// POLICY_ADD_POLICY_MANAGEMENT: POLICY_ADD_POLICY_MANAGEMENT_COLUMN,
	// POLICY_ADD_ROLE_MANAGEMENT: POLICY_ADD_ROLE_MANAGEMENT_COLUMN,

	// permission
	//policy template
	PAM_TEMPLATE_RESOURCE_GROUP: PAM_TEMPLATE_RESOURCE_GROUP_COLUMN,
	PAM_TEMPLATE_RESOURCE: PAM_TEMPLATE_RESOURCE_COLUMN,
	PAM_TEMPLATE_RESOURCE_ACCESS: PAM_TEMPLATE_RESOURCE_ACCESS_COLUMN,
});
