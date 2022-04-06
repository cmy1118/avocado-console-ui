import {policyOption} from '../policyOptions';

export const ruleTypeDescription = {
	device_authentication: '단말기 인증',
	mfa: 'MFA(다중 인증)',
	alternative_authn_failover: 'Fail Over',
	identity_verification: '본인 확인 인증',
	sign_in_fail_blocking: '로그인 실패',
	dormant_blocking: '휴먼',
	account_expired: '계정 사용 기간',
	password_expired: '비밀번호 사용 기간',
	group_modifying: '그룹 변경',
	resigned: '퇴사(탈퇴)',
	user_id_pattern: '사용자 ID 패턴',
	password_pattern: '비밀번호 패턴',
	session_timeout: '세션 타임 아웃',
	screen_saver: '화면 보호기',
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
 * ambacc244 - 정책 생성 요약정보(규칙 데이터 필터링 함수)
 **************************************************/
export const roleAttributeConvertor = (attribute) => {
	let string = '';

	switch (attribute.ruleType) {
		case 'device_authentication': {
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
		case 'mfa': {
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

		case 'alternative_authn_failover': {
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

		case 'identity_verification': {
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

		case 'sign_in_fail_blocking': {
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

		case 'dormant_blocking': {
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

		case 'account_expired': {
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

		case 'password_expired': {
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

		case 'group_modifying': {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string += '\n\t제어 그룹 유형 : ';
				string +=
					'\n\t계정 처리 방법 : ' +
					policyOption.blockingType2[attribute.blockingType].label;
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

		case 'resigned': {
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

		case 'user_id_pattern': {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string +=
					'\n\t패턴 형식 : ' +
					policyOption.patternType[attribute.patternType].label;
				string += '\n\t패턴 입력 : ' + attribute.pattern;
			}
			break;
		}

		case 'password_pattern': {
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

		case 'allowed_service_time': {
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

		case 'session_timeout': {
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

		case 'screen_saver': {
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
 *정책 생성 요약정보 - 권한(action) 데이터 필터링 함수
 **************************************************/
//Todo:재사용 가능 하도록 리팩토링 예정
export const actionPreviewfilter = (arr) => {
	let newArr = [];
	let item = '';
	arr.map((v) => {
		if (item === v.resource) {
			const index = newArr.findIndex((s) => s.resource === v.resource);
			newArr[index].value =
				newArr[index].value + `\n\t${v.action} : ${v.effect}`;
		} else if (item != v.resource) {
			let obj = {};
			obj.resource = v.resource;
			obj.value = `\n\t${v.action} : ${v.effect}`;
			item = v.resource;
			newArr.push(obj);
		}
	});
	console.log('결과:', newArr);
	return newArr;
};
