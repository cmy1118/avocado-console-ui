import React, {useEffect} from 'react';

import TemplateElement from '../../../TemplateElement';
import {
	accountBlockingTypeOptions,
	policyOption,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/policyOptions';
import TemplateElementContainer from '../../../TemplateElementContainer';
import useRadio from '../../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../../styles/components/style';

import PropTypes from 'prop-types';

const loginFailure = {
	title: '로그인 실패',
	description: [
		'사용자 로그인 실패 횟수에 따라 계정을 처리하기 위해 정책을 설정합니다.',
		'정상화 후 재로그인 시에 패스워드를 변경해야 합니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		loginFailureCount: {
			title: '로그인 실패 횟수',
			message: '회',
		},
		blockingType: {
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
const LoginFailure = ({data, setTemplateData}) => {
	//usage: 로그인 실패 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'loginFailureUsage',
		options: usageOptions,
	});
	//failedCount: 로그인 실패 횟수
	const [failedCount, failedCountTextBox, setFailedCount] = useTextBox({
		name: 'loginFailureCount',
		//1 ~
		regex: /^([1-9]|[1-9][0-9]*)$/,
		disabled: usage === policyOption.usage.none.key,
	});
	//blockingType: 계정 처리 방법
	const [blockingType, blockingTypeRadioButton, setBlockingType] = useRadio({
		name: 'loginFailureBlockingType',
		options: accountBlockingTypeOptions,
		disabled: usage === policyOption.usage.none.key,
	});
	//failedCountInitDays: 오류 횟수 초기화
	const [
		failedCountInitDays,
		failedCountInitDaysTextBox,
		setFailedCountInitDays,
	] = useTextBox({
		name: 'failedCountInitDays',
		//1 ~
		regex: /^([1-9]|[1-9][0-9]*)$/,
		disabled: usage === policyOption.usage.none.key,
	});
	//accountNormalization: 계정 정상화
	const [
		unblockedDays,
		accountUnblockedDaysTextBox,
		setUnblockedDays,
	] = useTextBox({
		name: 'accountUnblockedDays',
		//1 ~
		regex: /^([1-9]|[1-9][0-9]*)$/,
		disabled: usage === policyOption.usage.none.key,
	});

	/**************************************************
	 * ambacc244 - 로그인 실패 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		//rule 생성을 위한 ruleType이 존재
		if (data?.attribute?.ruleType) {
			const attributes = {
				usage: usage === policyOption.usage.use.key,
			};
			//사용 여부 true
			if (usage === policyOption.usage.use.key) {
				attributes.failedCount = failedCount;
				attributes.blockingType = blockingType;
				attributes.failedCountInitDays = failedCountInitDays;
				attributes.unblockedDays = unblockedDays;
			}

			setTemplateData({
				resource: data?.resource,
				attribute: {ruleType: data?.attribute.ruleType, ...attributes},
			});
		}
	}, [
		blockingType,
		data,
		failedCount,
		failedCountInitDays,
		setTemplateData,
		unblockedDays,
		usage,
	]);

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		//로그인 실패 사용 여부 세팅
		setUsage(
			setUsageOptionByAttribute(
				data?.attribute,
				'usage',
				policyOption.usage.use.key,
				policyOption.usage.none.key,
			),
		);
		//로그인 실패 횟수 default value 있음
		if (data?.attribute?.failedCount) {
			//로그인 실패 횟수 세팅
			setFailedCount(data?.attribute.failedCount);
		}
		//계정 처리 방법 default value 있음
		if (data?.attribute?.blockingType) {
			//계정 처리 방법 세팅
			setBlockingType(data?.attribute.blockingType);
		}
		//오류 횟수 초기화 default value 있음
		if (data?.attribute?.failedCountInitDays) {
			//오류 횟수 초기화 세팅
			setFailedCountInitDays(data?.attribute.failedCountInitDays);
		}
		// 계정 정상화 default value 있음
		if (data?.attribute?.unblockedDays) {
			setUnblockedDays(data?.attribute.unblockedDays);
		}
	}, [
		data,
		setBlockingType,
		setFailedCount,
		setFailedCountInitDays,
		setUnblockedDays,
		setUsage,
	]);

	return (
		<TemplateElementContainer
			title={loginFailure.title}
			description={loginFailure.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={loginFailure.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={
								loginFailure.contents.loginFailureCount.title
							}
							render={() => {
								return (
									<RowDiv>
										{failedCountTextBox()}
										{
											loginFailure.contents
												.loginFailureCount.message
										}
									</RowDiv>
								);
							}}
						/>
						<TemplateElement
							title={loginFailure.contents.blockingType.title}
							render={blockingTypeRadioButton}
						/>
						<TemplateElement
							title={loginFailure.contents.resetErrorCount.title}
							render={() => {
								return (
									<RowDiv>
										{failedCountInitDaysTextBox()}
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
										{accountUnblockedDaysTextBox()}
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
	setTemplateData: PropTypes.func,
};

export default LoginFailure;
