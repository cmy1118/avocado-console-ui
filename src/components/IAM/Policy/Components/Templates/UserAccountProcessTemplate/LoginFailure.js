import React from 'react';
import TemplateElement from '../../TemplateElement';
import {accountStatusOptions} from '../../../../../../utils/options';
import TemplateElementContainer from '../../TemplateElementContainer';
import useRadio from '../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../hooks/useTextBox';

const loginFailure = {
	title: '로그인 실패',
	description: [
		'사용자 로그인 실패 횟수에 따라 계정을 처리하기 위해 정책을 설정합니다.',
		'정상화 후 재로그인 시에 패스워드를 변경해야 합니다.',
	],
	contents: {
		loginFailureCount: {
			title: '로그인 실패 횟수',
			message: '회',
		},
		accountStatus: {
			title: '계정 처리 방법',
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
};

/**************************************************
 * ambacc244 - 사용자 계정 처리(로그인 실패) 폼
 **************************************************/
const LoginFailure = () => {
	const [loginFailureCount, loginFailureCountTextBox] = useTextBox({
		name: 'loginFailureCount',
	});
	const [accountStatus, accountStatusRadioButton] = useRadio({
		name: 'accountStatus',
		options: accountStatusOptions,
	});
	const [resetErrorCount, resetErrorCountTextBox] = useTextBox({
		name: 'resetErrorCount',
	});
	const [accountNormalization, accountNormalizationTextBox] = useTextBox({
		name: 'accountNormalization',
	});
	return (
		<TemplateElementContainer
			title={loginFailure.title}
			description={loginFailure.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={
								loginFailure.contents.loginFailureCount.title
							}
							render={() => {
								return (
									<div>
										{loginFailureCountTextBox()}
										{
											loginFailure.contents
												.loginFailureCount.message
										}
									</div>
								);
							}}
						/>
						<TemplateElement
							title={loginFailure.contents.accountStatus.title}
							render={accountStatusRadioButton}
						/>
						<TemplateElement
							title={loginFailure.contents.resetErrorCount.title}
							render={() => {
								return (
									<div>
										{resetErrorCountTextBox()}
										{
											loginFailure.contents
												.resetErrorCount.message
										}
									</div>
								);
							}}
						/>
						<TemplateElement
							title={
								loginFailure.contents.accountNormalization.title
							}
							render={() => {
								return (
									<div>
										{accountNormalizationTextBox()}
										{
											loginFailure.contents
												.accountNormalization.message
										}
									</div>
								);
							}}
						/>
					</div>
				);
			}}
		/>
	);
};

export default LoginFailure;
