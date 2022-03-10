import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../api/constants';
import IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL from './templateDetail';
import {contentType} from '../../../../../utils/auth';

const NAME = 'IAM_ACTION_MANAGEMENT_TEMPLATE';

//권한 템플릿 상세 정보를 조회
const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.post(
			`/open-api/v1/iam/action-templates`,
			{
				id: payload.id,
				name: payload.name,
				description: payload.description,
				details: payload.details,
			},
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': contentType.JSON,
				},
				baseURL: baseURL.openApi,
			},
		);
		console.log('createAction:', response);
		return response;
	},
);

// 권한 템플릿 조회
const findAllAction = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(`/open-api/v1/iam/action-templates`, {
			params: {
				name: payload.name,
				description: payload.description,
			},
			headers: {
				Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				Range: payload.range,
				// 'Content-Type': contentType.JSON,
			},
			baseURL: baseURL.openApi,
		});
		return {data: response.data};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		//actionTemplates 관리 state ( create 할 action 들을 tmeplateId 별로 담을 state )
		actionTemplates: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[createAction.pending]: (state) => {
			state.loading = true;
		},
		[createAction.fulfilled]: (state, action) => {
			state.actionTemplates = action.payload.data;
			state.loading = false;
		},
		[createAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL.asyncAction.findAllAction
			.pending]: (state) => {
			state.loading = true;
		},
		[IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL.asyncAction.findAllAction
			.fulfilled]: (state, action) => {
			state.actionTemplates = action.payload.data;
			state.loading = false;
		},
		[IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL.asyncAction.findAllAction
			.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.loading,
	(state) => state.error,

	(loading) => {
		return {loading};
	},
);

const IAM_ACTION_MANAGEMENT_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findAllAction,
	},
};

export default IAM_ACTION_MANAGEMENT_TEMPLATE;
