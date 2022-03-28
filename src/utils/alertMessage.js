//type devide color of alert dialog box
export const alertMessageTypes = {
	confirm: 'CONFIRM',
	alert: 'ALERT',
};

export const confirmAlertMessages = {
	developing: {
		key: 'developing',
		type: alertMessageTypes.alert,
		message: '개발중입니다!',
	},
	singleCountGroupTypes: {
		key: 'singleCountGroupTypes',
		type: alertMessageTypes.alert,
		message: '그룹 유형별 1개의 그룹만 추가 가능합니다.',
	},
	singleCountRolesTypes: {
		key: 'singleCountRolesTypes',
		type: alertMessageTypes.alert,
		message: 'Private 유형은 한 사용자에게만 부여 가능합니다.',
	},
	maxNumberOfUsers: {
		key: 'maxNumberOfUsers',
		type: alertMessageTypes.alert,
		message: '최대 10개의 사용자만 추가 가능합니다.',
	},
	maxNumberOfGroups: {
		key: 'maxNumberOfGroups',
		type: alertMessageTypes.alert,
		message: '최대 10개의 그룹만 추가 가능합니다.',
	},
	maxNumberOfRoles: {
		key: 'maxNumberOfRoles',
		type: alertMessageTypes.alert,
		message: '최대 10개의 권한만 부여 가능합니다.',
	},

	maxNumberOfPolicy:{
		key: 'maxNumberOfPolicy',
		type: alertMessageTypes.alert,
		message: '최대 5개의 정책만 추가 가능합니다.',
	},

	maxNumberOfTags: {
		key: 'maxNumberOfTags',
		type: alertMessageTypes.alert,
		message: '최대 10개의 태그만 등록 가능합니다.',
	},


	//default 값
	maxNumberOfDatas: {
		key: 'maxNumberOfDatas',
		type: alertMessageTypes.alert,
		message: '최대 10개의 데이터만 추가 가능합니다.',
	},
};

export const deleteAlertMessages = {};
