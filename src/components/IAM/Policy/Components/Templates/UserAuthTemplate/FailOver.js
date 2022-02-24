import React from 'react';
import TemplateElement from '../../TemplateElement';
import {authMethodOptions, usageOptions} from '../../../../../../utils/options';
import TemplateElementContainer from '../../TemplateElementContainer';
import useRadio from '../../../../../../hooks/useRadio';

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
const FailOver = () => {
	//usage: Fail Over 사용 여부
	const [usage, usageRadioButton] = useRadio({
		name: 'usage',
		options: usageOptions,
	});
	//basicAuth: 기본 인증 수단
	const [basicAuth, basicAuthRadioButton] = useRadio({
		name: 'basicAuth',
		options: authMethodOptions,
	});
	//basicAuth: mfa 수단
	const [mfa, mfaRaddioButton] = useRadio({
		name: 'mfa',
		options: authMethodOptions,
	});

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

export default FailOver;
