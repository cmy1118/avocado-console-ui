import base64 from 'base-64'
// API Constant

export const ENCODE_DATA = base64.encode(`${'web'}:${'123456789'}`);
export const Authorization = `Basic ${ENCODE_DATA}`;

export const baseUrl = {
	openApi:
		'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
};
