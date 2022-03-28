import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../utils/auth';
import {Axios, baseURL} from '../../../../../api/constants';

const NAME = 'IAM_RULE_MANAGEMENT_TEMPLATE';

/**************************************************
 * ambacc244 - IAM rule 템플릿 요청 액션
 **************************************************/
const findAll = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(`/open-api/v1/iam/rule-templates`, {
			headers: {
				Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				Range: payload.range,
				'Content-Type': contentType.JSON,
			},
			baseURL: baseURL.openApi,
		});
		return {data: response.data};
	},
);

/**************************************************
 * ambacc244 - IAM rule 생성 요청 액션
 **************************************************/
const create = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.post(
			`/open-api/v1/iam/rule-templates`,
			{...payload},
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': contentType.JSON,
				},
				baseURL: baseURL.openApi,
			},
		);
		return response;
	},
);

const findById = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		return await Axios.get(
			`/open-api/v1/iam/rule-templates/${payload.templateId}`,
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				},
				baseURL: baseURL.openApi,
			},
		);
	},
);

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
		create,
		findById,
	},
};

export default IAM_RULE_MANAGEMENT_TEMPLATE;
