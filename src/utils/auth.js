import base64 from 'base-64';

export const account = {
	KT: {companyId: 'KR-2020-0002', username: 'ktkim', password: 'kt20200002'},
	SAMSUNG: {
		companyId: 'KR-2020-0003',
		username: 'sslee',
		password: 'SS20200003',
	},
};

export const authorization = {
	LOGIN: 'Basic ' + base64.encode(`${'web'}:${'123456789'}`),
	LOGOUT: 'Bearer ',
};

export const contentType = 'application/x-www-form-urlencoded';

export const grantType = {
	PASSWORD: 'password',
	REFRESH_TOKEN: 'refresh_token',
	AUTHORIZATION_CODE: 'authorization_code',
};
