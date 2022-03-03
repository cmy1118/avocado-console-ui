import React, {useCallback, useState} from 'react';
import TemplateContainer from './TemplateContainer';
import PropTypes from 'prop-types';
import UserAccessTemplate from './Templates/UserAccessTemplate';
import UserSessionTemplate from './Templates/UserSessionTemplate';
import styled from 'styled-components';
import UserAuthTemplate from './Templates/UserAuthTemplate';
import UserAccountProcessTemplate from './Templates/UserAccountProcessTemplate';
import UserAccountPatternTemplate from './Templates/UserAccountPatternTemplate';
import UserManagement from './Templates/UserManagement';

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
	title: 'IAM 템플릿 선택',
	templates: {
		userAuth: '사용자 인증',
		userAccountProcess: '사용자 계정 처리',
		userAccess: '사용자 접근 정책',
		userSession: '사용자 세션 정책',
		userAccountPattern: '사용자 계정 패턴',
		userManagement: '사용자 관리 권한',
		policyManagement: '정책 관리 권한',
		roleManagement: '역할 관리 권한',
	},
};

// memo (seob): 우선 여기에 각각의 컴포넌트를 component에 넣으면 되는데
//  제가 작성한 템플릿 생성방식이 문제가 되거나 수정 보완할 방향이 있다면 같이 협의하면 좋겠습니다.
// api 통신으로 응답받은 템플릿 리스트를 해당되는 컴포넌트와 연결해서 관리
// 사용방식 또는 api response에 따라서 수정 예정
/**************************************************
 * seob - 템플릿 리스트 아이템의 객체 배열 변수
 *
 * title: 템플릿 이름
 * description: 마우스 호버시 템플릿 상세설명
 * component: 템플릿 컴포넌트
 ***************************************************/
const templateResponse = [
	{
		title: contents.templates.userAuth,
		description: 'userAuth description',
		component: UserAuthTemplate,
	},
	{
		title: contents.templates.userAccountProcess,
		description: 'userAccountProcess description',
		component: UserAccountProcessTemplate,
	},
	{
		title: contents.templates.userAccess,
		description: 'userAccess description',
		component: UserAccessTemplate,
	},
	{
		title: contents.templates.userSession,
		description: 'userSession description',
		component: UserSessionTemplate,
	},
	{
		title: contents.templates.userAccountPattern,
		description: 'userAccountPattern description',
		component: UserAccountPatternTemplate,
	},
	{
		title: contents.templates.userManagement,
		description: 'userManagement description',
		component: UserManagement,
	},
	{
		title: contents.templates.policyManagement,
		description: 'policyManagement description',
		component: '',
	},
	{
		title: contents.templates.roleManagement,
		description: 'roleManagement description',
		component: '',
	},
];

/**************************************************
 * seob - 정책 템플릿 리스트 컴포넌트
 *
 * setTemplateList: 템플릿 리스트 set 함수
 * setIsOpened: 추가할 템플릿 리스트 사이드의 setOpen
 ***************************************************/
const TemplateList = ({setTemplateList, setIsOpened}) => {
	// 각 템플릿별 설명
	const [templateDescription, setTemplateDescription] = useState('');

	/**************************************************
	 * seob - 템플릿 추가 후 닫는 함수
	 ***************************************************/
	const addTemplate = useCallback(
		({template}) => () => {
			// 현재 템플릿에 컴포넌트가 빈 값 인경우 return
			if (template.component === '') return;
			setTemplateList((prev) => {
				if (!prev.includes(template))
					// 기존 리스트에 추가하려는 템플릿이 존재하지 않으면 추가
					return [...prev, template];
				// 기존 리스트에 추가하려는 템플릿이 존재하면 그대로
				else return prev;
			});
			setIsOpened(false);
		},
		[setIsOpened, setTemplateList],
	);

	return (
		<TemplateListContainer>
			<Title>{contents.title}</Title>
			<ul>
				{templateResponse.map((template) => (
					<li
						key={template.title}
						onClick={addTemplate({template})}
						onMouseEnter={() =>
							setTemplateDescription(template.description)
						}
					>
						<button>{template.title}</button>
					</li>
				))}
			</ul>
			<div>{templateDescription}</div>
		</TemplateListContainer>
	);
};

TemplateList.propTypes = {
	setTemplateList: PropTypes.func,
	setIsOpened: PropTypes.func,
};

/**************************************************
 * seob - 정책 작성 페이지의 템플릿 리스트
 *
 * isOpened: 추가할 템플릿 리스트 사이드의 open 상태
 * setIsOpened: 추가할 템플릿 리스트 사이드의 setOpen
 ***************************************************/
const Templates = ({isOpened, setIsOpened}) => {
	// 정책 작성 페이지에 추가된 템플릿 리스트
	const [templateList, setTemplateList] = useState([]);

	return (
		<>
			<Container>
				{templateList.map((template) => (
					<TemplateContainer
						key={template.title}
						render={template.component}
						setTemplateList={setTemplateList}
						template={template}
					/>
				))}
			</Container>
			{isOpened && (
				<TemplateList
					setTemplateList={setTemplateList}
					setIsOpened={setIsOpened}
				/>
			)}
		</>
	);
};

Templates.propTypes = {
	isOpened: PropTypes.bool,
	setIsOpened: PropTypes.func,
};

export default Templates;
