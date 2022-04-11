import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../../utils/auth';
import {Axios, baseURL} from '../../../../../../api/constants';

const NAME = 'IAM_RULE_TEMPLATE_DETAIL';

/**************************************************
 * ambacc244 - IAM rule 템플릿 디테일 정보 요청 액션
 **************************************************/
const findAll = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	return await Axios.get(
		`/open-api/v1/iam/rule-templates/${payload.id}/details`,
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: baseURL.openApi,
		},
	);
});

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

const IAM_RULE_TEMPLATE_DETAIL = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findAll,
	},
};

export default IAM_RULE_TEMPLATE_DETAIL;
