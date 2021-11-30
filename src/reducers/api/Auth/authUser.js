import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {baseURL, Axios} from '../../../api/constants';
import {
	authorization,
	contentType,
	getParameter,
	Google,
	grantType,
} from '../../../utils/auth';
import base64 from 'base-64';

const NAME = 'AUTH_USER';

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
		console.log(payload);
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
		return response.data;
	},
);

const logoutAction = createAsyncThunk(
	`${NAME}/LOGOUT`,
	async (payload, {getState}) => {
		const token = getState()[NAME].user.access_token;

		const response = await Axios.post(`/oauth2/v1/revoke`, null, {
			headers: {
				'Content-Type': contentType.URL_ENCODED,
				Authorization: authorization.LOGOUT + token,
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

const slice = createSlice({
	name: NAME,
	initialState: {
		companyId: '',
		isLoggedIn: false,
		user: null,
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
			state.isLoggedIn = true;
		},
		[userAuthAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.user = action.payload;
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
			state.user = null;
			state.isLoggedIn = false;
		},
		[logoutAction.rejected]: (state, action) => {
			state.loading = false;
			state.user = null;
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
			//TODO: authAuth, clientAuth 지워줘야 할까?? 경하님께 물어보기
			// state.clientAuth = null;
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		[altAuthVerificationAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.isLoggedIn,
	(state) => state.companyId,
	(state) => state.user,
	(state) => state.clientAuth,
	(state) => state.alternativeAuth,
	(state) => state.error,
	(state) => state.loading,
	(
		isLoggedIn,
		companyId,
		user,
		clientAuth,
		alternativeAuth,
		error,
		loading,
	) => {
		return {
			isLoggedIn,
			companyId,
			user,
			clientAuth,
			alternativeAuth,
			error,
			loading,
		};
	},
);

// NAME 의 value 값으로 변수명 선언
const AUTH_USER = {
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
	},
};

export default AUTH_USER;
