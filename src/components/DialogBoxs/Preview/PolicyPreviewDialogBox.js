import React, {useCallback, useEffect, useState} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {TitleBar} from '../../../styles/components/iam/iam';
import {controlTypes, policyManageTypes} from '../../../utils/data';

import {SummaryList} from '../../../styles/components/iam/descriptionPage';
import {LiText} from '../../../styles/components/text';
import {CreatePageDialogBoxTitle} from '../../../styles/components/iam/addPage';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';

import IAM_POLICY_MANAGEMENT_POLICIES from '../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policies';
import IAM_POLICY_MANAGEMENT_RULE_TEMPLATE from '../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policyRuleTemplate';
import IAM_ACTION_MANAGEMENT_TEMPLATE from '../../../reducers/api/IAM/Policy/IAM/ActionManagement/actionTemplate';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../reducers/api/IAM/Policy/IAM/RuleManagement/ruleTemplate';
import POLICY_MANAGEMENT_ACTION_TEMPLATE from '../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policyActionTemplate';
import PAM_ACTION_MANAGEMENT_TEMPLATE from '../../../reducers/api/PAM/TemplateManagement/ActionManagement/actionTemplate';
import {
	iamPolicyRuleDetailsPreviewConverter,
	pamPolicyRuleDetailsPreviewConverter,
} from '../../../utils/policy/rule';
import PAM_RULE_MANAGEMENT_TEMPLATE from '../../../reducers/api/PAM/TemplateManagement/RuleTemplate/ruleTemplate';

const policyPreviewDialogBox = {
	IAM: 'iam*',
	PAM: 'pam*',
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
	const {pamRuleTemplates} = useSelector(
		PAM_RULE_MANAGEMENT_TEMPLATE.selector,
	);

	//생성할 권한 템플릿
	const {actionTemplates} = useSelector(
		IAM_ACTION_MANAGEMENT_TEMPLATE.selector,
	);
	const {pamActionTemplates} = useSelector(
		PAM_ACTION_MANAGEMENT_TEMPLATE.selector,
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
			IAM_POLICY_MANAGEMENT_POLICIES.asyncAction.createPolicy({
				name: formData.name,
				description: formData.description,
				type: policyManageTypes.Client,
				controlTypes: [controlTypes.RBAC],
				maxGrants: 5,
			}),
		);
	}
	/*****************************************************************************************************************************
	 * [IAM]
	 *****************************************************************************************************************************/

	/*************************************************************************
	 * roberto -[IAM] : 권한(action) 생성
	 *************************************************************************/
	async function createAction() {
		try {
			let actionIds = [];
			for (const v of actionTemplates) {
				await dispatch(
					IAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.createAction({
						name: v.name,
						description: v.description,
						details: v.details,
						categoryType: v.categoryType,
					}),
				).then((res) => {
					console.log('권한생성:', res);
					actionIds.push(
						res.payload.headers.location.split('/').reverse()[0],
					);
				});
			}
			return actionIds;
		} catch (err) {
			alert('권한 생성 에러');
			console.log(err);
		}
	}
	/*************************************************************************
	 * roberto -[IAM] : 생성된 권한 정책 연결
	 *************************************************************************/
	async function joinAction(policyId, actionIds) {
		try {
			if (actionIds[0]) {
				let tempActionTemplates = [];
				let order = 0;
				actionIds.forEach((v) => {
					let obj = {};
					obj.templateId = v;
					obj.order = order++;
					tempActionTemplates.push(obj);
				});
				await dispatch(
					POLICY_MANAGEMENT_ACTION_TEMPLATE.asyncAction.join({
						policyId: policyId,
						actionTemplates: tempActionTemplates,
					}),
				).unwrap();
			}
		} catch (err) {
			alert('권한 정책 연결 에러');
			console.log(err);
		}
	}
	/*************************************************************************
	 * roberto - [IAM] : 권한(action)정책연결 실행 비동기 함수
	 *************************************************************************/
	async function createJoinIamAction(policyId, actionTemplates) {
		try {
			if (actionTemplates[0]) {
				const actionIds = await createAction();
				const res = await joinAction(policyId, actionIds);
				return res;
			}
		} catch (err) {
			console.log(err);
		}
	}
	/*************************************************************************
	 * ambacc244, seob - [IAM] : 규칙 생성, 정책연결 비동기 함수
	 *************************************************************************/
	const createJoinRule = async (policyId, ruleTemplates) => {
		console.log('🔴규칙 생성,정책연결 비동기 함수');
		try {
			if (ruleTemplates[0]) {
				const joinList = await Promise.all(
					ruleTemplates.map(async (v, i) => {
						const res = await dispatch(
							IAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.createRule(
								{
									...v,
									details: v.details.map((d) => ({
										resource: d.resource,
										attribute: JSON.stringify(d.attribute),
									})),
								},
							),
						).unwrap();

						return {
							templateId: res.headers.location.split('/').pop(),
							order: i,
						};
					}),
				);

				console.log(joinList);
				await dispatch(
					IAM_POLICY_MANAGEMENT_RULE_TEMPLATE.asyncAction.join({
						policyId: policyId,
						templateList: joinList,
					}),
				).unwrap();
			}
		} catch (err) {
			console.error(err);
		}
	};
	/*****************************************************************************************************************************/

	/*****************************************************************************************************************************
	 * [PAM]
	 *****************************************************************************************************************************/

	/*************************************************************************
	 * roberto -[PAM] : 권한(action) 생성
	 *************************************************************************/
	async function createPamAction(actionTemplates) {
		try {
			let actionIds = [];
			for (const v of actionTemplates) {
				await dispatch(
					PAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.createAction({
						name: v.name,
						description: v.description,
						details: v.details,
						categoryType: v.categoryType,
					}),
				).then((res) => {
					console.log('생성시 :', res);
					actionIds.push(
						res.payload.headers.location.split('/').reverse()[0],
					);
				});
			}
			return actionIds;
		} catch (err) {
			alert('권한 생성 오류');
			console.log(err);
		}
	}
	/*************************************************************************
	 * roberto -[PAM] : 생성된 권한 정책 연결
	 *************************************************************************/
	async function joinPamAction(policyId, actionIds) {
		try {
			if (actionIds[0]) {
				let tempActionTemplates = [];
				let order = 0;
				actionIds.forEach((v) => {
					let obj = {};
					obj.templateId = v;
					obj.order = order++;
					tempActionTemplates.push(obj);
				});
				await dispatch(
					POLICY_MANAGEMENT_ACTION_TEMPLATE.asyncAction.join({
						policyId: policyId,
						actionTemplates: tempActionTemplates,
					}),
				).unwrap();
			}
		} catch (err) {
			alert('정책연결 실패');
			console.log(err);
		}
	}

	/*************************************************************************
	 * roberto -[PAM] :  권한(action)정책연결 실행 비동기 함수
	 *************************************************************************/
	async function createJoinPamAction(policyId, actionTemplates) {
		try {
			if (actionTemplates[0]) {
				//action 생성
				const actionIds = await createPamAction(actionTemplates);
				//생성된 action id값들 정책 연결
				console.log('actionIds:', actionIds);
				const res = await joinPamAction(policyId, actionIds);
				console.log('res:', res);
			}
		} catch (err) {
			alert('권한생성 및 정책연결 실패');
			console.log(err);
		}
	}

	/*************************************************************************
	 * redux 상태 초기화
	 *************************************************************************/
	async function initRedux() {
		//IAM redux action데이터 초기화
		dispatch(IAM_ACTION_MANAGEMENT_TEMPLATE.action.initActionTemplates());
		//IAM redux action데이터 초기화
		dispatch(PAM_ACTION_MANAGEMENT_TEMPLATE.action.initActionTemplates());
		//IAM 정책 생성을 위해 모아둔 template의 rule 데이터를 삭제
		dispatch(IAM_RULE_MANAGEMENT_TEMPLATE.action.resetRuleTemplate());
		//PAM 정책 생성을 위해 모아둔 template의 rule 데이터를 삭제
		dispatch(PAM_RULE_MANAGEMENT_TEMPLATE.action.resetRuleTemplate());
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
			if (policy.payload) {
				const policyId = policy.payload;

				//정책정보 IAM 일때
				if (formData.type === policyPreviewDialogBox.IAM) {
					console.log('iam 일때');
					//step2.3 권한,규칙 생성 후 정책 연결
					//Promise.all : 비동기 병렬처리 파라미터 배열안에 실행할 비동기함수 삽입
					await Promise.all([
						await createJoinIamAction(policyId, actionTemplates),
						await createJoinRule(policyId, ruleTemplates),
					]);
				}
				//정책정보 PAM 일때
				if (formData.type === policyPreviewDialogBox.PAM) {
					console.log('pam 일때');
					await Promise.all([
						await createJoinPamAction(policyId, pamActionTemplates),
					]);
				}
			}
			await initRedux();
			await alert('정책생성 완료');
		} catch (err) {
			alert('정책생성 실패');
			console.log(err);
		}
	}, [
		createPolicy,
		actionTemplates,
		pamActionTemplates,
		ruleTemplates,
		initRedux,
		formData.type,
		createJoinIamAction,
		createJoinRule,
		createJoinPamAction,
	]);
	/**********************************************************
	 * ambacc244 ,roberto- 렌더링시 정책생성 Preview 데이터 갱신
	 **********************************************************/
	useEffect(() => {
		//TODO:정책 생성을 눌렀을시 렌더링 실행되도록
		let previewAllData = [];
		if (formData.type === policyPreviewDialogBox.IAM) {
			//IAM - 규칙 템플릿 데이터 처리
			previewAllData = [
				...previewAllData,
				...iamPolicyRuleDetailsPreviewConverter(ruleTemplates),
			];

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
		} else if (formData.type === policyPreviewDialogBox.PAM) {
			//PAM - 규칙 템플릿 데이터 처리
			previewAllData = [
				...previewAllData,
				...pamPolicyRuleDetailsPreviewConverter(pamRuleTemplates),
			];
		}
		setPreviewData(previewAllData);
	}, [ruleTemplates, actionTemplates, pamRuleTemplates, formData.type]);

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

				<CreatePageDialogBoxTitle>
					{policyPreviewDialogBox.detail.title} :{' '}
				</CreatePageDialogBoxTitle>

				<Table
					readOnly
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
