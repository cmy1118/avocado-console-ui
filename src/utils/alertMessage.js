//type devide color of alert dialog box
export const alertMessageTypes = {
	confirm: 'CONFIRM',
	alert: 'ALERT',
};

export const confirmAlertMessages = {
	developing: {
		value: 'developing',
		type: alertMessageTypes.alert,
		message: '개발중입니다!',
	},
	singleCountGroupTypes: {
		value: 'singleCountGroupTypes',
		type: alertMessageTypes.alert,
		message: '그룹 유형별 1개의 그룹만 추가 가능합니다.',
	},
	singleCountRolesTypes: {
		value: 'singleCountRolesTypes',
		type: alertMessageTypes.alert,
		message: 'Private 유형은 한 사용자에게만 부여 가능합니다.',
	},
	maxNumberOfUsers: {
		value: 'maxNumberOfUsers',
		type: alertMessageTypes.alert,
		message: '최대 10개의 사용자만 추가 가능합니다.',
	},
	maxNumberOfGroups: {
		value: 'maxNumberOfGroups',
		type: alertMessageTypes.alert,
		message: '최대 10개의 그룹만 추가 가능합니다.',
	},
	maxNumberOfRoles: {
		value: 'maxNumberOfRoles',
		type: alertMessageTypes.alert,
		message: '최대 10개의 권한만 부여 가능합니다.',
	},
	maxNumberOfTags: {
		value: 'maxNumberOfTags',
		type: alertMessageTypes.alert,
		message: '최대 10개의 태그만 등록 가능합니다.',
	},
	//default 값
	maxNumberOfDatas: {
		value: 'maxNumberOfDatas',
		type: alertMessageTypes.alert,
		message: '최대 10개의 데이터만 추가 가능합니다.',
	},
};

export const deleteAlertMessages = {
	deletePolicy: {
		value: 'deletePolicy',
		type: alertMessageTypes.alert,
		message: '해당 정책을 삭제하시겠습니까.',
	},
};
