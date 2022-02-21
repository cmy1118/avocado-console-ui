import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const Input = styled.input`
	width: 20px;
`;

const CheckBoxContainer = styled.div`
	display: flex;
	align-items: center;
	margin-right: 8px;
`;

const TimeInterval = ({title}) => {
	return (
		<Container>
			<CheckBoxContainer>
				<input type='checkbox' />
				<p>{title}</p>
			</CheckBoxContainer>
			<div>
				<Input type='text' /> :
				<Input type='text' /> ~
				<Input type='text' /> :
				<Input type='text' />
			</div>
		</Container>
	);
};

TimeInterval.propTypes = {
	title: PropTypes.string,
};

export default TimeInterval;
