import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {Axios} from '../../../../../api/constants';
import {contentType} from '../../../../../utils/auth';

const NAME = 'IAM_USER';

//todo : this function requires id, companyId, name, password, email, telephone and mobile
const createAction = createAsyncThunk(`${NAME}/CREATE`, async (payload) => {
	const response = await Axios.post(
		`/open-api/v1/iam/users`,
		{
			id: payload.id,
			name: payload.name,
			password: payload.password,
			email: payload.email,
			telephone: payload.telephone,
			mobile: payload.mobile,
		},
		{
			headers: {
				'Content-Type': contentType.JSON,
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return {data: response.data, headers: response.headers};
});
//todo : this function requires uid, name and password
const updateAction = createAsyncThunk(`${NAME}/UPDATE`, async (payload) => {
	const response = await Axios.put(
		`/open-api/v1/iam/users/${payload.userUid}`,
		{
			name: payload.name,
			password: payload.password,
			email: payload.email,
			telephone: payload.telephone,
			mobile: payload.mobile,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

//todo : this function requires uid
const deleteAction = createAsyncThunk(`${NAME}/DELETE`, async (payload) => {
	const response = await Axios.delete(
		`/open-api/v1/iam/users/${payload.userUid}`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: process.env.REACT_APP_OPEN_API_URL,
		},
	);
	return response.data;
});

//todo : this function requires id
const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/user-ids/${payload.id}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		return response.data;
	},
);

//todo : this function requires uid
//사용자 등록 정보를 UID 기반으로 조회
const findByUidAction = createAsyncThunk(
	`${NAME}/FIND_BY_UID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/users/${payload.userUid}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		return response.data;
	},
);

//todo : this function requires companyId, first range and last range
const findAllAction = createAsyncThunk(`${NAME}/FIND_ALL`, async (payload) => {
	const response = await Axios.get(`/open-api/v1/iam/users`, {
		params: {
			keyword: payload.keyword,
			userUid: payload.userUid,
			id: payload.id,
			accountExpiryTime: payload.accountExpiryTime,
			passwordExpiryTime: payload.passwordExpiryTime,
			createdTime: payload.createdTime,
		},
		headers: {
			Range: payload.range,
		},
		baseURL: process.env.REACT_APP_OPEN_API_URL,
	});
	//	console.log(response);
	return {data: response.data, headers: response.headers};
});

//todo : this function requires companyId, first range and last range
const getUserGroupsAction = createAsyncThunk(
	`${NAME}/GET_INCLUDE_GROUPS`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/iam/users/${payload.userUid}/user-groups`,
			{
				params: {
					groupTypeId: payload.groupTypeId,
					includeGroup: payload.includeGroup,
				},
				headers: {
					Range: payload.range,
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		return {data: response.data, headers: response.headers};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		user: null,
		users: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[createAction.pending]: (state) => {
			state.loading = true;
		},
		[createAction.fulfilled]: (state) => {
			state.loading = false;
		},
		[createAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[updateAction.pending]: (state) => {
			state.loading = true;
		},
		[updateAction.fulfilled]: (state) => {
			state.loading = false;
		},
		[updateAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[deleteAction.pending]: (state) => {
			state.loading = true;
		},
		[deleteAction.fulfilled]: (state) => {
			state.loading = false;
		},
		[deleteAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findByIdAction.pending]: (state) => {
			state.loading = true;
		},
		[findByIdAction.fulfilled]: (state) => {
			state.loading = false;
		},
		[findByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findByUidAction.pending]: (state) => {
			state.loading = true;
		},
		[findByUidAction.fulfilled]: (state) => {
			state.loading = false;
		},
		[findByUidAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findAllAction.pending]: (state) => {
			state.loading = true;
		},
		[findAllAction.fulfilled]: (state, action) => {
			state.users = action.payload.data;
			state.loading = false;
		},
		[findAllAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[getUserGroupsAction.pending]: (state) => {
			state.loading = true;
		},
		[getUserGroupsAction.fulfilled]: (state) => {
			state.loading = false;
		},
		[getUserGroupsAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.users,
	(state) => state.user,
	(state) => state.error,
	(state) => state.loading,
	(users, user, error, loading) => {
		return {users, user, error, loading};
	},
);

// NAME 의 value 값으로 변수명 선언
const IAM_USER = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		updateAction,
		deleteAction,
		findByIdAction,
		findByUidAction,
		findAllAction,
		getUserGroupsAction,
	},
};

export default IAM_USER;
