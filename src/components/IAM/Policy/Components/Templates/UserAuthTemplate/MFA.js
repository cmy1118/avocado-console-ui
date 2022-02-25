import React from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {
	additionalAuthMethodOptions,
	applicationOptions,
	authUsageOptions,
	requiredOptions,
	usageOptions,
} from '../../../../../../utils/options';
import CheckBox from '../../../../../RecycleComponents/New/CheckBox';
import useRadio from '../../../../../../hooks/useRadio';
import useComboBox from '../../../../../../hooks/useComboBox';
import useCheckBox from '../../../../../../hooks/useCheckBox';

const mfa = {
	title: 'MFA 인증',
	description: [
		'기본 인증 이후 추가 인증을 설정할 수 있으며, 최대 3차 까지 가능합니다.',
		'인증 수단은 중복 설정 할 수 없습니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		additionalAuth1: {
			title: '1차 추가 인증',
		},
		additionalAuth2: {
			title: '2차 추가 인증',
		},
		additionalAuth3: {
			title: '3차 추가 인증',
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 인증(MFA 인증) 폼
 **************************************************/
const MFA = () => {
	const [usage, usageRadioButton] = useRadio({
		name: 'usage',
		options: usageOptions,
	});
	const [authUsage1, authUsage1ComboBox] = useComboBox({
		options: authUsageOptions,
	});
	const [required1, required1ComboBox] = useComboBox({
		options: requiredOptions,
	});
	const [authMethod1, authMethod1CheckBox] = useCheckBox({
		options: additionalAuthMethodOptions,
	});
	const [authUsage2, authUsage2ComboBox] = useComboBox({
		options: authUsageOptions,
	});
	const [required2, required2ComboBox] = useComboBox({
		options: requiredOptions,
	});
	const [authMethod2, authMethod2CheckBox] = useCheckBox({
		options: additionalAuthMethodOptions,
	});
	const [authUsage3, authUsage3ComboBox] = useComboBox({
		options: authUsageOptions,
	});
	const [required3, required3ComboBox] = useComboBox({
		options: requiredOptions,
	});
	const [authMethod3, authMethod3CheckBox] = useCheckBox({
		options: additionalAuthMethodOptions,
	});
	const additionalAuth = [
		{
			key: 'additionalAuth1',
			authUsage: authUsage1ComboBox,
			required: required1ComboBox,
			authMethod: authMethod1CheckBox,
		},
		{
			key: 'additionalAuth2',
			authUsage: authUsage2ComboBox,
			required: required2ComboBox,
			authMethod: authMethod2CheckBox,
		},
		{
			key: 'additionalAuth3',
			authUsage: authUsage3ComboBox,
			required: required3ComboBox,
			authMethod: authMethod3CheckBox,
		},
	];

	return (
		<TemplateElementContainer
			title={mfa.title}
			description={mfa.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={mfa.contents.usage.title}
							render={usageRadioButton}
						/>
						<div>
							--------------------------------------------------------------
						</div>
						{additionalAuth.map((v) => (
							<TemplateElement
								key={v.key}
								title={mfa.contents[v.key].title}
								render={() => {
									return (
										<div>
											{v.authUsage()}
											{v.required()}
											{v.authMethod()}
										</div>
									);
								}}
							/>
						))}
					</div>
				);
			}}
		/>
	);
};
export default MFA;
