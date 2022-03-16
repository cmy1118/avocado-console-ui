export const templateType = {
	ACTION: 'action',
	RULE: 'rule',
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

//정책생성 -권한 템플릿 resource정보 데이터 필터링
export function actionTemplateResourceFilter(res){

}

/********************************************************/
