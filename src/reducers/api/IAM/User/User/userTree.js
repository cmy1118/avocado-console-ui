import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../../../../api/constants';

const NAME = 'IAM_USER_TREE';

//todo : this function requires id, companyId, name, password, email, telephone and mobile
const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;
		// eslint-disable-next-line no-console
		console.log(client);
		const response = await axios.get(
			`/open-api/v1/iam/user-trees`,
			{
				id: payload.id,
				name: payload.name,
				password: payload.password,
				email: payload.email,
				telephone: payload.telephone,
				mobile: payload.mobile,
			},
			{
				headers: {
					params: {
						groupId: payload.id,
					},
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		tree: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[createAction.pending]: (state) => {
			state.loading = true;
		},
		[createAction.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		[createAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.tree,
	(state) => state.error,
	(state) => state.loading,
	(tree, error, loading) => {
		return {tree, error, loading};
	},
);

// NAME 의 value 값으로 변수명 선언
const IAM_USER_TREE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
	},
};

export default IAM_USER_TREE;
