import React from 'react';
import LoginFailure from './UserAccountProcessTemplate/LoginFailure';
import Dormant from './UserAccountProcessTemplate/Dormant';
import AccountActivePeriod from './UserAccountProcessTemplate/AccountActivePeriod';

const UserAccountProcess = {
	title: '사용자 계정 처리',
	contents: {
		loginFailure: {
			title: '로그인 실패',
			description: [
				'사용자 로그인 실패 횟수에 따라 계정을 처리하기 위해 정책을 설정합니다.',
				'정상화 후 재로그인 시에 패스워드를 변경해야 합니다.',
			],
			contents: {
				loginFailureCount: {
					title: '로그인 실패 횟수',
					count: '회',
				},
				accountStatus: {
					title: '계정 처리 방법',
					options: {
						lock: '잠금',
						delete: '삭제',
					},
				},
				resetErrorCount: {
					title: '오류 횟수 초기화',
					message: '시간 후',
				},
				accountNormalization: {
					title: '계정 정상화',
					message: '시간 후',
				},
			},
		},
		dormant: {
			title: '휴면',
			description: [
				'일정 기간동안 미접속 사용자의 계정을 처리하기 위해 정책을 설정합니다.',
				'정상화 후 재로그인 시에 패스워드를 변경해야 합니다.',
			],
			contents: {
				inactivePeriod: {
					title: '연속 미접속 기간',
					message: '일',
				},
				accountStatus: {
					title: '계정 처리 방법',
					options: {
						lock: '잠금',
						delete: '삭제',
					},
				},
				accountNormalization: {
					title: '계정 정상화',
					message: '본인 확인 인증',
				},
			},
		},
		accountActivePeriod: {
			title: '계정 사용 기간',
			description: [
				' 사용자의 계정으로 애플리케이션을 접속할 수 있는 기간을 제어하는 정책을 설정합니다.',
				'관리자 정상화 후 기간 연장합니다.',
			],
			contents: {
				activePeriod: {
					title: '사용 기간',
					message: '일',
				},
				accountStatus: {
					title: '계정 처리 방법',
					options: {
						lock: '잠금',
						delete: '삭제',
					},
				},
				accountNormalization: {
					title: '계정 정상화',
					message: '관리자 해제',
				},
			},
		},
		passwordValidityPeriod: {
			title: '비밀번호 사용 기간',
			description: [
				'사용자의 계정의 비밀번호 사용기간을 제어하는 정책을 설정합니다.',
				'정상화 후에는 반드시 비밀번호를 변경해햐 합니다.',
			],
			contents: {
				usage: {
					title: '사용 여부',
					options: {use: '사용함', nonuse: '사용 안함'},
				},
				activePeriod: {
					title: '사용 기간',
					message: '일',
				},
				accountStatus: {
					title: '계정 처리 방법',
					options: {
						lock: '잠금',
						delete: '삭제',
					},
				},
				accountNormalization: {
					title: '계정 정상화',
					options: {
						identityVerification: '본인 확인 인증',
						manager: '관리자에 의한 정상화(임시 패스워드 발급)',
					},
				},
			},
		},
		changeGroup: {
			title: '본인 확인 인증',
			description: [
				'사용자의 그룹이 변경으로 인한 권한 변경을 제어하기 위한 정책을 설정합니다.',
				'그룹 유형은 최대 3개까지만 설정 가능합니다.',
			],
			contents: {
				controlGroupType: {
					title: '제어 그룹 유형',
					placeholder: '선택',
				},
				accountStatus: {
					title: '계정 처리 방법',
					options: {
						lock: '잠금',
						delete: '삭제',
						no: '안함',
					},
				},
				groupPrivileges: {
					title: '입력 대기 시간(초)',
					options: {
						revoke: '회수',
						grant: '부여(변경후 그룹의 권한)',
						remain: '유지(기존 권한 유지)',
					},
				},
				accountNormalization: {
					title: '계정 정상화',
					options: {
						revoke: '회수',
						grant: '부여(변경후 그룹의 권한)',
					},
				},
			},
		},
		resignation: {
			title: '퇴사(탈퇴)',
			description: [
				'사용자 퇴사로 인한 사용자 계정 접근을 제어하기 위한 정책을 설정합니다.',
				'유예 기간동안은 접근 및 권한이 유지되며, 관리자에 의해 정상화가 가능합니다.',
				'유예 기간동안은 접근 및 권한이 유지됩니다.',
			],
			contents: {
				accountStatus: {
					title: '계정 처리 방법',
					options: {
						lock: '잠금',
						delete: '삭제',
					},
				},
				gracePeriod: {
					title: '유예 기간',
					options: {
						no: '없음',
						yes: '있음',
					},
				},
				accountNormalization: {
					title: '계정 정상화',
					message: '관리자 정상화',
				},
			},
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 계정 처리 컴포넌트
 **************************************************/
const UserAccountProcessTemplate = () => {
	return (
		<div>
			<LoginFailure />
			<Dormant />
			<AccountActivePeriod />
		</div>
	);
};
export default UserAccountProcessTemplate;
