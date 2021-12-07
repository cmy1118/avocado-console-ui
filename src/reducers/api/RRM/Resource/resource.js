import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as _ from 'lodash';

import {baseURL, Axios} from '../../../../api/constants';

const NAME = 'RRM_RESOURCE';

const createAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;
		const response = await Axios.post(
			`/open/api/v1/remote/resources`,
			{
				name: payload.name, //desc: 원격 자원 명 / type: string
				type: payload.type, //desc: 원격 자원 타입 / type: RemoteResourceTypes
				osType: payload.osType, //desc: 운영체제 타입 / type: OperatingSystems
				osName: payload.osName, //desc: 운영체제 명 / type: string
				cpuCore: payload.cpuCore, //desc: CPU 코어 수 / type: integer
				cpuThreadsPerCore: payload.cpuThreadsPerCore, //desc: CPU 코어 당 쓰레드 수 / type: integer
				memory: payload.memory, //desc: 메모리 크기 / type: integer
				servicePorts: payload.servicePorts, //desc: 서비스 포트 / type: ServicePorts
				tags: payload.tags, //desc: 태그 / type: Map
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
const updateAction = createAsyncThunk(
	`${NAME}/UPDATE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await Axios.put(
			`/open/api/v1/remote/resources/${payload.id}`,
			{
				name: payload.name, //desc: 원격 자원 명 / type: string
				osType: payload.osType, //desc: 운영체제 타입 / type: OperatingSystems
				osName: payload.osName, //desc: 운영체제 명 / type: string
				cpuCore: payload.cpuCore, //desc: CPU 코어 수 / type: integer
				cpuThreadsPerCore: payload.cpuThreadsPerCore, //desc: CPU 코어 당 쓰레드 수 / type: integer
				memory: payload.memory, //desc: 메모리 크기 / type: integer
				servicePorts: payload.servicePorts, //desc: 서비스 포트 / type: ServicePorts
				tags: payload.tags, //desc: 태그 / type: Map
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

const deleteAction = createAsyncThunk(
	`${NAME}/DELETE`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await Axios.delete(
			`/open/api/v1/remote/resources/${payload.id}`,
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

const findByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH_USER;

		const response = await Axios.get(
			`/open-api/v1/rrm/remote-resources/${payload.id}`,
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

const findAllAccountAction = createAsyncThunk(
	`${NAME}/findAllAccount`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH_USER;
		//	console.log(payload);
		const response = await Axios.get(
			`/open-api/v1/pam/remote-resources/users`,
			{
				params: {
					resourceId: payload.resourceId,
					// userId: 'root',
					credentialType: 'Password',
				},
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': 'application/json',
					Range: 'elements=0-50',
				},
				baseURL: baseURL.openApi,
			},
		);
		// console.log(response);
		return response.data;
	},
);

const findAllBasicAction = createAsyncThunk(
	`${NAME}/FIND_ALL_BASIC`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await Axios.get(`/open/api/v1/remote/resources`, {
			params: {
				...(payload.type && {type: payload.type}),
				...(payload.osType && {osType: payload.osType}),
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

const findAllServicePortAction = createAsyncThunk(
	`${NAME}/FIND_ALL_SERVICE_PORT`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await Axios.get(
			`/open/api/v1/remote/resources/${payload.id}/ports`,
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
					Range: `elements=${payload.first}-${payload.last}`,
				},
				baseURL: baseURL.openApi,
			},
		);
		return {id: payload.id, data: response.data};
	},
);

const findAllTagAction = createAsyncThunk(
	`${NAME}/FIND_ALL_TAG`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await Axios.get(
			`/open/api/v1/remote/resources/${payload.id}/tags`,
			{
				headers: {
					Authorization: `${client.token_type} ${client.access_token}`,
					'Content-Type': 'application/json',
					Range: `elements=${payload.first}-${payload.last}`,
				},
				baseURL: baseURL.openApi,
			},
		);
		return {id: payload.id, data: response.data};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		resources: {
			computingSystems: [],
			servicePorts: {},
			tags: [],
		},
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
			// console.log(action.payload);
			state.loading = false;
		},
		[findByIdAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findAllAccountAction.pending]: (state) => {
			state.loading = true;
		},
		[findAllAccountAction.fulfilled]: (state) => {
			state.loading = false;
		},
		[findAllAccountAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findAllBasicAction.pending]: (state) => {
			state.loading = true;
		},
		[findAllBasicAction.fulfilled]: (state, action) => {
			state.resources.computingSystems = _.uniqBy(
				state.resources.computingSystems.concat(action.payload),
				(e) => e.id,
			);
			state.loading = false;
		},
		[findAllBasicAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		[findAllServicePortAction.pending]: (state) => {
			state.loading = true;
		},
		[findAllServicePortAction.fulfilled]: (state, action) => {
			state.resources.servicePorts[action.payload.id] =
				action.payload.data;
			state.loading = false;
		},
		[findAllServicePortAction.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[findAllTagAction.pending]: (state) => {
			state.loading = true;
		},
		[findAllTagAction.fulfilled]: (state, action) => {
			state.resources.tags[action.payload.id] = action.payload.data;
			state.loading = false;
		},
		[findAllTagAction.rejected]: (state, action) => {
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

const RRM_RESOURCE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createAction,
		updateAction,
		deleteAction,
		findByIdAction,
		findAllBasicAction,
		findAllServicePortAction,
		findAllTagAction,
		findAllAccountAction,
	},
};

export default RRM_RESOURCE;
