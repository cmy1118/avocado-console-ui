import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../../utils/auth';
import {Axios} from '../../../../../../api/constants';

const NAME = 'IAM_RULE_MANAGEMENT_TEMPLATE';

/**************************************************
 * ambacc244 - IAM rule 템플릿 요청 액션
 **************************************************/
const findAll = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	const response = await Axios.get(`/open-api/v1/iam/rule-templates`, {
		headers: {
			Range: payload.range,
			'Content-Type': contentType.JSON,
		},
		baseURL: process.env.REACT_APP_OPEN_API_URL,
	});
	return {data: response.data};
});

/**************************************************
 * ambacc244 - IAM rule 생성 요청 액션
 **************************************************/
const createRule = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/iam/rule-templates`,
		{...payload},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response;
});

const findById = createAsyncThunk(`${NAME}/FIND_BY_ID`, async (payload) => {
	return await Axios.get(
		`/open-api/v1/iam/rule-templates/${payload.templateId}`,
		{
			aseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
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

const IAM_RULE_MANAGEMENT_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findAll,
		createRule,
		findById,
	},
};

export default IAM_RULE_MANAGEMENT_TEMPLATE;
