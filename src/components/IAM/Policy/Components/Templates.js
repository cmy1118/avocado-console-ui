import React, {useEffect, useState} from 'react';
import TemplatesChild from './TemplateContainer';
import PropTypes from 'prop-types';
import UserAccessTemplate from './Templets/UserAccessTemplate';
import UserSessionTemplate from './Templets/UserSessionTemplate';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const TemplateListContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	userAuth: '사용자 인증',
	userAccountProcess: '사용자 계정 처리',
	userAccess: '사용자 접근 정책',
	userSession: '사용자 세션 정책',
	userAccountPattern: '사용자 계정 패턴',
	userManagement: '사용자 관리 권한',
	policyManagement: '정책 관리 권한',
	roleManagement: '역할 관리 권한',
};

// api 통신으로 응답받은 템플릿 리스트를 해당되는 컴포넌트와 연결해서 관리
// 사용방식 또는 api response에 따라서 수정 예정
const templateResponse = [
	{
		title: contents.userAuth,
		description: 'userAuth description',
		component: '',
	},
	{
		title: contents.userAccountProcess,
		description: 'userAccountProcess description',
		component: '',
	},
	{
		title: contents.userAccess,
		description: 'userAccess description',
		component: UserAccessTemplate,
	},
	{
		title: contents.userSession,
		description: 'userSession description',
		component: UserSessionTemplate,
	},
	{
		title: contents.userAccountPattern,
		description: 'userAccountPattern description',
		component: '',
	},
	{
		title: contents.userManagement,
		description: 'userManagement description',
		component: '',
	},
	{
		title: contents.policyManagement,
		description: 'policyManagement description',
		component: '',
	},
	{
		title: contents.roleManagement,
		description: 'roleManagement description',
		component: '',
	},
];

/**************************************************
 * seob - 정책 템플릿 리스트 컴포넌트
 ***************************************************/
const TemplateList = ({setTemplateList}) => {
	// 각 템플릿별 설명
	const [templateDescription, setTemplateDescription] = useState('');

	const addTemplate = ({template}) => () => {
		// 현재 템플릿에 컴포넌트가 빈 값 인경우 return
		if (template.component === '') return;
		setTemplateList(
			(prev) =>
				// 기존 리스트에 추가하려는 템플릿이 존재하지 않으면 추가
				!prev.includes(template) && [...prev, template],
		);
	};

	return (
		<TemplateListContainer>
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
};

const Templates = ({isOpened}) => {
	const [templateList, setTemplateList] = useState([]);

	console.log(templateList);

	return (
		<>
			<Container>
				{templateList.map((template) => (
					<TemplatesChild
						key={template.title}
						render={template.component}
						setTemplateList={setTemplateList}
						template={template}
					/>
				))}
			</Container>
			{isOpened && <TemplateList setTemplateList={setTemplateList} />}
		</>
	);
};

Templates.propTypes = {
	isOpened: PropTypes.bool,
};

export default Templates;
