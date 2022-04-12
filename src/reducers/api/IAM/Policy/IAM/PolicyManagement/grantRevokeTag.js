import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {Axios, baseURL} from '../../../../../../api/constants';
import {contentType} from '../../../../../../utils/auth';

const NAME = 'IAM_GRANT_REVOKE_TAG';

/**************************************************
 * ambacc244 - IAM role에 정책을 부여
 **************************************************/
const grantAction = createAsyncThunk(
	`${NAME}/GRANT`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.post(
			`/open-api/v1/iam/tags/${payload.tagName}/policies`,
			{
				name: payload.policyName,
				managementType: payload.managementType,
				policyIds: payload.policyIds,
				value: payload.tagValue,
				operatorType: payload.operatorType,
				attributeType: payload.attributeType,
			},
			{
				headers: {
					'Content-Type': contentType.JSON,
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
const revokeAction = createAsyncThunk(
	`${NAME}/REVOKE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.delete(`/open-api/v1/iam/tags/policies`, {
			headers: {},
			params: {
				configurationId: payload.configurationId,
				policyId: payload.policyIds,
			},
			baseURL: baseURL.openApi,
		});
		return response.data;
	},
);

/**************************************************
 * ambacc244 - IAM role에 부여된 규칙/정책을 조회
 **************************************************/
const findAllAction = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		return await Axios.get(
			`/open-api/v1/iam/tags/${payload.tagName}/policies`,
			{
				params: {
					keyword: payload.keyword,
					exclude: payload.exclude,
					attributeType: payload.attributeType,
					value: payload.value,
				},
				headers: {
					Range: 'elements=0-50',
				},
				baseURL: baseURL.openApi,
			},
		);
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.loading,
	(state) => state.error,
	(loading, error) => {
		return {loading, error};
	},
);

const IAM_GRANT_REVOKE_TAG = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {grantAction, revokeAction, findAllAction},
};

export default IAM_GRANT_REVOKE_TAG;
