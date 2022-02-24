import React, {useCallback, useRef, useState} from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import Form from '../../../../../RecycleComponents/New/Form';
import TemplateElement from '../../TemplateElement';
import RadioButton from '../../../../../RecycleComponents/Form/RadioButton';
import {
	accountNormalizationOptions,
	accountStatusOptions,
	gracePeriodOptions,
	usageOptions,
} from '../../../../../../utils/options';
import TextBox from '../../../../../RecycleComponents/New/TextBox';

const resignation = {
	title: '퇴사(탈퇴)',
	description: [
		'사용자 퇴사로 인한 사용자 계정 접근을 제어하기 위한 정책을 설정합니다.',
		'유예 기간동안은 접근 및 권한이 유지되며, 관리자에 의해 정상화가 가능합니다.',
		'유예 기간동안은 접근 및 권한이 유지됩니다.',
	],
	contents: {
		accountStatus: {
			title: '계정 처리 방법',
			options: {
				lock: '잠금',
				delete: '삭제',
			},
		},
		gracePeriod: {
			title: '유예 기간',
			options: {
				no: '없음',
				yes: '있음',
			},
		},
		accountNormalization: {
			title: '계정 정상화',
			message: '관리자 정상화',
		},
	},
};

const Resignation = () => {
	const formRef = useRef(null);
	const [accountStatus, setAccountStatus] = useState();
	const [gracePeriod, setGracePeriod] = useState();

	const [values, setValues] = useState({
		accountStatus: '',
		gracePeriod: '',
	});

	/**************************************************
	 * ambacc244 - 정책 생성 요청시 현재 폼이 가지고 있는 정보를 함께 제출
	 **************************************************/
	const onSubmitForm = useCallback(() => {}, []);

	return (
		<TemplateElementContainer
			title={resignation.title}
			description={resignation.description}
			render={() => {
				return (
					<Form
						innerRef={formRef}
						onSubmit={onSubmitForm}
						initialValues={values}
					>
						<TemplateElement
							title={resignation.contents.accountStatus.title}
							render={() => {
								return (
									<RadioButton
										value={accountStatusOptions[0].value}
										setValue={accountStatus}
										options={accountStatusOptions}
									/>
								);
							}}
						/>

						<TemplateElement
							title={resignation.contents.gracePeriod.title}
							render={() => {
								return (
									<RadioButton
										value={gracePeriodOptions[0].value}
										setValue={setGracePeriod}
										options={gracePeriodOptions}
									/>
								);
							}}
						/>
						<TemplateElement
							title={
								resignation.contents.accountNormalization.title
							}
							render={() => {
								return (
									<div>
										{
											resignation.contents
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

export default Resignation;
