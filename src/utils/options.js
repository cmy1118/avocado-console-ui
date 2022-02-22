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
};

const optionLabel = {
	usage: {use: '인증 함', nonuse: '인증 안함'},
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
};

export const usageOptions = [
	{
		value: optionValue.usage.use,
		label: optionLabel.usage.use,
	},
	{
		value: optionValue.usage.nonuse,
		label: optionLabel.usage.nonuse,
	},
];

export const applicationOptions = [
	{
		value: optionValue.application.managementConsole,
		label: optionLabel.application.managementConsole,
	},
	{
		value: optionValue.application.webTerminal,
		label: optionLabel.application.webTerminal,
	},
];

export const authUsageOptions = [
	{
		value: optionValue.authUsage.use,
		label: optionLabel.authUsage.use,
	},
	{
		value: optionValue.authUsage.nonuse,
		label: optionLabel.authUsage.nonuse,
	},
];

export const requiredOptions = [
	{
		value: optionValue.required.required,
		label: optionValue.required.required,
	},
	{
		value: optionValue.required.optional,
		label: optionValue.required.optional,
	},
	{
		value: optionValue.required.no,
		label: optionValue.required.no,
	},
];

export const additionalAuthMethodOptions = [
	{
		value: optionValue.additionalAuthMethod.mail,
		label: optionLabel.additionalAuthMethod.mail,
	},
	{
		value: optionValue.additionalAuthMethod.sms,
		label: optionLabel.additionalAuthMethod.sms,
	},
	{
		value: optionValue.additionalAuthMethod.kakao,
		label: optionLabel.additionalAuthMethod.kakao,
	},
];

export const authMethodOptions = [
	{
		value: optionValue.authMethod.no,
		label: optionLabel.authMethod.no,
	},
	{
		value: optionValue.authMethod.mail,
		label: optionLabel.authMethod.mail,
	},
	{
		value: optionValue.authMethod.sms,
		label: optionLabel.authMethod.sms,
	},
	{
		value: optionValue.authMethod.kakao,
		label: optionLabel.authMethod.kakao,
	},
];

export const identityVerificationMethodOptions = [
	{
		value: optionValue.identityVerificationMethod.idPassword,
		label: optionLabel.identityVerificationMethod.idPassword,
	},
	{
		value: optionValue.identityVerificationMethod.mail,
		label: optionLabel.identityVerificationMethod.mail,
	},
	{
		value: optionValue.identityVerificationMethod.sms,
		label: optionLabel.identityVerificationMethod.sms,
	},
	{
		value: optionValue.identityVerificationMethod.kakao,
		label: optionLabel.identityVerificationMethod.kakao,
	},
];

export const accountStatusOptions = [
	{
		value: optionValue.accountStatus.lock,
		label: optionLabel.accountStatus.lock,
	},
	{
		value: optionValue.accountStatus.delete,
		label: optionLabel.accountStatus.delete,
	},
];

export const accountNormalizationOptions = [
	{
		value: optionValue.accountNormalization.identityVerification,
		label: optionLabel.accountNormalization.identityVerification,
	},
	{
		value: optionValue.accountNormalization.manager,
		label: optionLabel.accountNormalization.manager,
	},
];

export const accountStatus2Options = [
	{
		value: optionValue.accountStatus2.lock,
		label: optionLabel.accountStatus2.lock,
	},
	{
		value: optionValue.accountStatus2.delete,
		label: optionLabel.accountStatus2.delete,
	},
	{
		value: optionValue.accountStatus2.no,
		label: optionLabel.accountStatus2.no,
	},
];

export const groupPrivilegesOptions = [
	{
		value: optionValue.groupPrivileges.revoke,
		label: optionLabel.groupPrivileges.revoke,
	},
	{
		value: optionValue.groupPrivileges.grant,
		label: optionLabel.groupPrivileges.grant,
	},
	{
		value: optionValue.groupPrivileges.remain,
		label: optionLabel.groupPrivileges.remain,
	},
];

export const accountNormalization2Options = [
	{
		value: optionValue.accountNormalization2.revoke,
		label: optionLabel.accountNormalization2.revoke,
	},
	{
		value: optionValue.accountNormalization2.grant,
		label: optionLabel.accountNormalization2.grant,
	},
];

export const gracePeriodOptions = [
	{
		value: optionValue.gracePeriod.yes,
		label: optionLabel.gracePeriod.yes,
	},
	{
		value: optionValue.gracePeriod.no,
		label: optionLabel.gracePeriod.no,
	},
];
