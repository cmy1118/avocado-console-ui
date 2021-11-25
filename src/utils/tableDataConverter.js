export const statusConverter = (status) => {
	switch (status) {
		case 0:
			return '정상';
		case 1:
			return '잠김';
		case 2:
			return '대기';
		case 3:
			return '삭제';
		case 4:
			return '미승인';
		default:
			return '';
	}
};

export const authTypeConverter = (authType) => {
	switch (authType) {
		case 0:
			return 'ID/PWD';
		case 1:
		case 2:
		case 3:
		case 4:
			return '대체인증';
		default:
			return '';
	}
};

export const mfaConverter = (authType) => {
	switch (authType) {
		case null:
			return '없음';
		case 0:
			return 'OTP (Email)';
		case 1:
			return 'OTP (SMS)';
		case 2:
			return 'OTP (Mobile)';
		case 3:
			return 'Finger Print';
		case 4:
			return 'Face ID';
		default:
			return '';
	}
};

export const passwordExpiredConverter = (date) => {
	console.log(date);
	let diffDate = new Date(date) - new Date();
	return Math.ceil(diffDate / (1000 * 60 * 60 * 24));
};

export const expiredConverter = (date) => {
	let diffDate = new Date(date) - new Date();
	return Math.ceil(diffDate / (1000 * 60 * 60 * 24)) + '일전';
};

export const groupsConverter = (data) => {
	if (data.length === 0) return '없음';
	if (data.length === 1) return data[0].name;
	return `${data[0].name} 외 ${data.length - 1}`;
};

export const rolesConverter = (data) => {
	if (data.length === 0) return '없음';
	return '정의됨';
};

export const tagsConverter = (data) => {
	if (data.length === 0) return '없음';
	if (data.length === 1) return data[0].value;
	return `${data[0].value} 외 ${data.length - 1}`;
};

export const roleTypeConverter = (companyId) => {
	if (companyId) return 'Private';
	return 'Public';
};

export const parentGroupConverter = (parent) => {
	if (parent) return parent;
	return '없음';
};

export const totalNumberConverter = (range) => {
	if (!range) return 0;
	return parseInt(range.split('/')[1]);
};
