import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {policyTypes} from '../../../../../../utils/data';
import {templateType} from '../../../../../../utils/template';
import UserAuth from '../IAM/UserAuth/UserAuth';
import UserAccountProcess from '../IAM/UserAccountProcess/UserAccountProcess';
import UserAccess from '../IAM/UserAccess';
import UserSession from '../IAM/UserSession';
import UserManagement from '../IAM/UserManagement';
import PolicyManagement from '../IAM/PolicyManagement';
import RoleManagement from '../IAM/RoleManagement';
import ConnectResource from '../PAM/ConnectResource/ConnectResource';
import MFA from '../PAM/MFA';
import ResourceAccessRule from '../PAM/ResourceAccessRule/ResourceAccessRule';
import ConnectReason from '../PAM/ConnectReason/ConnectReason';
import CommandControl from '../PAM/CommandControl';
import FileAccess from '../PAM/FileAccess';
import ResourceManagement from '../PAM/ResourceManagement';
import ResourceCollectManagement from '../PAM/ResourceCollectManagement';
import ResourceAccess from '../PAM/ResourceAccess/ResourceAccess';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/IAM/Policy/IAM/RuleManagement/ruleTemplate';
import IAM_ACTION_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/IAM/Policy/IAM/ActionManagement/actionTemplate';
import styled from 'styled-components';
import {dummyPamRule} from '../../../../../../utils/dummyData';
import PAM_ACTION_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/PAM/TemplateManagement/ActionManagement/actionTemplate';
import {categoryTypes} from '../../../../../../utils/policy/policy';
import PAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/PAM/TemplateManagement/RuleTemplate/ruleTemplate';

const _Title = styled.div``;

const _TemplateListContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const contents = {
	'iam*': {
		title: 'IAM 템플릿 선택',
	},
	'pam*': {
		title: 'PAM 템플릿 선택',
	},
};

const templateComponents = {
	//iam - rule
	[categoryTypes.auth]: UserAuth,
	[categoryTypes.account]: UserAccountProcess,
	[categoryTypes.userAccess]: UserAccess,
	[categoryTypes.session]: UserSession,
	[categoryTypes.pattern]: UserSession,
	//pam - rule
	[categoryTypes.categoryType1]: ConnectResource,
	[categoryTypes.categoryType2]: MFA,
	[categoryTypes.categoryType3]: ResourceAccessRule,
	[categoryTypes.categoryType4]: ConnectReason,
	[categoryTypes.categoryType5]: CommandControl,
	[categoryTypes.categoryType6]: FileAccess,
	//iam - action
	[categoryTypes.user]: UserManagement,
	[categoryTypes.policy]: PolicyManagement,
	[categoryTypes.role]: RoleManagement,
	//pam - action
	[categoryTypes.resource]: ResourceManagement,
	[categoryTypes.collect]: ResourceCollectManagement,
	[categoryTypes.access]: ResourceAccess,
};

/**************************************************
 * seob - 정책 템플릿 리스트 컴포넌트
 *
 * setTemplateList: 템플릿 리스트 set 함수
 * setIsOpened: 추가할 템플릿 리스트 사이드의 setOpen
 * policyType : 템플릿 타입
 ***************************************************/
const TemplateListAside = ({
	setTemplateList,
	templateList,
	setIsOpened,
	policyType,
}) => {
	const dispatch = useDispatch();
	// 각 템플릿별 설명
	const [templateDescription, setTemplateDescription] = useState('');
	// IAM 규칙 템플릿 리스트
	const [ruleTemplates, setRuleTemplates] = useState([]);
	// IAM 액션 템플릿 리스트
	const [actionTemplates, setActionTemplates] = useState([]);
	// 로딩처리 state
	const [loading, setLoading] = useState(true);

	const switchComponent = useCallback((template, type) => {
		const componentProps = {
			templateId: template.id,
			name: template.name,
			description: template.description,
		};
		//템플릿이 액션 템플릿의 경우 categoryType 추가
		if (type === templateType.ACTION) {
			componentProps.categoryType = template.categoryType.code;
		}

		return React.createElement(
			templateComponents[template.categoryType.code],
			componentProps,
		);
	}, []);

	/**************************************************
	 * seob - 템플릿 추가 후 닫는 함수
	 *
	 * template: 액션, 규칙 템플릿 findAll 조회시 각각의 템플릿 데이터
	 * type : 액션 템플릿, 규칙 템플릿 구분 타입
	 ***************************************************/
	const addTemplate = useCallback(
		(template, type) => () => {
			//추가한 템플릿의 수가 이미 MAX
			if (templateList.length === 5) {
				alert('추가 가능한 최대 템플릿 수는 5개 입니다.');
				return;
			}

			setTemplateList((prev) => {
				// 기존 리스트에 추가하려는 템플릿이 존재하지 않으면 추가
				if (
					!prev
						.map((v) => v.template.categoryType.code)
						.includes(template.categoryType.code)
				) {
					return [
						...prev,
						{
							template: template,
							component: switchComponent(template, type),
						},
					];
					// 기존 리스트에 추가하려는 템플릿이 존재하면 그대로
				} else return prev;
			});

			setIsOpened(false);
		},
		[setIsOpened, setTemplateList, switchComponent, templateList.length],
	);

	const onMouseEnterChangeDescription = useCallback(
		(description) => () => {
			setTemplateDescription(description);
		},
		[],
	);

	/**************************************************
	 * seob - IAM 규칙 템플릿, 액션 템플릿 findAll api
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			try {
				// 규칙 템플릿 findAll
				const ruleTemplates = await dispatch(
					IAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.findAll({
						range: `elements=0-50`,
					}),
				).unwrap();
				setRuleTemplates(ruleTemplates.data);

				// 액션 템플릿 findAll
				const actionTemplates = await dispatch(
					IAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.findAllAction({
						range: `elements=0-50`,
					}),
				).unwrap();
				setActionTemplates(actionTemplates.data);
			} catch (err) {
				console.error(err);
			}
		};

		policyType === policyTypes.iam && fetchData();
	}, [dispatch, policyType]);

	/**************************************************
	 * seob - PAM 규칙 템플릿, 액션 템플릿 findAll api
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			try {
				// 규칙 템플릿 findAll
				const ruleTemplates = await dispatch(
					PAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.findAllRules({
						range: `elements=0-50`,
					}),
				).unwrap();
				console.log('ruleTemplates:', ruleTemplates);
				// setRuleTemplates(ruleTemplates.data);
				setRuleTemplates(dummyPamRule);

				// 액션 템플릿 findAll
				const actionTemplates = await dispatch(
					PAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.findAllAction({
						range: `elements=0-50`,
					}),
				).unwrap();
				setActionTemplates(actionTemplates.data);
			} catch (err) {
				console.error(err);
			}
		};

		policyType === policyTypes.pam && fetchData();
	}, [dispatch, policyType]);

	useEffect(() => {
		// 첫 로드시 각각의  템플릿 데이터를 가져오면 로딩 false
		if (ruleTemplates.length && actionTemplates.length) {
			setLoading(false);
		}
	}, [ruleTemplates, actionTemplates]);

	return (
		<_TemplateListContainer>
			<_Title>{contents[policyType].title}</_Title>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div>
					<ul>
						{ruleTemplates.map((template) => (
							<li
								key={template.id}
								onClick={addTemplate(
									template,
									templateType.RULE,
								)}
								onMouseEnter={onMouseEnterChangeDescription(
									template.description,
								)}
							>
								<button>{template.name}</button>
							</li>
						))}
					</ul>

					<ul>
						{actionTemplates.map((template) => (
							<li
								key={template.id}
								onClick={addTemplate(
									template,
									templateType.ACTION,
								)}
								onMouseEnter={onMouseEnterChangeDescription(
									template.description,
								)}
							>
								<button>{template.name}</button>
							</li>
						))}
					</ul>
					<div>{templateDescription}</div>
				</div>
			)}
		</_TemplateListContainer>
	);
};

TemplateListAside.propTypes = {
	setTemplateList: PropTypes.func,
	setIsOpened: PropTypes.func,
	policyType: PropTypes.string,
	templateList: PropTypes.array,
};

export default TemplateListAside;
