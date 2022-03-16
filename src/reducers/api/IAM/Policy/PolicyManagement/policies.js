import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../utils/auth';
import {Axios, baseURL} from '../../../../../api/constants';
import {getIdFormLocation} from '../../../../../utils/tableDataConverter';

const NAME = 'IAM_POLICY_MANAGEMENT_POLICIES';

/**************************************************
 * ambacc244 - IAM policy 생성 요청 액션
 **************************************************/
const createPolicyAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.post(
			`/open-api/v1/iam/policies`,
			{
				name: payload.name,
				description: payload.description,
				type: payload.type,
				controlTypes: payload.controlTypes,
				maxGrants: payload.maxGrants,
			},
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': contentType.JSON,
				},
				baseURL: baseURL.openApi,
			},
		);

		return {id: getIdFormLocation(response.headers.location)};
	},
);
/**************************************************
 * ambacc244 - IAM policy 생성 요청 액션
 **************************************************/
const findAll = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(`/open-api/v1/iam/policies`, {
			params: {
				type: payload.type, // 관리타입
				keyword: payload.keyword, // 검색 키워드
				fromTime: payload.fromTime, // 생성일시 (시작)
				toTime: payload.toTime, // 생성일시 (종료)
				id: payload.id, // 정책 ID
			},
			headers: {
				Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				Range: payload.range,
				'Content-Type': contentType.JSON,
			},
			baseURL: baseURL.openApi,
		});
		console.log(response);
		return response;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		creatingPolicy: false,
	},
	reducers: {
		RequestToGatherPolicyTemplates: (state, action) => {
			state.creatingPolicy = true;
		},
		createPolicyDone: (state, action) => {
			state.creatingPolicy = false;
		},
	},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.creatingPolicy,
	(creatingPolicy) => {
		return {creatingPolicy};
	},
);

const IAM_POLICY_MANAGEMENT_POLICIES = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createPolicyAction,
		findAll,
	},
};

export default IAM_POLICY_MANAGEMENT_POLICIES;
