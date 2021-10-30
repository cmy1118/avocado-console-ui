import {useField} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: ${(props) =>
		props.direction === 'col' ? 'initial' : 'center'};
	flex-direction: ${(props) =>
		props.direction === 'col' ? 'column' : 'row'};
`;

const Input = styled.input`
	width: ${(props) => props.width || '394px'};
	margin-right: 10px;
	display: flex;
	align-items: center;
	font-size: 14px;
	height: 32px;
	border-radius: 4px;
	border: solid 1px #e3e5e5;
	background: white;
	padding: 6px 10px;
	box-sizing: border-box;
	outline: none;
	&:focus {
		border-color: #4ca6a8;
	}
`;

const NewInput = ({label, ...props}) => {
	const [field, meta] = useField(props);

	return (
		<Container direction={props.direction || 'col'}>
			<label>{label}</label>
			<Input {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</Container>
	);
};

NewInput.propTypes = {
	label: PropTypes.string,
	direction: PropTypes.oneOf(['row', 'col']),
};

export default NewInput;
