import React, {useEffect} from 'react';

import TemplateLayout from '../../Outline/TemplateLayout';
import {
	identityVerificationMethodOptions,
	policyOption,
	usageOptions,
} from '../../../../../../../utils/policyOptions';
import TemplateElement from '../../Outline/TemplateElement';
import useRadio from '../../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../../styles/components/style';
import PropTypes from 'prop-types';

const identityVerification = {
	title: '본인 확인 인증',
	description: [
		'화면 보호 해제  본인임을 확인하는 인증 절차를 설정 합니다.',
		'입력 대기 시간은 최대 180초(3분)을 초과 할 수 없습니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		authMethod: {
			title: '확인 유형',
		},
		timeoutSeconds: {
			title: '입력 대기 시간(초)',
			message: '초',
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 인증(본인 확인 인증) 폼
 **************************************************/
const IdentityVerification = ({data, setTemplateData}) => {
	//usage: 본인 확인 인증 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'identityVerificationUsage',
		options: usageOptions,
	});
	//authMethod: 본인 인증 확인 유형
	const [authMethod, authMethodRadioButton, setAuthMethod] = useRadio({
		name: 'IdentityVerificationAuthMethod',
		options: identityVerificationMethodOptions,
		//본인 확인 인증 사용 여부 false일때 disabled
		disabled: usage === policyOption.usage.none.key,
	});
	//timeoutSeconds: 입력 대기 시간
	const [
		timeoutSeconds,
		timeoutSecondsTextBox,
		setTimeoutSeconds,
	] = useTextBox({
		name: 'timeoutSeconds',
		//1 - 180
		regex: /^([1-9]|[1-9][0-9]|1[0-7][0-9]|180)$/,
		//본인 확인 인증 사용 여부 false일때 disabled
		disabled: usage === policyOption.usage.none.key,
	});

	/**************************************************
	 * ambacc244 - 본인 확인 인증 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		//rule 생성을 위한 ruleType이 존재
		if (data?.attribute?.ruleType) {
			let attributes = {usage: usage === policyOption.usage.use.key};
			//사용 여부 true
			if (usage === policyOption.usage.use.key) {
				attributes.policies = {
					[`${authMethod}`]: {timoutSeconds: timeoutSeconds},
				};
			}
			setTemplateData({
				resource: data?.resource,
				attribute: {ruleType: data?.attribute.ruleType, ...attributes},
			});
		}
	}, [authMethod, data, setTemplateData, timeoutSeconds, usage]);

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		//본인 확인 인증의 정책이 존재
		if (
			data?.attribute?.policies &&
			Object.keys(data?.attribute.policies).length > 0
		) {
			//본인 확인 인증 사용 여부 세팅
			setUsage(policyOption.usage.use.key);
			//인증 수단
			const method = Object.keys(data?.attribute.policies)[0];
			//인증 수단 & 입력 대시 시간 세팅
			setAuthMethod(method);
			//인증 수단에 할당된 입력 대기 시간 default value 있음
			if (data?.attribute.policies[method]?.timoutSeconds)
				setTimeoutSeconds(
					data?.attribute.policies[method].timoutSeconds,
				);
			//입력 대기 시간 default value 있음
			else if (data?.attribute?.timoutSeconds)
				setTimeoutSeconds(data?.attribute.timoutSeconds);
			//본인 확인 인증 정책이 존재하지 않음
		} else {
			//본인 확인 인증 사용 여부 세팅
			setUsage(policyOption.usage.none.key);
		}
	}, [data, setAuthMethod, setTimeoutSeconds, setUsage]);

	return (
		<TemplateLayout
			title={identityVerification.title}
			description={identityVerification.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={identityVerification.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={
								identityVerification.contents.authMethod.title
							}
							render={authMethodRadioButton}
						/>
						<TemplateElement
							title={
								identityVerification.contents.timeoutSeconds
									.title
							}
							render={() => {
								return (
									<RowDiv>
										{timeoutSecondsTextBox()}
										{
											identityVerification.contents
												.timeoutSeconds.message
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

IdentityVerification.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};

export default IdentityVerification;
