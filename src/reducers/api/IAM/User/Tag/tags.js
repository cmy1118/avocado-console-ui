import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {baseUrl, Axios} from '../../../../../api/constants';

const NAME = 'IAM_USER_TAG';

//todo : this function requires id, companyId, name, password, email, telephone and mobile
const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;

		// eslint-disable-next-line no-console
		console.log(user);
		const response = await Axios.post(
			`/open-api/v1/iam/users/${payload.userUid}/tags`,
			{
				name: payload.name,
				value: payload.value,
			},
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseUrl.openApi,
			},
		);
		return {data: response.data, headers: response.headers};
	},
);
//todo : this function requires uid, name and password
const updateAction = createAsyncThunk(
	`${NAME}/UPDATE`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;

		const response = await Axios.put(
			`/open-api/v1/iam/users/${payload.userUid}/tags/${payload.name}`,
			{
				value: payload.value,
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

//todo : this function requires uid
const deleteAction = createAsyncThunk(
	`${NAME}/DELETE`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;

		const response = await Axios.delete(
			`/open-api/v1/iam/users/${payload.userUid}/tags/${payload.name}`,
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

const getsAction = createAsyncThunk(
	`${NAME}/GETS`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		const response = await Axios.get(`/open-api/v1/iam/users/tags`, {
			params: {
				userUid: payload.userUid,
			},
			headers: {
				Authorization: `${user.token_type} ${user.access_token}`,
				Range: payload.range,
			},
			baseURL: baseUrl.openApi,
		});
		return {data: response.data, headers: response.headers};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		tags: [],
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
			state.tags = action.payload.data;
			state.loading = false;
		},
		[getsAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.tags,
	(state) => state.error,
	(state) => state.loading,
	(tags, error, loading) => {
		return {tags, error, loading};
	},
);

// NAME 의 value 값으로 변수명 선언
const IAM_USER_TAG = {
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

export default IAM_USER_TAG;
