import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {contentType} from '../../../../utils/auth';
import {Axios, baseURL} from '../../../../api/constants';
import {getIdFormLocation} from '../../../../utils/tableDataConverter';

const NAME = 'IAM_POLICY';

/**************************************************
 * ambacc244 - IAM policy 생성 요청 액션
 **************************************************/
const createPolicyAction = createAsyncThunk(
	`${NAME}/CREATE`,
	async (payload, {getState}) => {
		const {userAuth} = getState().AUTH;

		const response = await Axios.post(
			`/open-api/v1/iam/policies`,
			{
				name: payload.name,
				description: payload.description,
				type: payload.type,
				controlTypes: payload.controlTypes,
				maxGrants: payload.maxGrants,
			},
			{
				headers: {
					Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
					'Content-Type': contentType.JSON,
				},
				baseURL: baseURL.openApi,
			},
		);

		return {id: getIdFormLocation(response.headers.location)};
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

const IAM_POLICY = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		createPolicyAction,
	},
};

export default IAM_POLICY;
