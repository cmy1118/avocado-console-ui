const optionValue = {
	usage: {use: 'use', nonuse: 'nonuse'},
	application: {
		managementConsole: 'managementConsole',
		webTerminal: 'webTerminal',
	},
	authUsage: {use: 'use', nonuse: 'nonuse'},
	required: {required: 'required', optional: 'optional', no: 'no'},
	additionalAuthMethod: {
		mail: 'mail',
		sms: 'sms',
		kakao: 'kakao',
	},
	authMethod: {
		no: 'no',
		mail: 'mail',
		sms: 'sms',
		kakao: 'kakao',
	},
	identityVerificationMethod: {
		idPassword: 'idPassword',
		mail: 'mail',
		sms: 'sms',
		kakao: 'kakao',
	},
	accountStatus: {
		lock: 'lock',
		delete: 'delete',
	},
	accountNormalization: {
		identityVerification: 'identityVerification',
		manager: 'manager',
	},
	accountStatus2: {
		lock: 'lock',
		delete: 'delete',
		no: 'no',
	},
	groupPrivileges: {
		revoke: 'revoke',
		grant: 'grant',
		remain: 'remain',
	},
	accountNormalization2: {
		revoke: 'revoke',
		grant: 'grant',
	},
	gracePeriod: {
		no: 'no',
		yes: 'yes',
	},
	patternFormat: {prefix: 'prefix', suffix: 'suffix'},
	restriction: {yes: 'yes', no: 'no'},
	personalInformationRestrictionMethod: {
		email: 'email',
		phoneNumber: 'phoneNumber',
		consecutiveNumbersWithId: 'consecutiveNumbersWithId',
	},
};

const optionLabel = {
	usage: {use: '사용함', nonuse: '사용 안함'},
	application: {
		managementConsole: 'Management Console',
		webTerminal: 'WebTerminal',
	},
	authUsage: {use: '인증 함', nonuse: '인증 안함'},
	required: {required: '필수', optional: '선택', no: '없음'},
	additionalAuthMethod: {
		mail: '인증번호(Mail)',
		sms: '인증번호(SMS)',
		kakao: '인증번호(Kakao)',
	},
	authMethod: {
		no: '없음',
		mail: '인증번호(Mail)',
		sms: '인증번호(SMS)',
		kakao: '인증번호(Kakao)',
	},
	identityVerificationMethod: {
		idPassword: 'ID/Password',
		mail: '인증번호(Mail)',
		sms: '인증번호(SMS)',
		kakao: '인증번호(Kakao)',
	},
	accountStatus: {
		lock: '잠금',
		delete: '삭제',
	},
	accountNormalization: {
		identityVerification: '본인 확인 인증',
		manager: '관리자에 의한 정상화(임시 패스워드 발급)',
	},
	accountStatus2: {
		lock: '잠금',
		delete: '삭제',
		no: '안함',
	},
	groupPrivileges: {
		revoke: '회수',
		grant: '부여(변경후 그룹의 권한)',
		remain: '유지(기존 권한 유지)',
	},
	accountNormalization2: {
		revoke: '회수',
		grant: '부여(변경후 그룹의 권한)',
	},
	gracePeriod: {
		no: '없음',
		yes: '있음',
	},
	patternFormat: {prefix: '접두사', suffix: '접미사'},
	restriction: {yes: '제한함', no: '제한 안함'},
	personalInformationRestrictionMethod: {
		email: 'Email',
		phoneNumber: '전화번호',
		consecutiveNumbersWithId: 'ID 동일 연속 문자 수(3)',
	},
};

export const usageOptions = [
	{
		key: optionValue.usage.use,
		label: optionLabel.usage.use,
	},
	{
		key: optionValue.usage.nonuse,
		label: optionLabel.usage.nonuse,
	},
];

export const applicationOptions = [
	{
		key: optionValue.application.managementConsole,
		label: optionLabel.application.managementConsole,
	},
	{
		key: optionValue.application.webTerminal,
		label: optionLabel.application.webTerminal,
	},
];

export const authUsageOptions = [
	{
		key: optionValue.authUsage.use,
		label: optionLabel.authUsage.use,
	},
	{
		key: optionValue.authUsage.nonuse,
		label: optionLabel.authUsage.nonuse,
	},
];

export const requiredOptions = [
	{
		key: optionValue.required.required,
		label: optionValue.required.required,
	},
	{
		key: optionValue.required.optional,
		label: optionValue.required.optional,
	},
	{
		key: optionValue.required.no,
		label: optionValue.required.no,
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
		key: optionValue.authMethod.no,
		label: optionLabel.authMethod.no,
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
		key: optionValue.identityVerificationMethod.idPassword,
		label: optionLabel.identityVerificationMethod.idPassword,
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

export const accountStatusOptions = [
	{
		key: optionValue.accountStatus.lock,
		label: optionLabel.accountStatus.lock,
	},
	{
		key: optionValue.accountStatus.delete,
		label: optionLabel.accountStatus.delete,
	},
];

export const accountNormalizationOptions = [
	{
		key: optionValue.accountNormalization.identityVerification,
		label: optionLabel.accountNormalization.identityVerification,
	},
	{
		key: optionValue.accountNormalization.manager,
		label: optionLabel.accountNormalization.manager,
	},
];

export const accountStatus2Options = [
	{
		key: optionValue.accountStatus2.lock,
		label: optionLabel.accountStatus2.lock,
	},
	{
		key: optionValue.accountStatus2.delete,
		label: optionLabel.accountStatus2.delete,
	},
	{
		key: optionValue.accountStatus2.no,
		label: optionLabel.accountStatus2.no,
	},
];

export const groupPrivilegesOptions = [
	{
		key: optionValue.groupPrivileges.revoke,
		label: optionLabel.groupPrivileges.revoke,
	},
	{
		key: optionValue.groupPrivileges.grant,
		label: optionLabel.groupPrivileges.grant,
	},
	{
		key: optionValue.groupPrivileges.remain,
		label: optionLabel.groupPrivileges.remain,
	},
];

export const accountNormalization2Options = [
	{
		key: optionValue.accountNormalization2.revoke,
		label: optionLabel.accountNormalization2.revoke,
	},
	{
		key: optionValue.accountNormalization2.grant,
		label: optionLabel.accountNormalization2.grant,
	},
];

export const gracePeriodOptions = [
	{
		key: optionValue.gracePeriod.yes,
		label: optionLabel.gracePeriod.yes,
	},
	{
		key: optionValue.gracePeriod.no,
		label: optionLabel.gracePeriod.no,
	},
];

export const patternFormatOptions = [
	{
		key: optionValue.patternFormat.prefix,
		label: optionLabel.patternFormat.prefix,
	},
	{
		key: optionValue.patternFormat.suffix,
		label: optionLabel.patternFormat.suffix,
	},
];

export const restrictionOptions = [
	{
		key: optionValue.restriction.yes,
		label: optionLabel.restriction.yes,
	},
	{
		key: optionValue.restriction.no,
		label: optionLabel.restriction.no,
	},
];

export const personalInformationRestrictionMethodOptions = [
	{
		key: optionValue.personalInformationRestrictionMethod.email,
		label: optionLabel.personalInformationRestrictionMethod.email,
	},
	{
		key: optionValue.personalInformationRestrictionMethod.phoneNumber,
		label: optionLabel.personalInformationRestrictionMethod.phoneNumber,
	},
	{
		key:
			optionValue.personalInformationRestrictionMethod
				.consecutiveNumbersWithId,
		label:
			optionLabel.personalInformationRestrictionMethod
				.consecutiveNumbersWithId,
	},
];
