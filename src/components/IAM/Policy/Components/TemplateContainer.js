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

const contents = {
	isFold: '열기',
	isUnfold: '닫기',
	delete: '삭제',
};

const TemplatesChild = ({template, setTemplateList, render}) => {
	const [isOpened, setIsOpened] = useState(true);

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

TemplatesChild.propTypes = {
	template: PropTypes.object,
	setTemplateList: PropTypes.func,
	render: PropTypes.func,
};

export default TemplatesChild;
