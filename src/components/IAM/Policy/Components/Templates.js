import React, {useCallback, useEffect, useState} from 'react';
import TemplateContainer from './TemplateContainer';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import IAM_ACTION_MANAGEMENT_TEMPLATE from '../../../../reducers/api/IAM/Policy/ActionManagement/actionTemplate';
import {templateType} from '../../../../utils/template';
import UserAccountProcessTemplate from './Templates/IAM/UserAccountProcessTemplate';
import UserAuthTemplate from './Templates/IAM/UserAuthTemplate';
import UserAccessTemplate from './Templates/IAM/UserAccessTemplate';
import UserSessionTemplate from './Templates/IAM/UserSessionTemplate';
import UserAccountPatternTemplate from './Templates/IAM/UserAccountPatternTemplate';
import UserManagement from './Templates/IAM/UserManagement';
import PolicyManagement from './Templates/IAM/PolicyManagement';
import RoleManagement from './Templates/IAM/RoleManagement';
import CommandControl from './Templates/PAM/CommandControl';
import {policyTypes} from '../../../../utils/data';
import ConnectResource from './Templates/PAM/ConnectResource';
import ConnectReason from './Templates/PAM/ConnectReason';
import ResourceAccessRule from './Templates/PAM/ResourceAccessRule';
import FileAccess from './Templates/PAM/FileAccess';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../../reducers/api/IAM/Policy/RuleManagement/ruleTemplate';
import {isFulfilled} from '../../../../utils/redux';

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
const IamTemplateList = ({
	setTemplateList,
	templateList,
	setIsOpened,
	policyType,
}) => {
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
			const switchComponent = (template, type) => {
				if (policyType === policyTypes.iam) {
					if (type === templateType.RULE) {
						switch (template.categoryCode) {
							case 'auth':
								return (
									<UserAuthTemplate
										templateId={template.id}
									/>
								);
							case 'account':
								return (
									<UserAccountProcessTemplate
										templateId={template.id}
									/>
								);
							case 'userAccess':
								return (
									<UserAccessTemplate
										templateId={template.id}
									/>
								);
							case 'session':
								return (
									<UserSessionTemplate
										templateId={template.id}
									/>
								);
							case 'pattern':
								return (
									<UserAccountPatternTemplate
										templateId={template.id}
									/>
								);

							default:
								return <h1>No template match</h1>;
						}
					} else if (type === templateType.ACTION) {
						// todo - action 템플릿에 categoryCode가 추가되면 수정하겠습니다.
						switch (template.id) {
							case 'KR-2020-0001:202202:0001':
								return (
									<UserManagement templateId={template.id} />
								);
							case 'KR-2020-0001:202202:0002':
								return (
									<PolicyManagement
										templateId={template.id}
									/>
								);
							case 'KR-2020-0001:202202:0003':
								return (
									<RoleManagement templateId={template.id} />
								);

							default:
								return <h1>No template match</h1>;
						}
					}
				} else if (policyType === policyTypes.pam) {
					if (type === templateType.RULE) {
						switch (template.categoryCode) {
							case '1':
								return (
									<ConnectResource templateId={template.id} />
								);
							case '2':
								return (
									<ResourceAccessRule
										templateId={template.id}
									/>
								);
							case '3':
								return (
									<ConnectReason templateId={template.id} />
								);
							case '4':
								return (
									<CommandControl templateId={template.id} />
								);
							case '5':
								return <FileAccess templateId={template.id} />;

							default:
								return <h1>No template match</h1>;
						}
					} else if (type === templateType.ACTION) {
						// todo - action 템플릿에 categoryCode가 추가되면 수정하겠습니다.
						switch (template.categoryCode) {
							case '1':
								return <div>액션 템플릿 예시</div>;
							default:
								return <h1>No template match</h1>;
						}
					}
				}
			};

			if (templateList.length === 5) {
				alert('추가 가능한 최대 템플릿 수는 5개 입니다.');
				return;
			}

			setTemplateList((prev) => {
				if (
					!prev
						.map((v) => v.template.categoryCoode)
						.includes(
							// todo - action 템플릿에 categoryCode가 추가되면 수정하겠습니다.
							type === templateType.RULE
								? template.categoryCode
								: template.id,
						)
				)
					// 기존 리스트에 추가하려는 템플릿이 존재하지 않으면 추가
					return [
						...prev,
						{
							template: template,
							component: switchComponent(template, type),
						},
					];
				// 기존 리스트에 추가하려는 템플릿이 존재하면 그대로
				else return prev;
			});
			setIsOpened(false);
		},
		[policyType, setIsOpened, setTemplateList, templateList.length],
	);

	/**************************************************
	 * seob - IAM 규칙 템플릿, 액션 템플릿 findAll api
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			// 규칙 템플릿 findAll
			const ruleTemplates = await dispatch(
				IAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.findAll({
					range: `elements=0-50`,
				}),
			);
			// 액션 템플릿 findAll
			const actionTemplates = await dispatch(
				IAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.findAllAction({
					range: `elements=0-50`,
				}),
			);

			// 규칙 템플릿 fulfilled된 경우
			if (isFulfilled(ruleTemplates)) {
				console.log(ruleTemplates);
				setRuleTemplates(ruleTemplates.payload.data);
			}
			// 규칙 템플릿 rejected된 경우
			else {
				//에러 핸들링
				console.log(ruleTemplates.error);
			}

			// 액션 템플릿 fulfilled된 경우
			if (isFulfilled(actionTemplates)) {
				console.log(actionTemplates);
				setActionTemplates(actionTemplates.payload.data);
			}
			// 액션 템플릿 rejected된 경우
			else {
				//에러 핸들링
				console.log(actionTemplates.error);
			}
		};

		policyType === policyTypes.iam && fetchData();
	}, [dispatch, policyType]);

	useEffect(() => {
		// 첫 로드시 각각의 IAM 템플릿 데이터를 가져오면 로딩 false
		if (
			policyType === policyTypes.iam &&
			ruleTemplates.length &&
			actionTemplates.length
		) {
			setLoading(false);
		}
	}, [actionTemplates, policyType, ruleTemplates]);

	/**************************************************
	 * seob - PAM 규칙 템플릿, 액션 템플릿 findAll api
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			// 규칙 템플릿 findAll
			const ruleTemplates = await dispatch(
				IAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.findAll({
					range: `elements=0-50`,
				}),
			);
			// 액션 템플릿 findAll
			const actionTemplates = await dispatch(
				IAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.findAllAction({
					range: `elements=0-50`,
				}),
			);

			// 규칙 템플릿 fulfilled된 경우
			if (isFulfilled(ruleTemplates)) {
				console.log(ruleTemplates);
				setRuleTemplates(ruleTemplates.payload.data);
			}
			// 규칙 템플릿 rejected된 경우
			else {
				//에러 핸들링
				console.log(ruleTemplates.error);
			}

			// 액션 템플릿 fulfilled된 경우
			if (isFulfilled(actionTemplates)) {
				console.log(actionTemplates);
				setActionTemplates(actionTemplates.payload.data);
			}
			// 액션 템플릿 rejected된 경우
			else {
				//에러 핸들링
				console.log(actionTemplates.error);
			}
		};

		// policyType === policyTypes.pam && fetchData();
	}, [dispatch, policyType]);

	useEffect(() => {
		// 첫 로드시 각각의 IAM 템플릿 데이터를 가져오면 로딩 false
		if (
			policyType === policyTypes.pam
			// &&
			// ruleTemplates.length &&
			// actionTemplates.length
		) {
			setLoading(false);
		}
	}, [policyType]);

	useEffect(() => {
		if (policyType === policyTypes.pam) {
			setRuleTemplates([
				{
					categoryCode: '1',
					description: '자원 접속 인증',
					id: '1',
					name: '자원 접속 인증',
					resource: '*',
				},
				{
					categoryCode: '2',
					description: '자원 접근 정책',
					id: '2',
					name: '자원 접근 정책',
					resource: '*',
				},
				{
					categoryCode: '3',
					description: '접속 사유 정책',
					id: '3',
					name: '접속 사유 정책',
					resource: '*',
				},
				{
					categoryCode: '4',
					description: '명령어 제어 정책',
					id: '4',
					name: '명령어 제어 정책',
					resource: '*',
				},
				{
					categoryCode: '5',
					description: '파일 접근 권한',
					id: '5',
					name: '파일 접근 권한',
					resource: '*',
				},
			]);
			setActionTemplates([
				{
					categoryCode: '1',
					description: '액션 템플릿 예시',
					id: '1',
					name: '액션 템플릿',
					resource: '*',
				},
			]);
		}
	}, [policyType]);

	console.log(actionTemplates);

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
	templateList: PropTypes.array,
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

	/**************************************************
	 * seob - 정책 타입이 변경되는 경우 리스트 초기화
	 ***************************************************/
	useEffect(() => {
		setTemplateList([]);
	}, [policyType]);

	return (
		<>
			<Container>
				{templateList.map((v, i) => (
					<TemplateContainer
						key={i}
						template={v.template}
						render={v.component}
						setTemplateList={setTemplateList}
					/>
				))}
			</Container>
			{isOpened && (
				<IamTemplateList
					setTemplateList={setTemplateList}
					templateList={templateList}
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
