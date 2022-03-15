import {optionLabel} from './options';

const printUsage = (attribute) => {
	if (attribute?.usage) return optionLabel.usage.use;
	return optionLabel.usage.none;
};
const printMfa = (attribute, num) => {
	let string = '';

	if (attribute[num]) {
		string += optionLabel.required[attribute[1].option] + ') : ';
		attribute[num].types.map((v, i) => {
			string += optionLabel.additionalAuthMethod[v];
			if (i !== attribute[num].types.length - 1) string += '/';
		});
	} else string += '안함)';

	return string;
};

export const roleAttributeConvertor = (attribute) => {
	let string = '';
	console.log(attribute);
	switch (attribute.ruleType) {
		case 'device_authentication': {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string += '\n\t제어 어플리리케이션 : ';
				attribute?.resource.map((v, i) => {
					string += optionLabel.application[v];
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
					string += optionLabel.authMethod[attribute.auth.type] + ')';
				else string += optionLabel.authMethod.none;
				string += '\n\tMFA : ';
				if (attribute?.mfa)
					string += optionLabel.authMethod[attribute.mfa.type] + ')';
				else string += optionLabel.authMethod.none;
				string +=
					'\n\t입력 대기 시간(초) : ' + attribute.timeoutSeconds;
			}
			break;
		}

		case 'identity_verification': {
			string += printUsage(attribute);
			if (attribute?.usage) {
				string +=
					'\n\t확인유형 : ' +
					optionLabel.identityVerificationMethod[
						Object.keys(attribute.policies)[0]
					];

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
					optionLabel.blockingType[attribute.blockingType];
				string +=
					'\n\t오류 횟수 초기화 : ' +
					attribute.failedCountInitDays +
					'시간 후';
				string +=
					'\n\t계정 정상화 : ' + attribute.unblockedDays + '시간 후';
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
					optionLabel.blockingType[attribute.blockingType];
				string += '\n\t계정 정상화 : 본인 확인 인증';
			}
			break;
		}

		case 'account_expired': {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string += '\n\t사용 기간 : ' + attribute.expiryDays + '일';
				string +=
					'\n\t계정 처리 방법 : ' +
					optionLabel.blockingType[attribute.blockingType];
				string += '\n\t계정 정상화 : 관리자 해제';
			}
			break;
		}

		case 'group_modifying': {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string += '\n\t제어 그룹 유형 : ';
				string +=
					'\n\t계정 처리 방법 : ' +
					optionLabel.blockingType2[attribute.blockingType];
				string +=
					'\n\t그룹 권한 처리 : ' +
					optionLabel.groupPermissionType[attribute.permissionType];
				string += '\n\t계정 정상화 : 관리자 해제';
			}
			break;
		}

		case 'resigned': {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string +=
					'\n\t계정 처리 방법 : ' +
					optionLabel.blockingType2[attribute.blockingType];
				string += '\n\t유예 기간 : ' + attribute.applyDays + '일';
				string += '\n\t계정 정상화 : 관리자 해제';
			}
			break;
		}

		case 'user_id_pattern': {
			string += printUsage(attribute);

			if (attribute?.usage) {
				string +=
					'\n\t패턴 형식 : ' +
					optionLabel.patternType[attribute.patternType];
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
					? optionLabel.usage.use
					: optionLabel.usage.none);
			string +=
				'\n대소문자 혼합 여부 : ' +
				(attribute.mixCase
					? optionLabel.usage.use
					: optionLabel.usage.none);
			string +=
				'\n반복문자 사용제한 : ' +
				(attribute.repeatedAlpha
					? optionLabel.restrict.restrict
					: optionLabel.usage.none);
			string += '\n인적 사항 제한 : ';
			attribute.includePersonalInfoList.map((v, i) => {
				string += optionLabel.personalInfoRestrictionMethod[v];
				if (i !== attribute.includePersonalInfoList.length - 1) {
					string += '/';
				}
			});

			if (attribute.includePersonalInfoList.length !== 0)
				string +=
					'\n\t이전 비밀번호 재사용 제한 : ' +
					attribute.allowedDaysOfOldPasswords +
					'일';
			break;
		}

		default:
			break;
	}
	return string;
};
