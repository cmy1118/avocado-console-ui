import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../../api/constants';

const NAME = 'IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL';

//권한 템플릿 상세 정보를 조회
const findAllAction = createAsyncThunk(`${NAME}/FINDALL`, async (payload) => {
	const response = await Axios.get(
		`/open-api/v1/iam/action-templates/details`,
		{
			params: {
				templateId: payload.templateId,
				resource: payload.resource,
				action: payload.action,
				effect: payload.effect,
			},
			headers: {
				'Content-Type': 'application/json',
				Range: payload.range,
			},
			baseURL: baseURL.openApi,
		},
	);
	return {data: response.data, headers: response.headers};
});

const slice = createSlice({
	name: NAME,
	initialState: {
		//actionTemplates 관리 state ( create 할 action 들을 tmeplateId 별로 담을 state )
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

const IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findAllAction,
	},
};

export default IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL;
