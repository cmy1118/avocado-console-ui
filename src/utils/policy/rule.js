import {policyOption} from './options';
import {DRAGGABLE_KEY} from '../../Constants/Table/keys';

export const ruleTypes = {
	//iam - 사용자 인증
	device_authentication: 'device_authentication',
	mfa: 'mfa',
	alternative_authn_failover: 'alternative_authn_failover',
	identity_verification: 'identity_verification',
	//iam - 사용자 계정 처리
	sign_in_fail_blocking: 'sign_in_fail_blocking',
	dormant_blocking: 'dormant_blocking',
	account_expired: 'account_expired',
	password_expired: 'password_expired',
	group_modifying: 'group_modifying',
	resigned: 'resigned',
	//iam - 사용자 접근
	allowed_service_time: 'allowed_service_time',
	//iam - 세션 정책
	session_timeout: 'session_timeout',
	screen_saver: 'screen_saver',
	//iam - 패턴 정책
	user_id_pattern: 'user_id_pattern',
	password_pattern: 'password_pattern',
};

export const ruleTypeDescription = {
	//iam - 사용자 인증
	[ruleTypes.device_authentication]: '단말기 인증',
	[ruleTypes.mfa]: 'MFA(다중 인증)',
	[ruleTypes.alternative_authn_failover]: 'Fail Over',
	[ruleTypes.identity_verification]: '본인 확인 인증',
	//iam - 사용자 계정 처리
	[ruleTypes.sign_in_fail_blocking]: '로그인 실패',
	[ruleTypes.dormant_blocking]: '휴먼',
	[ruleTypes.account_expired]: '계정 사용 기간',
	[ruleTypes.password_expired]: '비밀번호 사용 기간',
	[ruleTypes.group_modifying]: '그룹 변경',
	[ruleTypes.resigned]: '퇴사(탈퇴)',
	//iam - 사용자 접근
	[ruleTypes.allowed_service_time +
	policyOption.application['console-ui:*'].key]: 'Management Console',
	[ruleTypes.allowed_service_time +
	policyOption.application['web-terminal-ui:*'].key]: 'Web Terminal',
	//iam - 세션 정책
	[ruleTypes.session_timeout]: '세션 타임 아웃',
	[ruleTypes.screen_saver]: '화면 보호기',
	//iam - 패턴 정책
	[ruleTypes.user_id_pattern]: '사용자 ID 패턴',
	[ruleTypes.password_pattern]: '비밀번호 패턴',
};

/**************************************************
 * ambacc244 - 사용 유무 preview에 프린트 함수
 **************************************************/
const printUsage = (attribute) => {
	if (attribute?.usage) return policyOption.usage.use.label;
	return policyOption.usage.none.label;
};

/**************************************************
 * ambacc244 - 제한 유무 preview에 프린트 함수
 **************************************************/
const printRestrition = (attribute) => {
	if (attribute?.usage) return policyOption.restrict.restrict.label;
	return policyOption.restrict.none.label;
};

/**************************************************
 * ambacc244 - mfa 속성 preview에 프린트 함수
 **************************************************/
const printMfa = (attribute, num) => {
	let string = '';

	if (attribute[num]) {
		string += policyOption.required[attribute[1].option].label + ') : ';
		attribute[num].types.map((v, i) => {
			string += policyOption.additionalAuthMethod[v].label;
			if (i !== attribute[num].types.length - 1) string += '/';
		});
	} else string += '안함)';

	return string;
};

/**************************************************
 * ambacc244 - IAM ruleType에 따라 rule attribute 데이터 변경
 **************************************************/
export const iamRuleAttributeConverterByRuleType = (attribute) => {
	let string = '';

	switch (attribute.ruleType) {
		case ruleTypes.device_authentication: {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string += '\n\t제어 어플리리케이션 : ';
				attribute?.resource.map((v, i) => {
					string += policyOption.application[v].label;
					if (i !== attribute.resource.length - 1) {
						string += '/';
					}
				});
			}

			break;
		}

		case ruleTypes.mfa: {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string += '\n\t1차 추가인증(' + printMfa(attribute, 1);
				string += '\n\t2차 추가인증(' + printMfa(attribute, 2);
				string += '\n\t3차 추가인증(' + printMfa(attribute, 3);
				string +=
					'\n\t입력 대기 시간(초) : ' + attribute.timeoutSeconds;
			}

			break;
		}

		case ruleTypes.alternative_authn_failover: {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string += '\n\t기본인증 : ';
				if (attribute?.auth)
					string +=
						policyOption.authMethod[attribute.auth.type].label +
						')';
				else string += policyOption.authMethod.none.label;
				string += '\n\tMFA : ';
				if (attribute?.mfa)
					string +=
						policyOption.authMethod[attribute.mfa.type].label + ')';
				else string += policyOption.authMethod.none.label;
				string += '\n\t입력 대기 시간(초) : ' + attribute.timoutSeconds;
			}
			break;
		}

		case ruleTypes.identity_verification: {
			string += printUsage(attribute);
			if (attribute?.usage) {
				string +=
					'\n\t확인유형 : ' +
					policyOption.identityVerificationMethod[
						Object.keys(attribute.policies)[0]
					].label;

				string +=
					'\n\t입력 대기 시간(초) : ' +
					attribute.policies[Object.keys(attribute.policies)[0]]
						.timoutSeconds;
			}
			break;
		}

		case ruleTypes.sign_in_fail_blocking: {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string +=
					'\n\t로그인 실패 횟수 : ' + attribute.failedCount + '회';
				string +=
					'\n\t계정 처리 방법 : ' +
					policyOption.blockingType[attribute.blockingType].label;
				string +=
					'\n\t계정 정상화 : ' + attribute.unblockedHours + '시간 후';
			}
			break;
		}

		case ruleTypes.dormant_blocking: {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string +=
					'\n\t연속 미접속 기간 : ' +
					attribute.unconnectedDays +
					'일';
				string +=
					'\n\t계정 처리 방법 : ' +
					policyOption.blockingType[attribute.blockingType].label;
				string +=
					'\n\t계정 정상화 : ' +
					policyOption.blockingInitType.identity_verification.label;
			}
			break;
		}

		case ruleTypes.account_expired: {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string += '\n\t사용 기간 : ' + attribute.expiryDays + '일';
				string +=
					'\n\t계정 처리 방법 : ' +
					policyOption.blockingType[attribute.blockingType].label;
				string +=
					'\n\t계정 정상화 : ' +
					policyOption.blockingInitType.admin_temp_password.label;
			}
			break;
		}

		case ruleTypes.password_expired: {
			string += printUsage(attribute);
			console.log(attribute);
			if (attribute?.usage) {
				string += '\n\t사용 기간 : ' + attribute.expiryDays + '일';
				string +=
					'\n\t계정 처리 방법 : ' +
					policyOption.blockingType[attribute.blockingType].label;
				string +=
					'\n\t계정 정상화 : ' +
					policyOption.blockingInitType[attribute.blockingInitType]
						.label;
			}
			break;
		}

		case ruleTypes.group_modifying: {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string += '\n\t제어 그룹 유형 : ';
				string +=
					'\n\t계정 처리 방법 : ' +
					policyOption.blockingType[attribute.blockingType].label;
				string +=
					'\n\t그룹 권한 처리 : ' +
					policyOption.groupPermissionType[attribute.permissionType]
						.label;
				string +=
					'\n\t계정 정상화 : ' +
					policyOption.blockingInitType.admin_temp_password.label;
			}
			break;
		}

		case ruleTypes.resigned: {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string +=
					'\n\t계정 처리 방법 : ' +
					policyOption.blockingType[attribute.blockingType].label;
				string += '\n\t유예 기간 : ' + attribute.applyDays + '일';
				string +=
					'\n\t계정 정상화 : ' +
					policyOption.blockingInitType.admin_temp_password.label;
			}
			break;
		}

		case ruleTypes.user_id_pattern: {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string +=
					'\n\t패턴 형식 : ' +
					policyOption.patternType[attribute.patternType].label;
				string += '\n\t패턴 입력 : ' + attribute.pattern;
			}
			break;
		}

		case ruleTypes.password_pattern: {
			string +=
				'비밀번호 길이 : 최소 ' +
				attribute.minLength +
				' 최대 ' +
				' 최대 ' +
				attribute.maxLength;
			string +=
				'\n숫자 연속 횟수 : ' + attribute.numberOfConsecutiveNumerics;
			string +=
				'\n영문 숫자 혼합 여부 : ' +
				(attribute.mixNumberAndAlpha
					? policyOption.usage.use.label
					: policyOption.usage.none.label);
			string +=
				'\n대소문자 혼합 여부 : ' +
				(attribute.mixCase
					? policyOption.usage.use.label
					: policyOption.usage.none.label);
			string +=
				'\n반복문자 사용제한 : ' +
				(attribute.repeatedAlpha
					? policyOption.restrict.restrict.label
					: policyOption.usage.none.label);
			string += '\n인적 사항 제한 : ';

			if (attribute.includePersonalInfoList.length > 0)
				string += '\n제한함 (';
			else string += '\n제한 안함';

			attribute.includePersonalInfoList.map((v, i) => {
				string += policyOption.personalInfoRestrictionMethod[v].label;
				if (i !== attribute.includePersonalInfoList.length - 1) {
					string += '/';
				} else {
					string += ')';
				}
			});

			string += '\n이전 비밀번호 재사용 제한 : ';

			if (attribute.allowedDaysOfOldPasswords !== 0)
				string +=
					'\n제한함 (' + attribute.allowedDaysOfOldPasswords + '일)';
			else string += '\n제한 안함';

			break;
		}

		case ruleTypes.allowed_service_time: {
			string += printRestrition(attribute);
			console.log(attribute);
			if (attribute?.usage) {
				if (attribute.policies?.MONDAY)
					string +=
						'\n\t월 : ' +
						attribute.policies?.MONDAY?.from +
						' ~ ' +
						attribute.policies?.MONDAY?.to;
				if (attribute.policies?.TUESDAY)
					string +=
						'\n\t화 : ' +
						attribute.policies?.TUESDAY?.from +
						' ~ ' +
						attribute.policies?.TUESDAY?.to;
				if (attribute.policies?.WEDNESDAY)
					string +=
						'\n\t수 : ' +
						attribute.policies?.WEDNESDAY?.from +
						' ~ ' +
						attribute.policies?.WEDNESDAY?.to;
				if (attribute.policies?.THURSDAY)
					string +=
						'\n\t목 : ' +
						attribute.policies?.THURSDAY?.from +
						' ~ ' +
						attribute.policies?.THURSDAY?.to;
				if (attribute.policies?.FRIDAY)
					string +=
						'\n\t금 : ' +
						attribute.policies?.FRIDAY?.from +
						' ~ ' +
						attribute.policies?.FRIDAY?.to;
				if (attribute.policies?.SATURDAY)
					string +=
						'\n\t토 : ' +
						attribute.policies?.SATURDAY?.from +
						' ~ ' +
						attribute.policies?.SATURDAY?.to;
				if (attribute.policies?.SUNDAY)
					string +=
						'\n\t일 : ' +
						attribute.policies?.SUNDAY?.from +
						' ~ ' +
						attribute.policies?.SUNDAY?.to;
			}
			break;
		}

		case ruleTypes.session_timeout: {
			Object.entries(attribute.policies).map(([key, value], i) => {
				if (i !== 0) string += '\n';
				string += `${key}`;

				if (value.usage) {
					string += `\n\t세션 유지 시간 : ${value.sessionTimeSeconds}초`;
					string += `\n\t연결 보존 시간 : ${value.keepAliveTimeSeconds}초`;
					string +=
						'\n\t타임아웃 처리 :  ' +
						policyOption.blockingType2[value.blockingType].label;
				} else {
					string += `\n\t${printUsage(value)}`;
				}
			});

			break;
		}

		case ruleTypes.screen_saver: {
			string += printUsage(attribute);
			string += `\n\t유휴시간 : ${attribute.timeToIdle}초`;
			break;
		}

		default:
			break;
	}
	return string;
};

/**************************************************
 * ambacc244 - 정책에 할당된 rule을 화면에 표현하기 위한 함수
 **************************************************/
export const iamPolicyRuleDetailsConverter = (data) => {
	let dataArray = [];

	for (let i = 0; i < data.length; i++) {
		let singleData = new Object();

		if (i === 0 || data[i]?.category?.code !== data[i - 1]?.category?.code)
			singleData.name = data[i].policyName;
		singleData.id = data[i].attribute.ruleType + data[i].resource;
		singleData[DRAGGABLE_KEY] =
			data[i].attribute.ruleType + data[i].resource;

		if (data[i].attribute.ruleType === ruleTypes.allowed_service_time) {
			singleData.detail =
				ruleTypeDescription[
					data[i].attribute.ruleType + data[i].resource
				];
		} else {
			singleData.detail = ruleTypeDescription[data[i].attribute.ruleType];
		}

		singleData.value = iamRuleAttributeConverterByRuleType(
			data[i].attribute,
		);
		dataArray.push(singleData);
	}

	return dataArray;
};

/**************************************************
 * ambacc244 - 정책에 할당된 rule을 preview 화면에 표현하기 위한 함수
 **************************************************/
export const iamPolicyRuleDetailsPreviewConverter = (data) => {
	let dataArray = [];

	data.map((v) => {
		for (let i = 0; i < v.details.length; i++) {
			let singleData = new Object();

			if (i === 0) singleData.policy = v.name;
			singleData.id =
				v.details[i].attribute.ruleType + v.details[i].resource;
			singleData[DRAGGABLE_KEY] =
				v.details[i].attribute.ruleType + v.details[i].resource;

			if (
				v.details[i].attribute.ruleType ===
				ruleTypes.allowed_service_time
			) {
				singleData.detail =
					ruleTypeDescription[
						v.details[i].attribute.ruleType + v.details[i].resource
					];
			} else {
				singleData.detail =
					ruleTypeDescription[v.details[i].attribute.ruleType];
			}

			singleData.value = iamRuleAttributeConverterByRuleType(
				v.details[i].attribute,
			);
			dataArray.push(singleData);
		}
	});
	return dataArray;
};
