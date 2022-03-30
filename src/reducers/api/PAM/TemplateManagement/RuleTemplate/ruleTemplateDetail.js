import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../utils/auth';
import {Axios, baseURL} from '../../../../../api/constants';

const NAME = 'PAM_RULE_TEMPLATE_DETAIL';

/**************************************************
 * ambacc244 - PAM rule 템플릿 디테일 정보 요청 액션
 **************************************************/
const findAllRuleTemplateDetail = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		return await Axios.get(
			`/open-api/v1/iam/rule-templates/${payload.id}/details`,
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': contentType.JSON,
				},
				baseURL: baseURL.openApi,
			},
		);
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {},
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

const PAM_RULE_TEMPLATE_DETAIL = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findAllRuleTemplateDetail,
	},
};

export default PAM_RULE_TEMPLATE_DETAIL;
