import React from 'react';

const userAccountPattern = {
	title: '패턴 정책',
	contents: {
		userIdPattern: {
			title: '사용자 ID 패턴',
			description: [
				'사용자 ID에 특정 패턴을 설정합니다.',
				'패턴 최대 길이는 3~10자 로 제한 하며 특수문자 사용은 할수 없습니다',
			],
			contents: {
				usage: {
					title: '사용 여부',
					options: {use: '사용함', nonuse: '사용 안함'},
				},
				patternFormat: {
					title: '패턴 형식',
					options: {prefix: '접두사', suffix: '접미사'},
				},
				patternInput: {
					title: '패턴 입력',
				},
			},
		},
		passwordPattern: {
			title: '비밀번호 패턴',
			description: [
				'비밀번호 보안을 위한 생성 패턴 정책을 설정합니다.',
				'비밀번호 길이는 최소 10, 최대 30자로 길이 제한 합니다.',
				'숫자 연속 횟수는 0이면 사용 안함으로 간주하며, 최소3에서 최대6자로 제한 합니다.',
			],
			contents: {
				passwordLength: {
					title: '비밀번호 길이',
					message: {from: '최소', to: '최대'},
				},
				consecutiveNumbers: {title: '숫자 연속 횟수'},
				mixedLetterAndNumber: {
					title: '영문 숫자 혼합 여부',
					options: {use: '사용함', nonuse: '사용 안함'},
				},
				mixedCaseLetter: {
					title: '대소문자 혼합 여부',
					options: {use: '사용함', nonuse: '사용 안함'},
				},
				repeatedCharacterRestriction: {
					title: '반복문자 사용제한',
					options: {yes: '제한함', no: '제한 안함'},
				},
				personalInformationRestriction: {
					title: '인적 사항 제한',
					restrict: {yes: '제한함', no: '제한 안함'},
					options: {
						email: 'Email',
						phoneNumber: '전화번호',
						consecutiveNumbersWithId: 'ID 동일 연속 문자 수(3)',
					},
				},
				enforcePasswordHistory: {
					title: '이전 비밀번호 재사용 제한',
					restrict: {yes: '제한함', no: '제한 안함'},
					period: {message: '일'},
				},
			},
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 계정 패턴 컴포넌트
 **************************************************/
const userAccountPatternTemplate = () => {
	return <div></div>;
};

export default userAccountPatternTemplate;
