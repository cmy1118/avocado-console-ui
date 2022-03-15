import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../api/constants';
import IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL from './actionTemplateDetail';
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
		console.log('findAllAction:', response);
		return {data: response.data};
	},
);

// 권한 템플릿을 ID로 조회한다.
const findByIdAction = createAsyncThunk(
	`${NAME}/FINDB_BY_ID`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(`/open-api/v1/iam/action-templates/${payload.templateId}`, {
			headers: {
				Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				Range: payload.range,
				// 'Content-Type': contentType.JSON,
			},
			baseURL: baseURL.openApi,
		});
		console.log('findByIdAction:', response);
		return {data: response.data};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		//actionTemplates 관리 state ( create 할 action 들을 tmeplateId 별로 담을 state )
		actionTemplates: [],
	},
	reducers: {
		refreshActionTemplates: (state, {payload}) => {
			// state.loading = true;
			state.actionTemplates=[]
		},
		//권한 템플릿 조회시 default check 상태 저장
		getActionTemplates: (state, {payload}) => {
			// state.loading = true;
			state.actionTemplates.push({
				templateId:payload.templateId,
				name: payload.name,
				description: payload.description,
				details: payload.data
			});

		},
		//권한 템플릿 체크박스 선택시 체크된 상태 저장
		setActionTemplates: (state, {payload}) => {
			// state.loading = true;
			let actionTemplates =state.actionTemplates
			console.log('payload.allCheck:',payload.allCheck, payload.resource,)
			//전체체크시
			if(payload.allCheck){
				actionTemplates.map((v,idx1)=>{
					if(v.templateId === payload.templateId) {
						state.actionTemplates[idx1].details.map((s, idx2) => {
							if (s.resource === payload.resource) {
								state.actionTemplates[idx1].details[idx2].effect = payload.setChecked
							}
						})
					}
					if(v.templateId !== payload.templateId){
						console.log('실패')
					}
				})
			}
			//단일체크시
			if(payload.singleCheck){
				actionTemplates.map((v,idx1)=>{
					if(v.templateId === payload.templateId) {
						state.actionTemplates[idx1].details.map((s, idx2) => {
							if (s.resource === payload.resource && s.action === payload.action) {
								state.actionTemplates[idx1].details[idx2].effect = !state.actionTemplates[idx1].details[idx2].effect
							}
						})
					}
					if(v.templateId !== payload.templateId){
						console.log('실패')
					}
				})
			}

		}
		// setActionTemplatesDone: (state, {payload}) => {
		// 	state.loading = false;
		// 	console.log('setActionTemplates')
		// 	state.actionTemplates.push({
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
	extraReducers: {
	},
});

const selectAllState = createSelector(
	(state) => state.actionTemplates,
	(actionTemplates) => {
		return {actionTemplates};
	},
);

export const IAM_ACTION_MANAGEMENT_TEMPLATE = {
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

export default IAM_ACTION_MANAGEMENT_TEMPLATE;
