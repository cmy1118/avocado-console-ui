import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

import {baseURL} from '../../../api/constants';
import {
	authorization,
	contentType,
	getParameter,
	Google,
	grantType,
} from '../../../utils/auth';

const NAME = 'AUTH';

const userAuthAction = createAsyncThunk(`${NAME}/userAuth`, async (payload) => {
	const response = await axios.post('/oauth2/v1/token', null, {
		params: {
			grant_type: grantType.PASSWORD,
			username: payload.username,
			password: payload.password,
		},
		headers: {
			'Content-Type': contentType.URL_ENCODED,
			Authorization: authorization.BASIC,
			CompanyId: payload.companyId,
		},
		baseURL: baseURL.auth,
	});
	return response.data;
});

const logoutAction = createAsyncThunk(
	`${NAME}/logout`,
	async (payload, {getState}) => {
		const token = getState()[NAME].user.access_token;

		const response = await axios.post('/oauth2/v1/revoke', null, {
			headers: {
				'Content-Type': contentType.URL_ENCODED,
				Authorization: authorization.BEARER + token,
			},
			baseURL: baseURL.auth,
		});
		return response.data;
	},
);

const clientAuthAction = createAsyncThunk(
	`${NAME}/clientAuth`,
	async (payload) => {
		const response = await axios.post('/oauth2/v1/token', null, {
			params: {
				grant_type: grantType.CLIENT_CREDENTIALS,
			},
			headers: {
				'Content-Type': contentType.URL_ENCODED,
				Authorization: authorization.BASIC,
				CompanyId: payload.companyId,
			},
			baseURL: baseURL.auth,
		});
		return response.data;
	},
);

const GoogleAuthAction = createAsyncThunk(`${NAME}/GoogleAuth`, async () => {
	const response = await axios.post(
		'https://accounts.google.com/o/oauth2/token',
		null,
		{
			params: {
				code: decodeURIComponent(getParameter('code')),
				grant_type: grantType.AUTHORIZATION_CODE,
				redirect_uri: Google.redirectUri,
				client_id: Google.clientId,
				client_secret: Google.clientSecret,
			},
			headers: {
				'Content-Type': contentType.URL_ENCODED,
			},
		},
	);

	const user = await axios.get(
		'https://www.googleapis.com/oauth2/v1/userinfo',
		{
			params: {
				alt: 'json',
				access_token: response.data.access_token,
			},
		},
	);
	return {...response.data, email: user.data.email};
});

const altAuthVerificationAction = createAsyncThunk(
	`${NAME}/alternativeAuth`,
	async (payload, {getState}) => {
		const authState = getState()[NAME];
		const response = await axios.post(
			'/oauth2/v1/alternative/verify',
			null,
			{
				params: {
					username: authState.alternativeAuth.email.match(
						/^.+(?=@)/,
					)[0],
				},
				headers: {
					'Content-Type': contentType.URL_ENCODED,
					Authorization: `Bearer ${authState.clientAuth.access_token}`,
					AlternativeAuthN: `google ${authState.alternativeAuth.access_token}`,
					CompanyId: authState.companyId,
				},
				baseURL: baseURL.auth,
			},
		);
		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		companyId: '',
		isLoggedIn: false,
		userAuth: null,
		clientAuth: null,
		alternativeAuth: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[userAuthAction.pending]: (state, action) => {
			state.loading = true;
			state.companyId = action.meta.arg.companyId;
		},
		[userAuthAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.user = action.payload;
		},
		[userAuthAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},

		[clientAuthAction.pending]: (state, action) => {
			state.loading = true;
			state.companyId = action.meta.arg.companyId;
		},
		[clientAuthAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.clientAuth = action.payload;
		},
		[clientAuthAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},

		[GoogleAuthAction.pending]: (state) => {
			state.loading = true;
		},
		[GoogleAuthAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.alternativeAuth = action.payload;
		},
		[GoogleAuthAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},

		[altAuthVerificationAction.pending]: (state, action) => {
			state.loading = true;
		},
		[altAuthVerificationAction.fulfilled]: (state, action) => {
			state.loading = false;
			//TODO: authAuth, clientAuth 지워줘야 할까?? 경하님께 물어보기
			// state.clientAuth = null;
			state.userAuth = action.payload;
		},
		[altAuthVerificationAction.rejected]: (state, action) => {
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
	(state) => state.userAuth,
	(state) => state.clientAuth,
	(state) => state.alternativeAuth,
	(state) => state.error,
	(state) => state.loading,
	(companyId, userAuth, clientAuth, alternativeAuth, error, loading) => {
		return {
			companyId,
			userAuth,
			clientAuth,
			alternativeAuth,
			error,
			loading,
		};
	},
);

// NAME 의 value 값으로 변수명 선언
const AUTH = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {
		userAuthAction,
		logoutAction,
		clientAuthAction,
		GoogleAuthAction,
		altAuthVerificationAction,
	},
};

export default AUTH;
