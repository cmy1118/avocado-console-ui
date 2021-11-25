import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseUrl} from '../../../../../../api/constants';

const NAME = 'IAM_ROLES_GRANT_ROLE_USER';

//사용자를 대상으로 Role 권한을 부여한다.
const grantAction = createAsyncThunk(
	`${NAME}/GRANT`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		console.log(user);
		// eslint-disable-next-line no-console
		const response = await Axios.post(
			`/open-api/v1/iam/users/${payload.userUid}/roles`,
			[...payload.roleIds],
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

//사용자를 대상으로 부여된 Role 권한을 해제한다.
const revokeAction = createAsyncThunk(
	`${NAME}/REVOKE `,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		const response = await Axios.put(
			`/open-api/v1/iam/users/${payload.userUid}/roles`,
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
					'Content-Type': 'application/json',
				},
				params: {
					roleId: payload.roleId,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

//사용자를 대상으로 부여된 Role 권한을 조회한다.
const getsAction = createAsyncThunk(
	`${NAME}/GETS`,
	async (payload, {getState}) => {
		console.log('payload.userUid:', payload.userUid);
		console.log('payload.range:', payload.range);
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		const response = await Axios.get(
			`/open-api/v1/iam/users/${payload.userUid}/roles`,
			{
				headers: {
					Authorization: `${user.token_type} ${user.access_token}`,
					'Content-Type': 'application/json',
					Range: payload.range,
				},
				baseURL: baseUrl.openApi,
			},
		);
		console.log('IAM_ROLES_GRANT_ROLE_USER_getsAction', response.data);
		return {data: response.data || [], headers: response.headers};
	},
);

//사용자를 대상으로 Role의 관계에 대한 이벤트 내역을 다양한 조건을 통해 조회한다.
const getEventsAction = createAsyncThunk(
	`${NAME}/GET_EVENTS`,
	async (payload, {getState}) => {
		const {user} = getState().AUTH_USER;
		// eslint-disable-next-line no-console
		const response = await Axios.get(
			`//open-api/v1/iam/users/${payload.userUid}/roles/events`,
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
				baseURL: baseUrl.openApi,
			},
		);
		return {data: response.data, headers: response.headers};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		userRoles: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[grantAction.pending]: (state) => {
			state.loading = true;
		},
		[grantAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[grantAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[revokeAction.pending]: (state) => {
			state.loading = true;
		},
		[revokeAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[revokeAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[getsAction.pending]: (state) => {
			state.loading = true;
		},
		[getsAction.fulfilled]: (state, action) => {
			state.userRoles = action.payload.data;
			state.loading = false;
		},
		[getsAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.userRoles,
	(state) => state.error,
	(state) => state.loading,
	(userRoles, error, loading) => {
		return {userRoles, error, loading};
	},
);

const IAM_ROLES_GRANT_ROLE_USER = {
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

export default IAM_ROLES_GRANT_ROLE_USER;
