import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../../../utils/auth';
import {Axios} from '../../../../../../api/constants';
import {getIdFormLocation} from '../../../../../../utils/tableDataConverter';

const NAME = 'IAM_POLICY_MANAGEMENT_POLICIES';

/**************************************************
 * ambacc244 - IAM policy 생성 요청 액션
 **************************************************/
const createPolicy = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
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
				'Content-Type': contentType.JSON,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);

	return getIdFormLocation(response.headers.location);
});

/**************************************************
 * ambacc244 - IAM policy 생성 요청 액션
 **************************************************/
const updatePolicy = createAsyncThunk(`${NAME}/UPDATE`, async (payload) => {
	const response = await Axios.put(
		`/open-api/v1/iam/policies/${payload.id}`,
		{
			name: payload?.name,
			description: payload?.description,
			maxGrants: payload?.maxGrants,
		},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
});

/**************************************************
 * ambacc244 - IAM policy 삭제 요청 액션
 **************************************************/
const deletePolicy = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	const response = await Axios.delete(
		`/open-api/v1/iam/policies/${payload.id}`,
		{
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
});

/**************************************************
 * ambacc244 - IAM policy 생성 요청 액션
 **************************************************/
const findAll = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	const response = await Axios.get(`/open-api/v1/iam/policies`, {
		params: {
			type: payload.type, // 관리타입
			keyword: payload.keyword, // 검색 키워드
			fromTime: payload.fromTime, // 생성일시 (시작)
			toTime: payload.toTime, // 생성일시 (종료)
			id: payload.id, // 정책 ID
		},
		headers: {
			Range: payload.range,
			'Content-Type': contentType.JSON,
		},
		baseURL: process.env.REACT_APP_OPEN_API_URL,
	});
	return response;
});

/**************************************************
 * ambacc244 - IAM policy id로 검색 요청 액션
 **************************************************/
const findPolicyById = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/policies/${payload.id}`,
			{
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		creatingPolicyMode: false,
	},
	reducers: {
		changeCreatingPolicyMode: (state, {payload}) => {
			state.creatingPolicyMode = payload.mode;
		},
	},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.creatingPolicyMode,
	(creatingPolicyMode) => {
		return {creatingPolicyMode};
	},
);

const IAM_POLICY_MANAGEMENT_POLICIES = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createPolicy,
		findAll,
		findPolicyById,
		updatePolicy,
		deletePolicy,
	},
};

export default IAM_POLICY_MANAGEMENT_POLICIES;
