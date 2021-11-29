import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../../api/constants';

const NAME = 'IAM_ROLES_GRANT_ROLE_GROUP';

//사용자 그룹을 대상으로 Role 권한을 부여한다.
const grantAction = createAsyncThunk(
	`${NAME}/GRANT`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		const response = await Axios.post(
			`/open-api/v1/iam/user-groups//${payload.id}/roles`,
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
					'Content-Type': 'application/json',
				},
				params: {
					roleld: payload.roleld,
				},
				baseUrl: baseURL.openApi,
			},
		);
		return response.data;
	},
);

//사용자 그룹을 대상으로 부여된 Role 권한을 해제한다.
const revokeAction = createAsyncThunk(
	`${NAME}/REVOKE `,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		const response = await Axios.put(
			`/open-api/v1/iam/user-groups//${payload.id}/roles`,
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
					'Content-Type': 'application/json',
				},
				params: {
					roleld: payload.roleld,
				},
				baseUrl: baseURL.openApi,
			},
		);
		return response.data;
	},
);

//사용자 그룹을 대상으로 부여된 Role 권한을 조회한다.
const getsAction = createAsyncThunk(
	`${NAME}/GETS`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		const response = await Axios.get(
			`/open-api/v1/iam/user-groups/${payload.id}/roles`,
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
					'Content-Type': 'application/json',
					Range: payload.range,
				},
				baseUrl: baseURL.openApi,
			},
		);
		return {data: response.data, headers: response.headers};
	},
);

//사용자 그룹을 대상으로 Role의 관계에 대한 이벤트 내역을 다양한 조건을 통해 조회한다.
const getEventsAction = createAsyncThunk(
	`${NAME}/GET_EVENTS`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		const response = await Axios.get(
			`//open-api/v1/iam/user-groups//${payload.id}/roles/events`,
			{
				params: {
					fromTime: payload.fromTime,
					toTime: payload.toTime,
					roleId: payload.roleId,
				},
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
					Range: payload.range,
					'Content-Type': 'application/json',
				},
				baseUrl: baseURL.openApi,
			},
		);
		return {data: response.data, headers: response.headers};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		roles: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[getsAction.pending]: (state) => {
			state.loading = true;
		},
		[getsAction.fulfilled]: (state, action) => {
			state.roles = action.payload;
			state.loading = false;
		},
		[getsAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.roles,
	(state) => state.error,
	(state) => state.loading,
	(roles, error, loading) => {
		return {roles, error, loading};
	},
);

const IAM_ROLES_GRANT_ROLE_GROUP = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		grantAction,
		revokeAction,
		getsAction,
		getEventsAction,
	},
};

export default IAM_ROLES_GRANT_ROLE_GROUP;
