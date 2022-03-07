import React, {useEffect} from 'react';
import TemplateElement from '../../TemplateElement';
import {accountStatusOptions} from '../../../../../../utils/options';
import TemplateElementContainer from '../../TemplateElementContainer';
import useRadio from '../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../styles/components/style';
import PropTypes from 'prop-types';

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
const LoginFailure = ({data}) => {
	const [
		loginFailureCount,
		loginFailureCountTextBox,
		setLoginFailureCount,
	] = useTextBox({
		name: 'loginFailureCount',
	});
	const [
		accountStatus,
		accountStatusRadioButton,
		setAccountStatus,
	] = useRadio({
		name: 'accountStatus',
		options: accountStatusOptions,
	});
	const [
		resetErrorCount,
		resetErrorCountTextBox,
		setResetErrorCount,
	] = useTextBox({
		name: 'resetErrorCount',
	});
	const [
		accountNormalization,
		accountNormalizationTextBox,
		setAccountNormalization,
	] = useTextBox({
		name: 'accountNormalization',
	});

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		if (data?.attribute?.failedCount) {
			setLoginFailureCount(data.attribute.failedCount);
		}
		if (data?.attribute?.blockingType) {
			console.log(data.attribute.blockingType);
			setAccountStatus(data.attribute.blockingType);
		}
		if (data?.attribute?.failedCountInitDays) {
			setResetErrorCount(data.attribute.failedCountInitDays);
		}
		//TODO: 계정 정상화
		// if (data?.attribute?.qwer) {
		// 	setAccountNormalization(data.attribute.qwer);
		// }
	}, [data]);

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
									<RowDiv>
										{loginFailureCountTextBox()}
										{
											loginFailure.contents
												.loginFailureCount.message
										}
									</RowDiv>
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
									<RowDiv>
										{resetErrorCountTextBox()}
										{
											loginFailure.contents
												.resetErrorCount.message
										}
									</RowDiv>
								);
							}}
						/>
						<TemplateElement
							title={
								loginFailure.contents.accountNormalization.title
							}
							render={() => {
								return (
									<RowDiv>
										{accountNormalizationTextBox()}
										{
											loginFailure.contents
												.accountNormalization.message
										}
									</RowDiv>
								);
							}}
						/>
					</div>
				);
			}}
		/>
	);
};

LoginFailure.propTypes = {
	data: PropTypes.object,
};

export default LoginFailure;
