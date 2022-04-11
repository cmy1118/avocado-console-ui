import {Axios} from '../api/constants';

// memo : 영애님 token_type이 Bearer 말고도 Basic이 있는데
//  이 Bearer로 입력하는것 보다 local에 token_type도 추가해서 받아와서 사용하는것이 좋지 않을까 합니다
export default function setAuthorizationToken() {
	if (localStorage.getItem('access_token')) {
		Axios.defaults.headers.common[
			'Authorization'
		] = `Bearer ${localStorage.getItem('access_token')}`;
	} else {
		delete Axios.defaults.headers.common['Authorization'];
	}
}
