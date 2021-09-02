import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../../api/constants';

//todo : this function requires access_token, id, companyId, name and password
export const createAction = createAsyncThunk('CREATE', async (payload) => {
	try {
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
	} catch (err) {
		return err;
	}
});

//todo : this function requires access_token, id, name and password
export const updateAction = createAsyncThunk('UPDATE', async (payload) => {
	try {
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
	} catch (err) {
		return err;
	}
});

//todo : this function requires access_token and id
export const deleteAction = createAsyncThunk('DELETE', async (payload) => {
	try {
		const response = await axios.delete(
			`/open/api/v1/clients/${payload.id}`,
			{
				headers: {
					Authorization: `Bearer ${payload.access_token}`,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	} catch (err) {
		return err;
	}
});

//todo : this function requires access_token and id
export const findByIdAction = createAsyncThunk(
	'FIND_BY_ID',
	async (payload) => {
		try {
			const response = await axios.get(
				`/open/api/v1/clients/${payload.id}`,
				{
					headers: {
						Authorization: `Bearer ${payload.access_token}`,
					},
					baseURL: baseUrl.openApi,
				},
			);
			return response.data;
		} catch (err) {
			return err;
		}
	},
);

//todo : this function requires access_token, companyId, first range and last range
export const findAllAction = createAsyncThunk('FIND_ALL', async (payload) => {
	try {
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
	} catch (err) {
		return err;
	}
});

const slice = createSlice({
	name: 'client',
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
	(state) => state.data,
	(state) => state.error,
	(state) => state.loading,
	(data, error, loading) => {
		return {data, error, loading};
	},
);

export const clientSelector = {
	all: (state) => selectAllState(state[CLIENT]),
};

export const CLIENT = slice.name;
export const clientReducer = slice.reducer;
export const clientAction = slice.actions;
