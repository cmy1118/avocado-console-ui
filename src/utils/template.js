export const templateType = {
	ACTION: 'action',
	RULE: 'rule',
};

export const POLICY_TYPE = {
	IAM: 'iam',
	PAM: 'pam',
};

//권한 템플릿id 조회 필터링
export function actionTemplateFilter(res){
	const setData=res.data['details'].map(v=> {
		return {
			'templateId': v.templateId,
			'resource': v.resource,
			'action': v.action,
			'effect': v.effect,
		}

	})
	console.log('권한 템플릿id 조회 필터링 data:',setData)
	return setData

}
