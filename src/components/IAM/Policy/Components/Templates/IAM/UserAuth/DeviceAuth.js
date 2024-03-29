import React, {useEffect} from 'react';
import TemplateLayout from '../../Layout/TemplateLayout';
import TemplateElement from '../../Layout/TemplateElement';
import {
	applicationOptions,
	policyOption,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/policy/options';
import useRadio from '../../../../../../../hooks/useRadio';
import useCheckBox from '../../../../../../../hooks/useCheckBox';
import PropTypes from 'prop-types';

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
const DeviceAuth = ({data, setTemplateData}) => {
	//usage: 단말기 인증 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'deviceAuthUsage',
		options: usageOptions,
	});
	//application: 사용가능한 applications
	const [application, applicationCheckBox, setApplications] = useCheckBox({
		options: applicationOptions,
		//단말기 인증 사용 false일때 disabled
		disabled: usage === policyOption.usage.none.value,
	});

	/**************************************************
	 * ambacc244 - 단말기 인증 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		//rule 생성을 위한 ruleType이 존재
		if (data?.attribute?.ruleType) {
			const attributes = {
				usage: usage === policyOption.usage.use.value,
			};
			//사용 여부 true
			if (usage === policyOption.usage.use.value) {
				attributes.resource = application;
			}

			setTemplateData({
				resource: data?.resource,
				attribute: {ruleType: data?.attribute.ruleType, ...attributes},
			});
		}
	}, [application, data, setTemplateData, usage]);

	/**************************************************
	 * ambacc244 - 사용자 인증(단말기 인증) default 값 세팅
	 **************************************************/
	useEffect(() => {
		//단말기 인증 사용 여부 세팅
		setUsage(
			setUsageOptionByAttribute(
				data?.attribute,
				'usage',
				policyOption.usage.use.value,
				policyOption.usage.none.value,
			),
		);
		// 인증 단말기가 존재
		if (data?.attribute?.resource) {
			//사용하는 단말기 종류 세팅
			setApplications(data?.attribute.resource);
		}
	}, [data, setApplications, setUsage]);

	return (
		<TemplateLayout
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
	setTemplateData: PropTypes.func,
};

export default DeviceAuth;
