import {useField, Field, useFormikContext, ErrorMessage} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {ErrorSpan} from '../../../styles/components/text';

const Container = styled.div`
	display: flex;
	align-items: ${(props) =>
		props.direction === 'col' ? 'initial' : 'center'};
	flex-direction: ${(props) =>
		props.direction === 'col' ? 'column' : 'row'};
`;

const Input = styled(Field)`
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

const TextBox = ({...props}) => {
	const [field, meta] = useField(props);
	const {errors, touched} = useFormikContext();

	return (
		<Container direction={props.direction || 'col'}>
			<Input {...field} {...props} />
			{touched[field.name] && errors[field.name] ? (
				<ErrorMessage name={field.name}>
					{(msg) => <ErrorSpan>{msg}</ErrorSpan>}
				</ErrorMessage>
			) : null}
		</Container>
	);
};

TextBox.propTypes = {
	name: PropTypes.string.isRequired,
	direction: PropTypes.oneOf(['row', 'col']),
};

export default TextBox;
