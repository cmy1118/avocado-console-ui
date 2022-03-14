import React, {useCallback, useState} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {TitleBar} from '../../../styles/components/iam/iam';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../reducers/api/IAM/Policy/RuleManagement/template';
import {policyTypes} from '../../../utils/data';

import {SummaryList} from '../../../styles/components/iam/descriptionPage';
import {LiText} from '../../../styles/components/text';
import {AddPageDialogBoxTitle} from '../../../styles/components/iam/addPage';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';

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

const PolicyPreviewDialogBox = ({isOpened, setIsOpened, formData}) => {
	const dispatch = useDispatch();
	const {ruleTemplates} = useSelector(IAM_RULE_MANAGEMENT_TEMPLATE.selector);

	const [ruleDetail, setRuleDetail] = useState([]);

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
					IAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.createRuleTemplateAction(
						{...ruleTemplates[v],
							attributes: ruleTemplates[v].attributes.map((data) =>
								JSON.stringify(data),
							)}
						),
				).unwrap()
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
	}, [ruleTemplates, formData]);

	// useEffect(() => {
	// 	let array = [];
	// 	console.log(ruleTemplates);
	//
	// 	Object.values(ruleTemplates).map((v) => {
	// 		for (let i = 0; i < v.attribute.length; i++) {
	// 			let data = {};
	// 			if (i === 0) {
	// 				data.name = v.name;
	// 				data.description = v.description;
	// 			}
	//
	// 			console.log(v.attribute[i]);
	//
	// 			array.push(data);
	// 		}
	// 	});
	//
	// 	setRuleDetail(array);
	// }, [ruleTemplates]);

	return (
		formData && (
			<ModalTableContainer
				title={policyPreviewDialogBox.header}
				isOpened={isOpened}
				setIsOpened={setIsOpened}
				handleSubmit={onSubmitPolicyForm}
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
