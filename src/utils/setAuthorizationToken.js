import {Axios} from '../api/constants';

export default function setAuthorizationToken(token) {
	console.log(token);
	if (token) {
		Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete Axios.defaults.headers.common['Authorization'];
	}
}
