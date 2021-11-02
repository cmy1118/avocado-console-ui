import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../../../../api/constants';

const NAME = 'IAM_USER_GROUP';

//todo : this function requires id, companyId, name, password, email, telephone and mobile
const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {client} = getState().client;
		// eslint-disable-next-line no-console
		console.log(client);
		const response = await axios.post(
			`/open/api/v1/users`,
			{
				id: payload.id,
				companyId: payload.companyId,
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
//todo : this function requires uid, name and password
const updateAction = createAsyncThunk(
	`${NAME}/UPDATE`,
	async (payload, {getState}) => {
		const {client} = getState().client;

		const response = await axios.put(
			`/open/api/v1/users/${payload.uid}`,
			{
				name: payload.name,
				password: payload.password,
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

//todo : this function requires uid
const deleteAction = createAsyncThunk(
	`${NAME}/DELETE`,
	async (payload, {getState}) => {
		const {client} = getState().client;

		const response = await axios.delete(
			`/open/api/v1/users/${payload.uid}`,
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires id
const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload, {getState}) => {
		const {client} = getState().client;

		const response = await axios.get(
			`/open/api/v1/users/id/${payload.id}`,
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires uid
const findByUidAction = createAsyncThunk(
	`${NAME}/FIND_BY_UID`,
	async (payload, {getState}) => {
		const {client} = getState().client;

		const response = await axios.get(`/open/api/v1/users/${payload.uid}`, {
			headers: {
				Authorization: `${client.token_type} ${client.access_token}`,
			},
			baseURL: baseUrl.openApi,
		});
		return response.data;
	},
);

//todo : this function requires companyId, first range and last range
const findAllAction = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {client} = getState().client;

		const response = await axios.get(`/open/api/v1/users`, {
			params: {
				companyId: payload.companyId,
			},
			headers: {
				Authorization: `${client.token_type} ${client.access_token}`,
				Range: `elements=${payload.first}-${payload.last}`,
			},
			baseURL: baseUrl.openApi,
		});
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		//groups, authType, MFA, tags, lastConsoleLogin, creationDate는 다른 곳으로 빠질 예정 => 아직 다른 부분 생성 전이라 users에 추가
		// clientGroupTypeId => userGroupTypeId
		index: 0,
		groups: [
			{
				id: 'group1',
				name: 'Manager',
				clientGroupTypeId: 'groupType1',
				members: ['user2', 'user9'],
				roles: ['role1', 'role6', 'user6'],
				parentId: null,
				path: '/group1',
				creationDate: '2020.04.12 20:00:01',
				tags: [
					{name: 'level', value: 'Admin', permissions: []},
					{name: 'type', value: 'white', permissions: [1, 2, 3]},
				],
			},
			{
				id: 'group2',
				name: 'Admin',
				clientGroupTypeId: 'groupType1',
				members: ['user4', 'user3', 'user5'],
				roles: ['role5', 'role6'],
				parentId: null,
				path: '/group2',
				creationDate: '2019.02.13 15:55:32',
				tags: [
					{name: 'level', value: 'Admin', permissions: []},
					{name: 'type', value: 'white', permissions: [1, 2, 3]},
				],
			},
			{
				id: 'group3',
				name: 'User',
				clientGroupTypeId: 'groupType1',
				members: ['user10'],
				roles: ['role1', 'role2'],
				parentId: null,
				path: '/group3',
				creationDate: '2019.09.26 14:07:15',
				tags: [
					{name: 'level', value: 'Admin', permissions: []},
					{name: 'type', value: 'white', permissions: [1, 2]},
				],
			},
			{
				id: 'group4',
				name: 'Guest',
				clientGroupTypeId: 'groupType1',
				members: ['user1', 'user7', 'user8'],
				roles: ['role1', 'role2'],
				parentId: null,
				path: '/group4',
				creationDate: '2020.07.06 19:04:04',
				tags: [],
			},
			{
				id: 'group5',
				name: 'Develop',
				clientGroupTypeId: 'groupType2',
				members: ['user2', 'user3'],
				roles: ['role3', 'role4', 'role5'],
				parentId: null,
				path: '/group5',
				creationDate: '2020.07.15 14:17:59',
				tags: [
					{name: 'level', value: 'Admin', permissions: []},
					{name: 'type', value: 'white', permissions: [1, 2, 3]},
				],
			},
			{
				id: 'group6',
				name: 'Operation',
				clientGroupTypeId: 'groupType2',
				members: ['user4', 'user5', 'user6', 'user9'],
				roles: [],
				parentId: null,
				path: '/group6',
				creationDate: '2020.09.24 18:13:12',
				tags: [{name: 'level', value: 'Admin', permissions: []}],
			},
			{
				id: 'group7',
				name: 'CTL',
				clientGroupTypeId: 'groupType3',
				members: ['user4'],
				roles: [],
				parentId: null,
				path: '/group7',
				creationDate: '2020.09.02 13:06:11',
				tags: [],
			},
			{
				id: 'group8',
				name: 'Back',
				clientGroupTypeId: 'groupType3',
				members: ['user3'],
				roles: [],
				parentId: 'group7',
				path: '/group7/group8',
				creationDate: '2020.09.02 13:16:24',
				tags: [],
			},
			{
				id: 'group9',
				name: 'Front',
				clientGroupTypeId: 'groupType3',
				members: ['user2'],
				roles: [],
				parentId: 'group7',
				path: '/group7/group9',
				creationDate: '2021.01.11 09:25:06',
				tags: [],
			},
		],
		byId: {
			'KR-2020-0001:001:003': {
				name: '그룹 2',
				userGroupTypeId: 'KR-2020-0001:001',
				parentId: 'KR-2020-0001:001:002',
				path: '001/002/003',
			},
		},
		loading: false,
		error: null,
	},
	reducers: {
		addGroup: (state, action) => {
			state.groups.unshift({
				id: 'group_' + state.index.toString(),
				name: action.payload.name,
				clientGroupTypeId: action.payload.type,
				members: [],
				roles: [],
				parentId: null,
				creationDate: new Date().toLocaleString(),
			});
			state.index++;
		},
		//사용자 상세 권한 Tap
		addRolesToGroup: (state, action) => {
			const group = state.groups.find((v) => v.id === action.payload.id);

			group.roles = group.roles.concat(action.payload.roles);
		},

		deleteRolesFromGroup: (state, action) => {
			const group = state.groups.find((v) => v.id === action.payload.id);

			group.roles = group.roles.filter(
				(v) => !action.payload.roles.includes(v),
			);
		},
		//그룹 상세 상용자Tab

		addUsersToGroup: (state, action) => {
			const group = state.groups.find((v) => v.id === action.payload.id);

			group.members = group.members.concat(action.payload.users);
		},

		deleteUsersFromGroup: (state, action) => {
			const group = state.groups.find((v) => v.id === action.payload.id);

			group.members = group.members.filter(
				(v) => !action.payload.users.includes(v),
			);
		},
		//사용자 상세 그룹Tap
		addGroupsToUser: (state, action) => {
			const group = state.groups.filter((v) =>
				action.payload.groups.includes(v.id),
			);

			group.map((v) => {
				v.members.push(action.payload.uid);
				return v;
			});
		},
		deleteGroupsFromUser: (state, action) => {
			const group = state.groups.filter((v) =>
				action.payload.groups.includes(v.id),
			);
			group.map((v) => {
				const index = v.members.findIndex(
					(val) => val === action.payload.uid,
				);
				v.members.splice(index, 1);
				return v;
			});
		},
	},
	extraReducers: {
		[createAction.pending]: (state) => {
			state.loading = true;
		},
		[createAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[createAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[updateAction.pending]: (state) => {
			state.loading = true;
		},
		[updateAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[updateAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[deleteAction.pending]: (state) => {
			state.loading = true;
		},
		[deleteAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[deleteAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findByIdAction.pending]: (state) => {
			state.loading = true;
		},
		[findByIdAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[findByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findByUidAction.pending]: (state) => {
			state.loading = true;
		},
		[findByUidAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[findByUidAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findAllAction.pending]: (state) => {
			state.loading = true;
		},
		[findAllAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[findAllAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.groups,
	(groups) => {
		return {groups};
	},
);

// NAME 의 value 값으로 변수명 선언
const IAM_USER_GROUP = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		updateAction,
		deleteAction,
		findByIdAction,
		findByUidAction,
		findAllAction,
	},
};

export default IAM_USER_GROUP;
