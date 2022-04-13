import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios} from '../../../../../../api/constants';

const NAME = 'POLICY_MANAGEMENT_ACTION_TEMPLATE';

//정책에 권한 템플릿을 연결
const join = createAsyncThunk(`${NAME}/JOIN`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/iam/policies/${payload.policyId}/action-templates`,
		{
			actionTemplates: payload.actionTemplates,
		},
		{
			headers: {
				policyId: payload.policyId,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	console.log(`${NAME}/join:`, response);
	return response;
});

const slice = createSlice({
	name: NAME,
	initialState: {
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.loading,
	(state) => state.error,

	(loading) => {
		return {loading};
	},
);

const POLICY_MANAGEMENT_ACTION_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		join,
	},
};

export default POLICY_MANAGEMENT_ACTION_TEMPLATE;
