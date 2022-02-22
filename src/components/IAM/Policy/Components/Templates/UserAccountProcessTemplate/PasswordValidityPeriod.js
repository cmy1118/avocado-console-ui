import React, {useCallback, useRef, useState} from 'react';
import TemplateItemContainer from '../../TemplateItemContainer';
import Form from '../../../../../RecycleComponents/New/Form';
import TemplateElement from '../../TemplateElement';
import TextBox from '../../../../../RecycleComponents/New/TextBox';
import RadioButton from '../../../../../RecycleComponents/Form/RadioButton';
import {
	accountNormalizationOptions,
	accountStatusOptions,
	usageOptions,
} from '../../../../../../utils/options';

const passwordValidityPeriod = {
	title: '비밀번호 사용 기간',
	description: [
		'사용자의 계정의 비밀번호 사용기간을 제어하는 정책을 설정합니다.',
		'정상화 후에는 반드시 비밀번호를 변경해햐 합니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		activePeriod: {
			title: '사용 기간',
			message: '일',
		},
		accountStatus: {
			title: '계정 처리 방법',
		},
		accountNormalization: {
			title: '계정 정상화',
		},
	},
};

const PasswordValidityPeriod = () => {
	const formRef = useRef(null);
	const [usage, setUsage] = useState();
	const [accountStatus, setAccountStatus] = useState();
	const [accountNormalization, setAccountNormalization] = useState();

	const [values, setValues] = useState({
		usage: '',
		activePeriod: '',
		accountStatus: '',
		accountNormalization: '',
	});

	/**************************************************
	 * ambacc244 - 정책 생성 요청시 현재 폼이 가지고 있는 정보를 함께 제출
	 **************************************************/
	const onSubmitForm = useCallback(() => {}, []);

	return (
		<TemplateItemContainer
			title={passwordValidityPeriod.title}
			description={passwordValidityPeriod.description}
			render={() => {
				return (
					<Form
						innerRef={formRef}
						onSubmit={onSubmitForm}
						initialValues={values}
					>
						<TemplateElement
							title={passwordValidityPeriod.contents.usage.title}
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
								passwordValidityPeriod.contents.activePeriod
									.title
							}
							render={() => {
								return (
									<div>
										<TextBox name={'activePeriod'} />
										{
											passwordValidityPeriod.contents
												.activePeriod.message
										}
									</div>
								);
							}}
						/>
						<TemplateElement
							title={
								passwordValidityPeriod.contents.accountStatus
									.title
							}
							render={() => {
								return (
									<RadioButton
										value={accountStatusOptions[0].value}
										setValue={setAccountStatus}
										options={accountStatusOptions}
									/>
								);
							}}
						/>
						<TemplateElement
							title={
								passwordValidityPeriod.contents
									.accountNormalization.title
							}
							render={() => {
								return (
									<RadioButton
										value={
											accountNormalizationOptions[0].value
										}
										setValue={setAccountNormalization}
										options={accountNormalizationOptions}
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

export default PasswordValidityPeriod;
