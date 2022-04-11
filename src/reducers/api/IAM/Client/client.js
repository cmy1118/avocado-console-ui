import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {Axios, baseURL} from '../../../../api/constants';

const NAME = 'IAM_CLIENT';

//todo : this function requires access_token, id, companyId, name and password
const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open/api/v1/clients`,
		{
			id: payload.id,
			companyId: payload.companyId,
			name: payload.name,
			password: payload.password,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: baseURL.openApi,
		},
	);
	return response.data;
});

//todo : this function requires access_token, id, name and password
const updateAction = createAsyncThunk(`${NAME}/UPDATE`, async (payload) => {
	const response = await Axios.put(
		`/open/api/v1/clients/${payload.id}`,
		{
			name: payload.name,
			password: payload.password,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: baseURL.openApi,
		},
	);
	return response.data;
});

//todo : this function requires access_token and id
const deleteAction = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	const response = await Axios.delete(`/open/api/v1/clients/${payload.id}`, {
		baseURL: baseURL.openApi,
	});
	return response.data;
});

//todo : this function requires access_token and id
const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload) => {
		const response = await Axios.get(`/open/api/v1/clients/${payload.id}`, {
			baseURL: baseURL.openApi,
		});
		return response.data;
	},
);

//todo : this function requires access_token, companyId, first range and last range
const findAllAction = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	const response = await Axios.get(`/open/api/v1/clients`, {
		params: {
			companyId: payload.companyId,
		},
		headers: {
			Range: `elements=${payload.first}-${payload.last}`,
		},
		baseURL: baseURL.openApi,
	});
	return {
		...response.data,
		responseRange: response.headers['Content-Range'],
	};
});

const slice = createSlice({
	name: NAME,
	initialState: {
		client: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[createAction.pending]: (state) => {
			state.loading = true;
		},
		[createAction.fulfilled]: (state, action) => {
			state.client = action.payload;
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
			state.client = action.payload;
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
			state.client = action.payload;
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
			state.client = action.payload;
			state.loading = false;
		},
		[findByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findAllAction.pending]: (state) => {
			state.loading = true;
		},
		[findAllAction.fulfilled]: (state, action) => {
			state.client = action.payload;
			state.loading = false;
		},
		[findAllAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.client,
	(state) => state.error,
	(state) => state.loading,
	(client, error, loading) => {
		return {client, error, loading};
	},
);

// NAME 의 value 값으로 변수명 선언
const IAM_CLIENT = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		updateAction,
		deleteAction,
		findByIdAction,
		findAllAction,
	},
};

export default IAM_CLIENT;
