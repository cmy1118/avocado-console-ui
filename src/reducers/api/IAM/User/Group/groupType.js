import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {baseURL, Axios} from '../../../../../api/constants';
import {contentType} from '../../../../../utils/auth';

const NAME = 'IAM_USER_GROUP_TYPE';

const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/iam/user-group-types`,
		{
			name: payload.name,
			description: payload.description,
		},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: baseURL.openApi,
		},
	);
	return response.data;
});

const updateAction = createAsyncThunk(`${NAME}/UPDATE`, async (payload) => {
	const response = await Axios.put(
		`/open-api/v1/iam/user-group-types/${payload.id}`,
		{
			name: payload.name,
			description: payload.description,
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

const deleteAction = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	const response = await Axios.delete(
		`/open-api/v1/iam/user-group-types/${payload.id}`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: baseURL.openApi,
		},
	);
	return response.data;
});

const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/user-group-types/${payload.id}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

const findAllAction = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	const response = await Axios.get(`/open-api/v1/iam/user-group-types`, {
		params: {
			name: payload.name,
			id: payload.id,
		},
		headers: {
			'Content-Type': 'application/json',
			Range: payload.range,
		},
		baseURL: baseURL.openApi,
	});
	console.log(response);
	return {data: response.data, headers: response.headers};
});

const slice = createSlice({
	name: NAME,
	initialState: {
		groupTypes: [],
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
	},
});

// 외부에서 사용할 값만 selector 에 넣어주시면 됩니다.
const selectAllState = createSelector(
	(state) => state.groupTypes,
	(groupTypes) => {
		return {groupTypes};
	},
);

// NAME 의 value 값으로 변수명 선언
const IAM_USER_GROUP_TYPE = {
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

export default IAM_USER_GROUP_TYPE;
