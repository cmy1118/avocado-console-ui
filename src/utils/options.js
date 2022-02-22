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
