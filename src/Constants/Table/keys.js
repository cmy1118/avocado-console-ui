export const tableKeys = Object.freeze({
	users: {
		basic: 'USER', // 기본
		add: {
			groups: {
				include: 'USER_ADD_GROUPS_INCLUDE',
				exclude: 'USER_ADD_GROUPS_EXCLUDE', // submit 되는 테이블
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
					permission: 'USER_SUMMARY_TABS_PERMISSION',
				},
			},
		},
	},
	groups: {
		basic: 'GROUP',
		add: {
			type: 'GROUP_ADD_TYPE',
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
					permission: 'GROUP_SUMMARY_TABS_PERMISSION',
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
			tabs: {}, // 아직 설계없음.
		},
	},
	policyAndPermission: {}, // 아직 설계 없음. 우선 네이밍 저렇게 할게요..
});
