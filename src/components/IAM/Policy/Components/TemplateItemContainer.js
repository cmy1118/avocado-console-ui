import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
`;

const Title = styled.div`
	padding-right: 8px;
	margin-right: 8px;
	border-right: 1px solid black;
	width: 200px;
	display: flex;
	justify-content: center;
`;

const Description = styled.div`
	display: block;
`;
const Content = styled.div``;

/**************************************************
 * seob - 템플릿 내부 항목에 대한 컨테이너
 *
 * title: 템플릿 내부 항목의 제목
 * description: 항목의 설명
 * render: 항목
 ***************************************************/
const TemplateItemContainer = ({title, description, render}) => {
	console.log(description);

	/**************************************************
	 * seob - description 타입에 따라 컴포넌트를 반환하는 함수
	 ***************************************************/
	const returnDescription = () => {
		// description의 타입이 string인 경우
		if (typeof description === 'string') {
			return <Description>{description}</Description>;
		}
		// description의 타입이 array인 경우
		else if (Array.isArray(description)) {
			return description.map((desc, i) => {
				return <Description key={desc + i}>{desc}</Description>;
			});
		}
	};

	return (
		<Container>
			<Title>{title}</Title>
			<div>
				{returnDescription()}
				<Content>{render()}</Content>
			</div>
		</Container>
	);
};

TemplateItemContainer.propTypes = {
	title: PropTypes.string,
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	render: PropTypes.func,
};

export default TemplateItemContainer;
