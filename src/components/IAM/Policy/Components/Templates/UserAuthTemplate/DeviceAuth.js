import React from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {
	applicationOptions,
	usageOptions,
} from '../../../../../../utils/options';
import CheckBox from '../../../../../RecycleComponents/New/CheckBox';
import useRadio from '../../../../../../hooks/useRadio';
import useCheckBox from '../../../../../../hooks/useCheckBox';

const deviceAuth = {
	title: '단말기 인증',
	description: ['단말기 인증이 필요한 애플리 케이션을 설정합니다.'],
	contents: {
		usage: {
			title: '사용 여부',
		},
		application: {
			title: '제어 어플리케이션',
			options: {
				managementConsole: 'Management Console',
				webTerminal: 'WebTerminal',
			},
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 인증(단말기 인증) 폼
 **************************************************/
const DeviceAuth = () => {
	//usage: 단말기 인증 사용 여부
	const [usage, usageRadioButton] = useRadio({
		name: 'usage',
		options: usageOptions,
	});
	const [application, applicationCheckBox] = useCheckBox({
		options: applicationOptions,
	});

	return (
		<TemplateElementContainer
			title={deviceAuth.title}
			description={deviceAuth.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={deviceAuth.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={deviceAuth.contents.application.title}
							render={applicationCheckBox}
						/>
					</div>
				);
			}}
		/>
	);
};

export default DeviceAuth;
