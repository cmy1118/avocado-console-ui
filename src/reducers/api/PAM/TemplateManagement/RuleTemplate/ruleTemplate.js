import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../utils/auth';
import {Axios, baseURL} from '../../../../../api/constants';

const NAME = 'PAM_RULE_MANAGEMENT_TEMPLATE';

/**************************************************
 * ambacc244 - PAM rule 템플릿 요청 액션
 **************************************************/
const findAllRules = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	const response = await Axios.get(`/open-api/v1/pam/rule-templates`, {
		headers: {
			Range: payload.range,
			'Content-Type': contentType.JSON,
		},
		baseURL: baseURL.openApi,
	});
	return {data: response.data};
});

/**************************************************
 * ambacc244 - PAM rule 생성 요청 액션
 **************************************************/
const createRule = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/pam/rule-templates`,
		{...payload},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: baseURL.openApi,
		},
	);
	console.log(response);
	return response;
});

const slice = createSlice({
	name: NAME,
	initialState: {ruleTemplates: []},
	reducers: {
		gatherRulteTemplate: (state, {payload}) => {
			state.ruleTemplates.push(payload);
		},
		resetRuleTemplate: (state, action) => {
			state.ruleTemplates = [];
		},
	},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.ruleTemplates,
	(ruleTemplates) => {
		return {ruleTemplates};
	},
);

const PAM_RULE_MANAGEMENT_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findAllRules,
		createRule,
	},
};

export default PAM_RULE_MANAGEMENT_TEMPLATE;
