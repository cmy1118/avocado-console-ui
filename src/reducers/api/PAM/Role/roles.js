import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {baseURL, Axios} from '../../../../api/constants';

const NAME = 'PAM_ROLES';

const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/pam/roles`,
		{
			name: payload.name,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

const updateAction = createAsyncThunk(`${NAME}/UPDATE`, async (payload) => {
	const response = await Axios.put(
		`/open-api/v1/pam/role/${payload.id}`,
		{
			name: payload.name,
			parentId: payload.parentId,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

const deleteAction = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	const response = await Axios.delete(`/open-api/v1/pam/role/${payload.id}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		aseURL: process.env.REACT_APP_OPEN_API_URL,
	});
	return response.data;
});

const findRolesByIdsAction = createAsyncThunk(
	`${NAME}/FIND_ROLES_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/roles/${payload.id}`,
			{
				aseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		return response.data;
	},
);

const getAllRolesAction = createAsyncThunk(
	`${NAME}/GET_ALL_ROLES`,
	async (payload) => {
		const response = await Axios.get(`/open-api/v1/pam/roles`, {
			params: {
				name: payload.name || null,
				id: payload.id || null,
			},
			headers: {
				Range: payload.range,
			},
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		});
		return {data: response.data, headers: response.headers};
	},
);

const getEventsAction = createAsyncThunk(
	`${NAME}/GET_EVENTS`,
	async (payload) => {
		const response = await Axios.get(`/open-api/v1/pam/roles/events`, {
			params: {
				fromTime: payload.fromTime,
				toTime: payload.toTime,
				id: payload.id,
				name: payload.name,
				applicationCode: payload.applicationCode,
				clientId: payload.clientId,
				uid: payload.uid,
			},
			headers: {
				Range: payload.range,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		});
		return {data: response.data, headers: response.headers};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		roles: [],
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

		[findRolesByIdsAction.pending]: (state) => {
			state.loading = true;
		},
		[findRolesByIdsAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[findRolesByIdsAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findRolesByIdsAction.pending]: (state) => {
			state.loading = true;
		},
		[findRolesByIdsAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[findRolesByIdsAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[getAllRolesAction.pending]: (state) => {
			state.loading = true;
		},
		[getAllRolesAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[getAllRolesAction.rejected]: (state, action) => {
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

const PAM_ROLES = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		updateAction,
		deleteAction,
		findRolesByIdsAction,
		getAllRolesAction,
		getEventsAction,
	},
};

export default PAM_ROLES;
