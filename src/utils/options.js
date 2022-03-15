export const optionValue = {
	usage: {use: 'use', none: 'none'},
	application: {
		'console-ui:*': 'console-ui:*',
		'web-terminal-ui:*': 'web-terminal-ui:*',
	},
	authUsage: {use: 'use', none: 'none'},
	required: {all: 'all', select: 'select', none: 'no'},
	additionalAuthMethod: {
		mail: 'mail',
		sms: 'sms',
		kakao: 'kakao',
	},
	authMethod: {
		none: 'none',
		mail: 'mail',
		sms: 'sms',
		kakao: 'kakao',
	},
	identityVerificationMethod: {
		idAndPassword: 'idAndPassword',
		mail: 'mail',
		sms: 'sms',
		kakao: 'kakao',
	},
	blockingType: {
		locked: 'locked',
		deleted: 'deleted',
	},
	accountNormalization: {
		identityVerification: 'identityVerification',
		manager: 'manager',
	},
	blockingType2: {
		locked: 'locked',
		deleted: 'deleted',
		none: 'none',
	},
	groupPermissionType: {
		revoke: 'revoke',
		grant: 'grant',
		keeps: 'keeps',
	},
	accountNormalization2: {
		revoke: 'revoke',
		grant: 'grant',
	},
	gracePeriod: {
		none: 'no',
		use: 'yes',
	},
	patternType: {prefix: 'prefix', suffix: 'suffix'},
	restrict: {restrict: 'yes', none: 'none'},
	personalInfoRestrictionMethod: {
		email: 'email',
		mobile: 'mobile',
		userId: 'userId',
	},
};

export const optionLabel = {
	usage: {use: '사용함', none: '사용 안함'},
	application: {
		'console-ui:*': 'Management Console',
		'web-terminal-ui:*': 'WebTerminal',
	},
	authUsage: {use: '인증 함', none: '인증 안함'},
	required: {all: '필수', select: '선택', none: '없음'},
	additionalAuthMethod: {
		mail: '인증번호(Mail)',
		sms: '인증번호(SMS)',
		kakao: '인증번호(Kakao)',
	},
	authMethod: {
		none: '없음',
		mail: '인증번호(Mail)',
		sms: '인증번호(SMS)',
		kakao: '인증번호(Kakao)',
	},
	identityVerificationMethod: {
		idAndPassword: 'ID/Password',
		mail: '인증번호(Mail)',
		sms: '인증번호(SMS)',
		kakao: '인증번호(Kakao)',
	},
	blockingType: {
		locked: '잠금',
		deleted: '삭제',
	},
	accountNormalization: {
		identityVerification: '본인 확인 인증',
		manager: '관리자에 의한 정상화(임시 패스워드 발급)',
	},
	blockingType2: {
		locked: '잠금',
		deleted: '삭제',
		none: '안함',
	},
	groupPermissionType: {
		revoke: '회수',
		grant: '부여(변경후 그룹의 권한)',
		keeps: '유지(기존 권한 유지)',
	},
	accountNormalization2: {
		revoke: '회수',
		grant: '부여(변경후 그룹의 권한)',
	},
	gracePeriod: {
		none: '없음',
		use: '있음',
	},
	patternType: {prefix: '접두사', suffix: '접미사'},
	restrict: {restrict: '제한함', none: '제한 안함'},
	personalInfoRestrictionMethod: {
		email: 'Email',
		mobile: '전화번호',
		userId: 'ID 동일 연속 문자 수(3)',
	},
};

export const usageOptions = [
	{
		key: optionValue.usage.use,
		label: optionLabel.usage.use,
	},
	{
		key: optionValue.usage.none,
		label: optionLabel.usage.none,
	},
];

export const applicationOptions = [
	{
		key: optionValue.application['console-ui:*'],
		label: optionLabel.application['console-ui:*'],
	},
	{
		key: optionValue.application['web-terminal-ui:*'],
		label: optionLabel.application['web-terminal-ui:*'],
	},
];

export const authUsageOptions = [
	{
		key: optionValue.authUsage.use,
		label: optionLabel.authUsage.use,
	},
	{
		key: optionValue.authUsage.none,
		label: optionLabel.authUsage.none,
	},
];

export const requiredOptions = [
	{
		key: optionValue.required.all,
		label: optionLabel.required.all,
	},
	{
		key: optionValue.required.select,
		label: optionLabel.required.select,
	},
	{
		key: optionValue.required.none,
		label: optionLabel.required.none,
	},
];

export const additionalAuthMethodOptions = [
	{
		key: optionValue.additionalAuthMethod.mail,
		label: optionLabel.additionalAuthMethod.mail,
	},
	{
		key: optionValue.additionalAuthMethod.sms,
		label: optionLabel.additionalAuthMethod.sms,
	},
	{
		key: optionValue.additionalAuthMethod.kakao,
		label: optionLabel.additionalAuthMethod.kakao,
	},
];

export const authMethodOptions = [
	{
		key: optionValue.authMethod.none,
		label: optionLabel.authMethod.none,
	},
	{
		key: optionValue.authMethod.mail,
		label: optionLabel.authMethod.mail,
	},
	{
		key: optionValue.authMethod.sms,
		label: optionLabel.authMethod.sms,
	},
	{
		key: optionValue.authMethod.kakao,
		label: optionLabel.authMethod.kakao,
	},
];

export const identityVerificationMethodOptions = [
	{
		key: optionValue.identityVerificationMethod.idAndPassword,
		label: optionLabel.identityVerificationMethod.idAndPassword,
	},
	{
		key: optionValue.identityVerificationMethod.mail,
		label: optionLabel.identityVerificationMethod.mail,
	},
	{
		key: optionValue.identityVerificationMethod.sms,
		label: optionLabel.identityVerificationMethod.sms,
	},
	{
		key: optionValue.identityVerificationMethod.kakao,
		label: optionLabel.identityVerificationMethod.kakao,
	},
];

export const accountBlockingTypeOptions = [
	{
		key: optionValue.blockingType.locked,
		label: optionLabel.blockingType.locked,
	},
	{
		key: optionValue.blockingType.deleted,
		label: optionLabel.blockingType.deleted,
	},
];

export const accountBlockingType2Options = [
	{
		key: optionValue.blockingType2.locked,
		label: optionLabel.blockingType2.locked,
	},
	{
		key: optionValue.blockingType2.deleted,
		label: optionLabel.blockingType2.deleted,
	},
	{
		key: optionValue.blockingType2.none,
		label: optionLabel.blockingType2.none,
	},
];

export const groupPermissionTypeOptions = [
	{
		key: optionValue.groupPermissionType.revoke,
		label: optionLabel.groupPermissionType.revoke,
	},
	{
		key: optionValue.groupPermissionType.grant,
		label: optionLabel.groupPermissionType.grant,
	},
	{
		key: optionValue.groupPermissionType.keeps,
		label: optionLabel.groupPermissionType.keeps,
	},
];

export const gracePeriodUsageOptions = [
	{
		key: optionValue.gracePeriod.use,
		label: optionLabel.gracePeriod.use,
	},
	{
		key: optionValue.gracePeriod.none,
		label: optionLabel.gracePeriod.none,
	},
];

export const patternTypeOptions = [
	{
		key: optionValue.patternType.prefix,
		label: optionLabel.patternType.prefix,
	},
	{
		key: optionValue.patternType.suffix,
		label: optionLabel.patternType.suffix,
	},
];

export const restrictionOptions = [
	{
		key: optionValue.restrict.restrict,
		label: optionLabel.restrict.restrict,
	},
	{
		key: optionValue.restrict.none,
		label: optionLabel.restrict.none,
	},
];

export const personalInfoRestrictionMethodOptions = [
	{
		key: optionValue.personalInfoRestrictionMethod.email,
		label: optionLabel.personalInfoRestrictionMethod.email,
	},
	{
		key: optionValue.personalInfoRestrictionMethod.mobile,
		label: optionLabel.personalInfoRestrictionMethod.mobile,
	},
	{
		key: optionValue.personalInfoRestrictionMethod.userId,
		label: optionLabel.personalInfoRestrictionMethod.userId,
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
