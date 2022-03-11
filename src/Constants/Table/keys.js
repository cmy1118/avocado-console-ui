import UserManagement from '../../components/IAM/Policy/Components/Templates/IAM/UserManagement';

export const DRAGGABLE_KEY = 'keyId';
export const tableKeys = Object.freeze({
	/*******************************************************************
	 * 사용자 테이블키
	 *******************************************************************/
	users: {
		basic: 'USER', // 기본
		add: {
			groups: {
				include: 'USER_ADD_GROUPS_INCLUDE',
				exclude: 'USER_ADD_GROUPS_EXCLUDE',
				dnd: 'USER_ADD_GROUPS_DND',
			},
			roles: {
				include: 'USER_ADD_ROLES_INCLUDE',
				exclude: 'USER_ADD_ROLES_EXCLUDE',
				dnd: 'USER_ADD_ROLES_DND',
			},
			permissions: 'USER_ADD_PERMISSTIOMS',
			tag: 'USER_ADD_TAG',
		},
		summary: {
			group: 'USER_SUMMARY_GROUP',
			auth: 'USER_SUMMARY_AUTH',
			permission: 'USER_SUMMARY_PERMISSION',
			tag: 'USER_SUMMARY_TAG',
			tabs: {
				groups: {
					include: 'USER_SUMMARY_TABS_GROUPS_INCLUDE',
					exclude: 'USER_SUMMARY_TABS_GROUPS_EXCLUDE',
					dnd: 'USER_SUMMARY_TABS_GROUPS_DND',
				},
				roles: {
					include: 'USER_SUMMARY_TABS_ROLES_INCLUDE',
					exclude: 'USER_SUMMARY_TABS_ROLES_EXCLUDE',
					dnd: 'USER_SUMMARY_TABS_ROLES_DND',
				},
				tags: {
					basic: 'USER_SUMMARY_TABS_TAG',
					permissions: {
						include: 'USER_SUMMARY_TABS_PERMISSIONS_INCLUDE',
						exclude: 'USER_SUMMARY_TABS_PERMISSIONS_EXCLUDE',
					},
				},
			},
		},
	},
	/*******************************************************************
	 * 그룹 테이블키
	 *******************************************************************/
	groups: {
		basic: 'GROUP',
		type: 'GROUP_TYPE',
		add: {
			users: {
				include: 'GROUP_ADD_USERS_INCLUDE',
				exclude: 'GROUP_ADD_USERS_EXCLUDE',
				dnd: 'GROUP_ADD_USERS_DND',
			},
			roles: {
				include: 'GROUP_ADD_ROLES_INCLUDE',
				exclude: 'GROUP_ADD_ROLES_EXCLUDE',
				dnd: 'GROUP_ADD_ROLES_DND',
			},
			tag: 'GROUP_ADD_TAG',
		},
		summary: {
			user: 'GROUP_SUMMARY_USER',
			permission: 'GROUP_SUMMARY_PERMISSION',
			tag: 'GROUP_SUMMARY_TAG',
			tabs: {
				users: {
					include: 'GROUP_SUMMARY_TABS_USERS_INCLUDE',
					exclude: 'GROUP_SUMMARY_TABS_USERS_EXCLUDE',
					dnd: 'GROUP_SUMMARY_TABS_USERS_DND',
				},
				roles: {
					include: 'GROUP_SUMMARY_TABS_ROLES_INCLUDE',
					exclude: 'GROUP_SUMMARY_TABS_ROLES_EXCLUDE',
					dnd: 'GROUP_SUMMARY_TABS_ROLES_DND',
				},
				tags: {
					basic: 'GROUP_SUMMARY_TABS_TAG',
					permissions: {
						include: 'GROUP_SUMMARY_TABS_PERMISSIONS_INCLUDE',
						exclude: 'GROUP_SUMMARY_TABS_PERMISSIONS_EXCLUDE',
					},
				},
			},
		},
	},
	/*******************************************************************
	 * 역할 테이블키
	 *******************************************************************/
	roles: {
		basic: 'ROLE',
		add: {
			policies: {
				include: 'ROLE_ADD_POLICIES_INCLUDE',
				exclude: 'ROLE_ADD_POLICIES_EXCLUDE',
			},
			users: {
				include: 'ROLE_ADD_USER_INCLUDE',
				exclude: 'ROLE_ADD_USER_EXCLUDE',
			},
			groups: {
				include: 'ROLE_ADD_GROUP_INCLUDE',
				exclude: 'ROLE_ADD_GROUP_EXCLUDE',
			},
		},
		summary: {
			permission: 'ROLE_SUMMARY_PERMISSION',
			user: 'ROLE_SUMMARY_USER',
			group: 'ROLE_SUMMARY_GROUP',
			tabs: {
				permissions: {
					include: 'ROLE_SUMMARY_PERMISSIONS_INCLUDE',
					exclude: 'ROLE_SUMMARY_PERMISSIONS_EXCLUDE',
				},
				users: {
					include: 'ROLE_SUMMARY_USERS_INCLUDE',
					exclude: 'ROLE_SUMMARY_USERS_EXCLUDE',
				},
				groups: {
					include: 'ROLE_SUMMARY_GROUPS_INCLUDE',
					exclude: 'ROLE_SUMMARY_GROUPS_EXCLUDE',
				},
			},
		},
	},
	/*******************************************************************
	 * 정책 테이블키
	 *******************************************************************/
	policy: {
		basic: 'POLICY',
		policies: {
			userManagement: 'POLICY_ADD_USER_MANAGEMENT',
			policyManagement: 'POLICY_ADD_POLICY_MANAGEMENT',
			roleManagement: 'POLICY_ADD_ROLE_MANAGEMENT',
		},
	},
	summary: {},
});
