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
	if (!data) return '없음';
	if (data.length === 1) return data[0].name;
	return `${data[0].name} 외 ${data.length - 1}`;
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

const descKeys = (key) => {
	switch (key) {
		case 'type':
			return '인증유형';

		case 'AlternativeAuthN':
			return '대체인증수단';

		case 'IdentityVerification':
			return '본인확인인증';

		case 'policyType':
			return '유형';

		case 'expiryDays':
			return '계정 만료일';

		case 'failedCountInitDays':
			return '잠금 해제일';
		default:
			return key;
	}
};

const descValues = (value) => {
	switch (value) {
		case 'IdAndPassword':
			return '아이디 패스워드';

		case 'MAIL':
			return 'Email';

		case 'AccountExpired':
			return '계정 만료';

		case 'SignInFailBlocking':
			return '잠금 해제정책';

		default:
			return typeof value === 'number' ? `${value} 일전` : value;
	}
};

export const descriptionConverter = (details) => {
	const tempObj = {};
	let str = '';
	details.forEach((detail) => {
		if (detail.attribute.policies) {
			if (Array.isArray(detail.attribute.policies)) {
				detail.attribute.policies.forEach((obj) => {
					for (const [key, value] of Object.entries(obj)) {
						tempObj[key] = value;
					}
				});
				tempObj[detail.attribute.policyType] = Object.values(
					tempObj,
				)[0];
			} else {
				tempObj[detail.attribute.policyType] = Object.keys(
					detail.attribute.policies,
				)[0];
			}

			return tempObj;
		} else {
			for (let [key, value] of Object.entries(detail.attribute)) {
				console.log(key, value);
				tempObj[key] = value;
			}
			// tempObj[detail.attribute.policyType] = '';
			return tempObj;
		}
	});
	for (const [key, value] of Object.entries(tempObj)) {
		if (key === 'type' && value === 'IdAndPassword') str = str + '';
		else if (key === 'alternativeAuthN' && value !== 'IdAndPassword')
			str = str + '';
		else if (key === 'type' && value !== 'IdAndPassword') {
			if (str === '') str = str + '인증유형 : 대체인증';
			else str = str + '\n인증유형 : 대체인증';
		} else {
			if (Object.entries(tempObj)[0][0] === key || str === '')
				str =
					str +
					// `${key}:${value}`;
					`${descKeys(key)}:${descValues(value)}`;
			else
				str =
					str +
					// `\n${key}:${value}`;
					`\n${descKeys(key)}:${descValues(value)}`;
		}
	}
	console.log(str);
	return str;
	// details.forEach((detail) => {
	// 	if (detail.policies) {
	// 		const tempObj = {};
	// 		detail.policies.forEach((obj) => {
	// 			for (const [key, value] of Object.entries(obj)) {
	// 				tempObj[key] = value;
	// 			}
	// 		});
	// 		for (const [key, value] of Object.entries(tempObj)) {
	// 			str = str + `\n ${key}:${value}`;
	// 		}
	// 		console.log(str);
	// 		return str;
	// 	} else {
	// 		console.log(detail);
	//
	// 		for (const [key, value] of Object.entries(detail)) {
	// 			str = str + `\n ${key}:${value}`;
	// 		}
	// 		console.log(str);
	// 		return str;
	// 	}
	// });
};
