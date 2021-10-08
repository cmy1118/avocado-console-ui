import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../../../api/constants';

const NAME = 'user';

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
		users: [
			{
				uid: 'user1',
				id: 'ambacc244',
				name: '이영애',
				email: 'ambacc244@netand.co.kr',
				telephone: '010-9434-5272',
				mobile: '010-9434-5272',
				groups: ['group2', 'group4', 'group8'],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2023.02.12 20:44:02',
				tags: [
					{name: 'level', value: 'Admin', permissions: []},
					{name: 'type', value: 'white', permissions: [1, 2, 3]},
				],
				lastConsoleLogin: '2020.05.12 20:44:02',
				creationDate: '2020.01.12 20:44:02',
			},
			{
				uid: 'user2',
				id: 'seob717',
				name: '심유섭',
				email: 'seob717@netand.co.kr',
				telephone: '010-9688-5549',
				mobile: '010-9688-5549',
				groups: ['group2', 'group4', 'group8'],
				status: 1,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2023.04.12 20:44:02',
				tags: [{name: 'type', value: 'white', permissions: [1, 2, 3]}],
				lastConsoleLogin: '2020.06.12 20:44:02',
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user3',
				id: 'roberto',
				name: '박건욱',
				email: 'roberto@netand.co.kr',
				telephone: '010-2225-1154',
				mobile: '010-2225-1154',
				groups: ['group3', 'group4', 'group8'],
				status: 2,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2022.12.12 20:44:02',
				tags: [{name: 'level', value: 'Admin', permissions: []}],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user4',
				id: 'aaa',
				name: '이에이',
				email: 'aaa@netand.co.kr',
				telephone: '010-1111-1111',
				mobile: '010-1111-1111',
				groups: ['group1'],
				status: 3,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2022.01.12 20:44:02',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user5',
				id: 'bbb',
				name: '이비',
				email: 'bbb@netand.co.kr',
				telephone: '010-1111-1111',
				mobile: '010-1111-1111',
				groups: ['group1'],
				status: 4,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2022.03.12 20:44:02',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
		],
		loading: false,
		error: null,
	},
	reducers: {},
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
	(state) => state.users,
	(state) => state.error,
	(state) => state.loading,
	(users, error, loading) => {
		return {users, error, loading};
	},
);

export const userSelector = {
	all: (state) => selectAllState(state[USER]),
};

export const USER = slice.name;
export const userReducer = slice.reducer;
export const userAction = {
	createAction,
	updateAction,
	deleteAction,
	findByIdAction,
	findByUidAction,
	findAllAction,
};
