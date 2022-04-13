import base64 from 'base-64';

export const basicAuthorization =
	'Basic ' +
	base64.encode(
		`${process.env.REACT_APP_BASIC_AUTHORIZATION_ID}:${process.env.REACT_APP_BASIC_AUTHORIZATION_PASSWORD}`,
	);

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

const redirectUrl = {
	google: 'http://localhost:3000/altauthredirect/google',
	naver: 'http://localhost:3000/altauthredirect/naver',
	kakao: 'http://localhost:3000/altauthredirect/kakao',
};

export const googleAuth = {
	clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
	clientSecret: 'LEVTqM7nBsyLPuSEbT-mPffx',
	redirectUri: redirectUrl.google,
	location:
		'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
		process.env.REACT_APP_GOOGLE_CLIENT_ID +
		'&redirect_uri=' +
		redirectUrl.google +
		'&response_type=code&scope=email%20profile&state=myState&access_type=offline&prompt=consent',
};

export const naverAuth = {
	clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
	clientSecret: process.env.REACT_APP_NAVER_CLIENT_SECRET,
	redirectUri: redirectUrl.naver,
	location:
		'https://nid.naver.com/oauth2.0/authorize' +
		'?client_id=' +
		process.env.REACT_APP_NAVER_CLIENT_ID +
		'&redirect_uri=' +
		redirectUrl.naver +
		'&response_type=code&state=myState',
};

export const kakaoAuth = {
	clientId: process.env.REACT_APP_KAKAO_CLIENT_ID,
	clientSecret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
	redirectUri: redirectUrl.kakao,
	location:
		'https://kauth.kakao.com/oauth/authorize' +
		'?client_id=' +
		process.env.REACT_APP_KAKAO_CLIENT_ID +
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
