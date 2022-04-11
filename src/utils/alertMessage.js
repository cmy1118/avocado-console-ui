//type devide color of alert dialog box
export const alertMessageTypes = {
	confirm: 'CONFIRM',
	alert: 'ALERT',
};


export const temp = (() => {

})
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
		message: '유형별 최대 5개의 정책만 추가 가능합니다.',
	},

	maxNumberOfTags: {
		key: 'maxNumberOfTags',
		type: alertMessageTypes.alert,
		message: '최대 10개의 태그만 등록 가능합니다.',
	},

	// 역할 > 역할생성 > 역할+사용자 연결 Table
	limitedNumberOfUsers:{
		key: 'limitedNumberOfUsers',
		type: alertMessageTypes.alert,
		message: '지정한 부여 제한 횟수 만큼 등록 가능 합니다.',
	},

	// 역할 > 역할생성 > 역할+사용자 연결 Table > 부여제한 횟수 미 입력 시
	limitedNumberCheck:{
		key: 'limitedNumberCheck',
		type: alertMessageTypes.alert,
		message: '부여 제한 횟수 를 입력해 주세요.',
	},

	//default 값
	maxNumberOfDatas: {
		key: 'maxNumberOfDatas',
		type: alertMessageTypes.alert,
		message: '최대 10개의 데이터만 추가 가능합니다.',
	},
};

export const deleteAlertMessages = {};
