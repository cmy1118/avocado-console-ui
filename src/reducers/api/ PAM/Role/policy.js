import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../api/constants';

const NAME = 'PAM_POLICY';

const findByRoleIdAction = createAsyncThunk(
	`${NAME}/FindByRoleId`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;

		const response = await Axios.get(
			`/open-api/v1/pam/roles/${payload.roleId}/policy-templates`,
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
				},
				baseURL: baseURL.openApi,
			},
		);
		console.log(response.data);
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		policy: [],
	},
	reducers: {},
	extraReducers: {
		[findByRoleIdAction.pending]: (state) => {
			state.loading = true;
		},
		[findByRoleIdAction.fulfilled]: (state) => {
			state.loading = false;
		},
		[findByRoleIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.policy,
	(policy) => {
		return {
			policy,
		};
	},
);

const PAM_POLICY = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findByRoleIdAction,
	},
};

export default PAM_POLICY;
