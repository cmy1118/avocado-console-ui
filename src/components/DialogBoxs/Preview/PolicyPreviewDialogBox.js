import React, {useCallback, useEffect, useState} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {TitleBar} from '../../../styles/components/iam/iam';
import IAM_RULE_TEMPLATE from '../../../reducers/api/IAM/Policy/RuleManagement/template';
import {policyTypes} from '../../../utils/data';

import {SummaryList} from '../../../styles/components/iam/descriptionPage';
import {LiText} from '../../../styles/components/text';
import {AddPageDialogBoxTitle} from '../../../styles/components/iam/addPage';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';
import {roleAttributeConvertor} from '../../../utils/preview';

const policyPreviewDialogBox = {
	header: '정책 생성 요약보기',
	policy: {
		title: '정책 기본정보',
		contents: {
			name: '정책 이름',
			description: '정책 설명',
			type: '정책 유형',
		},
	},
	detail: {title: '정책'},
};

const policyDescription = {
	//사용자 인증
	device_authentication: '단말기 인증',
	mfa: 'MFA(다중인증)',
	alternative_authn_failover: 'Fail Over',
	identity_verification: '본인 확인 인증',
	//사용자 계정 처리
	sign_in_fail_blocking: '로그인 실패',
	dormant_blocking: '휴먼',
	account_expired: '계정 사용기간',
	group_modifying: '그룹 변경',
	resigned: '퇴사(탈퇴)',
	// 사용자 계정 패턴
	user_id_pattern: '사용자 ID 패턴',
	password_pattern: '비밀번호 패턴',
};

const PolicyPreviewDialogBox = ({isOpened, setIsOpened, formData}) => {
	const dispatch = useDispatch();
	const {ruleTemplates} = useSelector(IAM_RULE_TEMPLATE.selector);

	const [ruleDetail, setRuleDetail] = useState([]);

	/**************************************************
	 * ambacc244 - 정책 생성 취소
	 **************************************************/
	const onCancelPolicyForm = useCallback(() => {
		//정책 생성을 위해 모아둔 template의 데이터를 삭제
		dispatch(IAM_RULE_TEMPLATE.action.cancelCreatePolicy());
	}, [dispatch]);

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
			// 		console.log('정책 아이디: ', data.id);
			//step2-1: 권한 생성
			//step2-2: 정책 권한 연결
			//step3-1: rule 생성
			for (const v in ruleTemplates) {
				dispatch(
					IAM_RULE_TEMPLATE.asyncAction.createRuleTemplateAction({
						...ruleTemplates[v],
						attributes: ruleTemplates[v].attributes.map((data) =>
							JSON.stringify(data),
						),
					}),
				)
					.unwrap()
					.then((data) => {
						console.log('rule 아이디: ', data.id);
					});
			}
			//step3-2: 정책 rule 연결
			// });

			/**************************************************
			 * seob - 정책 rule 연결 - todo : 템플릿 생성 api 수정시 response에 따라서 수정할 예정입니다.
			 ***************************************************/
			// // 예시 템플릿 리스트
			// const iamTemplateIdList = [
			// 	{policyId: '', templateId: '', order: ''},
			// 	{policyId: '', templateId: '', order: ''},
			// 	{policyId: '', templateId: '', order: ''},
			// ];
			// dispatch(
			// 	IAM_POLICY_MANAGEMENT_RULE_TEMPLATE.asyncAction.joinAction(
			// 		iamTemplateIdList,
			// 	),
			// );
			// ******************************************************
		}
	}, [formData.type, ruleTemplates, dispatch]);

	useEffect(() => {
		let array = [];

		Object.values(ruleTemplates).map((v) => {
			for (let i = 0; i < v.attributes.length; i++) {
				let data = new Object();
				if (i === 0) data.name = v.name;

				data.description = policyDescription[v.attributes[i].ruleType];
				data.id = v.attributes[i].ruleType;
				data.value = roleAttributeConvertor(v.attributes[i]);
				array.push(data);
			}
		});

		setRuleDetail(array);
	}, [ruleTemplates]);

	return (
		formData && (
			<ModalTableContainer
				title={policyPreviewDialogBox.header}
				isOpened={isOpened}
				setIsOpened={setIsOpened}
				handleSubmit={onSubmitPolicyForm}
				handleCancel={onCancelPolicyForm}
			>
				<TitleBar>{policyPreviewDialogBox.policy.title}</TitleBar>
				<SummaryList>
					<LiText>
						{policyPreviewDialogBox.policy.contents.name} :{' '}
						{formData.name}
					</LiText>
					<LiText>
						{policyPreviewDialogBox.policy.contents.description} :{' '}
						{formData.description}
					</LiText>
					<LiText>
						{policyPreviewDialogBox.policy.contents.type} :{' '}
						{formData.type}
					</LiText>
				</SummaryList>

				<AddPageDialogBoxTitle>
					{policyPreviewDialogBox.detail.title} :{' '}
				</AddPageDialogBoxTitle>
				{/*TODO: TABLE*/}
				<Table
					readOnly
					isCheckBox={false}
					columns={tableColumns[tableKeys.policy.add.preview]}
					tableKey={tableKeys.policy.add.preview}
					data={ruleDetail}
				/>
			</ModalTableContainer>
		)
	);
};

PolicyPreviewDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	formData: PropTypes.object.isRequired,
};

export default PolicyPreviewDialogBox;
