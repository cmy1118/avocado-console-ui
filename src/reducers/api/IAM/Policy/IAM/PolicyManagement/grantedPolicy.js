import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios} from '../../../../../../api/constants';

const NAME = 'IAM_GRANTED_POLICY';

/**************************************************
 * ambacc244 - IAM role에 부여된 규칙/정책을 조회
 **************************************************/
const getDetailsByRole = createAsyncThunk(
	`${NAME}/GET_DETAIL_BY_ROLE`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/roles/${payload.roleId}/policy-details`,
			{
				params: {
					resource: payload.resource,
					action: payload.action,
					effect: payload.effect,
					ruleType: payload.ruleType,
				},

				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		return response.data;
	},
);

/**************************************************
 * ambacc244 - IAM policy에 부여된 규칙/정책을 조회
 **************************************************/
const getDetailsByPolicy = createAsyncThunk(
	`${NAME}/GET_DETAIL_BY_POLICY`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/policies/${payload.policyId}/policy-details`,
			{
				params: {
					resource: payload.resource,
					action: payload.action,
					effect: payload.effect,
					ruleType: payload.ruleType,
				},
				headers: {
					range: 'elements=0-50',
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		return response.data;
	},
);

const selectAllState = createSelector(
	(state) => state.creatingPolicyMode,
	(creatingPolicyMode) => {
		return {creatingPolicyMode};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {},
	reducers: {},
	extraReducers: {},
});

const IAM_GRANTED_POLICY = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {getDetailsByRole, getDetailsByPolicy},
};

export default IAM_GRANTED_POLICY;
