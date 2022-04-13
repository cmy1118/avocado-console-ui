import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios} from '../../../../../../api/constants';

const NAME = 'IAM_ROLES_GRANT_ROLE_GROUP';

//사용자 그룹을 대상으로 Role 권한을 부여한다.
const grantAction = createAsyncThunk(`${NAME}/GRANT`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/iam/user-groups/${payload.id}/roles`,
		[...payload.roleId],
		{
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

//사용자 그룹을 대상으로 부여된 Role 권한을 해제한다.
const revokeAction = createAsyncThunk(`${NAME}/REVOKE `, async (payload) => {
	console.log('payload.roleId:', payload.roleId);
	const response = await Axios.delete(
		`/open-api/v1/iam/user-groups/${payload.id}/roles`,
		{
			validateStatus: function (status) {
				return status;
			},
			headers: {
				'Content-Type': 'application/json',
			},
			params: {
				roleId: payload.roleId,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

//사용자 그룹을 대상으로 부여된 Role 권한을 조회한다.
const getsAction = createAsyncThunk(`${NAME}/GETS`, async (payload) => {
	const response = await Axios.get(
		`/open-api/v1/iam/user-groups/${payload.id}/roles`,
		{
			headers: {
				'Content-Type': 'application/json',
				Range: 'elements=0-50',
			},
			params: {
				exclude: payload.exclude,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return {data: response.data, headers: response.headers};
});

//사용자 그룹을 대상으로 Role의 관계에 대한 이벤트 내역을 다양한 조건을 통해 조회한다.
const getEventsAction = createAsyncThunk(
	`${NAME}/GET_EVENTS`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/user-groups/${payload.id}/roles/events`,
			{
				params: {
					roleId: payload.roleId,
				},
				headers: {
					Range: payload.range,
					'Content-Type': 'application/json',
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		console.log('response:', response);
		return {data: response.data, headers: response.headers};
	},
);

//사용자 그룹 정보를 역할 ID를 기반으로 조회한다.
const findUserGroupsById = createAsyncThunk(
	`${NAME}/FIND_USER_GROUPS_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/roles/${payload.roleId}/user-groups`,
			{
				params: {
					exclude: payload.exclude,
					keyword: payload.keyword,
				},
				headers: {
					Range: payload.range,
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		groupList: [],
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
		[findUserGroupsById.pending]: (state) => {
			state.loading = true;
		},
		[findUserGroupsById.fulfilled]: (state, action) => {
			state.groupList = action.payload;
			state.loading = false;
		},
		[findUserGroupsById.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
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
		findUserGroupsById,
	},
};

export default IAM_ROLES_GRANT_ROLE_GROUP;
