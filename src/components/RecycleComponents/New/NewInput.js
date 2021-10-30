import {useField} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

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
		<Container>
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
};

export default NewInput;
