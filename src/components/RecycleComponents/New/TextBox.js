import {useField, Field, useFormikContext, ErrorMessage} from 'formik';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';
import styled from 'styled-components';
import {ErrorSpan} from '../../../styles/components/text';

const Container = styled.div`
	.focus {
		border-color: ${(props) => (props.error ? '#d45959' : '#4ca6a8')};
	}
`;

const Input = styled(Field)`
	display: flex;
	flex: 1;
	align-items: center;
	font-size: 14px;
	height: 32px;
	border: none;
	background: transparent;
	box-sizing: border-box;
	outline: none;
`;

const SubContainer = styled.div`
	display: flex;
	align-items: ${(props) =>
		props.direction === 'col' ? 'initial' : 'center'};
	flex-direction: ${(props) =>
		props.direction === 'col' ? 'column' : 'row'};
	padding: 6px 10px;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.43;
	letter-spacing: 0.25px;
	text-align: left;
	font-color: #757575;
	box-sizing: border-box;
	border-radius: 4px;
	border: solid 1px;
	border-color: ${(props) => (props.error ? '#d45959' : '#e3e5e5')};
	height: 34px;
	width: ${(props) => props.width || '394px'};
	background-color: ${(props) => props.background || '#fff'};
`;

const TextBox = ({...props}) => {
	const [field, meta] = useField(props);
	const {errors, touched} = useFormikContext();

	const onFocusContainer = useCallback((e) => {
		e.target.parentElement.classList.add('focus');
	}, []);
	const onBlurContainer = useCallback((e) => {
		e.target.parentElement.classList.remove('focus');
	}, []);

	return (
		<Container
			direction={props.direction || 'col'}
			error={touched[field.name] && errors[field.name]}
		>
			<SubContainer
				error={touched[field.name] && errors[field.name]}
				background={props.background}
				width={props.width}
			>
				{props.front}
				<Input
					{...field}
					{...props}
					onFocus={onFocusContainer}
					onBlur={onBlurContainer}
				/>
				{props.back}
			</SubContainer>
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
	front: PropTypes.object,
	back: PropTypes.object,
	width: PropTypes.string,
	background: PropTypes.string,
	direction: PropTypes.oneOf(['row', 'col']),
};

export default TextBox;
