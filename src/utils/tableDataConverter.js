export const statusConverter = (status) => {
	switch (status) {
		case 0:
			return '정상';
		case 1:
			return '잠김';
		case 2:
			return '대기';
		case 3:
		case 4:
			return '삭제';

		default:
			return '미승인';
	}
};

export const passwordExpiryTimeConverter = (data) => {
	let diffDate = new Date(data) - new Date();
	return diffDate;
};

export const numberOfGroupsConverter = (data) => {
	if (data.length === 0) return '';
	if (data.length === 1) return data[0];
	return `${data[0]} 외 ${data.length - 1}`;
};

export const tagConverter = (data) => {
	if (data.length === 0) return '없음';
	if (data.length === 1) return data[0].value;
	return `${data[0].value} 외 ${data.length - 1}`;
};

export const roleTypeConverter = (companyId) => {
	if (companyId) return 'Private';
	return 'Public';
};

export const parentGroupConverter = (parentId) => {
	if (parentId) return parentId;
	return '없음';
};
