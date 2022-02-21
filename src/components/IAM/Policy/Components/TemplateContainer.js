import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
	padding: 8px;
	margin: 4px;
	border: solid black 1px;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`;
const Body = styled.div`
	display: ${(props) => (props.isOpened ? 'block' : 'none')};
	padding: 8px;
`;

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	isFold: '열기',
	isUnfold: '닫기',
	delete: '삭제',
};

/**************************************************
 * seob - 템플릿 리스트 개별 아이템의 컨테이너 (foldable 기능, 템플릿 리스트에서 아이템 제거 기능)
 *
 * template: 템플릿
 * setTemplateList: 템플릿 리스트 set 함수
 * render: 각각의 템플릿 컴포넌트 렌더 프로퍼티
 ***************************************************/
const TemplateContainer = ({template, setTemplateList, render}) => {
	// fold 상태
	const [isOpened, setIsOpened] = useState(true);

	/**************************************************
	 * seob - templateList에서 현재 템플릿을 제거하는 함수
	 ***************************************************/
	const deleteTemplate = () => {
		setTemplateList((prev) => prev.filter((item) => item !== template));
	};

	return (
		<Container>
			<Header>
				<div>
					<button onClick={() => setIsOpened(!isOpened)}>
						{isOpened ? contents.isUnfold : contents.isFold}
					</button>
					<span>{template.title}</span>
				</div>
				<div>
					<button onClick={deleteTemplate}>{contents.delete}</button>
				</div>
			</Header>
			<Body isOpened={isOpened}>{render()}</Body>
		</Container>
	);
};

TemplateContainer.propTypes = {
	template: PropTypes.object,
	setTemplateList: PropTypes.func,
	render: PropTypes.func,
};

export default TemplateContainer;
