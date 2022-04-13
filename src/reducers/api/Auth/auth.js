import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';

import {Axios} from '../../../api/constants';
import {
	basicAuthorization,
	contentType,
	getParameter,
	googleAuth,
	grantType,
	kakaoAuth,
	naverAuth,
} from '../../../utils/auth';
import {getCookies, removeCookies, setCookies} from '../../../utils/cookies';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

const NAME = 'AUTH';

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
				Authorization: basicAuthorization,
				CompanyId: payload.companyId,
				ApplicationCode: 'console-ui',
			},
			baseURL: process.env.REACT_APP_AUTH_URL,
		});
		return response.data;
	},
);

const logoutAction = createAsyncThunk(`${NAME}/LOGOUT`, async (payload) => {
	const response = await Axios.post(`/oauth2/v1/revoke`, null, {
		headers: {
			'Content-Type': contentType.URL_ENCODED,
		},
		baseURL: process.env.REACT_APP_AUTH_URL,
	});
	return response.data;
});

const clientAuthAction = createAsyncThunk(`${NAME}/clientAuth`, async () => {
	const response = await Axios.post('/oauth2/v1/token', null, {
		params: {
			grant_type: grantType.CLIENT_CREDENTIALS,
		},
		headers: {
			'Content-Type': contentType.URL_ENCODED,
			Authorization: basicAuthorization,
			CompanyId: localStorage.getItem('companyId'),
			ApplicationCode: 'console-ui',
		},
		baseURL: process.env.REACT_APP_AUTH_URL,
	});
	return response.data;
});

const googleAuthAction = createAsyncThunk(`${NAME}/googleAuth`, async () => {
	const response = await Axios.post(
		'https://accounts.google.com/o/oauth2/token',
		null,
		{
			params: {
				code: decodeURIComponent(getParameter('code')),
				grant_type: grantType.AUTHORIZATION_CODE,
				redirect_uri: googleAuth.redirectUri,
				client_id: googleAuth.clientId,
				client_secret: googleAuth.clientSecret,
			},
			headers: {
				'Content-Type': contentType,
			},
		},
	);
	return response.data;
});

const naverAuthAction = createAsyncThunk(`${NAME}/naverAuth`, async () => {
	console.log(decodeURIComponent(getParameter('code')));
	const response = await Axios.post(
		'https://nid.naver.com/oauth2.0/token',
		null,
		{
			params: {
				code: decodeURIComponent(getParameter('code')),
				grant_type: grantType.AUTHORIZATION_CODE,
				client_id: naverAuth.clientId,
				client_secret: naverAuth.clientSecret,
				state: decodeURIComponent(getParameter('state')),
			},
			// headers: {
			// 	'Content-Type': contentType,
			// },
		},
	);
	return response.data;
});

const kakaoAuthAction = createAsyncThunk(`${NAME}/kakaoAuth`, async () => {
	const response = await Axios.post(
		'https://kauth.kakao.com/oauth/token',
		null,
		{
			params: {
				code: decodeURIComponent(getParameter('code')),
				grant_type: grantType.AUTHORIZATION_CODE,
				redirect_uri: kakaoAuth.redirectUri,
				client_id: kakaoAuth.clientId,
				// client_secret: kakaoAuth.clientSecret,
			},
			headers: {
				'Content-Type': contentType,
			},
		},
	);
	return response.data;
});

const altAuthVerificationAction = createAsyncThunk(
	`${NAME}/alternativeAuth`,
	async (payload) => {
		const response = await Axios.post(
			'/oauth2/v1/alternative/verify',
			null,
			{
				params: {
					username: localStorage.getItem('id'),
				},
				headers: {
					Authorization: `Bearer ${payload.clientToken}`,
					'Content-Type': contentType.URL_ENCODED,
					AlternativeAuthN: `google ${payload.altAuthToken}`,
					CompanyId: localStorage.getItem('companyId'),
					ApplicationCode: 'console-ui',
				},
				baseURL: process.env.REACT_APP_AUTH_URL,
			},
		);
		return response.data;
	},
);

const refreshTokenAction = createAsyncThunk(
	`${NAME}/refresh`,
	async (payload, {getState}) => {
		const {companyId} = getState().AUTH;

		const response = await Axios.post('/oauth2/v1/token', null, {
			params: {
				grant_type: grantType.REFRESH_TOKEN,
				refresh_token: getCookies('refresh_token'),
			},
			headers: {
				'Content-Type': contentType.URL_ENCODED,
				Authorization: basicAuthorization,
				CompanyId: companyId,
				ApplicationCode: 'console-ui',
			},
			baseURL: process.env.REACT_APP_AUTH_URL,
		});

		return response.data;
	},
);

const slice = createSlice({
	name: NAME,
	initialState: {
		companyId: '',
		isLoggedIn: false,
		userAuth: null,
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
			//쿠키에  refresh token 저장
			setCookies('refresh_token', action.payload.refresh_token, {
				path: '/',
				// secure: true,
				// httpOnly: true,
			});
			//local storage에 access token 저장
			localStorage.setItem('access_token', action.payload.access_token);
			setAuthorizationToken();
			//리덕스에 상태를 저장하기전 refresh token은 삭제
			delete action.payload.refresh_token;
			delete action.payload.access_token;

			state.loading = false;
			state.userAuth = action.payload;
			state.isLoggedIn = true;
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

			removeCookies('refresh_token');
			localStorage.removeItem('access_token');
		},
		[logoutAction.rejected]: (state, action) => {
			state.loading = false;
			state.userAuth = null;
			state.isLoggedIn = false;
			state.error = action.error;

			removeCookies('refresh_token');
			localStorage.removeItem('access_token');
		},

		[altAuthVerificationAction.pending]: (state) => {
			state.loading = true;
		},
		[altAuthVerificationAction.fulfilled]: (state, action) => {
			//쿠키에  refresh token 저장
			setCookies('refresh_token', action.payload.refresh_token, {
				path: '/',
				// secure: true,
				// httpOnly: true,
			});
			//local storage에 access token 저장
			localStorage.setItem('access_token', action.payload.access_token);
			setAuthorizationToken();
			//리덕스에 상태를 저장하기전 refresh token은 삭제
			delete action.payload.refresh_token;
			delete action.payload.access_token;

			state.loading = false;
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
			//access token local storage에 저장
			localStorage.setItem('access_token', action.payload.access_token);
			setAuthorizationToken();
			//리덕스에 상태를 저장하기전 refresh token은 삭제
			delete action.payload.access_token;

			state.loading = false;
			state.userAuth = Object.assign(state.userAuth, action.payload);
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
	(state) => state.error,
	(state) => state.loading,
	(isLoggedIn, companyId, userAuth, error, loading) => {
		return {
			isLoggedIn,
			companyId,
			userAuth,
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
		googleAuthAction,
		naverAuthAction,
		kakaoAuthAction,
		altAuthVerificationAction,
		refreshTokenAction,
	},
};

export default AUTH;
