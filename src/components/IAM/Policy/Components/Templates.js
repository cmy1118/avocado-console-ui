import React, {useCallback, useEffect, useState} from 'react';
import TemplateContainer from './TemplateContainer';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import IAM_POLICY_TEMPLATE from '../../../../reducers/api/IAM/Policy/ActionManagement/template';
import IAM_RULE_TEMPLATE from '../../../../reducers/api/IAM/Rule/template';
import {POLICY_TYPE, templateType} from '../../../../utils/template';
import UserAccountProcessTemplate from './Templates/IAM/UserAccountProcessTemplate';
import UserAuthTemplate from './Templates/IAM/UserAuthTemplate';
import UserAccessTemplate from './Templates/IAM/UserAccessTemplate';
import UserSessionTemplate from './Templates/IAM/UserSessionTemplate';
import UserAccountPatternTemplate from './Templates/IAM/UserAccountPatternTemplate';
import UserManagement from './Templates/IAM/UserManagement';
import PolicyManagement from './Templates/IAM/PolicyManagement';
import RoleManagement from './Templates/IAM/RoleManagement';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const Title = styled.div``;

const TemplateListContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	iam: {
		title: 'IAM 템플릿 선택',
	},
	pam: {
		title: 'PAM 템플릿 선택',
	},
};

/**************************************************
 * seob - 정책 템플릿 리스트 컴포넌트
 *
 * setTemplateList: 템플릿 리스트 set 함수
 * setIsOpened: 추가할 템플릿 리스트 사이드의 setOpen
 ***************************************************/
const TemplateList = ({setTemplateList, setIsOpened, policyType}) => {
	// 각 템플릿별 설명
	const [templateDescription, setTemplateDescription] = useState('');
	// IAM 규칙 템플릿 리스트
	const [iamRuleTemplates, setIamRuleTemplates] = useState([]);
	// IAM 액션 템플릿 리스트
	const [iamActionTemplates, setIamActionTemplates] = useState([]);
	// PAM 규칙 템플릿 리스트
	const [pamRuleTemplates, setPamRuleTemplates] = useState([]);
	// PAM 액션 템플릿 리스트
	const [pamActionTemplates, setPamActionTemplates] = useState([]);

	// 로딩처리 state
	const [iamLoading, setIamLoading] = useState(true);
	const [pamLoading, setPamLoading] = useState(true);

	const dispatch = useDispatch();

	/**************************************************
	 * seob - 템플릿 추가 후 닫는 함수
	 *
	 * template: 액션, 규칙 템플릿 findAll 조회시 각각의 템플릿 데이터
	 * type : 액션 템플릿, 규칙 템플릿 구분 타입
	 ***************************************************/
	const addTemplate = useCallback(
		({template, type}) => {
			console.log(template);
			let currentTemplate = null;
			// 규칙 템플릿인경우
			if (policyType === POLICY_TYPE.IAM) {
				if (type === templateType.RULE) {
					// memo : 현재 템플릿을 구분하는 카테고리 값이 없으므로 id값을 기준으로 분류했습니다. (수정예정)
					switch (template.id) {
						case 'KR-2020-0001:202202:0002': {
							currentTemplate = {
								template,
								render: () =>
									UserAuthTemplate({
										templateId: template.id,
										name: template.name,
										description: template.description,
									}),
							};
							break;
						}
						case 'KR-2020-0001:202202:0003': {
							currentTemplate = {
								template,
								render: () =>
									UserAccountProcessTemplate({
										templateId: template.id,
										name: template.name,
										description: template.description,
									}),
							};
							break;
						}
						case 'KR-2020-0001:202202:0004': {
							currentTemplate = {
								template,
								render: () =>
									UserAccessTemplate({
										templateId: template.id,
										name: template.name,
										description: template.description,
									}),
							};

							break;
						}
						case 'KR-2020-0001:202202:0005': {
							currentTemplate = {
								template,
								render: () =>
									UserSessionTemplate({
										templateId: template.id,
										name: template.name,
										description: template.description,
									}),
							};
							break;
						}
						case 'KR-2020-0001:202202:0006': {
							currentTemplate = {
								template,
								render: () =>
									UserAccountPatternTemplate({
										templateId: template.id,
										name: template.name,
										description: template.description,
									}),
							};
							break;
						}
					}
				}
				// 액션 템플릿인경우
				// todo : 건욱님 액션 템플릿 컴포넌트 추가되면 id값 전달예정
				else if (type === templateType.ACTION) {
					switch (template.id) {
						case 'KR-2020-0001:202202:0001': {
							currentTemplate = {
								template,
								render: () =>
									UserManagement({
										templateId: template.id,
										name: template.name,
										description: template.description,
									}),
							};
							break;
						}
						case 'KR-2020-0001:202202:0002': {
							currentTemplate = {
								template,
								render: () =>
									PolicyManagement({
										templateId: template.id,
										name: template.name,
										description: template.description,
									}),
							};
							break;
						}
						case 'KR-2020-0001:202202:0003': {
							currentTemplate = {
								template,
								render: () =>
									RoleManagement({
										templateId: template.id,
										name: template.name,
										description: template.description,
									}),
							};
							break;
						}
					}
				}
			} else if (policyType === POLICY_TYPE.PAM) {
				///
			}

			// 현재 템플릿에 컴포넌트가 빈 값 인경우 return
			if (!currentTemplate) return;
			setTemplateList((prev) => {
				if (
					!prev
						.map((pre) => pre.template.id)
						.includes(currentTemplate.template.id)
				)
					// 기존 리스트에 추가하려는 템플릿이 존재하지 않으면 추가
					return [...prev, currentTemplate];
				// 기존 리스트에 추가하려는 템플릿이 존재하면 그대로
				else return prev;
			});
			setIsOpened(false);
		},
		[policyType, setIsOpened, setTemplateList],
	);

	/**************************************************
	 * seob - IAM 규칙 템플릿, 액션 템플릿 findAll api
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			try {
				// 규칙 템플릿
				dispatch(
					IAM_RULE_TEMPLATE.asyncAction.findAllRuleTemplateAction({
						range: `elements=0-50`,
					}),
				)
					.unwrap()
					.then((res) => setIamRuleTemplates(res.data));

				// 액션 템플릿 findAll
				dispatch(
					IAM_POLICY_TEMPLATE.asyncAction.findAllAction({
						range: `elements=0-50`,
					}),
				)
					.unwrap()
					.then((res) => setIamActionTemplates(res.data));
			} catch (e) {
				console.log(e);
			}
		};

		policyType === POLICY_TYPE.IAM && fetchData();
	}, [dispatch, policyType]);

	/**************************************************
	 * seob - PAM 규칙 템플릿, 액션 템플릿 findAll api -
	 ***************************************************/
	// todo : 작성예정
	// *************************************************

	useEffect(() => {
		// 첫 로드시 각각의 IAM 템플릿 데이터를 가져오면 로딩 false
		if (iamRuleTemplates.length && iamActionTemplates.length) {
			setIamLoading(false);
		}
	}, [iamActionTemplates, iamRuleTemplates]);

	useEffect(() => {
		// 첫 로드시 각각의 PAM 템플릿 데이터를 가져오면 로딩 false
		if (pamRuleTemplates.length && pamActionTemplates.length) {
			setPamLoading(false);
		}
	}, [pamActionTemplates, pamRuleTemplates]);

	return (
		<TemplateListContainer>
			<Title>{contents[policyType].title}</Title>
			{(policyType === POLICY_TYPE.IAM && iamLoading) ||
			(policyType === POLICY_TYPE.PAM && pamLoading) ? (
				<div>Loading...</div>
			) : policyType === POLICY_TYPE.IAM ? (
				<>
					<ul>
						{iamRuleTemplates.map((template) => (
							<li
								key={template.id}
								onClick={() =>
									addTemplate({
										template,
										type: templateType.RULE,
									})
								}
								onMouseEnter={() =>
									setTemplateDescription(template.description)
								}
							>
								<button>{template.name}</button>
							</li>
						))}
					</ul>
					<ul>
						{iamActionTemplates.map((template) => (
							<li
								key={template.id}
								onClick={() =>
									addTemplate({
										template,
										type: templateType.ACTION,
									})
								}
								onMouseEnter={() =>
									setTemplateDescription(template.description)
								}
							>
								<button>{template.name}</button>
							</li>
						))}
					</ul>
					<div>{templateDescription}</div>
				</>
			) : (
				<>
					<ul>
						{pamRuleTemplates.map((template) => (
							<li
								key={template.id}
								onClick={() =>
									addTemplate({
										template,
										type: templateType.RULE,
									})
								}
								onMouseEnter={() =>
									setTemplateDescription(template.description)
								}
							>
								<button>{template.name}</button>
							</li>
						))}
					</ul>
					<ul>
						{pamActionTemplates.map((template) => (
							<li
								key={template.id}
								onClick={() =>
									addTemplate({
										template,
										type: templateType.ACTION,
									})
								}
								onMouseEnter={() =>
									setTemplateDescription(template.description)
								}
							>
								<button>{template.name}</button>
							</li>
						))}
					</ul>
					<div>{templateDescription}</div>
				</>
			)}
		</TemplateListContainer>
	);
};

TemplateList.propTypes = {
	setTemplateList: PropTypes.func,
	setIsOpened: PropTypes.func,
	policyType: PropTypes.string,
};

/**************************************************
 * seob - 정책 작성 페이지의 템플릿 리스트
 *
 * isOpened: 추가할 템플릿 리스트 사이드의 open 상태
 * setIsOpened: 추가할 템플릿 리스트 사이드의 setOpen
 * policyType: iam, pam 유형 중 현재 정책유형
 ***************************************************/
const Templates = ({isOpened, setIsOpened, policyType}) => {
	// 정책 작성 페이지에 추가된 템플릿 리스트
	const [templateList, setTemplateList] = useState([]);

	return (
		<>
			<Container>
				{templateList.map((v) => (
					<TemplateContainer
						key={v.template.id}
						render={v.render}
						setTemplateList={setTemplateList}
						template={v.template}
					/>
				))}
			</Container>
			{isOpened && (
				<TemplateList
					setTemplateList={setTemplateList}
					setIsOpened={setIsOpened}
					policyType={policyType}
				/>
			)}
		</>
	);
};

Templates.propTypes = {
	isOpened: PropTypes.bool,
	setIsOpened: PropTypes.func,
	policyType: PropTypes.string,
};

export default Templates;
