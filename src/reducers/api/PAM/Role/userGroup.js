import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {baseURL, Axios} from '../../../../api/constants';

const NAME = 'PAM_ROLE_USER_GROUP';

const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH_USER;

		const response = await Axios.post(
			`/open-api/v1/pam/users-group/${payload.id}/roles/`,
			{
				roleId: payload.roleId,
			},
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

const deleteAction = createAsyncThunk(
	`${NAME}/DELETE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH_USER;

		const response = await Axios.delete(
			`/open-api/v1/pam/users-group/${payload.id}/roles/${payload.roleId}`,
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

const findRoleByIdAction = createAsyncThunk(
	`${NAME}/FIND_ROLE_BY_ID`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH_USER;
		// roleIds: payload.roleIds,
		const response = await Axios.get(
			`/open-api/v1/pam/users-group/${payload.id}/roles`,
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					Range: payload.range,
				},
				baseURL: baseURL.openApi,
			},
		);

		return {data: response.data, headers: response.headers};
	},
);

const getEventsAction = createAsyncThunk(
	`${NAME}/GET_EVENTS`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH_USER;

		const response = await Axios.get(
			`/open-api/v1/pam/user-group/roles/events`,
			{
				params: {
					fromTime: payload.fromTime,
					toTime: payload.toTime,
					id: payload.id,
					roleId: payload.roleId,
					roleName: payload.roleName,
					applicationCode: payload.applicationCode,
					clientId: payload.clientId,
					userUid: payload.userUid,
				},
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					Range: payload.range,
				},
				baseURL: baseURL.openApi,
			},
		);
		return {data: response.data, headers: response.headers};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {},
	reducers: {},
	extraReducers: {
		[createAction.pending]: (state) => {
			state.loading = true;
		},
		[createAction.fulfilled]: (state, action) => {
			state.users = action.payload;
			state.loading = false;
		},
		[createAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[deleteAction.pending]: (state) => {
			state.loading = true;
		},
		[deleteAction.fulfilled]: (state, action) => {
			state.users = action.payload;
			state.loading = false;
		},
		[deleteAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findRoleByIdAction.pending]: (state) => {
			state.loading = true;
		},
		[findRoleByIdAction.fulfilled]: (state, action) => {
			state.users = action.payload;
			state.loading = false;
		},
		[findRoleByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[getEventsAction.pending]: (state) => {
			state.loading = true;
		},
		[getEventsAction.fulfilled]: (state, action) => {
			state.users = action.payload;
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

const PAM_ROLE_USER_GROUP = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		deleteAction,
		findRoleByIdAction,
		getEventsAction,
	},
};

export default PAM_ROLE_USER_GROUP;
