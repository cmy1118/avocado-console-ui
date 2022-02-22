import React, {useCallback, useRef, useState} from 'react';

import TemplateItemContainer from '../../TemplateItemContainer';
import Form from '../../../../../RecycleComponents/New/Form';
import RadioButton from '../../../../../RecycleComponents/Form/RadioButton';
import {
	identityVerificationMethodOptions,
	usageOptions,
} from '../../../../../../utils/options';
import TemplateElement from '../../TemplateElement';
import TextBox from '../../../../../RecycleComponents/New/TextBox';

const identityVerification = {
	title: '본인 확인 인증',
	description: [
		'화면 보호 해제  본인임을 확인하는 인증 절차를 설정 합니다.',
		'입력 대기 시간은 최대 180초(3분)을 초과 할 수 없습니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		authMethod: {
			title: '확인 유형',
		},
		waitingTime: {
			title: '입력 대기 시간(초)',
			message: '초',
		},
	},
};

const IdentityVerification = () => {
	const formRef = useRef(null);

	const [usage, setUsage] = useState();
	const [authMethod, setAuthMethod] = useState();

	const [values, setValues] = useState({
		usage: '',
		authMethod: '',
		waitingTime: '',
	});

	/**************************************************
	 * ambacc244 - 정책 생성 요청시 현재 폼이 가지고 있는 정보를 함께 제출
	 **************************************************/
	const onSubmitForm = useCallback(() => {}, []);

	return (
		<TemplateItemContainer
			title={identityVerification.title}
			description={identityVerification.description}
			render={() => {
				return (
					<Form
						innerRef={formRef}
						onSubmit={onSubmitForm}
						initialValues={values}
					>
						<TemplateElement
							title={identityVerification.contents.usage.title}
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
							title={
								identityVerification.contents.authMethod.title
							}
							render={() => {
								return (
									<RadioButton
										value={
											identityVerificationMethodOptions[0]
												.value
										}
										setValue={setAuthMethod}
										options={
											identityVerificationMethodOptions
										}
									/>
								);
							}}
						/>
						<TemplateElement
							title={
								identityVerification.contents.waitingTime.title
							}
							render={() => {
								return (
									<div>
										<TextBox name={'waitingTime'} />
										{
											identityVerification.contents
												.waitingTime.message
										}
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

export default IdentityVerification;
