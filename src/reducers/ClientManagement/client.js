import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../api/constants';

const NAME = 'client';

//todo : this function requires access_token, id, companyId, name and password
const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await axios.post(
		`/open/api/v1/clients`,
		{
			id: payload.id,
			companyId: payload.companyId,
			name: payload.name,
			password: payload.password,
		},
		{
			headers: {
				Authorization: `Bearer ${payload.access_token}`,
				'Content-Type': 'application/json',
			},
			baseURL: baseUrl.openApi,
		},
	);
	return response.data;
});

//todo : this function requires access_token, id, name and password
const updateAction = createAsyncThunk(`${NAME}/UPDATE`, async (payload) => {
	const response = await axios.put(
		`/open/api/v1/clients/${payload.id}`,
		{
			name: payload.name,
			password: payload.password,
		},
		{
			headers: {
				Authorization: `Bearer ${payload.access_token}`,
				'Content-Type': 'application/json',
			},
			baseURL: baseUrl.openApi,
		},
	);
	return response.data;
});

//todo : this function requires access_token and id
const deleteAction = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	const response = await axios.delete(`/open/api/v1/clients/${payload.id}`, {
		headers: {
			Authorization: `Bearer ${payload.access_token}`,
		},
		baseURL: baseUrl.openApi,
	});
	return response.data;
});

//todo : this function requires access_token and id
const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload) => {
		const response = await axios.get(`/open/api/v1/clients/${payload.id}`, {
			headers: {
				Authorization: `Bearer ${payload.access_token}`,
			},
			baseURL: baseUrl.openApi,
		});
		return response.data;
	},
);

//todo : this function requires access_token, companyId, first range and last range
const findAllAction = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	const response = await axios.get(`/open/api/v1/clients`, {
		params: {
			companyId: payload.companyId,
		},
		headers: {
			Authorization: `Bearer ${payload.access_token}`,
			Range: `elements=${payload.first}-${payload.last}`,
		},
		baseURL: baseUrl.openApi,
	});
	return response.data;
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

export const clientSelector = {
	all: (state) => selectAllState(state[CLIENT]),
};

export const CLIENT = slice.name;
export const clientReducer = slice.reducer;
export const clientAction = {
	createAction,
	updateAction,
	deleteAction,
	findByIdAction,
	findAllAction,
};
