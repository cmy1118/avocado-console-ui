export const statusReader = (status) => {
	switch (status) {
		case 0:
			return '정상';
		case 1:
			return '잠김';
		case 2:
			return '탈퇴 예정';
		case 3:
			return '탈퇴 - 아이디 미회수';
		case 4:
			return '탈퇴 - 아이디 회수 / 탈퇴 후 정상 복귀 불가';
		case 5:
			return '미승인';
		default:
			return;
	}
};

export const passwordExpiryTimeReader = (data) => {
	let diffDate = new Date(data) - new Date();

	return diffDate + '일전';
};

export const groupReader = (data) => {
	if (data.length === 0) return '';
	if (data.length === 1) return data[0];
	return `${data[0]} 외 ${data.length - 1}`;
};

export const tagReader = (data) => {
	if (data.length === 0) return '없음';
	if (data.length === 1) return data[0].value;
	return `${data[0].value} 외 ${data.length - 1}`;
};
