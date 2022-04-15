import {policyTypes} from '../data';

export const GRANT_RESTRICT_OPTIONS = {
	use: {value: 'use', label: '사용함'},
	none: {value: 'none', label: '사용 안함'},
};

export const policyOption = {
	type: {
		'iam*': {value: policyTypes.iam, label: 'IAM'},
		'pam*': {value: policyTypes.pam, label: 'PAM'},
	},
	usage: {
		use: {value: 'use', label: '사용함'},
		none: {value: 'none', label: '사용 안함'},
	},
	application: {
		'console-ui:*': {value: 'console-ui:*', label: 'Management Console'},
		'web-terminal-ui:*': {value: 'web-terminal-ui:*', label: 'WebTerminal'},
	},
	authUsage: {
		use: {value: 'use', label: '인증 함'},
		none: {value: 'none', label: '인증 안함'},
	},
	required: {
		all: {value: 'all', label: '필수'},
		select: {value: 'select', label: '선택'},
	},

	additionalAuthMethod: {
		mail: {value: 'mail', label: '인증번호(Mail)'},
		sms: {value: 'sms', label: '인증번호(SMS)'},
		kakao: {value: 'kakao', label: '인증번호(Kakao)'},
	},
	authMethod: {
		none: {value: 'none', label: '없음'},
		mail: {value: 'mail', label: '인증번호(Mail)'},
		sms: {value: 'sms', label: '인증번호(SMS)'},
		kakao: {value: 'kakao', label: '인증번호(Kakao)'},
	},

	identityVerificationMethod: {
		idAndPassword: {
			value: 'idAndPassword',
			label: 'ID/Password',
		},
		mail: {
			value: 'mail',
			label: '인증번호(Mail)',
		},
		sms: {
			value: 'sms',
			label: '인증번호(SMS)',
		},
		kakao: {
			value: 'kakao',
			label: '인증번호(Kakao)',
		},
	},
	blockingType: {
		locked: {value: 'locked', label: '잠금'},
		deleted: {value: 'deleted', label: '삭제'},
	},
	blockingType2: {
		logout: {value: 'logout', label: '로그아웃'},
		'screen-lock': {value: 'screen-lock', label: '화면잠금'},
	},
	blockingInitType: {
		identity_verification: {
			value: 'identity_verification',
			label: '본인 확인 인증',
		},
		admin_temp_password: {
			value: 'admin_temp_password',
			label: '관리자에 의한 정상화(임시 패스워드 발급)',
		},
	},
	groupPermissionType: {
		revoke: {value: 'revoke', label: '회수'},
		grant: {value: 'grant', label: '부여(변경후 그룹의 권한)'},
		keeps: {value: 'keeps', label: '유지(기존 권한 유지)'},
	},

	accountNormalization2: {
		revoke: {value: 'revoke', label: '회수'},
		grant: {value: 'grant', label: '부여(변경후 그룹의 권한)'},
	},

	gracePeriod: {
		none: {value: 'none', label: '없음'},
		use: {value: 'use', label: '있음'},
	},
	patternType: {
		prefix: {value: 'prefix', label: '접두사'},
		suffix: {value: 'suffix', label: '접미사'},
	},

	restrict: {
		restrict: {value: 'restrict', label: '제한함'},
		none: {value: 'none', label: '제한 안함'},
	},
	personalInfoRestrictionMethod: {
		email: {value: 'email', label: 'Email'},
		mobile: {value: 'mobile', label: '전화번호'},
		userId: {value: 'userId', label: 'ID 동일 연속 문자 수(3)'},
	},
	inputType: {
		auto: {value: 'auto', label: '자동 로그인'},
		choose_login_type: {value: 'choose_login_type', label: '직접 로그인'},
		id_input: {value: 'id_input', label: '수동 로그인'},
	},
	resource: {
		certain: {value: 'certain', label: '특정 자원'},
		all: {value: 'all', label: '모든 자원'},
	},
};

export const grantRestrictOptions = [
	{
		value: GRANT_RESTRICT_OPTIONS.use.value,
		label: GRANT_RESTRICT_OPTIONS.use.label,
	},
	{
		value: GRANT_RESTRICT_OPTIONS.none.value,
		label: GRANT_RESTRICT_OPTIONS.none.label,
	},
];

export const policyTypeOptions = [
	{
		value: policyOption.type['iam*'].value,
		label: policyOption.type['iam*'].label,
	},
	{
		value: policyOption.type['pam*'].value,
		label: policyOption.type['pam*'].label,
	},
];

export const usageOptions = [
	{
		value: policyOption.usage.use.value,
		label: policyOption.usage.use.label,
	},
	{
		value: policyOption.usage.none.value,
		label: policyOption.usage.none.label,
	},
];

export const applicationOptions = [
	{
		value: policyOption.application['console-ui:*'].value,
		label: policyOption.application['console-ui:*'].label,
	},
	{
		value: policyOption.application['web-terminal-ui:*'].value,
		label: policyOption.application['web-terminal-ui:*'].label,
	},
];

export const authUsageOptions = [
	{
		value: policyOption.authUsage.use.value,
		label: policyOption.authUsage.use.label,
	},
	{
		value: policyOption.authUsage.none.value,
		label: policyOption.authUsage.none.label,
	},
];

export const requiredOptions = [
	{
		value: policyOption.required.all.value,
		label: policyOption.required.all.label,
	},
	{
		value: policyOption.required.select.value,
		label: policyOption.required.select.label,
	},
];

export const additionalAuthMethodOptions = [
	{
		value: policyOption.additionalAuthMethod.mail.value,
		label: policyOption.additionalAuthMethod.mail.label,
	},
	{
		value: policyOption.additionalAuthMethod.sms.value,
		label: policyOption.additionalAuthMethod.sms.label,
	},
	{
		value: policyOption.additionalAuthMethod.kakao.value,
		label: policyOption.additionalAuthMethod.kakao.label,
	},
];

export const authMethodOptions = [
	{
		value: policyOption.authMethod.none.value,
		label: policyOption.authMethod.none.label,
	},
	{
		value: policyOption.authMethod.mail.value,
		label: policyOption.authMethod.mail.label,
	},
	{
		value: policyOption.authMethod.sms.value,
		label: policyOption.authMethod.sms.label,
	},
	{
		value: policyOption.authMethod.kakao.value,
		label: policyOption.authMethod.kakao.label,
	},
];

export const identityVerificationMethodOptions = [
	{
		value: policyOption.identityVerificationMethod.idAndPassword.value,
		label: policyOption.identityVerificationMethod.idAndPassword.label,
	},
	{
		value: policyOption.identityVerificationMethod.mail.value,
		label: policyOption.identityVerificationMethod.mail.label,
	},
	{
		value: policyOption.identityVerificationMethod.sms.value,
		label: policyOption.identityVerificationMethod.sms.label,
	},
	{
		value: policyOption.identityVerificationMethod.kakao.value,
		label: policyOption.identityVerificationMethod.kakao.label,
	},
];

export const blockingTypeOptions = [
	{
		value: policyOption.blockingType.locked.value,
		label: policyOption.blockingType.locked.label,
	},
	{
		value: policyOption.blockingType.deleted.value,
		label: policyOption.blockingType.deleted.label,
	},
];

export const blockingType2Options = [
	{
		value: policyOption.blockingType2.logout.value,
		label: policyOption.blockingType2.logout.label,
	},
	{
		value: policyOption.blockingType2['screen-lock'].value,
		label: policyOption.blockingType2['screen-lock'].label,
	},
];

export const blockingInitTypeOptions = [
	{
		value: policyOption.blockingInitType.identity_verification.value,
		label: policyOption.blockingInitType.identity_verification.label,
	},
	{
		value: policyOption.blockingInitType.admin_temp_password.value,
		label: policyOption.blockingInitType.admin_temp_password.label,
	},
];

export const groupPermissionTypeOptions = [
	{
		value: policyOption.groupPermissionType.revoke.value,
		label: policyOption.groupPermissionType.revoke.label,
	},
	{
		value: policyOption.groupPermissionType.grant.value,
		label: policyOption.groupPermissionType.grant.label,
	},
	{
		value: policyOption.groupPermissionType.keeps.value,
		label: policyOption.groupPermissionType.keeps.label,
	},
];

export const gracePeriodUsageOptions = [
	{
		value: policyOption.gracePeriod.use.value,
		label: policyOption.gracePeriod.use.label,
	},
	{
		value: policyOption.gracePeriod.none.value,
		label: policyOption.gracePeriod.none.label,
	},
];

export const patternTypeOptions = [
	{
		value: policyOption.patternType.prefix.value,
		label: policyOption.patternType.prefix.label,
	},
	{
		value: policyOption.patternType.suffix.value,
		label: policyOption.patternType.suffix.label,
	},
];

export const restrictionOptions = [
	{
		value: policyOption.restrict.restrict.value,
		label: policyOption.restrict.restrict.label,
	},
	{
		value: policyOption.restrict.none.value,
		label: policyOption.restrict.none.label,
	},
];

export const personalInfoRestrictionMethodOptions = [
	{
		value: policyOption.personalInfoRestrictionMethod.email.value,
		label: policyOption.personalInfoRestrictionMethod.email.label,
	},
	{
		value: policyOption.personalInfoRestrictionMethod.mobile.value,
		label: policyOption.personalInfoRestrictionMethod.mobile.label,
	},
	{
		value: policyOption.personalInfoRestrictionMethod.userId.value,
		label: policyOption.personalInfoRestrictionMethod.userId.label,
	},
];

export const inputTypeOptions = [
	{
		value: policyOption.inputType.auto.value,
		label: policyOption.inputType.auto.label,
	},
	{
		value: policyOption.inputType.choose_login_type.value,
		label: policyOption.inputType.choose_login_type.label,
	},
	{
		value: policyOption.inputType.id_input.value,
		label: policyOption.inputType.id_input.label,
	},
];

export const resourceOptions = [
	{
		value: policyOption.resource.certain.value,
		label: policyOption.resource.certain.label,
	},
	{
		value: policyOption.resource.all.value,
		label: policyOption.resource.all.label,
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
