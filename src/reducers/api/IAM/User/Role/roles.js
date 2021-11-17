import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../../../../api/constants';

const NAME = 'IAM_ROLES';

const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;
		// eslint-disable-next-line no-console
		const response = await axios.post(
			`/open-api/v1/iam/users`,
			{
				id: payload.id,
				name: payload.name,
				password: payload.password,
				email: payload.email,
				telephone: payload.telephone,
				mobile: payload.mobile,
			},
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

const findRolesByIdsAction = createAsyncThunk(
	`${NAME}/FIND_ROLES_BY_ID`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;

		const response = await axios.get(
			`/open-api/v1/pam/roles/${payload.id}`,
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

const GetAllRolesAction = createAsyncThunk(
	`${NAME}/GET_ALL_ROLES`,
	async (payload, {getState}) => {
		//로그인 처리
		const {user} = getState().AUTH_USER;

		const response = await axios.get(`/open-api/v1/pam/roles`, {
			params: {
				name: payload.name || null,
				ids: payload.ids || null,
			},
			headers: {
				Authorization: `${user.token_type} ${user.access_token}`,
				Range: payload.range,
			},
			baseURL: baseUrl.openApi,
		});
		return response.data;
	},
);

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
				type: 'Public',
				companyId: null,
				users: ['user1', 'user2', 'user5', 'user10'],
				groups: ['group1', 'group9'],
				policies: ['policy1', 'policy2', 'policy3'],
				creationDate: '2019.01.02 11:32:29',
			},
			{
				id: 'role2',
				name: 'admin-role',
				description: 'Admin 사용자에게 부여 하는 역할',
				type: 'Public',
				companyId: null,
				users: ['user1', 'user2', 'user7'],
				groups: ['group1'],
				policies: ['policy1', 'policy2'],
				creationDate: '2019.01.04 15:12:40',
			},
			{
				id: 'role3',
				name: 'user-role',
				description: '일반 User에게 부여 하는 역할',
				type: 'Public',
				users: ['user3', 'user8', 'user9', 'user10'],
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
				creationDate: '2019.07.22 16:26:12',
			},
			{
				id: 'role4',
				name: 'guest-role',
				description: 'Guest 사용자에게 부여하는 역할',
				type: 'Public',
				companyId: null,
				users: ['user2', 'user9'],
				groups: ['group4'],
				policies: [
					'policy1',
					'policy2',
					'policy3',
					'policy4',
					'policy5',
				],
				creationDate: '2021.02.21 20:05:48',
			},
			{
				id: 'role5',
				name: 'developerOnly-role',
				description: '개발자에게 부여하기 위한 기본 역할',
				type: 'Private',
				companyId: null,
				users: ['user3'],
				groups: ['group3', 'group6'],
				policies: ['policy1'],
				creationDate: '2020.06.16 19:43:29',
			},
			{
				id: 'role6',
				name: 'operation-role',
				description: '운영자에게 부여하기 위한 기본 역할',
				type: 'Public',
				companyId: null,
				users: ['user3', 'user5', 'user7'],
				groups: ['group2', 'group8'],
				policies: [],
				creationDate: '2021.08.07 09:41:23',
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
	extraReducers: {
		[findRolesByIdsAction.pending]: (state) => {
			state.loading = true;
		},
		[findRolesByIdsAction.fulfilled]: (state, action) => {
			state.users = action.payload;
			state.loading = false;
		},
		[findRolesByIdsAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[GetAllRolesAction.pending]: (state) => {
			state.loading = true;
		},
		[GetAllRolesAction.fulfilled]: (state, action) => {
			state.users = action.payload;
			state.loading = false;
		},
		[GetAllRolesAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
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
	asyncAction: {
		findRolesByIdsAction,
		GetAllRolesAction,
	},
};

export default IAM_ROLES;
