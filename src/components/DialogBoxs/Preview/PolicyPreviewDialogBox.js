import React, {useCallback, useEffect, useState} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {TitleBar} from '../../../styles/components/iam/iam';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../reducers/api/IAM/Policy/RuleManagement/ruleTemplate';
import {
	controlTypes,
	policyManageTypes,
	policyTypes,
} from '../../../utils/data';

import {SummaryList} from '../../../styles/components/iam/descriptionPage';
import {LiText} from '../../../styles/components/text';
import {AddPageDialogBoxTitle} from '../../../styles/components/iam/addPage';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';

import IAM_POLICY_MANAGEMENT_POLICIES from '../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import IAM_POLICY_MANAGEMENT_RULE_TEMPLATE from '../../../reducers/api/IAM/Policy/PolicyManagement/policyRuleTemplate';
import IAM_ACTION_MANAGEMENT_TEMPLATE from '../../../reducers/api/IAM/Policy/ActionManagement/actionTemplate';
import {isFulfilled} from '../../../utils/redux';

import {
	actionPreviewfilter,
	roleAttributeConvertor,
} from '../../../utils/preview';

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
	allowed_service_time: '접근 허용 시간',
	session_timeout: '세션 타임아웃',
	screen_saver: '화면 보호기',
};

const PolicyPreviewDialogBox = ({isOpened, setIsOpened, formData}) => {
	const dispatch = useDispatch();
	const {ruleTemplates} = useSelector(IAM_RULE_MANAGEMENT_TEMPLATE.selector);
	//생성할 권한 템플릿  객체 배열 state
	const {actionTemplates} = useSelector(
		IAM_ACTION_MANAGEMENT_TEMPLATE.selector,
	);
	//정책 생성 요약보기 테이블 데이터
	const [previewData, setPreviewData] = useState([]);

	/**************************************************
	 * ambacc244 - 정책 생성 취소
	 **************************************************/
	const onCancelPolicyForm = useCallback(() => {
		//정책 생성을 위해 모아둔 template의 데이터를 삭제
		dispatch(IAM_RULE_MANAGEMENT_TEMPLATE.action.resetRuleTemplate());
		//정책 생성 모드 off
		dispatch(
			IAM_POLICY_MANAGEMENT_POLICIES.action.changeCreatingPolicyMode({
				mode: false,
			}),
		);
	}, [dispatch]);

	/**************************************************
	 * ambacc244 - 정책 생성
	 **************************************************/
	const onSubmitPolicyForm = useCallback(async () => {
		if (formData.type === policyTypes.iam) {
			//TODO:정책생성 이후 하위로직을 처리하기위한 비동기 로직 추가 예정-roberto

			//TODO: step1은 매번 정책을 생성해서 커맨드 아웃했습니다.
			// 작동은 하는 함수고 step2,3가 완료되면 연결 할것이니 삭제 하시면 곤란합니다.
			// 올바른 step 아래에 disatch 작성 해주시면 감사하겠습니다.

			//step1: 정책 생성
			const createPolicyResponse = await dispatch(
				IAM_POLICY_MANAGEMENT_POLICIES.asyncAction.create({
					name: formData.name,
					description: formData.description,
					type: policyManageTypes.Client,
					controlTypes: [controlTypes.RBAC],
					maxGrants: 5,
				}),
			);

			// 정책 생성 비동기 처리가 fulfilled 된 경우
			if (isFulfilled(createPolicyResponse)) {
				const policyId = createPolicyResponse.payload;

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
				// 	IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE.asyncAction.join(
				//   ,,,
				// 	),
				// ******************************************************

				//step3-1: rule 생성
				let order = 1;
				const templateList = [];
				for (const v in ruleTemplates) {
					// create 액션의 response
					const createRuleTemplateActionResponse = await dispatch(
						IAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.create({
							...ruleTemplates[v],
							attributes: ruleTemplates[
								v
							].attributes.map((data) => JSON.stringify(data)),
						}),
					);
					// 비동기 처리가 fulfilled 된 경우
					if (isFulfilled(createRuleTemplateActionResponse)) {
						console.log(createRuleTemplateActionResponse);
						const ruleTemplateId =
							createRuleTemplateActionResponse.payload;
						// 정책과 연결할 템플릿 리스트 저장
						templateList.push({
							templateId: ruleTemplateId,
							order: order++,
						});
					}
					// 비동기 처리가 rejected 된 경우
					else {
						// 에러 핸들링
						console.log(createRuleTemplateActionResponse);
					}
				}

				//step3-2: 정책 rule 연결
				/**************************************************
				 * seob - 정책 rule 연결
				 ***************************************************/
				if (templateList.length === ruleTemplates.length) {
					const ruleTemplateJoinActionResponse = await dispatch(
						IAM_POLICY_MANAGEMENT_RULE_TEMPLATE.asyncAction.join({
							policyId: policyId,
							templateList: templateList,
						}),
					);
					if (!isFulfilled(ruleTemplateJoinActionResponse)) {
						// 에러 핸들링
						console.log(ruleTemplateJoinActionResponse);
					}
				}
				// ******************************************************
			}
			// 정책 생성 비동기 처리가 rejected 된 경우
			else {
				// 에러 핸들링
				console.log(createPolicyResponse);
			}
		}
		//정책 생성을 위해 모아둔 template의 데이터를 삭제
		dispatch(IAM_RULE_MANAGEMENT_TEMPLATE.action.resetRuleTemplate());
		//정책 생성 모드 off
		dispatch(
			IAM_POLICY_MANAGEMENT_POLICIES.action.changeCreatingPolicyMode({
				mode: false,
			}),
		);
	}, [formData, dispatch, ruleTemplates]);

	/**********************************************************
	 * ambacc244 ,roberto- 렌더링시 정책생성 Preview 데이터 갱신
	 **********************************************************/
	useEffect(() => {
		//TODO:정책 생성을 눌렀을시 렌더링 실행되도록
		// let previewAllData = [];
		//
		// console.log(ruleTemplates);
		//
		// //IAM - 규칙 템플릿 데이터 처리
		// Object.values(ruleTemplates).map((v) => {
		// 	for (let i = 0; i < v.attributes.length; i++) {
		// 		let object = {};
		// 		if (i === 0) object.policy = v.name;
		// 		object.id = v.attributes[i].ruleType;
		// 		object.detail = policyDescription[v.attributes[i].ruleType];
		// 		object.value = roleAttributeConvertor(v.attributes[i]);
		// 		previewAllData.push(object);
		// 	}
		// });
		//
		// //IAM - 권한(action) 템플릿 데이터 처리
		// //TODO 함수로 모듈화할 예정입니다
		// actionTemplates.map((v) => {
		// 	actionPreviewfilter(v['details']).map((s, index) => {
		// 		let object = {};
		// 		index === 0 ? (object.policy = v.name) : (object.policy = '');
		// 		object.id = s.resource;
		// 		object.detail = s.resource;
		// 		object.value = s.value;
		// 		previewAllData.push(object);
		// 	});
		// });
		// //PAM - 규칙 템플릿 데이터 처리
		//
		// //PAM - 권한(action) 템플릿 데이터 처리
		//
		// setPreviewData(previewAllData);
	}, [actionTemplates, ruleTemplates]);

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
					data={previewData}
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
