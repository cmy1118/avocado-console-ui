import React, {useCallback, useRef, useState} from 'react';
import Form from '../../../../../RecycleComponents/New/Form';
import TemplateItemContainer from '../../TemplateItemContainer';
import TextBox from '../../../../../RecycleComponents/New/TextBox';
import TemplateElement from '../../TemplateElement';
import RadioButton from '../../../../../RecycleComponents/Form/RadioButton';
import {
	accountStatusOptions,
	usageOptions,
} from '../../../../../../utils/options';

const loginFailure = {
	title: '로그인 실패',
	description: [
		'사용자 로그인 실패 횟수에 따라 계정을 처리하기 위해 정책을 설정합니다.',
		'정상화 후 재로그인 시에 패스워드를 변경해야 합니다.',
	],
	contents: {
		loginFailureCount: {
			title: '로그인 실패 횟수',
			message: '회',
		},
		accountStatus: {
			title: '계정 처리 방법',
		},
		resetErrorCount: {
			title: '오류 횟수 초기화',
			message: '시간 후',
		},
		accountNormalization: {
			title: '계정 정상화',
			message: '시간 후',
		},
	},
};

const LoginFailure = () => {
	const formRef = useRef(null);
	const [applicationUsage, setApplicationUsage] = useState();

	const [values, setValues] = useState({
		loginFailureCount: '',
		accountNormalization: '',
		resetErrorCount: '',
	});

	/**************************************************
	 * ambacc244 - 정책 생성 요청시 현재 폼이 가지고 있는 정보를 함께 제출
	 **************************************************/
	const onSubmitForm = useCallback(() => {}, []);

	return (
		<TemplateItemContainer
			title={loginFailure.title}
			description={loginFailure.description}
			render={() => {
				return (
					<Form
						innerRef={formRef}
						onSubmit={onSubmitForm}
						initialValues={values}
					>
						<TemplateElement
							title={
								loginFailure.contents.loginFailureCount.title
							}
							render={() => {
								return (
									<div>
										<TextBox name={'loginFailureCount'} />
										{
											loginFailure.contents
												.loginFailureCount.message
										}
									</div>
								);
							}}
						/>
						<TemplateElement
							title={loginFailure.contents.accountStatus.title}
							render={() => {
								return (
									<RadioButton
										value={accountStatusOptions[0].value}
										setValue={setApplicationUsage}
										options={accountStatusOptions}
									/>
								);
							}}
						/>
						<TemplateElement
							title={loginFailure.contents.resetErrorCount.title}
							render={() => {
								return (
									<div>
										<TextBox name={'resetErrorCount'} />
										{
											loginFailure.contents
												.resetErrorCount.message
										}
									</div>
								);
							}}
						/>
						<TemplateElement
							title={
								loginFailure.contents.accountNormalization.title
							}
							render={() => {
								return (
									<div>
										<TextBox
											name={'accountNormalization'}
										/>
										{
											loginFailure.contents
												.accountNormalization.message
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

export default LoginFailure;
