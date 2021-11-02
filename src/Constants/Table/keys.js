export const tableKeys = Object.freeze({
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
					permissions: {},
				},
			},
		},
	},
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
					permissions: {},
				},
			},
		},
	},
	roles: {
		basic: 'ROLE',
		add: {
			policies: {
				include: 'ROLE_ADD_POLICIES_INCLUDE',
				exclude: 'ROLE_ADD_POLICIES_EXCLUDE',
			},
			permissions: {
				include: 'ROLE_ADD_PERMISSIONS_INCLUDE',
				exclude: 'ROLE_ADD_PERMISSIONS_EXCLUDE',
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
	policyAndPermission: {}, // 아직 설계 없음. 우선 네이밍 저렇게 할게요..
});
