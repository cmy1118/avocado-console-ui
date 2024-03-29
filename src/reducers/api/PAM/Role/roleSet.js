import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios} from '../../../../api/constants';
import {contentType} from '../../../../utils/auth';

const NAME = 'PAM_ROLE_SET';

const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/pam/roles/${payload.id}/role-sets`,
		{
			params: {
				parrentRoleId: payload.parrentRoleId,
			},
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

const deleteAction = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	const response = await Axios.delete(
		` /open-api/v1/pam/roles/${payload.id}/role-sets`,
		{
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

const findRoleSetByIdAction = createAsyncThunk(
	`${NAME}/FIND_ROLE_SET_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`open-api/v1/pam/roles/${payload.id}/role-sets`,
			{
				headers: {
					Range: payload.range,
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		return {data: response.data, headers: response.headers};
	},
);

const getAllRoleSetsAction = createAsyncThunk(
	`${NAME}/GET_ALL_ROLE_SETS`,
	async (payload) => {
		const response = await Axios.get(`/open-api/v1/pam/roles/role-sets`, {
			params: {
				id: payload.id,
				name: payload.name,
			},
			headers: {
				Range: payload.range,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		});
		return {data: response.data, headers: response.headers};
	},
);

const getEventsAction = createAsyncThunk(
	`${NAME}/GET_EVENTS`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/roles/role-sets/events`,
			{
				params: {
					fromTime: payload.fromTime,
					toTime: payload.toTime,
					parentRoleId: payload.parentRoleId,
					childRoleId: payload.childRoleId,
					applicationCode: payload.applicationCode,
					clientId: payload.clientId,
					userUid: payload.userUid,
				},
				headers: {
					Range: payload.range,
					'Content-Type': contentType.JSON,
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
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
			state.loading = false;
		},
		[deleteAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findRoleSetByIdAction.pending]: (state) => {
			state.loading = true;
		},
		[findRoleSetByIdAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[findRoleSetByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[getAllRoleSetsAction.pending]: (state) => {
			state.loading = true;
		},
		[getAllRoleSetsAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[getAllRoleSetsAction.rejected]: (state, action) => {
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

const PAM_ROLE_SET = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		deleteAction,
		findRoleSetByIdAction,
		getAllRoleSetsAction,
		getEventsAction,
	},
};

export default PAM_ROLE_SET;
