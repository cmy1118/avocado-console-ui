import React, {useEffect} from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {
	applicationOptions,
	gracePeriodUsageOptions,
	usageOptions,
} from '../../../../../../utils/options';
import CheckBox from '../../../../../RecycleComponents/New/CheckBox';
import useRadio from '../../../../../../hooks/useRadio';
import useCheckBox from '../../../../../../hooks/useCheckBox';
import PropTypes from 'prop-types';
import LoginFailure from '../UserAccountProcessTemplate/LoginFailure';

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
const DeviceAuth = ({data}) => {
	//usage: 단말기 인증 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'deviceAuthUsage',
		options: usageOptions,
	});
	const [application, applicationCheckBox] = useCheckBox({
		options: applicationOptions,
		disabled: usage === usageOptions[1].key ? true : false,
	});

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

DeviceAuth.propTypes = {
	data: PropTypes.object,
};

export default DeviceAuth;
