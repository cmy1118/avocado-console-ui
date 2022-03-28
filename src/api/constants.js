import qs from 'qs';
import axios from 'axios';

export const baseURL = {
	auth: 'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
	openApi:
		'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
};
// todo - seob
//  파라미터 배열 형태로 보내려면 Axios 사용하세요~
//  ex)
//  ?id[]=KR-2020-0005:0000034:000000014&id[]=KR-2020-0005:0000034:000000020
//  위 형태를 아래처럼 바꿔줍니다.
//  id=KR-2020-0005%3A0000034%3A000000014&id=KR-2020-0005%3A0000034%3A000000020

export const Axios = axios.create({
	paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'}),
});
