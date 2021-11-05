import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

import {baseUrl} from '../../../api/constants';
import {authorization, contentType, grantType} from '../../../utils/auth';

const NAME = 'USER';

const loginAction = createAsyncThunk(`${NAME}/LOGIN`, async (payload) => {
	const response = await axios.post(`/oauth2/v1/token`, null, {
		params: {
			grant_type: grantType.PASSWORD,
			username: payload.username,
			password: payload.password,
		},
		headers: {
			'Content-Type': contentType,
			Authorization: authorization.LOGIN,
			CompanyId: payload.companyId,
		},
		baseURL: baseUrl.auth,
	});
	return response.data;
});

const logoutAction = createAsyncThunk(
	`${NAME}/LOGOUT`,
	async (payload, {getState}) => {
		const token = getState()[NAME].user.access_token;

		const response = await axios.post(`/oauth2/v1/revoke`, null, {
			headers: {
				'Content-Type': contentType,
				Authorization: authorization.LOGOUT + token,
			},
			baseURL: baseUrl.auth,
		});
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		companyId: '',
		user: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[loginAction.pending]: (state, action) => {
			state.loading = true;
			state.companyId = action.meta.arg.companyId;
		},
		[loginAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.user = action.payload;
		},
		[loginAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
		[logoutAction.pending]: (state) => {
			state.loading = true;
		},
		[logoutAction.fulfilled]: (state) => {
			state.loading = false;
			state.user = null;
		},
		[logoutAction.rejected]: (state, action) => {
			state.loading = false;
			state.user = null;
			state.error = action.error;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.companyId,
	(state) => state.user,
	(state) => state.error,
	(state) => state.loading,
	(companyId, user, error, loading) => {
		return {companyId, user, error, loading};
	},
);

// NAME 의 value 값으로 변수명 선언
const USER = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		loginAction,
		logoutAction,
	},
};

export default USER;