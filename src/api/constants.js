import qs from 'qs';
import axios from 'axios';

export const Axios = axios.create({
	paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'}),
});
