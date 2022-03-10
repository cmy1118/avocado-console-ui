import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../utils/auth';
import {Axios, baseURL} from '../../../../api/constants';
import {getIdFormLocation} from '../../../../utils/tableDataConverter';

const NAME = 'IAM_RULE_TEMPLATE';

/**************************************************
 * ambacc244 - IAM rule 템플릿 요청 액션
 **************************************************/
const findAllRuleTemplateAction = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(`/open-api/v1/iam/rule-template`, {
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
const createRuleTemplateAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.post(
			`/open-api/v1/iam/rule-template`,
			{
				name: payload.name,
				resource: payload.resource,
				description: payload.description,
				attributes: payload.attributes,
			},
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': contentType.JSON,
				},
				baseURL: baseURL.openApi,
			},
		);
		console.log(response);
		return {id: getIdFormLocation(response.headers.location)};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {actionTemplates: {}},
	reducers: {
		gatherTemplate: (state, action) => {
			state.actionTemplates[action.payload.id] = action.payload.data;
		},
	},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.loading,
	(state) => state.error,

	(loading) => {
		return {loading};
	},
);

const IAM_RULE_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findAllRuleTemplateAction,
		createRuleTemplateAction,
	},
};

export default IAM_RULE_TEMPLATE;
