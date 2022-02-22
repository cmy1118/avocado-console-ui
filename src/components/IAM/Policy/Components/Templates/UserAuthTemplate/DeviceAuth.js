import React, {useState, useCallback, useRef} from 'react';
import TemplateItemContainer from '../../TemplateItemContainer';
import TemplateElement from '../../TemplateElement';
import RadioButton from '../../../../../RecycleComponents/Form/RadioButton';
import {
	applicationOptions,
	usageOptions,
} from '../../../../../../utils/options';
import CheckBox from '../../../../../RecycleComponents/New/CheckBox';
import Form from '../../../../../RecycleComponents/New/Form';

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
	const formRef = useRef(null);
	const [usage, setUsage] = useState();

	const [values, setValues] = useState({
		usage: '',
		managementConsole: 'false',
		webterminal: 'false',
	});

	/**************************************************
	 * ambacc244 - 정책 생성 요청시 현재 폼이 가지고 있는 정보를 함께 제출
	 **************************************************/
	const onSubmitForm = useCallback(() => {}, []);

	return (
		<TemplateItemContainer
			title={deviceAuth.title}
			description={deviceAuth.description}
			render={() => {
				return (
					<Form
						innerRef={formRef}
						onSubmit={onSubmitForm}
						initialValues={values}
					>
						<TemplateElement
							title={deviceAuth.contents.usage.title}
							render={() => {
								return (
									<RadioButton
										value={usageOptions[0].value}
										setValue={setUsage}
										options={usageOptions}
									/>
								);
							}}
						/>
						<TemplateElement
							title={deviceAuth.contents.application.title}
							render={() => {
								return (
									<div>
										{applicationOptions.map((v) => (
											<CheckBox
												key={v.value}
												name={v.value}
												label={v.label}
											/>
										))}
									</div>
								);
							}}
						/>
					</Form>
				);
			}}
		/>
	);
};

export default DeviceAuth;
