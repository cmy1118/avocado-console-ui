import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import * as _ from 'lodash';
import {baseUrl} from '../../../../api/constants';

const NAME = 'RRM_GROUP_TYPE';

const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;
		const response = await axios.post(
			`/open/api/v1/remote/resources/group-types`,
			{
				name: payload.name, //desc: 그룹 유형 명 / type: string
				description: payload.description, //desc: 설명 / type: string
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
const updateAction = createAsyncThunk(
	`${NAME}/UPDATE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.put(
			`/open/api/v1/remote/resources/group-types/${payload.id}`,
			{
				name: payload.name, //desc: 그룹 유형 명 / type: string
				description: payload.description, //desc: 설명 / type: string
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

const deleteAction = createAsyncThunk(
	`${NAME}/DELETE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.delete(
			`/open/api/v1/remote/resources/group-types/${payload.id}`,
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

const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.get(
			`/open/api/v1/remote/resources/group-types/${payload.id}`,
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

const findAllAction = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await axios.get(
			`/open/api/v1/remote/resources/group-types`,
			{
				params: {
					...(payload.name && {type: payload.name}),
				},
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
					Range: `elements=${payload.first}-${payload.last}`,
				},
				baseURL: baseUrl.openApi,
			},
		);
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		types: [],
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
		[findByIdAction.fulfilled]: (state, action) => {
			//todo : 정보가 수정되었을 경우 update 해줄 수 있도록 로직 수정해야 함.
			//  우선은 그대로 작성.
			state.types = _.uniqBy(
				state.types.concat(action.payload),
				(e) => e.id,
			);
			state.loading = false;
		},
		[findByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findAllAction.pending]: (state) => {
			state.loading = true;
		},
		[findAllAction.fulfilled]: (state, action) => {
			//todo : 정보가 수정되었을 경우 update 해줄 수 있도록 로직 수정해야 함.
			//  우선은 그대로 작성.
			state.types = _.uniqBy(
				state.types.concat(action.payload),
				(e) => e.id,
			);
			state.loading = false;
		},
		[findAllAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.resources,
	(state) => state.error,
	(state) => state.loading,
	(resources, error, loading) => {
		return {resources, error, loading};
	},
);

// NAME 의 value 값으로 변수명 선언
const RRM_GROUP_TYPE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		updateAction,
		deleteAction,
		findByIdAction,
		findAllAction,
	},
};

export default RRM_GROUP_TYPE;
