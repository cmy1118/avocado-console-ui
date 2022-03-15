import React, {useCallback, useState} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {TitleBar} from '../../../styles/components/iam/iam';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../reducers/api/IAM/Policy/RuleManagement/template';
import {controlTypes, policyManageTypes, policyTypes,} from '../../../utils/data';

import {SummaryList} from '../../../styles/components/iam/descriptionPage';
import {LiText} from '../../../styles/components/text';
import {AddPageDialogBoxTitle} from '../../../styles/components/iam/addPage';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import IAM_POLICY_MANAGEMENT_RULE_TEMPLATE from '../../../reducers/api/IAM/Policy/PolicyManagement/policyRuleTemplate';
import IAM_ACTION_MANAGEMENT_TEMPLATE from "../../../reducers/api/IAM/Policy/ActionManagement/actionTemplate";

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
	const {actionTemplates} = useSelector(IAM_ACTION_MANAGEMENT_TEMPLATE.selector);
	const [ruleDetail, setRuleDetail] = useState([]);

	/**************************************************
	 * ambacc244 - 정책 생성
	 **************************************************/
	const onSubmitPolicyForm = useCallback(() => {
		if (formData.type === policyTypes.iam) {
			//TODO:정책생성 이후 하위로직을 처리하기위한 비동기 로직 추가 예정-roberto

			//TODO: step1은 매번 정책을 생성해서 커맨드 아웃했습니다.
			// 작동은 하는 함수고 step2,3가 완료되면 연결 할것이니 삭제 하시면 곤란합니다.
			// 올바른 step 아래에 disatch 작성 해주시면 감사하겠습니다.

			//step1: 정책 생성
			// let policyId = null;
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
			// 		policyId = data.id;
			// 	});

			//step2-1: action 생성
			/**************************************************
			 * reoberto - action 생성
			 ***************************************************/
			// if(actionTemplates[0]){
			// 	actionTemplates.forEach(v=>{
			// 		dispatch(
			// 			IAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.createAction({
			// 				name: v.name,
			// 				description: v.description,
			// 				details: v.details,
			// 			}),
			// 		).then((res)=>{
			// 			console.log('권한 생성 res:',res)
			// 		})
			// 	})
			// }
			// ******************************************************


			//step2-2: 정책 action 연결
			/**************************************************
			 * reoberto - 정책에 action 연결
			 ***************************************************/
			//:TODO 정책 action api 작업중 완료시 적용예정
			// dispatch(
			// 	IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE.asyncAction.joinAction(
			//   ,,,
			// 	),
			// ******************************************************


			//step3-1: rule 생성
			// let order = 1;
			// const templateList = [];
			// for (const v in ruleTemplates) {
			// 	dispatch(
			// 		IAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.createRuleTemplateAction(
			// 			{
			// 				...ruleTemplates[v],
			// 				attributes: ruleTemplates[
			// 					v
			// 				].attributes.map((data) => JSON.stringify(data)),
			// 			},
			// 		),
			// 	)
			// 		.unwrap()
			// 		.then((data) => {
			// 			console.log('rule 아이디: ', data.id);
			// 			templateList.push({
			// 				policyId: policyId,
			// 				templateId: data.id,
			// 				order: order++,
			// 			});
			// 		});
			// }


			//step3-2: 정책 rule 연결
			/**************************************************
			 * seob - 정책 rule 연결
			 ***************************************************/
			// templateList.length === ruleTemplates.length &&
			// 	dispatch(
			// 		IAM_POLICY_MANAGEMENT_RULE_TEMPLATE.asyncAction.joinAction(
			// 			templateList,
			// 		),
			// 	);
			// ******************************************************
		}
	}, [formData, dispatch, ruleTemplates]);

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
