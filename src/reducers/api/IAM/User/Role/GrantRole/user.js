import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios} from '../../../../../../api/constants';
import {contentType} from '../../../../../../utils/auth';

const NAME = 'IAM_ROLES_GRANT_ROLE_USER';

//사용자를 대상으로 Role 권한을 부여한다.
const grantAction = createAsyncThunk(`${NAME}/GRANT`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/iam/users/${payload.userUid}/roles`,
		[...payload.roleIds],
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

//사용자를 대상으로 부여된 Role 권한을 해제한다.
const revokeAction = createAsyncThunk(`${NAME}/REVOKE `, async (payload) => {
	const response = await Axios.delete(
		`/open-api/v1/iam/users/${payload.userUid}/roles`,
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			params: {
				roleId: [...payload.roleId],
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

//사용자를 대상으로 부여된 Role 권한을 조회한다.
const getsAction = createAsyncThunk(`${NAME}/GETS`, async (payload) => {
	const response = await Axios.get(
		`/open-api/v1/iam/user-groups/${payload.userUid}/roles`,
		{
			headers: {
				'Content-Type': contentType.JSON,
				Range: 'elements=0-50',
			},
			params: {
				exclude: payload.exclude,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	console.log('IAM_ROLES_GRANT_ROLE_USER_getsAction', response);
	return {data: response.data, headers: response.headers};
});

//사용자를 대상으로 Role의 관계에 대한 이벤트 내역을 다양한 조건을 통해 조회한다.
const getEventsAction = createAsyncThunk(
	`${NAME}/GET_EVENTS`,
	async (payload) => {
		const response = await Axios.get(
			`//open-api/v1/iam/users/${payload.userUid}/roles/events`,
			{
				params: {
					fromTime: payload.fromTime,
					toTime: payload.toTime,
					roleId: payload.roleId,
				},
				headers: {
					Range: payload.range,
					'Content-Type': contentType.JSON,
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		return {data: response.data, headers: response.headers};
	},
);

//사용자 등록 정보를 역할 ID를 기반으로 조회한다.
const findUsersByIdAction = createAsyncThunk(
	`${NAME}/FIND_USER_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/roles/${payload.roleId}/users`,
			{
				params: {
					exclude: payload.exclude,
					keyword: payload.keyword,
				},
				headers: {
					Range: payload.range,
					'Content-Type': contentType.JSON,
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		console.log('response:', response);
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		//userList : 사용자 등록 정보를 역할 ID를 기반으로 조회한 .
		userList: [],
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
		[findUsersByIdAction.pending]: (state) => {
			state.loading = true;
		},
		[findUsersByIdAction.fulfilled]: (state, action) => {
			state.userList = action.payload.data;
			state.loading = false;
		},
		[findUsersByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.userRoles,
	(state) => state.userList,
	(state) => state.error,
	(state) => state.loading,
	(userRoles, userList, error, loading) => {
		return {userRoles, userList, error, loading};
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
		findUsersByIdAction,
	},
};

export default IAM_ROLES_GRANT_ROLE_USER;
