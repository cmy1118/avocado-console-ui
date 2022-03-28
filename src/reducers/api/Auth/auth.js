import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {Axios, baseURL} from '../../../api/constants';
import {
	contentType,
	getParameter,
	Google,
	grantType,
} from '../../../utils/auth';
import base64 from 'base-64';

const NAME = 'AUTH';

const authPolicyVerificationAction = createAsyncThunk(
	`${NAME}/authPolicyVerification`,
	async (payload) => {
		const response = await Axios.post('/oauth2/v1/verify/user', null, {
			headers: {
				'Content-Type': contentType.URL_ENCODED,
				Authorization:
					'Basic ' +
					base64.encode(`${payload.username}:${payload.password}`),
				CompanyId: payload.companyId,
				ApplicationCode: 'console-ui',
			},
			baseURL: baseURL.auth,
		});

		return response.data;
	},
);

const userAuthAction = createAsyncThunk(
	`${NAME}/USER_AUTH`,
	async (payload) => {
		const response = await Axios.post(`/oauth2/v1/token`, null, {
			params: {
				grant_type: grantType.PASSWORD,
				username: payload.username,
				password: payload.password,
			},
			headers: {
				'Content-Type': contentType.URL_ENCODED,
				Authorization:
					'Basic ' + base64.encode(`${'web'}:${'123456789'}`),
				CompanyId: payload.companyId,
				ApplicationCode: 'console-ui',
			},
			baseURL: baseURL.auth,
		});

		// setAuthorizationToken(response.data?.access_token);
		return response.data;
	},
);

const logoutAction = createAsyncThunk(
	`${NAME}/LOGOUT`,
	async (payload, {getState}) => {
		const {userAuth} = getState()[NAME];

		const response = await Axios.post(`/oauth2/v1/revoke`, null, {
			headers: {
				'Content-Type': contentType.URL_ENCODED,
				Authorization: `${userAuth.token_type} ${userAuth.access_token}`,
			},
			baseURL: baseURL.auth,
		});
		return response.data;
	},
);

const clientAuthAction = createAsyncThunk(
	`${NAME}/clientAuth`,
	async (payload) => {
		const response = await Axios.post('/oauth2/v1/token', null, {
			params: {
				grant_type: grantType.CLIENT_CREDENTIALS,
			},
			headers: {
				'Content-Type': contentType.URL_ENCODED,
				Authorization:
					'Basic ' + base64.encode(`${'web'}:${'123456789'}`),
				CompanyId: payload.companyId,
				ApplicationCode: 'console-ui',
			},
			baseURL: baseURL.auth,
		});
		return response.data;
	},
);

const GoogleAuthAction = createAsyncThunk(`${NAME}/GoogleAuth`, async () => {
	const response = await Axios.post(
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
				'Content-Type': contentType,
			},
		},
	);

	const user = await Axios.get(
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

		const response = await Axios.post(
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
					ApplicationCode: 'console-ui',
				},
				baseURL: baseURL.auth,
			},
		);
		return response.data;
	},
);

const refreshTokenAction = createAsyncThunk(
	`${NAME}/refresh`,
	async (payload, {getState}) => {
		const {userAuth, companyId} = getState().AUTH;

		console.log(userAuth.refresh_token, companyId);
		const response = await Axios.post('/oauth2/v1/token', null, {
			params: {
				grant_type: grantType.REFRESH_TOKEN,
				refresh_token: userAuth.refresh_token,
				// refresh_token: Cookies.get('refreshToken'),
			},
			headers: {
				'Content-Type': contentType.URL_ENCODED,
				Authorization:
					'Basic ' + base64.encode(`${'web'}:${'123456789'}`),
				CompanyId: companyId,
				ApplicationCode: 'console-ui',
			},
			baseURL: baseURL.auth,
		});

		// setAuthorizationToken(response.data?.access_token);

		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		companyId: '',
		isLoggedIn: false,
		userAuth: null,
		alternativeAuth: null,
		clientAuth: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[authPolicyVerificationAction.pending]: (state, action) => {
			state.loading = true;
			state.companyId = action.meta.arg.companyId;
		},
		[authPolicyVerificationAction.fulfilled]: (state) => {
			state.loading = false;
		},
		[authPolicyVerificationAction.rejected]: (state) => {
			state.loading = false;
		},

		[userAuthAction.pending]: (state, action) => {
			state.loading = true;
			state.companyId = action.meta.arg.companyId;
		},
		[userAuthAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.userAuth = action.payload;
			state.isLoggedIn = true;
			// Cookies.set('refreshToken', action.payload.refresh_token, {
			// 	// secure: true,
			// 	// httpOnly: true,
			// });
			// setTimeout(onSilentRefresh, action.payload.expires_in*1000 - 60000);
		},
		[userAuthAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},

		[logoutAction.pending]: (state) => {
			state.loading = true;
		},
		[logoutAction.fulfilled]: (state) => {
			state.loading = false;
			state.userAuth = null;
			state.isLoggedIn = false;
		},
		[logoutAction.rejected]: (state, action) => {
			state.loading = false;
			state.userAuth = null;
			state.error = action.error;
			state.isLoggedIn = false;
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

		[altAuthVerificationAction.pending]: (state) => {
			state.loading = true;
		},
		[altAuthVerificationAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.clientAuth = null;
			state.alternativeAuth = null;
			state.userAuth = action.payload;
			state.isLoggedIn = true;
		},
		[altAuthVerificationAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},

		[refreshTokenAction.pending]: (state) => {
			state.loading = true;
		},
		[refreshTokenAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.userAuth = Object.assign(state.userAuth, action.payload);
			// setAuthorizationToken(action.payload.access_token);
			// sessionStorage.setItem(
			// 	'refreshToken',
			// 	action.payload.refresh_token,
			// );
			// Cookies.set('refreshToken', action.payload.refresh_token, {
			// 	// secure: true,
			// 	// httpOnly: true,
			// });
		},
		[refreshTokenAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.isLoggedIn,
	(state) => state.companyId,
	(state) => state.userAuth,
	(state) => state.clientAuth,
	(state) => state.alternativeAuth,
	(state) => state.error,
	(state) => state.loading,
	(
		isLoggedIn,
		companyId,
		userAuth,
		clientAuth,
		alternativeAuth,
		error,
		loading,
	) => {
		return {
			isLoggedIn,
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
		authPolicyVerificationAction,
		userAuthAction,
		logoutAction,
		clientAuthAction,
		GoogleAuthAction,
		altAuthVerificationAction,
		refreshTokenAction,
	},
};

export default AUTH;
