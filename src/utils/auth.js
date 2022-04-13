import base64 from 'base-64';

export const account = {
	NETAND: {
		companyId: 'KR-2020-0001',
		username: 'user',
		password: '123456789',
	},
	KT: {companyId: 'KR-2020-0005', username: 'jinwoo', password: '123456789'},
	SK: {
		companyId: 'KR-2020-0006',
		username: 'myhee',
		password: '123456789',
	},
};

export const authorization = {
	BASIC: 'Basic ' + base64.encode(`${'web'}:${'123456789'}`),
	BEARER: 'Bearer ',
};

export const altAuthType = {
	google: 'google',
	naver: 'naver',
	kakao: 'kakao',
	apple: 'apple',
};

export const contentType = {
	URL_ENCODED: 'application/x-www-form-urlencoded',
	JSON: 'application/json',
	JSON_UTF: 'application/json; charset=UTF-8',
};

export const grantType = {
	CLIENT_CREDENTIALS: 'client_credentials',
	PASSWORD: 'password',
	REFRESH_TOKEN: 'refresh_token',
	AUTHORIZATION_CODE: 'authorization_code',
};

const altAuthClientId = {
	google:
		'819744979674-dastdmj1j5k8coluu2vofclsi3kvo90h.apps.googleusercontent.com',
	naver: 'nibcTe6r62XwD6twI7P7',
	kakao: 'a802adefbb7e61bb24cae3f135d62007',
};

const altAuthClientSecret = {
	google: 'LEVTqM7nBsyLPuSEbT-mPffx',
	naver: '',
	kakao: '',
};

const redirectUrl = {
	google: 'http://localhost:3000/altauthredirect/google',
	naver: 'http://localhost:3000/altauthredirect/naver',
	kakao: 'http://localhost:3000/altauthredirect/kakao',
};

export const googleAuth = {
	clientId: altAuthClientId.google,
	clientSecret: altAuthClientSecret.google,
	redirectUri: redirectUrl.google,
	location:
		'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
		altAuthClientId.google +
		'&redirect_uri=' +
		redirectUrl.google +
		'&response_type=code&scope=email%20profile&state=myState&access_type=offline&prompt=consent',
};

export const naverAuth = {
	clientId: altAuthClientId.naver,
	clientSecret: altAuthClientSecret.naver,
	redirectUri: redirectUrl.naver,
	location:
		'https://nid.naver.com/oauth2.0/authorize' +
		'?client_id=' +
		altAuthClientId.naver +
		'&redirect_uri=' +
		redirectUrl.naver +
		'&response_type=code&state=myState',
};

export const kakaoAuth = {
	clientId: altAuthClientId.kakao,
	clientSecret: altAuthClientSecret.kakao,
	redirectUri: redirectUrl.kakao,
	location:
		'https://kauth.kakao.com/oauth/authorize' +
		'?client_id=' +
		altAuthClientId.kakao +
		'&redirect_uri=' +
		redirectUrl.kakao +
		'&response_type=code&state=myState',
};

export const getParameter = (name) => {
	const list = location.search.substring(1).split('&');
	for (let i = 0; i < list.length; i++) {
		const data = list[i].split('=');
		if (data.length === 2) {
			if (data[0] === name) {
				return data[1];
			}
		}
	}
	return null;
};
