export const policyOption = {
	usage: {
		use: {key: 'use', label: '사용함'},
		none: {key: 'none', label: '사용 안함'},
	},
	application: {
		'console-ui:*': {key: 'console-ui:*', label: 'Management Console'},
		'web-terminal-ui:*': {key: 'web-terminal-ui:*', label: 'WebTerminal'},
	},
	authUsage: {
		use: {key: 'use', label: '인증 함'},
		none: {key: 'none', label: '인증 안함'},
	},
	required: {
		all: {key: 'all', label: '필수'},
		select: {key: 'select', label: '선택'},
		none: {key: 'no', label: '없음'},
	},

	additionalAuthMethod: {
		mail: {key: 'mail', label: '인증번호(Mail)'},
		sms: {key: 'sms', label: '인증번호(SMS)'},
		kakao: {key: 'kakao', label: '인증번호(Kakao)'},
	},

	authMethod: {
		none: {key: 'none', label: '없음'},
		mail: {key: 'mail', label: '인증번호(Mail)'},
		sms: {key: 'sms', label: '인증번호(SMS)'},
		kakao: {key: 'kakao', label: '인증번호(Kakao)'},
	},

	identityVerificationMethod: {
		idAndPassword: {
			key: 'idAndPassword',
			label: 'ID/Password',
		},
		mail: {
			key: 'mail',
			label: '인증번호(Mail)',
		},
		sms: {
			key: 'sms',
			label: '인증번호(SMS)',
		},
		kakao: {
			key: 'kakao',
			label: '인증번호(Kakao)',
		},
	},
	blockingType: {
		locked: {key: 'locked', label: '잠금'},
		deleted: {key: 'deleted', label: '삭제'},
	},
	accountNormalization: {
		identityVerification: {
			key: 'identityVerification',
			label: '본인 확인 인증',
		},
		manager: {
			key: 'manager',
			label: '관리자에 의한 정상화(임시 패스워드 발급)',
		},
	},
	blockingType2: {
		locked: {key: 'locked', label: '잠금'},
		deleted: {key: 'deleted', label: '삭제'},
		none: {key: 'none', label: '안함'},
	},
	groupPermissionType: {
		revoke: {key: 'revoke', label: '회수'},
		grant: {key: 'grant', label: '부여(변경후 그룹의 권한)'},
		keeps: {key: 'keeps', label: '유지(기존 권한 유지)'},
	},

	accountNormalization2: {
		revoke: {key: 'revoke', label: '회수'},
		grant: {key: 'grant', label: '부여(변경후 그룹의 권한)'},
	},

	gracePeriod: {
		none: {key: 'none', label: '없음'},
		use: {key: 'use', label: '있음'},
	},
	patternType: {
		prefix: {key: 'prefix', label: '접두사'},
		suffix: {key: 'suffix', label: '접미사'},
	},

	restrict: {
		restrict: {key: 'restrict', label: '제한함'},
		none: {key: 'none', label: '제한 안함'},
	},
	personalInfoRestrictionMethod: {
		email: {key: 'email', label: 'Email'},
		mobile: {key: 'mobile', label: '전화번호'},
		userId: {key: 'userId', label: 'ID 동일 연속 문자 수(3)'},
	},
	loginType: {
		auto: {key: 'auto', label: '자동 로그인'},
		direct: {key: 'direct', label: '직접 로그인'},
		manual: {key: 'manual', label: '수동 로그인'},
	},
};

export const usageOptions = [
	{
		key: policyOption.usage.use.key,
		label: policyOption.usage.use.label,
	},
	{
		key: policyOption.usage.none.key,
		label: policyOption.usage.none.label,
	},
];

export const applicationOptions = [
	{
		key: policyOption.application['console-ui:*'].key,
		label: policyOption.application['console-ui:*'].label,
	},
	{
		key: policyOption.application['web-terminal-ui:*'].key,
		label: policyOption.application['web-terminal-ui:*'].label,
	},
];

export const authUsageOptions = [
	{
		key: policyOption.authUsage.use.key,
		label: policyOption.authUsage.use.label,
	},
	{
		key: policyOption.authUsage.none.key,
		label: policyOption.authUsage.none.label,
	},
];

export const requiredOptions = [
	{
		key: policyOption.required.all.key,
		label: policyOption.required.all.label,
	},
	{
		key: policyOption.required.select.key,
		label: policyOption.required.select.label,
	},
	{
		key: policyOption.required.none.key,
		label: policyOption.required.none.label,
	},
];

export const additionalAuthMethodOptions = [
	{
		key: policyOption.additionalAuthMethod.mail.key,
		label: policyOption.additionalAuthMethod.mail.label,
	},
	{
		key: policyOption.additionalAuthMethod.sms.key,
		label: policyOption.additionalAuthMethod.sms.label,
	},
	{
		key: policyOption.additionalAuthMethod.kakao.key,
		label: policyOption.additionalAuthMethod.kakao.label,
	},
];

export const authMethodOptions = [
	{
		key: policyOption.authMethod.none.key,
		label: policyOption.authMethod.none.label,
	},
	{
		key: policyOption.authMethod.mail.key,
		label: policyOption.authMethod.mail.label,
	},
	{
		key: policyOption.authMethod.sms.key,
		label: policyOption.authMethod.sms.label,
	},
	{
		key: policyOption.authMethod.kakao.key,
		label: policyOption.authMethod.kakao.label,
	},
];

export const identityVerificationMethodOptions = [
	{
		key: policyOption.identityVerificationMethod.idAndPassword.key,
		label: policyOption.identityVerificationMethod.idAndPassword.label,
	},
	{
		key: policyOption.identityVerificationMethod.mail.key,
		label: policyOption.identityVerificationMethod.mail.label,
	},
	{
		key: policyOption.identityVerificationMethod.sms.key,
		label: policyOption.identityVerificationMethod.sms.label,
	},
	{
		key: policyOption.identityVerificationMethod.kakao.key,
		label: policyOption.identityVerificationMethod.kakao.label,
	},
];

export const accountBlockingTypeOptions = [
	{
		key: policyOption.blockingType.locked.key,
		label: policyOption.blockingType.locked.label,
	},
	{
		key: policyOption.blockingType.deleted.key,
		label: policyOption.blockingType.deleted.label,
	},
];

export const accountBlockingType2Options = [
	{
		key: policyOption.blockingType2.locked.key,
		label: policyOption.blockingType2.locked.label,
	},
	{
		key: policyOption.blockingType2.deleted.key,
		label: policyOption.blockingType2.deleted.label,
	},
	{
		key: policyOption.blockingType2.none.key,
		label: policyOption.blockingType2.none.label,
	},
];

export const groupPermissionTypeOptions = [
	{
		key: policyOption.groupPermissionType.revoke.key,
		label: policyOption.groupPermissionType.revoke.label,
	},
	{
		key: policyOption.groupPermissionType.grant.key,
		label: policyOption.groupPermissionType.grant.label,
	},
	{
		key: policyOption.groupPermissionType.keeps.key,
		label: policyOption.groupPermissionType.keeps.label,
	},
];

export const gracePeriodUsageOptions = [
	{
		key: policyOption.gracePeriod.use.key,
		label: policyOption.gracePeriod.use.label,
	},
	{
		key: policyOption.gracePeriod.none.key,
		label: policyOption.gracePeriod.none.label,
	},
];

export const patternTypeOptions = [
	{
		key: policyOption.patternType.prefix.key,
		label: policyOption.patternType.prefix.label,
	},
	{
		key: policyOption.patternType.suffix.key,
		label: policyOption.patternType.suffix.label,
	},
];

export const restrictionOptions = [
	{
		key: policyOption.restrict.restrict.key,
		label: policyOption.restrict.restrict.label,
	},
	{
		key: policyOption.restrict.none.key,
		label: policyOption.restrict.none.label,
	},
];

export const personalInfoRestrictionMethodOptions = [
	{
		key: policyOption.personalInfoRestrictionMethod.email.key,
		label: policyOption.personalInfoRestrictionMethod.email.label,
	},
	{
		key: policyOption.personalInfoRestrictionMethod.mobile.key,
		label: policyOption.personalInfoRestrictionMethod.mobile.label,
	},
	{
		key: policyOption.personalInfoRestrictionMethod.userId.key,
		label: policyOption.personalInfoRestrictionMethod.userId.label,
	},
];

/**************************************************
 * ambacc244 - true/false의 value를 가진 attribute가 있을때 그 값에 따라 원하는 값을 리턴
 *
 * data: attribute를 가지고 있는 데이터
 * attribute: 값을 세팅할 옵션의 attribute
 * trueOption: attribute 값이 true 일때 세팅될 값
 * falseOption:  attribute 값이 false 일때 세팅될 값
 **************************************************/
export const setUsageOptionByAttribute = (
	data,
	attribute,
	trueOption,
	falseOption,
) => {
	if (data && Object.prototype.hasOwnProperty.call(data, attribute)) {
		return data[attribute] ? trueOption : falseOption;
	}
	return falseOption;
};
