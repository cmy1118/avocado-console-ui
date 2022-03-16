import React, {useEffect} from 'react';
import TemplateElement from '../../../TemplateElement';
import {
	authMethodOptions,
	policyOption,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/policyOptions';
import TemplateElementContainer from '../../../TemplateElementContainer';
import useRadio from '../../../../../../../hooks/useRadio';
import PropTypes from 'prop-types';
import MFA from './MFA';
import useTextBox from '../../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../../styles/components/style';

const failOver = {
	title: 'Fail Over',
	description: [
		'인증수단의 문제로 실패시 다른 인증수단으로 전환 하여 인증을 진행합니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		basicAuth: {
			title: '기본 인증',
		},
		mfa: {
			title: 'MFA',
		},
		timeoutSeconds: {
			title: '입력 대기 시간(초)',
			message: '초',
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 인증(FailOver) 폼
 **************************************************/
const FailOver = ({data, setTemplateData}) => {
	//usage: Fail Over 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'failOverUsage',
		options: usageOptions,
	});
	//basicAuth: 기본 인증 수단
	const [basicAuth, basicAuthRadioButton, setBasicAuth] = useRadio({
		name: 'failOverBasicAuth',
		options: authMethodOptions,
		//Fail Over 사용 여부 false일때 disabled
		disabled: usage === policyOption.usage.none.key,
	});
	//mfa: mfa 수단
	const [mfa, mfaRaddioButton, setMfa] = useRadio({
		name: 'failOverMfa',
		options: authMethodOptions,
		//Fail Over 사용 여부 false일때 disabled
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
		//Fail Over 사용 여부 false일때 disabled
		disabled: usage === policyOption.usage.none.key,
	});

	/**************************************************
	 * ambacc244 - FailOver 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		//rule 생성을 위한 ruleType이 존재
		if (data?.ruleType) {
			let failOverData = {usage: usage === policyOption.usage.use.key};
			//사용 여부 true
			if (usage === policyOption.usage.use.key) {
				if (basicAuth !== policyOption.authMethod.none.key) {
					failOverData.auth = {type: basicAuth};
				}

				if (mfa !== policyOption.authMethod.none.key) {
					failOverData.mfa = {type: mfa};
				}

				failOverData.timeoutSeconds = timeoutSeconds;
			}

			setTemplateData({
				ruleType: data.ruleType,
				...failOverData,
			});
		}
	}, [basicAuth, data, mfa, setTemplateData, timeoutSeconds, usage]);

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		console.log(data);
		//Fail Over 사용 여부 세팅
		setUsage(
			setUsageOptionByAttribute(
				data,
				'usage',
				policyOption.usage.use.key,
				policyOption.usage.none.key,
			),
		);
		//Fail Over 인증 default value 있음
		if (data?.policies) {
			//기본 인증 default value 있음
			if (Object.prototype.hasOwnProperty.call(data.policies, 'auth')) {
				//기본 인증 수단 세팅
				setBasicAuth(data.policies.auth.type);
			}
			//MFA default value 있음
			if (Object.prototype.hasOwnProperty.call(data.policies, 'mfa')) {
				//MFA 인증 수단 세팅
				setMfa(data.policies.mfa.type);
			}
			//입력 대기 시간 default value 있음
		}
		//입력 대기 시간 default value 있음
		if (data?.timoutSeconds) {
			//입력 대기 시간 세팅
			setTimeoutSeconds(data.timoutSeconds);
		}
	}, [data, setBasicAuth, setMfa, setTimeoutSeconds, setUsage]);

	return (
		<TemplateElementContainer
			title={failOver.title}
			description={failOver.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={failOver.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={failOver.contents.basicAuth.title}
							render={basicAuthRadioButton}
						/>
						<TemplateElement
							title={failOver.contents.mfa.title}
							render={mfaRaddioButton}
						/>
						<TemplateElement
							title={failOver.contents.timeoutSeconds.title}
							render={() => {
								return (
									<RowDiv>
										{timeoutSecondsTextBox()}
										{
											failOver.contents.timeoutSeconds
												.message
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

FailOver.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};

export default FailOver;
