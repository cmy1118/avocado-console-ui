import React, {useEffect} from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {
	applicationOptions,
	optionValue,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../utils/options';
import useRadio from '../../../../../../hooks/useRadio';
import useCheckBox from '../../../../../../hooks/useCheckBox';
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
		disabled: usage === optionValue.usage.none,
	});

	/**************************************************
	 * ambacc244 - 단말기 인증 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		setTemplateData({
			...data,
			usage: usage === optionValue.usage.use,
			// resource: application,
		});
	}, [application, data, setTemplateData, usage]);

	/**************************************************
	 * ambacc244 - 사용자 인증(단말기 인증) default 값 세팅
	 **************************************************/
	useEffect(() => {
		//단말기 인증 사용 여부 세팅
		setUsage(
			setUsageOptionByAttribute(
				data,
				'usage',
				usageOptions[0].key,
				usageOptions[1].key,
			),
		);
		//단말기 인증 사용 여부 true, 인증 단말기가 존재
		if (data?.usage && data.resource) {
			//TODO: 미성님꼐 문의후 재 확인
			//사용하는 단말기 종류 세팅
			setApplications(data.resource);
		}
	}, [data, setApplications, setUsage]);

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
	setTemplateData: PropTypes.func,
};

export default DeviceAuth;
