import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../../../../api/constants';

const NAME = 'IAM_USER_GROUP';

//todo : this function requires id, companyId, name, password, email, telephone and mobile
const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;
		// eslint-disable-next-line no-console
		console.log(client);
		const response = await axios.post(
			`/open-api/v1/iam/user-groups`,
			{
				name: payload.name,
				userGroupTypeId: payload.userGroupTypeId,
				parentId: payload.parentId,
				members: payload.members,
			},
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);
//todo : this function requires uid, name and password
const updateAction = createAsyncThunk(
	`${NAME}/UPDATE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.put(
			`/open-api/v1/iam/user-groups/${payload.id}`,
			{
				name: payload.name,
				userGroupTypeId: payload.userGroupTypeId,
				members: payload.members, // uid
				targetParentId: payload.targetParentId,
			},
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires uid
const deleteAction = createAsyncThunk(
	`${NAME}/DELETE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.delete(
			`/open-api/v1/iam/user-groups/${payload.id}`,
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires id
const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.get(
			`/open-api/v1/iam/user-groups/id/${payload.id}`,
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseURL.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires uid
const findByUidAction = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.get(`/open-api/v1/iam/user-groups`, {
			params: {
				name: payload.name,
				groupTypeId: payload.groupTypeId,
				parentId: payload.parentId,
				keyword: payload.keyword,
				id: payload.id,
				createdTime: payload.createdTime,
			},
			headers: {
				Authorization: `${client.token_type} ${client.access_token}`,
				'Content-Type': 'application/json',
				Range: `elements=${payload.first}-${payload.last}`,
			},
			baseURL: baseURL.openApi,
		});
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		groups: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[createAction.pending]: (state) => {
			state.loading = true;
		},
		[createAction.fulfilled]: (state, action) => {
			state.groups = action.payload;
			state.loading = false;
		},
		[createAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[updateAction.pending]: (state) => {
			state.loading = true;
		},
		[updateAction.fulfilled]: (state, action) => {
			state.groups = action.payload;
			state.loading = false;
		},
		[updateAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[deleteAction.pending]: (state) => {
			state.loading = true;
		},
		[deleteAction.fulfilled]: (state, action) => {
			state.groups = action.payload;
			state.loading = false;
		},
		[deleteAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findByIdAction.pending]: (state) => {
			state.loading = true;
		},
		[findByIdAction.fulfilled]: (state, action) => {
			state.groups = action.payload;
			state.loading = false;
		},
		[findByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findByUidAction.pending]: (state) => {
			state.loading = true;
		},
		[findByUidAction.fulfilled]: (state, action) => {
			state.groups = action.payload;
			state.loading = false;
		},
		[findByUidAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.groups,
	(groups) => {
		return {groups};
	},
);

// NAME 의 value 값으로 변수명 선언
const IAM_USER_GROUP = {
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
	},
};

export default IAM_USER_GROUP;
