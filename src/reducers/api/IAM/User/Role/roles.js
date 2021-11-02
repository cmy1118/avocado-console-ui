import {createSelector, createSlice} from '@reduxjs/toolkit';

const NAME = 'IAM_ROLES';

const slice = createSlice({
	name: NAME,
	initialState: {
		roleIndex: 0,
		roles: [
			{
				id: 'role1',
				name: 'manager-role',
				description:
					'사용자 레벨의 최고 관리자인 Manager에게 부여된 역할 (기본 제공)',
				companyId: null,
				users: ['user1', 'user2'],
				groups: ['group1', 'group2'],
				policies: ['policy1', 'policy2', 'policy3'],
				creationDate: '2019.06.12 13:35:39',
			},
			{
				id: 'role2',
				name: 'admin-role',
				description: 'Admin 사용자에게 부여 하는 역할',
				companyId: null,
				users: ['user1', 'user2'],
				groups: ['group1'],
				policies: ['policy1', 'policy2'],
				creationDate: '2019.06.12 13:38:10',
			},
			{
				id: 'role3',
				name: 'user-role',
				description: '일반 User에게 부여 하는 역할',
				users: [],
				groups: ['group4'],
				companyId: null,
				policies: [
					'policy1',
					'policy2',
					'policy3',
					'policy4',
					'policy5',
					'policy6',
					'policy7',
				],
				creationDate: '2019.06.13 10:02:15',
			},
			{
				id: 'role4',
				name: 'guest-role',
				description: 'Guest 사용자에게 부여하는 역할',
				companyId: null,
				users: ['user2'],
				groups: ['group4'],
				policies: [
					'policy1',
					'policy2',
					'policy3',
					'policy4',
					'policy5',
				],
				creationDate: '2020.02.14 18:04:08',
			},
			{
				id: 'role5',
				name: 'developerOnly-role',
				description: '개발자에게 부여하기 위한 기본 역할',
				companyId: null,
				users: ['user3'],
				groups: ['group3', 'group4'],
				policies: ['policy1'],
				creationDate: '2020.04.21 17:51:29',
			},
			{
				id: 'role6',
				name: 'operation-role',
				description: '운영자에게 부여하기 위한 기본 역할',
				companyId: null,
				users: ['user3'],
				groups: ['group2', 'group3'],
				policies: [],
				creationDate: '2020.12.07 13:10:41',
			},
		],
	},
	reducers: {
		addRolesToUser: (state, action) => {
			const roles = state.roles.filter((v) =>
				action.payload.roles.includes(v.id),
			);

			roles.map((v) => {
				v.users.push(action.payload.uid);
				return v;
			});
		},

		deleteRolesFromUser: (state, action) => {
			const roles = state.roles.filter((v) =>
				action.payload.roles.includes(v.id),
			);

			roles.map((v) => {
				const index = v.users.findIndex(
					(val) => val === action.payload.uid,
				);
				v.users.splice(index, 1);
				return v;
			});
		},

		addRolesToGroup: (state, action) => {
			const roles = state.roles.filter((v) =>
				action.payload.roles.includes(v.id),
			);

			roles.map((v) => {
				v.groups.push(action.payload.id);
				return v;
			});
		},

		deleteRolesFromGroup: (state, action) => {
			const roles = state.roles.filter((v) =>
				action.payload.roles.includes(v.id),
			);

			roles.map((v) => {
				const index = v.groups.findIndex(
					(val) => val === action.payload.id,
				);
				v.groups.splice(index, 1);
				return v;
			});
		},
	},
});

const selectAllState = createSelector(
	(state) => state.roles,
	(roles) => {
		return {
			roles,
		};
	},
);

const IAM_ROLES = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
};

export default IAM_ROLES;
