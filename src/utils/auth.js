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

export const Google = {
	clientId:
		'819744979674-dastdmj1j5k8coluu2vofclsi3kvo90h.apps.googleusercontent.com',
	clientSecret: 'LEVTqM7nBsyLPuSEbT-mPffx',
	redirectUri:
		'http://ec2-3-36-98-38.ap-northeast-2.compute.amazonaws.com:3002/altauthredirect',
	location:
		'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=819744979674-dastdmj1j5k8coluu2vofclsi3kvo90h.apps.googleusercontent.com&redirect_uri=' +
		'http://ec2-3-36-98-38.ap-northeast-2.compute.amazonaws.com:3002/altauthredirect&scope=email%20profile&state=myState&access_type=offline&prompt=consent',
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
