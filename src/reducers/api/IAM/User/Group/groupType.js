import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../../../../api/constants';

const NAME = 'IAM_USER_GROUP_TYPE';

//todo : this function requires id, companyId, name, password, email, telephone and mobile
const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {client} = getState().client;
		// eslint-disable-next-line no-console
		console.log(client);
		const response = await axios.post(
			`/open/api/v1/users`,
			{
				id: payload.id,
				companyId: payload.companyId,
				name: payload.name,
				password: payload.password,
				email: payload.email,
				telephone: payload.telephone,
				mobile: payload.mobile,
			},
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);
//todo : this function requires uid, name and password
const updateAction = createAsyncThunk(
	`${NAME}/UPDATE`,
	async (payload, {getState}) => {
		const {client} = getState().client;

		const response = await axios.put(
			`/open/api/v1/users/${payload.uid}`,
			{
				name: payload.name,
				password: payload.password,
			},
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires uid
const deleteAction = createAsyncThunk(
	`${NAME}/DELETE`,
	async (payload, {getState}) => {
		const {client} = getState().client;

		const response = await axios.delete(
			`/open/api/v1/users/${payload.uid}`,
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires id
const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload, {getState}) => {
		const {client} = getState().client;

		const response = await axios.get(
			`/open/api/v1/users/id/${payload.id}`,
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

//todo : this function requires uid
const findByUidAction = createAsyncThunk(
	`${NAME}/FIND_BY_UID`,
	async (payload, {getState}) => {
		const {client} = getState().client;

		const response = await axios.get(`/open/api/v1/users/${payload.uid}`, {
			headers: {
				Authorization: `${client.token_type} ${client.access_token}`,
			},
			baseURL: baseUrl.openApi,
		});
		return response.data;
	},
);

//todo : this function requires companyId, first range and last range
const findAllAction = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {client} = getState().client;

		const response = await axios.get(`/open/api/v1/users`, {
			params: {
				companyId: payload.companyId,
			},
			headers: {
				Authorization: `${client.token_type} ${client.access_token}`,
				Range: `elements=${payload.first}-${payload.last}`,
			},
			baseURL: baseUrl.openApi,
		});
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		index: 4,
		//groups, authType, MFA, tags, lastConsoleLogin, creationDate는 다른 곳으로 빠질 예정 => 아직 다른 부분 생성 전이라 users에 추가
		groupTypes: [
			{
				id: 'groupType1',
				name: '사용자 레벨',
				parentId: null,
				description: '사용자 권한 레벨을 분류하기 위한 유형',
				creationDate: '2021.03.02 15:55:32',
			},
			{
				id: 'groupType2',
				name: '직무',
				parentId: null,
				description: '사용자의 직무 유형',
				creationDate: '2021.03.02 15:55:32',
			},
			{
				id: 'groupType3',
				name: '조직',
				parentId: null,
				description: '회사의 조직',
				creationDate: '2021.03.02 15:55:32',
			},
		],

		loading: false,
		error: null,
	},
	reducers: {
		addGroupType: (state, {payload}) => {
			state.groupTypes.unshift({
				id: 'groupType_' + state.index.toString(),
				name: payload.name,
				parentId: payload.parentId,
				description: payload.description,
				creationDate: new Date().toLocaleString(),
			});
			state.index++;
		},
	},
	extraReducers: {
		[createAction.pending]: (state) => {
			state.loading = true;
		},
		[createAction.fulfilled]: (state, action) => {
			state.user = action.payload;
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
			state.user = action.payload;
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
			state.user = action.payload;
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
			state.user = action.payload;
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
			state.user = action.payload;
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
			state.user = action.payload;
			state.loading = false;
		},
		[findAllAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

// 외부에서 사용할 값만 selector 에 넣어주시면 됩니다.
const selectAllState = createSelector(
	(state) => state.groupTypes,
	(groupTypes) => {
		return {groupTypes};
	},
);

// NAME 의 value 값으로 변수명 선언
const IAM_USER_GROUP_TYPE = {
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
	},
};

export default IAM_USER_GROUP_TYPE;
