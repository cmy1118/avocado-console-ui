import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../api/constants';

const NAME = 'IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE';

//정책에 권한 템플릿을 연결
const join = createAsyncThunk(`${NAME}/JOIN`, async (payload, {getState}) => {
	const {userAuth} = getState().AUTH;

	return await Axios.post(
		`/open-api/v1/iam/policies/${payload.policyId}/action-templates`,
		{
			headers: {
				Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				Range: payload.range,
			},
			baseURL: baseURL.openApi,
		},
	);
});

const slice = createSlice({
	name: NAME,
	initialState: {
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[join.pending]: (state) => {
			state.loading = true;
		},
		[join.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[join.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.loading,
	(state) => state.error,

	(loading) => {
		return {loading};
	},
);

const IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		join,
	},
};

export default IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE;
