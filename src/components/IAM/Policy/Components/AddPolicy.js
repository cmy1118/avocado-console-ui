import React, {useCallback, useRef} from 'react';
import {
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../styles/components/iam/iam';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {
	AddPageContent,
	TextBoxDescription,
} from '../../../../styles/components/iam/addPage';
import Form from '../../../RecycleComponents/New/Form';
import {RowDiv} from '../../../../styles/components/style';
import TextBox from '../../../RecycleComponents/New/TextBox';
import * as yup from 'yup';
import ComboBox from '../../../RecycleComponents/New/ComboBox';
import WritePolicy from './WritePolicy';
import {useDispatch} from 'react-redux';
import IAM_POLICY from '../../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import {
	controlTypes,
	policyManageTypes,
	policyTypes,
} from '../../../../utils/data';
import IAM_RULE_TEMPLATE from '../../../../reducers/api/IAM/Rule/template';

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	writePolicy: {
		title: '정책 작성',
		description: '정책 유형에 해당되는 탬플릿 5개까지만 추가 가능합니다.',
	},
};

/**************************************************
 * ambacc244 - 새로운 정책 추가를 위한 기본 정보을 입력받는 컴포넌트
 **************************************************/
const AddPolicy = () => {
	const dispatch = useDispatch();

	const formRef = useRef(null);

	const validation = {
		name: yup
			.string()
			.max(100, '최대 길이는 100자 입니다.')
			.required('정책 이름은 필수 입력 값입니다.'),
		description: yup
			.string()
			.max(200, '최대 길이는 200자 입니다.')
			.required('정책 설명은 필수 입력 값입니다.'),
		type: yup.string().required('정책 유형은 필수 입력 값입니다.'),
	};

	/**************************************************
	 * ambacc244 - 정책 추가 취소
	 **************************************************/
	const onClickCancelAddPolicy = useCallback(() => {}, []);

	/**************************************************
	 * ambacc244 - 정책 추가
	 **************************************************/
	const onSubmitPolicyData = useCallback((data) => {
		//생성할 정책의 타입이 iam
		if (data.type === policyTypes.iam) {
			//step1: 정책 생성
			dispatch(
				IAM_POLICY.asyncAction.createPolicyAction({
					name: data.name,
					description: data.description,
					type: policyManageTypes.Client,
					controlTypes: [controlTypes.RBAC],
					maxGrants: 5,
				}),
			)
				.unwrap()
				.then((data) => {
					console.log('정책 아이디', data.id);
					//step2-1: 권한 생성

					//step2-2: 정책 권한 연결

					//step3-1: rule 생성
					let ruleAttribute = [];

					dispatch(
						IAM_RULE_TEMPLATE.asyncAction.createRuleTemplateAction({
							name: data.name,
							resource: policyTypes.iam,
							description: data.description,
							attributes: ruleAttribute,
						}),
					);

					//step3-2: 정책 rule 연결
				});
		}
	}, []);

	return (
		<>
			<TitleBar>
				<TitleBarText>정책 기본 정보</TitleBarText>
				<TitleBarButtons>
					<NormalButton
						onClick={() => formRef.current.handleSubmit()}
					>
						사용자 생성
					</NormalButton>
					<TransparentButton
						type={'button'}
						margin='0px 0px 0px 5px'
						onClick={onClickCancelAddPolicy}
					>
						취소
					</TransparentButton>
				</TitleBarButtons>
			</TitleBar>
			<AddPageContent>
				<Form
					initialValues={{
						name: '',
						description: '',
					}}
					onSubmit={onSubmitPolicyData}
					innerRef={formRef}
					validation={validation}
				>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<TextBox
							name={'name'}
							placeholder={'정책 이름'}
							direction={'row'}
						/>
						<TextBoxDescription>
							최대 100자, 영문 대소문자로 생성 가능합니다.
						</TextBoxDescription>
					</RowDiv>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<TextBox
							name={'description'}
							placeholder={'정책 설명'}
							direction={'row'}
						/>
						<TextBoxDescription>
							최대 200자 가능합니다.
						</TextBoxDescription>
					</RowDiv>
					<RowDiv margin={'0px 0px 12px 0px'}>
						<ComboBox
							name={'type'}
							header={'정책 유형 선택'}
							options={[
								{value: policyTypes.iam, label: 'IAM'},
								{value: policyTypes.pam, label: 'PAM'},
							]}
						/>
						<TextBoxDescription>
							정책 유형을 선택 합니다.
						</TextBoxDescription>
					</RowDiv>
				</Form>
			</AddPageContent>
			<WritePolicy
				title={contents.writePolicy.title}
				description={contents.writePolicy.description}
			/>
		</>
	);
};

export default AddPolicy;
