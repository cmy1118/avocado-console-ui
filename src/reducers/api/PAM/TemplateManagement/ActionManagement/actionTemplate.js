import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios} from '../../../../../api/constants';
import {contentType} from '../../../../../utils/auth';

const NAME = 'PAM_ACTION_MANAGEMENT_TEMPLATE';

//권한 템플릿 상세 정보를 조회
const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/pam/action-templates`,
		{
			name: payload.name,
			description: payload.description,
			details: payload.details,
			categoryType: payload.categoryType,
		},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	console.log('createAction:', response);
	return response;
});

// 권한 템플릿 조회
const findAllAction = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	return await Axios.get(`/open-api/v1/pam/action-templates`, {
		params: {
			name: payload.name,
			description: payload.description,
		},
		headers: {
			Range: payload.range,
			// 'Content-Type': contentType.JSON,
		},
		baseURL: process.env.REACT_APP_OPEN_API_URL,
	});
});

// 권한 템플릿을 ID로 조회한다.
const findByIdAction = createAsyncThunk(
	`${NAME}/FINDB_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/action-templates/${payload.templateId}`,
			{
				headers: {
					Range: payload.range,
					// 'Content-Type': contentType.JSON,
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		console.log('findByIdAction:', response);
		return {data: response.data};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		//pamActionTemplates 관리 state ( create 할 action 들을 tmeplateId 별로 담을 state )
		pamActionTemplates: [],
	},
	reducers: {
		initActionTemplates: (state, action) => {
			state.pamActionTemplates = [];
		},
		//권한 템플릿 조회시 default check 상태 저장 - 체크박스 변경전 (지우지마세요)
		// getActionTemplates: (state, {payload}) => {
		// 	// state.loading = true;
		// 	state.pamActionTemplates.push({
		// 		templateId:payload.templateId,
		// 		name: payload.name,
		// 		description: payload.description,
		// 		details: payload.data
		// 	});
		//
		// },
		//권한 템플릿 조회시 default check 상태 저장
		getActionTemplates: (state, {payload}) => {
			console.log('getActionTemplates!:', payload.data);
			// state.loading = true;
			state.pamActionTemplates.push({
				templateId: payload.templateId,
				name: payload.name,
				description: payload.description,
				details: payload.data,
			});
		},
		//권한 템플릿 체크박스 선택시 체크된 상태 저장 - 체크박스 변경전 (지우지마세요)
		setActionTemplates: (state, {payload}) => {
			// state.loading = true;
			let pamActionTemplates = state.pamActionTemplates;
			//전체체크시
			if (payload.allCheck) {
				pamActionTemplates.map((v, idx1) => {
					if (v.templateId === payload.templateId) {
						state.pamActionTemplates[idx1].details.map(
							(s, idx2) => {
								if (s.resource === payload.resource) {
									state.pamActionTemplates[idx1].details[
										idx2
									].effect = payload.setChecked;
								}
							},
						);
					}
					if (v.templateId !== payload.templateId) {
						console.log('실패');
					}
				});
			}
			//단일체크시
			if (payload.singleCheck) {
				pamActionTemplates.map((v, idx1) => {
					if (v.templateId === payload.templateId) {
						state.pamActionTemplates[idx1].details.map(
							(s, idx2) => {
								if (
									s.resource === payload.resource &&
									s.action === payload.action
								) {
									state.pamActionTemplates[idx1].details[
										idx2
									].effect = !state.pamActionTemplates[idx1]
										.details[idx2].effect;
								}
							},
						);
					}
					if (v.templateId !== payload.templateId) {
						console.log('실패');
					}
				});
			}
		},
		// setActionTemplatesDone: (state, {payload}) => {
		// 	state.loading = false;
		// 	console.log('setActionTemplates')
		// 	state.pamActionTemplates.push({
		// 		name: payload.resource,
		// 		description: payload.description,
		// 		details: payload.data
		// 	});
		//
		// },
		// setActionTemplatesFail: (state, action) => {
		// 	state.loading = false;
		// 	state.error = action.payload;
		// },
	},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.pamActionTemplates,
	(pamActionTemplates) => {
		return {pamActionTemplates};
	},
);

export const PAM_ACTION_MANAGEMENT_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		findAllAction,
		findByIdAction,
	},
};

export default PAM_ACTION_MANAGEMENT_TEMPLATE;
