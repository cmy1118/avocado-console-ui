import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../../../../api/constants';

const NAME = 'IAM_ROLES';

const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		console.log(user);
		const response = await axios.post(
			`/open-api/v1/iam/roles`,
			{
				name: payload.name,
				description: payload.description,
				maxGrants: payload.maxGrants, //최대 승인 수 0 : 제한없음 N: 부여 가능 수
				parentIds: payload.parentIds,
			},
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

const updateAction = createAsyncThunk(
	`${NAME}/UPDATE`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		console.log(user);
		const response = await axios.put(
			`/open-api/v1/iam/roles/${payload.id}`,
			{
				name: payload.name,
				description: payload.description,
				maxGrants: payload.maxGrants, //최대 승인 수 0 : 제한없음 N: 부여 가능 수
			},
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

const deleteAction = createAsyncThunk(
	`${NAME}/DELETE`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		console.log(user);
		const response = await axios.delete(
			`/open-api/v1/iam/roles/${payload.id}`,
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		console.log(user);
		const response = await axios.get(
			`/open-api/v1/iam/roles/${payload.id}`,
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);
const getsAction = createAsyncThunk(
	`${NAME}/GETS`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		console.log(user);
		const response = await axios.get(`/open-api/v1/iam/roles`, {
			headers: {
				Authorization: `${user.token_type} ${user.access_token}`,
				Range: payload.range,
			},
			params: {
				keyword: payload.keyword,
				maxGrants: payload.maxGrants,
			},
			baseURL: baseUrl.openApi,
		});
		return response.data;
	},
);

const getEventsAction = createAsyncThunk(
	`${NAME}/GETS`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		console.log(user);
		const response = await axios.get(`/open-api/v1/iam/roles/events`, {
			headers: {
				Authorization: `${user.token_type} ${user.access_token}`,
				Range: payload.range,
			},
			params: {
				fromTime: payload.fromTime,
				toTime: payload.toTime,
				roleld: payload.roleld,
			},
			baseURL: baseUrl.openApi,
		});
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		roles: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[createAction.pending]: (state) => {
			state.loading = true;
		},
		[createAction.fulfilled]: (state, action) => {
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
			state.loading = false;
		},
		[findByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[getsAction.pending]: (state) => {
			state.loading = true;
		},
		[getsAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[getsAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[getEventsAction.pending]: (state) => {
			state.loading = true;
		},
		[getEventsAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[getEventsAction.rejected]: (state, action) => {
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
		createAction,
		updateAction,
		deleteAction,
		findByIdAction,
		getsAction,
		getEventsAction,
	},
};

export default IAM_ROLES;
