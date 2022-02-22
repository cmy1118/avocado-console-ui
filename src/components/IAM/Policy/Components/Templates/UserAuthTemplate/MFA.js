import React, {useCallback, useRef, useState} from 'react';
import TemplateItemContainer from '../../TemplateItemContainer';
import TemplateElement from '../../TemplateElement';
import RadioButton from '../../../../../RecycleComponents/Form/RadioButton';
import {
	additionalAuthMethodOptions,
	applicationOptions,
	authUsageOptions,
	requiredOptions,
	usageOptions,
} from '../../../../../../utils/options';
import Form from '../../../../../RecycleComponents/New/Form';
import ComboBox from '../../../../../RecycleComponents/New/ComboBox';
import CheckBox from '../../../../../RecycleComponents/New/CheckBox';

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

const additionalAuth = [
	{
		key: 'additionalAuth1',
		authUsage: 'authUsage1',
		required: 'required1',
		authMethod: 'authMethod1',
	},
	{
		key: 'additionalAuth2',
		authUsage: 'authUsage2',
		required: 'required2',
		authMethod: 'authMethod2',
	},
	{
		key: 'additionalAuth3',
		authUsage: 'authUsage3',
		required: 'required3',
		authMethod: 'authMethod3',
	},
];

const MFA = () => {
	const formRef = useRef(null);

	const [applicationUsage, setApplicationUsage] = useState();

	const [values, setValues] = useState({
		usage: '',
		authUsage1: '',
		required1: '',
		authMethod1: '',
		authUsage2: '',
		required2: '',
		authMethod2: '',
		authUsage3: '',
		required3: '',
		authMethod3: '',
	});

	/**************************************************
	 * ambacc244 - 정책 생성 요청시 현재 폼이 가지고 있는 정보를 함께 제출
	 **************************************************/
	const onSubmitForm = useCallback(() => {}, []);

	return (
		<TemplateItemContainer
			title={mfa.title}
			description={mfa.description}
			render={() => {
				return (
					<Form
						innerRef={formRef}
						onSubmit={onSubmitForm}
						initialValues={values}
					>
						<TemplateElement
							title={mfa.contents.usage.title}
							render={() => {
								return (
									<RadioButton
										value={usageOptions[0].value}
										setValue={setApplicationUsage}
										options={usageOptions}
									/>
								);
							}}
						/>
						<div>
							--------------------------------------------------------------
						</div>
						<TemplateElement
							title={mfa.contents.additionalAuth1.title}
							render={() => {
								return additionalAuth.map((v) => (
									<div key={v.key}>
										<ComboBox
											name={v.authUsage}
											options={authUsageOptions}
											width={'100px'}
										/>
										<ComboBox
											name={v.required}
											options={requiredOptions}
											width={'100px'}
										/>
										{additionalAuthMethodOptions.map(
											(val) => (
												<CheckBox
													key={val.value}
													name={v.authMethod}
													label={val.label}
												/>
											),
										)}
									</div>
								));
							}}
						/>
					</Form>
				);
			}}
		/>
	);
};
export default MFA;
