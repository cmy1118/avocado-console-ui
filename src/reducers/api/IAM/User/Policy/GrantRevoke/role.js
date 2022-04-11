import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../../api/constants';

const NAME = 'IAM_USER_POLICY_GRANT_REVOKE_ROLE';

//역할에 부여된 정책 조회
const findAllAction = createAsyncThunk(
	`${NAME}/GETS`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(
			`/open-api/v1/iam/roles/${payload.roleId}/policies`,
			{
				params: {
					exclude: payload.exclude,
					type: payload.type,
					keyword: payload.keyword,
				},
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': 'application/json',
					Range: 'elements=0-50',
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data || [];
	},
);

//사용자 그룹을 대상으로 Role 권한을 부여한다.
const grantAction = createAsyncThunk(
	`${NAME}/GRANT`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;
		// eslint-disable-next-line no-console
		const response = await Axios.post(
			`/open-api/v1/iam/roles/${payload.roleId}/policies/${payload.policyId}`,
			{
				order: payload.order,
			},
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

//사용자 그룹을 대상으로 부여된 Role 권한을 해제한다.
const revokeAction = createAsyncThunk(
	`${NAME}/REVOKE `,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;
		// eslint-disable-next-line no-console
		console.log('payload.roleld:', payload.roleId);
		const response = await Axios.delete(
			`/open-api/v1/iam/roles/${payload.roleId}/policies/${payload.policyId}`,
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {},
	reducers: {},
	extraReducers: {},
});

const selectAllState = createSelector(() => {
	return {};
});

const IAM_USER_POLICY_GRANT_REVOKE_ROLE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findAllAction,
		grantAction,
		revokeAction,
	},
};

export default IAM_USER_POLICY_GRANT_REVOKE_ROLE;
