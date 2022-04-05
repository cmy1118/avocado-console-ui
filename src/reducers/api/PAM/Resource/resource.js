import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {Axios, baseURL} from '../../../../api/constants';

const NAME = 'RRM_RESOURCE';

const findResourceByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(
			`/open-api/v1/pam/remote-resources/${payload.id}`,
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

const findAllResourcebByUserUidAction = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(
			`/open-api/v1/pam/users/${userAuth.user_uid}/remote-resources`,
			{
				params: {
					type: payload.type,
					osType: payload.osType,
					serviceType: payload.serviceType,
					parentGroupId: payload.parentId,
					keyword: payload.keyword,
					keyword2: payload.keyword2,
					includeChildNode: payload.includeChildNode,
					includeAccount: payload.includeAccount,
					excludeGroupIds: payload.excludeGroupIds,
				},
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': 'application/json',
					Range: payload.range || `elements=0-50`,
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
		const {userAuth} = getState().AUTH;
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

const findAllServicePortAction = createAsyncThunk(
	`${NAME}/FIND_ALL_SERVICE_PORT`,
	async (payload, {getState}) => {
		const {client} = getState().IAM_CLIENT;

		const response = await Axios.get(
			`/open-api/v1/pam/remote-resources/${payload.id}/ports`,
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
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.error,
	(state) => state.loading,
	(error, loading) => {
		return {error, loading};
	},
);

const RRM_RESOURCE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findResourceByIdAction,
		findAllServicePortAction,
		findAllAccountAction,
		findAllResourcebByUserUidAction,
	},
};

export default RRM_RESOURCE;
