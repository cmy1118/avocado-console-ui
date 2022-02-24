import React, {useCallback, useRef, useState} from 'react';
import Form from '../../../../../RecycleComponents/New/Form';
import TemplateElementContainer from '../../TemplateElementContainer';
import TextBox from '../../../../../RecycleComponents/New/TextBox';
import TemplateElement from '../../TemplateElement';
import {accountStatusOptions} from '../../../../../../utils/options';
import useRadio from '../../../../../../hooks/useRadio';

const dormant = {
	title: '휴면',
	description: [
		'일정 기간동안 미접속 사용자의 계정을 처리하기 위해 정책을 설정합니다.',
		'정상화 후 재로그인 시에 패스워드를 변경해야 합니다.',
	],
	contents: {
		inactivePeriod: {
			title: '연속 미접속 기간',
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
			message: '본인 확인 인증',
		},
	},
};

const Dormant = () => {
	const formRef = useRef(null);
	const [accountStatus, accountStatusRadioButton] = useRadio({
		name: 'accountStatus',
		options: accountStatusOptions,
	});

	const [values, setValues] = useState({
		inactivePeriod: '',
		accountNormalization: '',
	});

	/**************************************************
	 * ambacc244 - 정책 생성 요청시 현재 폼이 가지고 있는 정보를 함께 제출
	 **************************************************/
	const onSubmitForm = useCallback(() => {}, []);

	return (
		<TemplateElementContainer
			title={dormant.title}
			description={dormant.description}
			render={() => {
				return (
					<Form
						innerRef={formRef}
						onSubmit={onSubmitForm}
						initialValues={values}
					>
						<TemplateElement
							title={dormant.contents.inactivePeriod.title}
							render={() => {
								return (
									<div>
										<TextBox name={'inactivePeriod'} />
										{
											dormant.contents.inactivePeriod
												.message
										}
									</div>
								);
							}}
						/>
						<TemplateElement
							title={dormant.contents.accountStatus.title}
							render={accountStatusRadioButton}
						/>

						<TemplateElement
							title={dormant.contents.accountNormalization.title}
							render={() => {
								return (
									<div>
										{
											dormant.contents
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

export default Dormant;
