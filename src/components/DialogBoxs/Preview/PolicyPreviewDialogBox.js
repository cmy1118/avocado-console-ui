import React, {useCallback} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {TitleBar} from '../../../styles/components/iam/iam';
import IAM_RULE_TEMPLATE from '../../../reducers/api/IAM/Rule/template';
import {policyTypes} from '../../../utils/data';

const PolicyPreviewDialogBox = ({isOpened, setIsOpened, formData}) => {
	const dispatch = useDispatch();
	const {ruleTemplates} = useSelector(IAM_RULE_TEMPLATE.selector);

	/**************************************************
	 * ambacc244 - 정책 생성
	 **************************************************/
	const onSubmitPolicyForm = useCallback(() => {
		if (formData.type === policyTypes.iam) {
			//TODO: step1은 매번 정책을 생성해서 커맨드 아웃했습니다.
			// 작동은 하는 함수고 step2,3가 완료되면 연결 할것이니 삭제 하시면 곤란합니다.
			// 올바른 step 아래에 disatch 작성 해주시면 감사하겠습니다.
			//step1: 정책 생성
			// dispatch(
			// 	IAM_POLICY_MANAGEMENT_POLICIES.asyncAction.createPolicyAction({
			// 		name: formData.name,
			// 		description: formData.description,
			// 		type: policyManageTypes.Client,
			// 		controlTypes: [controlTypes.RBAC],
			// 		maxGrants: 5,
			// 	}),
			// )
			// 	.unwrap()
			// 	.then((data) => {
			// 		console.log('정책 아이디', data.id);
			//step2-1: 권한 생성
			//step2-2: 정책 권한 연결
			//step3-1: rule 생성
			for (const v in ruleTemplates) {
				dispatch(
					IAM_RULE_TEMPLATE.asyncAction.createRuleTemplateAction(
						ruleTemplates[v],
					),
				);
			}
			//step3-2: 정책 rule 연결
			// });
		}
	}, [ruleTemplates, formData]);

	return (
		<ModalTableContainer
			title={'정책 생성 요약보기'}
			isOpened={isOpened}
			setIsOpened={setIsOpened}
			handleSubmit={onSubmitPolicyForm}
		>
			<TitleBar>정책 기본정보</TitleBar>
		</ModalTableContainer>
	);
};

PolicyPreviewDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	formData: PropTypes.object.isRequired,
};

export default PolicyPreviewDialogBox;
