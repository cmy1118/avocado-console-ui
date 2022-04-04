import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Axios, baseURL} from '../../../../../api/constants';

const NAME = 'IAM_ROLES';

const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.post(
			`/open-api/v1/iam/roles`,
			{
				name: payload.name,
				description: payload.description,
				maxGrants: payload.maxGrants, //최대 승인 수 0 : 제한없음 N: 부여 가능 수
				parentIds: payload.parentIds,
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

const updateAction = createAsyncThunk(
	`${NAME}/UPDATE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.put(
			`/open-api/v1/iam/roles/${payload.id}`,
			{
				id: 'role3',
				name: 'userAuth-role',
				description: '일반 User에게 부여 하는 역할',
				type: 'Public',
				users: ['user3', 'user8', 'user9', 'user10'],
				groups: ['group4'],
				companyId: null,
				policies: [
					'policy1',
					'policy2',
					'policy3',
					'policy4',
					'policy5',
					'policy6',
					'policy7',
				],
				creationDate: '2019.07.22 16:26:12',
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

const deleteAction = createAsyncThunk(
	`${NAME}/DELETE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;
		const response = await Axios.delete(
			`/open-api/v1/iam/roles/${payload.id}`,
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

const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;
		const response = await Axios.get(
			`/open-api/v1/iam/roles/${payload.id}`,
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

const getsAction = createAsyncThunk(
	`${NAME}/GETS`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(`/open-api/v1/iam/roles`, {
			params: {
				keyword: payload.keyword,
				id: payload.ids,
				typeCode: payload.typeCode,
				fromTime: payload.fromTime,
				toTime: payload.toTime,
				maxGrants: payload.maxGrants,
			},
			headers: {
				Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				Range: payload.range,
			},

			baseURL: baseURL.openApi,
		});
		console.log(response);
		return response;
	},
);

const getEventsAction = createAsyncThunk(
	`${NAME}/GET_EVENTS`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;
		const response = await Axios.get(`/open-api/v1/iam/roles/events`, {
			headers: {
				Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				Range: payload.range,
			},
			params: {
				fromTime: payload.fromTime,
				toTime: payload.toTime,
				roleld: payload.roleld,
			},
			baseURL: baseURL.openApi,
		});
		return {data: response.data, headers: response.headers};
	},
);

//역할에 미포함/포함된 정책 템플릿을 조회한다.
const findTemplatesAction = createAsyncThunk(
	`${NAME}/FIND_TEMPLATES`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(
			`/open-api/v1/iam/roles/${payload.roleId}/policy-templates`,
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					Range: payload.range,
				},
				params: {
					includea: payload.include,
				},
				baseURL: baseURL.openApi,
			},
		);
		//	console.log(response.data);
		return {data: response.data, headers: response.headers};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		policy: [],
		role: null,
		roles: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		// [createAction.pending]: (state) => {
		// 	state.loading = true;
		// },
		// [createAction.fulfilled]: (state, action) => {
		// 	state.loading = false;
		// },
		// [createAction.rejected]: (state, action) => {
		// 	state.error = action.payload;
		// 	state.loading = false;
		// },
		// [updateAction.pending]: (state) => {
		// 	state.loading = true;
		// },
		// [updateAction.fulfilled]: (state, action) => {
		// 	state.loading = false;
		// },
		// [updateAction.rejected]: (state, action) => {
		// 	state.error = action.payload;
		// 	state.loading = false;
		// },
		// [deleteAction.pending]: (state) => {
		// 	state.loading = true;
		// },
		// [deleteAction.fulfilled]: (state, action) => {
		// 	state.loading = false;
		// },
		// [deleteAction.rejected]: (state, action) => {
		// 	state.error = action.payload;
		// 	state.loading = false;
		// },
		[findByIdAction.pending]: (state) => {
			state.loading = true;
		},
		[findByIdAction.fulfilled]: (state, action) => {
			state.role = action.payload;
			state.loading = false;
		},
		[findByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[getsAction.pending]: (state) => {
			state.loading = true;
		},
		[getsAction.fulfilled]: (state, action) => {
			state.roles = action.payload.data;
			state.loading = false;
		},
		[getsAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		// [getEventsAction.pending]: (state) => {
		// 	state.loading = true;
		// },
		// [getEventsAction.fulfilled]: (state, action) => {
		// 	state.loading = false;
		// },
		// [getEventsAction.rejected]: (state, action) => {
		// 	state.error = action.payload;
		// 	state.loading = false;
		// },
		[findTemplatesAction.pending]: (state) => {
			state.loading = true;
		},
		[findTemplatesAction.fulfilled]: (state, action) => {
			state.policy = action.payload.data;
			state.loading = false;
		},
		[findTemplatesAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.policy,
	(state) => state.role,
	(state) => state.roles,
	(state) => state.error,
	(state) => state.loading,
	(policy, role, roles, error, loading) => {
		return {policy, role, roles, error, loading};
	},
);

const IAM_ROLES = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		getsAction,
		createAction,
		updateAction,
		deleteAction,
		findByIdAction,
		// getsAction,
		getEventsAction,
		findTemplatesAction,
	},
};

export default IAM_ROLES;
