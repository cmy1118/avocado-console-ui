import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {Axios} from '../../../../api/constants';
import {contentType} from '../../../../utils/auth';

const NAME = 'RRM_RESOURCE';

const findResourceByIdAction = createAsyncThunk(
	`${NAME}/FIND_BY_ID`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/remote-resources/${payload.id}`,
			{
				headers: {
					'Content-Type': contentType.JSON,
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
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
					'Content-Type': contentType.JSON,
					Range: payload.range || `elements=0-50`,
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);

		return response.data;
	},
);

const findAllAccountAction = createAsyncThunk(
	`${NAME}/findAllAccount`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/remote-resources/users`,
			{
				params: {
					resourceId: payload.resourceId,
					// userId: 'root',
					credentialType: 'Password',
				},
				headers: {
					'Content-Type': contentType.JSON,
					Range: 'elements=0-50',
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
			},
		);
		// console.log(response);
		return response.data;
	},
);

const findAllServicePortAction = createAsyncThunk(
	`${NAME}/FIND_ALL_SERVICE_PORT`,
	async (payload) => {
		const response = await Axios.get(
			`/open-api/v1/pam/remote-resources/${payload.id}/ports`,
			{
				headers: {
					'Content-Type': contentType.JSON,
					Range: `elements=${payload.first}-${payload.last}`,
				},
				baseURL: process.env.REACT_APP_OPEN_API_URL,
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
