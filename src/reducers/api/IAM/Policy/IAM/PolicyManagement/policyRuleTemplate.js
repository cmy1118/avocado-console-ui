import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../../utils/auth';
import {Axios} from '../../../../../../api/constants';

const NAME = 'IAM_POLICY_MANAGEMENT_RULE_TEMPLATE';

/**************************************************
 * seob - 규칙 템플릿 정책과 연결 액션
 ***************************************************/
const join = createAsyncThunk(`${NAME}/JOIN`, async (payload) => {
	return await Axios.post(
		`/open-api/v1/iam/policies/${payload.policyId}/rule-templates`,
		[...payload.templateList],
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
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
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.loading,
	(state) => state.error,

	(loading) => {
		return {loading};
	},
);

const IAM_POLICY_MANAGEMENT_RULE_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {join},
};

export default IAM_POLICY_MANAGEMENT_RULE_TEMPLATE;
