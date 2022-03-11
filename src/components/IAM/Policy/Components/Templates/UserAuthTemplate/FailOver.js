import React, {useEffect} from 'react';
import TemplateElement from '../../TemplateElement';
import {
	authMethodOptions,
	optionValue,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../utils/options';
import TemplateElementContainer from '../../TemplateElementContainer';
import useRadio from '../../../../../../hooks/useRadio';
import PropTypes from 'prop-types';
import MFA from './MFA';

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
		disabled: usage === optionValue.usage.none,
	});
	//mfa: mfa 수단
	const [mfa, mfaRaddioButton, setMfa] = useRadio({
		name: 'failOverMfa',
		options: authMethodOptions,
		//Fail Over 사용 여부 false일때 disabled
		disabled: usage === optionValue.usage.none,
	});

	/**************************************************
	 * ambacc244 - FailOver 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		setTemplateData({
			...data,
			usage: usage === optionValue.usage.use,
			auth: {
				type: basicAuth,
			},
			mfa: {
				type: mfa,
			},
		});
	}, [basicAuth, data, mfa, setTemplateData, usage]);

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		//Fail Over 사용 여부 세팅
		setUsage(
			setUsageOptionByAttribute(
				data,
				'usage',
				usageOptions[0].key,
				usageOptions[1].key,
			),
		);
		//Fail Over 사용 여부 true
		if (data?.usage) {
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
		}
	}, [data, setBasicAuth, setMfa, setUsage]);

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
