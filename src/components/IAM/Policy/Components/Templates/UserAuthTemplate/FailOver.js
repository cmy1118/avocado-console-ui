import React, {useCallback, useRef, useState} from 'react';
import Form from '../../../../../RecycleComponents/New/Form';
import TemplateElement from '../../TemplateElement';
import RadioButton from '../../../../../RecycleComponents/Form/RadioButton';
import {authMethodOptions, usageOptions} from '../../../../../../utils/options';
import TemplateElementContainer from '../../TemplateElementContainer';
import useRadio from '../../../../../../hooks/useRadio';
import useComboBox from '../../../../../../hooks/useComboBox';

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

const FailOver = () => {
	const [usage, usageRadioButton] = useRadio({
		name: 'usage',
		options: usageOptions,
	});
	const [basicAuth, basicAuthRadioButton] = useRadio({
		name: 'basicAuth',
		options: authMethodOptions,
	});
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
