import React, {useCallback, useEffect, useState} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {TitleBar} from '../../../styles/components/iam/iam';
import {controlTypes, policyManageTypes} from '../../../utils/data';

import {SummaryList} from '../../../styles/components/iam/descriptionPage';
import {LiText} from '../../../styles/components/text';
import {AddPageDialogBoxTitle} from '../../../styles/components/iam/addPage';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';

import IAM_POLICY_MANAGEMENT_POLICIES from '../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import IAM_POLICY_MANAGEMENT_RULE_TEMPLATE from '../../../reducers/api/IAM/Policy/PolicyManagement/policyRuleTemplate';
import {isFulfilled} from '../../../utils/redux';

import {roleAttributeConvertor} from '../../../utils/preview';
import IAM_ACTION_MANAGEMENT_TEMPLATE from '../../../reducers/api/IAM/Policy/ActionManagement/actionTemplate';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../reducers/api/IAM/Policy/RuleManagement/ruleTemplate';
import IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE from '../../../reducers/api/IAM/Policy/PolicyManagement/policyActionTemplate';

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

	/*************************************************************************
	 * 정책 생성
	 *************************************************************************/
	async function createPolicy() {
		return dispatch(
			IAM_POLICY_MANAGEMENT_POLICIES.asyncAction.create({
				name: formData.name,
				description: formData.description,
				type: policyManageTypes.Client,
				controlTypes: [controlTypes.RBAC],
				maxGrants: 5,
			}),
		);
	}
	/*************************************************************************
	 * roberto -권한(action) 생성
	 *************************************************************************/
	async function createAction() {
		let actionIds = [];
		console.log('🟡권한(action) 생성');
		// actionIds = await response()
		for (const v of actionTemplates) {
			await dispatch(
				IAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.createAction({
					name: v.name,
					description: v.description,
					details: v.details,
				}),
			).then((res) => {
				//TODO: 백엔드 response id 요청
				actionIds.push(
					res.payload.headers.location.split('/').reverse()[0],
				);
			});
		}
		console.log('🟡권한(action) 생성-actionIds:', actionIds);
		return actionIds;
	}
	/*************************************************************************
	 * roberot -생성된 권한 정책 연결
	 *************************************************************************/
	async function joinAction(policyId, actionIds) {
		console.log('🟡생성된 권한 정책 연결', actionIds);
		if (actionIds[0]) {
			let actionTemplates = [];
			let order = 0;
			actionIds.forEach((v) => {
				let obj = {};
				obj.templateId = v;
				obj.order = order++;
				actionTemplates.push(obj);
			});
			console.log('joinAction:', actionTemplates);
			return await dispatch(
				IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE.asyncAction.join({
					policyId: policyId,
					actionTemplates: actionTemplates,
				}),
			);
		}
	}

	/*************************************************************************
	 * roberto -  권한(action)정책연결 실행 비동기 함수
	 *************************************************************************/
	async function createJoinAction(policyId, actionTemplates) {
		console.log('🟡권한(action)정책연결 실행 비동기 함수');
		try {
			if (actionTemplates[0]) {
				console.log('🟡createJoinAction-try');
				const actionIds = await createAction();
				console.log(
					'🟡권한(action)정책연결 실행 비동기 함수-actionIds:',
					actionIds,
				);
				const res = await joinAction(policyId, actionIds);
			}
		} catch (err) {
			console.log(err);
		}
	}

	/*************************************************************************
	 * ambacc244, seob - 규칙 생성,정책연결 비동기 함수
	 *************************************************************************/
	const createJoinRule = async (policyId, ruleTemplates) => {
		console.log('🔴규칙 생성,정책연결 비동기 함수');
		let order = 1;
		const templateList = [];
		for (const v in ruleTemplates) {
			// createRuleTemplateAction 액션의 response
			const createRuleTemplateActionResponse = await dispatch(
				IAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.createRuleTemplateAction(
					{
						...ruleTemplates[v],
						attributes: ruleTemplates[v].attributes.map((data) =>
							JSON.stringify(data),
						),
					},
				),
			);
			console.log(
				'🔴규칙 생성api 완료:',
				createRuleTemplateActionResponse,
			);
			// 비동기 처리가 fulfilled 된 경우
			if (isFulfilled(createRuleTemplateActionResponse)) {
				const ruleTemplateId =
					createRuleTemplateActionResponse.payload.id;
				// 정책과 연결할 템플릿 리스트 저장
				templateList.push({
					policyId: policyId,
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
		/**************************************************
		 * seob - 정책 rule 연결
		 ***************************************************/
		if (templateList.length === ruleTemplates.length) {
			const ruleTemplateJoinActionResponse = await dispatch(
				IAM_POLICY_MANAGEMENT_RULE_TEMPLATE.asyncAction.joinAction(
					templateList,
				),
			);
			console.log('🔴규칙 연결api 완료', ruleTemplateJoinActionResponse);
			if (!isFulfilled(ruleTemplateJoinActionResponse)) {
				// 에러 핸들링
				console.log(ruleTemplateJoinActionResponse);
			}
		}
	};

	/*************************************************************************
	 * redux 상태 초기화
	 *************************************************************************/
	async function initRedux() {
		console.log('🟡initRedux');
		//redux action데이터 초기화
		dispatch(IAM_ACTION_MANAGEMENT_TEMPLATE.action.initActionTemplates());
		//정책 생성을 위해 모아둔 template의 데이터를 삭제
		dispatch(IAM_RULE_MANAGEMENT_TEMPLATE.action.resetRuleTemplate());
		//정책 생성 모드 off
		dispatch(
			IAM_POLICY_MANAGEMENT_POLICIES.action.changeCreatingPolicyMode({
				mode: false,
			}),
		);
		return true;
	}

	/*************************************************************************
	 * ambacc244,roberto - 정책 최종 생성
	 *************************************************************************/
	//TODO: step1은 매번 정책을 생성해서 커맨드 아웃했습니다.
	// 작동은 하는 함수고 step2,3가 완료되면 연결 할것이니 삭제 하시면 곤란합니다.
	// 올바른 step 아래에 disatch 작성 해주시면 감사하겠습니다. -ambacc244

	//TODO: 정책생성 이후 규칙,권한 에대한 생성,연결 비동기 처리 보장 하기위해,에러 핸들링하기위해 변경 -roberto
	// 규칙 생성,연결 쪽은 따로 코드를 건드리지 않았습니다 createJoinRule() 안에 기존 로직있습니다 -roberto
	const onSubmitPolicyForm = useCallback(async () => {
		try {
			//step1 정책생성
			const policy = await createPolicy();
			//생성된 정책 id가 있으면 실행
			console.log('createPolicy 실행완료 id:', policy);
			console.log('createPolicy 실행완료 id:', policy.payload);
			console.log('actionTemplates :', actionTemplates);
			console.log('ruleTemplates :', ruleTemplates);
			if (policy.payload) {
				const policyId = policy.payload;
				//step2.3 권한,규칙 생성 후 정책 연결
				//Promise.all : 비동기 병렬처리 파라미터 배열안에 실행할 비동기함수 삽입
				console.log('ruleTemplates:', ruleTemplates);
				await Promise.all([
					createJoinAction(policyId, actionTemplates),
					createJoinRule(policyId, ruleTemplates),
				]);
			}
			await initRedux();
			await alert('정책생성 완료');
		} catch (err) {
			alert('정책생성 오류');
			console.log(err);
		}
	}, [
		initRedux,
		createPolicy,
		createJoinAction,
		actionTemplates,
		createJoinRule,
		ruleTemplates,
	]);

	/**********************************************************
	 * ambacc244 ,roberto- 렌더링시 정책생성 Preview 데이터 갱신
	 **********************************************************/
	useEffect(() => {
		//TODO:정책 생성을 눌렀을시 렌더링 실행되도록
		let previewAllData = [];
		//IAM - 규칙 템플릿 데이터 처리
		console.log(ruleTemplates);

		Object.values(ruleTemplates).map((v) => {
			for (let i = 0; i < v.attributes.length; i++) {
				let object = new Object();
				if (i === 0) object.policy = v.name;
				object.id = v.attributes[i].ruleType;
				object.detail = policyDescription[v.attributes[i].ruleType];
				object.value = roleAttributeConvertor(v.attributes[i]);
				previewAllData.push(object);
			}
		});
		console.log(actionTemplates);
		//IAM - 권한(action) 템플릿 데이터 처리
		//TODO 함수로 모듈화할 예정입니다

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
		//PAM - 규칙 템플릿 데이터 처리

		//PAM - 권한(action) 템플릿 데이터 처리

		setPreviewData(previewAllData);
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
