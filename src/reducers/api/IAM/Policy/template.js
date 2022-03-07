import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../utils/auth';
import {Axios, baseURL} from '../../../../api/constants';

const NAME = 'IAM_POLICY_TEMPLATE';

const findAll = createAsyncThunk(
	`${NAME}/FIND_ALL`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.get(`/open-api/v1/iam/action-templates`, {
			params: {
				name: payload.name,
				description: payload.description,
			},
			headers: {
				Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
				Range: payload.range,
				// 'Content-Type': contentType.JSON,
			},
			baseURL: baseURL.openApi,
		});
		return {data: response.data};
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {},
	reducers: {},
	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.loading,
	(state) => state.error,

	(loading) => {
		return {loading};
	},
);

const IAM_POLICY_TEMPLATE = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		findAll,
	},
};

export default IAM_POLICY_TEMPLATE;
