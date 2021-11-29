import qs from 'qs';
import axios from 'axios';

export const baseURL = {
	auth: 'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
	openApi:
		'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
};

export const Axios = axios.create({
	paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'}),
});
