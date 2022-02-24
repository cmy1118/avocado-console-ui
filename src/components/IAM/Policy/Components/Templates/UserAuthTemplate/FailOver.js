import React, {useCallback, useRef, useState} from 'react';
import Form from '../../../../../RecycleComponents/New/Form';
import TemplateElement from '../../TemplateElement';
import RadioButton from '../../../../../RecycleComponents/Form/RadioButton';
import {authMethodOptions, usageOptions} from '../../../../../../utils/options';
import TemplateElementContainer from '../../TemplateElementContainer';

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
	const formRef = useRef(null);

	const [usage, setUsage] = useState();
	const [basicAuth, setBasicAuth] = useState();
	const [mfa, setMfa] = useState();

	const [values, setValues] = useState({
		usage: '',
		basicAuth: '',
		mfa: '',
	});

	/**************************************************
	 * ambacc244 - 정책 생성 요청시 현재 폼이 가지고 있는 정보를 함께 제출
	 **************************************************/
	const onSubmitForm = useCallback(() => {}, []);

	return (
		<TemplateElementContainer
			title={failOver.title}
			description={failOver.description}
			render={() => {
				return (
					<Form
						innerRef={formRef}
						onSubmit={onSubmitForm}
						initialValues={values}
					>
						<TemplateElement
							title={failOver.contents.usage.title}
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
							title={failOver.contents.basicAuth.title}
							render={() => {
								return (
									<RadioButton
										value={authMethodOptions[0].value}
										setValue={setBasicAuth}
										options={authMethodOptions}
									/>
								);
							}}
						/>
						<TemplateElement
							title={failOver.contents.mfa.title}
							render={() => {
								return (
									<RadioButton
										value={authMethodOptions[0].value}
										setValue={setMfa}
										options={authMethodOptions}
									/>
								);
							}}
						/>
					</Form>
				);
			}}
		/>
	);
};

export default FailOver;
