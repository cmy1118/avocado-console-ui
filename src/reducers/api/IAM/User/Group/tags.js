import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {baseURL, Axios} from '../../../../../api/constants';
import {contentType} from '../../../../../utils/auth';

const NAME = 'IAM_USER_GROUP_TAG';

const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	return await Axios.post(
		`/open-api/v1/iam/user-groups/${payload.groupId}/tags`,
		{
			name: payload.name,
			value: payload.value,
		},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: baseURL.openApi,
		},
	);
});

const updateAction = createAsyncThunk(`${NAME}/UPDATE`, async (payload) => {
	return await Axios.put(
		`/open-api/v1/iam/user-groups/${payload.groupId}/tags/${payload.name}`,
		{
			value: payload.value,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: baseURL.openApi,
		},
	);
});

const deleteAction = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	return await Axios.delete(
		`open-api/v1/iam/user-groups/${payload.groupId}/tags/${payload.name}`,
		{
			baseURL: baseURL.openApi,
		},
	);
});

const getsAction = createAsyncThunk(`${NAME}/GETS`, async (payload) => {
	return await Axios.get(`open-api/v1/iam/user-groups/tags`, {
		headers: {
			'Content-Type': 'application/json',
			Range: payload.range,
		},
		params: {groupId: payload.groupId},
		baseURL: baseURL.openApi,
	});
});

const slice = createSlice({
	name: NAME,
	initialState: {
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
	},
});

const selectAllState = createSelector(
	(state) => state.loading,
	(state) => state.error,
	(loading, error) => {
		return {loading, error};
	},
);
// NAME 의 value 값으로 변수명 선언
const IAM_USER_GROUP_TAG = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		updateAction,
		deleteAction,
		getsAction,
	},
};

export default IAM_USER_GROUP_TAG;
