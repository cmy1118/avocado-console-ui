import React, {useCallback, useRef, useState} from 'react';
import TemplateItemContainer from '../../TemplateItemContainer';
import Form from '../../../../../RecycleComponents/New/Form';
import TemplateElement from '../../TemplateElement';
import TextBox from '../../../../../RecycleComponents/New/TextBox';
import RadioButton from '../../../../../RecycleComponents/Form/RadioButton';
import {
	accountStatusOptions,
	usageOptions,
} from '../../../../../../utils/options';

const userIdPattern = {
	title: '사용자 ID 패턴',
	description: [
		'사용자 ID에 특정 패턴을 설정합니다.',
		'패턴 최대 길이는 3~10자 로 제한 하며 특수문자 사용은 할수 없습니다',
	],
	contents: {
		usage: {
			title: '사용 여부',
			options: {use: '사용함', nonuse: '사용 안함'},
		},
		patternFormat: {
			title: '패턴 형식',
			options: {prefix: '접두사', suffix: '접미사'},
		},
		patternInput: {
			title: '패턴 입력',
		},
	},
};

const UserIdPattern = () => {
	const formRef = useRef(null);
	const [usage, setUsage] = useState();

	const [values, setValues] = useState({
		usageStatus: '',
		patternFormat: '',
		patternInput: '',
	});

	/**************************************************
	 * ambacc244 - 정책 생성 요청시 현재 폼이 가지고 있는 정보를 함께 제출
	 **************************************************/
	const onSubmitForm = useCallback(() => {}, []);

	return (
		<TemplateItemContainer
			title={userIdPattern.title}
			description={userIdPattern.description}
			render={() => {
				return (
					<Form
						innerRef={formRef}
						onSubmit={onSubmitForm}
						initialValues={values}
					>
						<TemplateElement
							title={userIdPattern.contents.usage.title}
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
					</Form>
				);
			}}
		/>
	);
};

export default UserIdPattern;
