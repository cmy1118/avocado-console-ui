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
	//application: 사용가능한 applications
	const [application, applicationCheckBox, setApplications] = useCheckBox({
		options: applicationOptions,
		disabled: usage === usageOptions[1].key ? true : false,
	});

	/**************************************************
	 * ambacc244 - 사용자 인증(단말기 인증) default 정보 세팅
	 **************************************************/
	useEffect(() => {
		//단말기 사용 여부가 attribute로 넘어옴
		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(data.attribute, 'usage')
		) {
			//단말기 사용 여부가 세팅
			setUsage(
				data.attribute.usage
					? usageOptions[0].key
					: usageOptions[1].key,
			);
			//단말기 사용 여부 true
			if (data.attribute.usage) {
				//TODO: applications 넘어오는 방식 확인하기(진성님)
				//사용하는 단말기 종류 세팅
				setApplications([]);
			}
			//단말기 사용 여부가 attribute로 넘어 오지 않음
		} else {
			//단말기 사용 여부 false로 세팅
			setUsage(usageOptions[1].key);
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
