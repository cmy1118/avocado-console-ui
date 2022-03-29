import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../api/constants';
import {contentType} from '../../../../../utils/auth';

const NAME = 'IAM_GRAN_REVOKE_ROLE';

/**************************************************
 * ambacc244 - IAM role에 정책을 부여
 **************************************************/
const grantRolePolicy = createAsyncThunk(
	`${NAME}/GRANT`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.post(
			`/open-api/v1/iam/roles/${payload.roleId}/policies/${payload.policyId}`,
			{order: payload.order},
			{
				headers: {
					'Content-Type': contentType.JSON,
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

/**************************************************
 * ambacc244 - IAM role에 정책을 부여 회수
 **************************************************/
const revokeRolePolicy = createAsyncThunk(
	`${NAME}/REVOKE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.delete(
			`/open-api/v1/iam/roles/${payload.roleId}/policies/${payload.policyId}`,
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

/**************************************************
 * ambacc244 - IAM role에 부여된 규칙/정책을 조회
 **************************************************/
const findAllRoleByPolicyId = createAsyncThunk(
	`${NAME}/FIND_ALL_BY_POLIY_ID`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(
			`/open-api/v1/iam/roles/policies/${payload.policyId}`,
			{
				params: {
					keyword: payload.keyword,
					exclude: payload.exclude,
				},
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					Range: 'elements=0-50',
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

const selectAllState = createSelector(
	(state) => state.creatingPolicyMode,
	(grantRolePolicy, revokeRolePolicy, creatingPolicyMode) => {
		return {grantRolePolicy, revokeRolePolicy, creatingPolicyMode};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {},
	reducers: {},
	extraReducers: {},
});

const IAM_GRAN_REVOKE_ROLE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {grantRolePolicy, revokeRolePolicy, findAllRoleByPolicyId},
};

export default IAM_GRAN_REVOKE_ROLE;
