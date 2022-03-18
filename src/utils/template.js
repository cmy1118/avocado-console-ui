export const templateType = {
	ACTION: 'action',
	RULE: 'rule',
};

export const ruleTypes = {
	screen_saver: 'screen_saver',
	session_timeout: 'session_timeout',
};

/*******************************************************
 * 정책생성 -권한 템플릿 api 응답 데이터 필터링
 ********************************************************/

//정책생성 - 권한 템플릿 id 조회 필터링
export function actionTemplateFilter(res) {
	const setData = res.data['details'].map((v) => {
		return {
			templateId: v.templateId,
			resource: v.resource,
			action: v.action,
			effect: v.effect,
		};
	});
	console.log('권한 템플릿id 조회 필터링 data:', setData);
	return setData;
}
//정책생성 - 권한 템플릿 id 조회 필터링
export function actionTemplateFilter2(arr, action) {
	const setArr = arr.data['details'].map((v) => {
		return {
			templateId: v.templateId,
			resource: v.resource,
			action: v.action,
			effect: v.effect,
		};
	});
	console.log('권한 템플릿id 조회 필터링 data:', setArr);
	//테이블 칼럼에 맞도록 객체 세팅
	let tempObj = {'all-check': true};
	action.map((v) => {
		tempObj[v] = null;
	});
	//컬럼데이터에 맞도록 api 데이터 테이블 세팅
	let tempArr = [];
	let tempResource = '';
	const result = setArr.map((v) => {
		if (tempResource === v.resource) {
			const index = tempArr.findIndex((s) => s.resource === v.resource);
			tempArr[index][v.action] = v.effect;
		} else {
			let obj = {...tempObj};
			(obj.id = v.resource),
				(obj.title = v.resource),
				(obj.resource = v.resource),
				(obj.DRAGGABLE_KEY = v.resource),
				(obj[`${v.action}`] = v.effect);
			tempResource = v.resource;
			tempArr.push(obj);
		}
	});
	console.log('actionTemplateFilter2 결과:', tempArr);
	return tempArr;
}

//정책생성 -권한 템플릿 resource정보 데이터 필터링
export function actionTemplateResourceFilter(res) {}

/********************************************************/
