import React, {useCallback, useEffect, useState} from 'react';
import {
	IamSectionBottomMargin,
	IamSectionTitleBar,
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../../styles/components/iam/iam';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import {
	IamSectionContents,
	CreatePageContent,
	TextBoxDescription,
} from '../../../../../styles/components/iam/addPage';
import {RowDiv} from '../../../../../styles/components/style';
import WritePolicy from './WritePolicy';
import {useDispatch} from 'react-redux';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policies';
import {policyTypes} from '../../../../../utils/data';
import PolicyPreviewDialogBox from '../../../../DialogBoxs/Preview/PolicyPreviewDialogBox';
import useTextBox from '../../../../../hooks/useTextBox';
import useComboBox from '../../../../../hooks/useComboBox';
import {useHistory, useLocation} from 'react-router-dom';
import {policyTypeOptions} from '../../../../../utils/policy/options';

const createPolicy = {
	title: '정책 작성',
	description: '정책 유형에 해당되는 탬플릿 5개까지만 추가 가능합니다.',
};

/**************************************************
 * ambacc244 - 새로운 정책 추가를 위한 기본 정보을 입력받는 컴포넌트
 **************************************************/
const CreatePolicy = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	//isOpened: 정책 생성을 위한 dialogBox 열림닫힘 state
	const [isOpened, setIsOpened] = useState(false);
	//policyName: 생성할 정책 이름
	const [policyName, policyNameTextBox] = useTextBox({
		placeholder: '정책 이름',
	});
	const [policyDescription, policyDescriptionTextBox] = useTextBox({
		placeholder: '정책 설명',
	});

	const [policyType, policyTypeComboBox, setPolicyType] = useComboBox({
		options: policyTypeOptions,
	});

	/**************************************************
	 * ambacc244 - 정책 추가 취소
	 **************************************************/
	const onClickCancelAddPolicy = useCallback(() => {}, []);

	/**************************************************
	 * ambacc244 - 정책 생성을 위해 템플릿 데이터 모으기
	 **************************************************/
	const onSubmitGatherPolicyTemplates = useCallback(() => {
		dispatch(
			IAM_POLICY_MANAGEMENT_POLICIES.action.changeCreatingPolicyMode({
				mode: true,
			}),
		);
		setIsOpened(true);
	}, [dispatch]);

	/**************************************************
	 * ambacc244 - 정책 유형이 변경되면 url도 변경
	 **************************************************/
	useEffect(() => {
		if (Object.values(policyTypes).includes(policyType)) {
			history.push({
				pathname: location.pathname,
				search: `type=${policyType}`,
			});
		}
	}, [history, location.pathname, policyType]);

	return (
		<>
			<IamSectionBottomMargin>
				<IamSectionTitleBar>
					<TitleBarText>정책 기본 정보</TitleBarText>
					<TitleBarButtons>
						<NormalButton onClick={onSubmitGatherPolicyTemplates}>
							정책 생성
						</NormalButton>
						<TransparentButton
							type={'button'}
							margin='0px 0px 0px 5px'
							onClick={onClickCancelAddPolicy}
						>
							취소
						</TransparentButton>
					</TitleBarButtons>
				</IamSectionTitleBar>
				<IamSectionContents>
					<RowDiv margin={'0px 0px 12px 0px'}>
						{policyNameTextBox()}
						<TextBoxDescription>
							최대 100자, 영문 대소문자로 생성 가능합니다.
						</TextBoxDescription>
					</RowDiv>
					<RowDiv margin={'0px 0px 12px 0px'}>
						{policyDescriptionTextBox()}
						<TextBoxDescription>
							최대 200자 가능합니다.
						</TextBoxDescription>
					</RowDiv>
					<RowDiv margin={'0px'}>
						{policyTypeComboBox()}
						<TextBoxDescription>
							정책 유형을 선택 합니다.
						</TextBoxDescription>
					</RowDiv>
				</IamSectionContents>
			</IamSectionBottomMargin>

			<WritePolicy
				title={createPolicy.title}
				description={createPolicy.description}
				policyType={policyType}
			/>
			<PolicyPreviewDialogBox
				setIsOpened={setIsOpened}
				isOpened={isOpened}
				formData={{
					name: policyName,
					description: policyDescription,
					type: policyType,
				}}
			/>
		</>
	);
};

export default CreatePolicy;
