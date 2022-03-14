import React, {useCallback, useEffect, useState} from 'react';
import TemplateContainer from './TemplateContainer';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import IAM_ACTION_MANAGEMENT_TEMPLATE from '../../../../reducers/api/IAM/Policy/ActionManagement/template';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../../reducers/api/IAM/Policy/RuleManagement/template';
import {templateType} from '../../../../utils/template';
import UserAccountProcessTemplate from './Templates/IAM/UserAccountProcessTemplate';
import UserAuthTemplate from './Templates/IAM/UserAuthTemplate';
import UserAccessTemplate from './Templates/IAM/UserAccessTemplate';
import UserSessionTemplate from './Templates/IAM/UserSessionTemplate';
import UserAccountPatternTemplate from './Templates/IAM/UserAccountPatternTemplate';
import UserManagement from './Templates/IAM/UserManagement';
import PolicyManagement from './Templates/IAM/PolicyManagement';
import RoleManagement from './Templates/IAM/RoleManagement';
import AccessSession from './Templates/PAM/AccessSession';
import {policyTypes} from '../../../../utils/data';

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
	'iam*': {
		title: 'IAM 템플릿 선택',
	},
	'pam*': {
		title: 'PAM 템플릿 선택',
	},
};

/**************************************************
 * seob - 정책 템플릿 리스트 컴포넌트
 *
 * setTemplateList: 템플릿 리스트 set 함수
 * setIsOpened: 추가할 템플릿 리스트 사이드의 setOpen
 * policyType : 템플릿 타입
 ***************************************************/
const IamTemplateList = ({setTemplateList, setIsOpened, policyType}) => {
	// 각 템플릿별 설명
	const [templateDescription, setTemplateDescription] = useState('');
	// IAM 규칙 템플릿 리스트
	const [ruleTemplates, setRuleTemplates] = useState([]);
	// IAM 액션 템플릿 리스트
	const [actionTemplates, setActionTemplates] = useState([]);
	// 로딩처리 state
	const [loading, setLoading] = useState(true);
	// const [pamLoading, setPamLoading] = useState(false);

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
		[setIsOpened, setTemplateList],
	);

	/**************************************************
	 * seob - IAM 규칙 템플릿, 액션 템플릿 findAll api
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			try {
				// 규칙 템플릿
				dispatch(
					IAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.findAllRuleTemplateAction(
						{
							range: `elements=0-50`,
						},
					),
				)
					.unwrap()
					.then((res) => setRuleTemplates(res.data));

				// 액션 템플릿 findAll
				dispatch(
					IAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.findAllAction({
						range: `elements=0-50`,
					}),
				)
					.unwrap()
					.then((res) => setActionTemplates(res.data));
			} catch (e) {
				console.log(e);
			}
		};

		policyType === policyTypes.iam && fetchData();
	}, [dispatch, policyType]);

	useEffect(() => {
		// 첫 로드시 각각의 IAM 템플릿 데이터를 가져오면 로딩 false
		if (ruleTemplates.length && actionTemplates.length) {
			setLoading(false);
		}
	}, [actionTemplates, ruleTemplates]);

	return (
		<TemplateListContainer>
			<Title>{contents[policyType].title}</Title>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div>
					<ul>
						{ruleTemplates.map((template) => (
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
						{actionTemplates.map((template) => (
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
				</div>
			)}
		</TemplateListContainer>
	);
};

IamTemplateList.propTypes = {
	setTemplateList: PropTypes.func,
	setIsOpened: PropTypes.func,
	policyType: PropTypes.string,
};

/**************************************************
 * seob - 정책 템플릿 리스트 컴포넌트
 *
 * setTemplateList: 템플릿 리스트 set 함수
 * setIsOpened: 추가할 템플릿 리스트 사이드의 setOpen
 * policyType : 템플릿 타입
 ***************************************************/
const PamTemplateList = ({setTemplateList, setIsOpened, policyType}) => {
	// 각 템플릿별 설명
	const [templateDescription, setTemplateDescription] = useState('');
	// PAM 규칙 템플릿 리스트
	const [ruleTemlpates, setRuleTemplates] = useState([]);
	// PAM 액션 템플릿 리스트
	const [actionTemplates, setActionTemplates] = useState([]);

	// 로딩처리 state
	const [loading, setLoading] = useState(true);
	// const [pamLoading, setPamLoading] = useState(false);

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
			if (type === templateType.RULE) {
				// memo : 현재 템플릿을 구분하는 카테고리 값이 없으므로 id값을 기준으로 분류했습니다. (수정예정)
				switch (template.id) {
					case 'KR-2020-0001:202202:1000': {
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
				}
			}

			// 액션 템플릿인경우
			// todo : 건욱님 액션 템플릿 컴포넌트 추가되면 id값 전달예정
			else if (type === templateType.ACTION) {
				switch (template.id) {
					case 'KR-2020-0001:202202:1000': {
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
				}
			}
			// 	// todo : 서버 pam api 완료시 작성 예정
			currentTemplate = {
				template,
				render: template.component,
			};

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
		[setIsOpened, setTemplateList],
	);

	/**************************************************
	 * seob - PAM 규칙 템플릿, 액션 템플릿 findAll api -
	 ***************************************************/
	// todo : 작성예정
	useEffect(() => {
		// const fetchData = async () => {
		// 	try {
		// 		// 규칙 템플릿
		// 		dispatch(
		// 			PAM_RULE_TEMPLATE.asyncAction.findAllRuleTemplateAction({
		// 				range: `elements=0-50`,
		// 			}),
		// 		)
		// 			.unwrap()
		// 			.then((res) => setRuleTemplates(res.data));
		//
		// 		// 액션 템플릿 findAll
		// 		dispatch(
		// 			PAM_POLICY_TEMPLATE.asyncAction.findAllAction({
		// 				range: `elements=0-50`,
		// 			}),
		// 		)
		// 			.unwrap()
		// 			.then((res) => setActionTemplates(res.data));
		// 	} catch (e) {
		// 		console.log(e);
		// 	}
		// };

		// policyType === POLICY_TYPE.PAM && fetchData();

		// memo : 임시 템플릿 생성
		// id값은 중복되지 않도록 이전 id +1 해서 작성해주세요
		setRuleTemplates([
			{
				id: 1,
				name: '접속 세션 정책',
				description: '접속 세션 정책 입니다.',
				component: AccessSession,
			},
		]);
		setActionTemplates([]);
	}, [dispatch]);

	// *************************************************

	useEffect(() => {
		// 첫 로드시 각각의 PAM 템플릿 데이터를 가져오면 로딩 false
		setLoading(false);
		if (ruleTemlpates.length && actionTemplates.length) {
			// todo : pam api 연결시 처리
		}
	}, [actionTemplates, ruleTemlpates]);

	return (
		<TemplateListContainer>
			<Title>{contents[policyType].title}</Title>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div>
					<ul>
						{ruleTemlpates.map((template) => (
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
						{actionTemplates.map((template) => (
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
				</div>
			)}
		</TemplateListContainer>
	);
};

PamTemplateList.propTypes = {
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
	// const [templateList, setTemplateList] = useState([]);
	const [iamTemplateList, setIamTemplateList] = useState([]);
	const [pamTemplateList, setPamTemplateList] = useState([]);

	/**************************************************
	 * seob - 정책 타입이 변경되는 경우 리스트 초기화
	 ***************************************************/
	useEffect(() => {
		policyType === policyTypes.iam && setPamTemplateList([]);
		policyType === policyTypes.pam && setIamTemplateList([]);
	}, [policyType]);

	return (
		<>
			<Container>
				{policyType === policyTypes.iam &&
					iamTemplateList.map((v) => (
						<TemplateContainer
							key={v.template.id}
							render={v.render}
							setTemplateList={setIamTemplateList}
							template={v.template}
						/>
					))}
				{policyType === policyTypes.pam &&
					pamTemplateList.map((v) => (
						<TemplateContainer
							key={v.template.id}
							render={v.render}
							setTemplateList={setPamTemplateList}
							template={v.template}
						/>
					))}
			</Container>
			{policyType === policyTypes.iam
				? isOpened && (
						<IamTemplateList
							setTemplateList={setIamTemplateList}
							setIsOpened={setIsOpened}
							policyType={policyType}
						/>
				  )
				: isOpened && (
						<PamTemplateList
							setTemplateList={setPamTemplateList}
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
