import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../api/constants';

const NAME = 'IAM_USER_POLICY';

//사용자에게 부여된 Role 기반의 정책을 조회한다.
const getsAction = createAsyncThunk(
	`${NAME}/GETS`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(
			`/open-api/v1/iam/users/${payload.userUid}/policies`,
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data || [];
	},
);

const grantGetsAction = createAsyncThunk(
	`${NAME}/GRANT_GETS`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;
		const response = await Axios.get(
			'/open-api/v1/iam/roles/policy-templates',
			{
				params: {
					roleId: payload.roleId,
				},
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': 'application/json',
					Range: 'elements=0-50',
				},
				baseURL: baseURL.openApi,
			},
		);
		console.log(response);
		return response.data || [];
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		policy: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[getsAction.pending]: (state) => {
			state.loading = true;
		},
		[getsAction.fulfilled]: (state, action) => {
			state.policy = action.payload;
			state.loading = false;
		},
		[grantGetsAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[getsAction.pending]: (state) => {
			state.loading = true;
		},
		[grantGetsAction.fulfilled]: (state) => {
			state.loading = false;
		},
		[grantGetsAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.userRoles,
	(state) => state.error,
	(state) => state.loading,
	(policy, error, loading) => {
		return {policy, error, loading};
	},
);

const IAM_USER_POLICY = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		getsAction,
		grantGetsAction,
	},
};

export default IAM_USER_POLICY;
