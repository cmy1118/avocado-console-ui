import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../../api/constants';

const NAME = 'IAM_GRANT_POLICY_BY_USER';

//사용자 그룹을 대상으로 Role 권한을 부여한다.
const grantAction = createAsyncThunk(
	`${NAME}/GRANT`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;
		// eslint-disable-next-line no-console
		const response = await Axios.post(
			`/open-api/v1/iam/roles/${payload.userUid}/policy-templates`,
			{},
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
		const response = await Axios.delete(
			`/open-api/v1/iam/roles/${payload.userUid}/policy-templates`,
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': 'application/json',
				},
				params: {
					templateId: payload.templateId,
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

//사용자 그룹을 대상으로 부여된 Role 권한을 조회한다.
const getsAction = createAsyncThunk(
	`${NAME}/GETS`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;
		// eslint-disable-next-line no-console
		const response = await Axios.get(
			`/open-api/v1/iam/roles/policy-templates`,
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': 'application/json',
					Range: payload.range,
				},
				params: {
					userUid: payload.userUid,
				},
				baseURL: baseURL.openApi,
			},
		);
		return {data: response.data, headers: response.headers};
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
	(state) => state.roles,
	(state) => state.groupList,
	(state) => state.error,
	(state) => state.loading,
	(roles, groupList, error, loading) => {
		return {roles, groupList, error, loading};
	},
);

const IAM_GRANT_POLICY_BY_USER = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		grantAction,
		revokeAction,
		getsAction,
	},
};

export default IAM_GRANT_POLICY_BY_USER;
