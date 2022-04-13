import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../utils/auth';
import {Axios} from '../../../../../api/constants';

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
		aseURL: process.env.REACT_APP_OPEN_API_URL,
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
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	console.log(response);
	return response;
});

const slice = createSlice({
	name: NAME,
	initialState: {pamRuleTemplates: []},
	reducers: {
		gatherRulteTemplate: (state, {payload}) => {
			state.pamRuleTemplates.push(payload);
		},
		resetRuleTemplate: (state, action) => {
			state.pamRuleTemplates = [];
		},
	},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.pamRuleTemplates,
	(pamRuleTemplates) => {
		return {pamRuleTemplates};
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
