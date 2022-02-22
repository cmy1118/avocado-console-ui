import React, {useCallback, useRef, useState} from 'react';
import TemplateItemContainer from '../../TemplateItemContainer';
import Form from '../../../../../RecycleComponents/New/Form';
import TemplateElement from '../../TemplateElement';
import TextBox from '../../../../../RecycleComponents/New/TextBox';
import RadioButton from '../../../../../RecycleComponents/Form/RadioButton';
import {accountStatusOptions} from '../../../../../../utils/options';

const accountActivePeriod = {
	title: '계정 사용 기간',
	description: [
		' 사용자의 계정으로 애플리케이션을 접속할 수 있는 기간을 제어하는 정책을 설정합니다.',
		'관리자 정상화 후 기간 연장합니다.',
	],
	contents: {
		activePeriod: {
			title: '사용 기간',
			message: '일',
		},
		accountStatus: {
			title: '계정 처리 방법',
			options: {
				lock: '잠금',
				delete: '삭제',
			},
		},
		accountNormalization: {
			title: '계정 정상화',
			message: '관리자 해제',
		},
	},
};

const AccountActivePeriod = () => {
	const formRef = useRef(null);
	const [accountStatus, setAccountStatus] = useState();

	const [values, setValues] = useState({
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
			title={accountActivePeriod.title}
			description={accountActivePeriod.description}
			render={() => {
				return (
					<Form
						innerRef={formRef}
						onSubmit={onSubmitForm}
						initialValues={values}
					>
						<TemplateElement
							title={
								accountActivePeriod.contents.activePeriod.title
							}
							render={() => {
								return (
									<div>
										<TextBox name={'activePeriod'} />
										{
											accountActivePeriod.contents
												.activePeriod.message
										}
									</div>
								);
							}}
						/>
						<TemplateElement
							title={
								accountActivePeriod.contents.accountStatus.title
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
								accountActivePeriod.contents
									.accountNormalization.title
							}
							render={() => {
								return (
									<div>
										{
											accountActivePeriod.contents
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
export default AccountActivePeriod;
