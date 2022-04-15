import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios} from '../../../../../api/constants';

const NAME = 'PAM_RULE_TEMPLATE_DETAIL';

/**************************************************
 * ambacc244 - PAM rule 템플릿 디테일 정보 요청 액션
 **************************************************/
const findAllRuleTemplateDetail = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload) => {
		return await Axios.get(`/open-api/v1/pam/rule-templates/details`, {
			params: {
				templateId: payload.templateId,
			},

			baseURL: process.env.REACT_APP_OPEN_API_URL,
		});
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
