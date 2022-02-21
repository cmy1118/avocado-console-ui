import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	margin: 10px 0px;
`;

const Title = styled.div`
	padding-right: 8px;
	margin-right: 8px;
	width: 150px;
	display: flex;
`;

const Content = styled.div``;

const text = {message: ' :'};

/**************************************************
 * ambacc244 - 템플릿의 하나의 항목을 표현하는 컴포넌트
 *
 * title: 항목의 타이틀
 * render: 항목
 ***************************************************/
const TemplateElement = ({title, render}) => {
	return (
		<Container>
			<Title>{title + text.message}</Title>
			<div>
				<Content>{render()}</Content>
			</div>
		</Container>
	);
};
TemplateElement.propTypes = {
	title: PropTypes.string,
	render: PropTypes.func,
};

export default TemplateElement;
