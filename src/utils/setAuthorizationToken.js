import {Axios} from '../api/constants';

export default function setAuthorizationToken() {
	console.log(localStorage.getItem('access_token'));
	if (localStorage.getItem('access_token')) {
		Axios.defaults.headers.common[
			'Authorization'
		] = `Bearer ${localStorage.getItem('access_token')}`;
	} else {
		delete Axios.defaults.headers.common['Authorization'];
	}
}
