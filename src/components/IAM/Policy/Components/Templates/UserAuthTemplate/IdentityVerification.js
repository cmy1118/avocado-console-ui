import React, {useCallback, useRef, useState} from 'react';

import TemplateElementContainer from '../../TemplateElementContainer';
import Form from '../../../../../RecycleComponents/New/Form';
import {
	identityVerificationMethodOptions,
	usageOptions,
} from '../../../../../../utils/options';
import TemplateElement from '../../TemplateElement';
import TextBox from '../../../../../RecycleComponents/New/TextBox';
import useRadio from '../../../../../../hooks/useRadio';

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

	const [usage, usageRadioButton] = useRadio({
		name: 'usage',
		options: usageOptions,
	});
	const [authMethod, authMethodRadioButton] = useRadio({
		name: 'authMethod',
		options: identityVerificationMethodOptions,
	});
	const [values, setValues] = useState({
		waitingTime: '',
	});

	/**************************************************
	 * ambacc244 - 정책 생성 요청시 현재 폼이 가지고 있는 정보를 함께 제출
	 **************************************************/
	const onSubmitForm = useCallback(() => {}, []);

	return (
		<TemplateElementContainer
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
							render={usageRadioButton}
						/>
						<TemplateElement
							title={
								identityVerification.contents.authMethod.title
							}
							render={authMethodRadioButton}
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
