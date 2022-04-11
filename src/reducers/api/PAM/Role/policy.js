import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../api/constants';
import {contentType} from '../../../../utils/auth';

const NAME = 'PAM_POLICY';

const findByRoleIdAction = createAsyncThunk(
	`${NAME}/FindByRoleId`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/roles/${payload.roleId}/policy-templates`,
			{
				baseURL: baseURL.openApi,
			},
		);

		return response.data;
	},
);

const FindByIdPermissionAction = createAsyncThunk(
	`${NAME}/FindByIdPermission`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/roles/${payload.policyId}/permissions`,
			{
				headers: {
					'Content-Type': contentType.JSON,
					Range: payload.range,
				},
				baseURL: baseURL.openApi,
			},
		);

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
		[FindByIdPermissionAction.pending]: (state) => {
			state.loading = true;
		},
		[FindByIdPermissionAction.fulfilled]: (state) => {
			state.loading = false;
		},
		[FindByIdPermissionAction.rejected]: (state, action) => {
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
		FindByIdPermissionAction,
	},
};

export default PAM_POLICY;
