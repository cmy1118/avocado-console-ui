import React, {useEffect} from 'react';
import TemplateElement from '../../TemplateElement';
import {authMethodOptions, usageOptions} from '../../../../../../utils/options';
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
const FailOver = ({data}) => {
	//usage: Fail Over 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'failOverUsage',
		options: usageOptions,
	});
	//basicAuth: 기본 인증 수단
	const [basicAuth, basicAuthRadioButton] = useRadio({
		name: 'failOverBasicAuth',
		options: authMethodOptions,
		disabled: usage === usageOptions[1].key ? true : false,
	});
	//basicAuth: mfa 수단
	const [mfa, mfaRaddioButton] = useRadio({
		name: 'failOverMfa',
		options: authMethodOptions,
		disabled: usage === usageOptions[1].key ? true : false,
	});

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(data?.attribute, 'usage')
		) {
			setUsage(
				data.attribute.usage
					? usageOptions[0].key
					: usageOptions[1].key,
			);
		}
	}, [data]);

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
};

export default FailOver;
