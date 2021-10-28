import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useWatch} from 'react-hook-form';
import {Label} from '../../styles/components/text';
import {ErrorMessage} from '@hookform/error-message';

const Container = styled.div`
	display: flex;
	flex-direction: ${(props) => props.direction};
	align-items: ${(props) =>
		props.direction === 'row' ? 'center' : 'initial'};

	justify-content: ${(props) =>
		props.direction === 'row' ? 'initial' : 'center'};
	margin-bottom: 12px;
`;

const _Input = styled.input`
	padding: 6px 10px;
	height: 20px;
	font-family: NotoSansCJKKR;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.43;
	letter-spacing: 0.25px;
	text-align: left;
	font-color: #757575;

	border-radius: 4px;
	border: solid 1px #e3e5e5;
	background-color: #fff;

	width: ${(props) => props.inputWidth || '300px'};
	outline: none;
	&:focus {
		border-color: #4ca6a8;
	}
`;

const FormTextBox = ({
	name,
	register,
	errors,
	control,
	setValue,
	placeholder,
	label,
	children,
	defaultValue,
	type,
	autoFocus = false,
	inputWidth,
	labelWidth,
	lock,
	direction = 'column',
}) => {
	const value = useWatch({
		name,
		control,
	});

	useEffect(() => {
		if (setValue) setValue(value);
	}, [setValue, value]);

	return (
		<Container direction={direction}>
			{label && (
				<Label labelWidth={labelWidth} htmlFor={name}>
					{label}
				</Label>
			)}
			<_Input
				{...register(name)}
				type={type}
				autoFocus={autoFocus}
				defaultValue={defaultValue}
				placeholder={placeholder}
				inputWidth={inputWidth}
				readOnly={lock}
			/>
			<ErrorMessage errors={errors} name={name}>
				{({messages}) =>
					messages &&
					Object.entries(messages).map(([type, message]) => (
						<p key={type}>{message}</p>
					))
				}
			</ErrorMessage>
			{React.Children.map(children, (child) => {
				return child;
			})}
		</Container>
	);
};

FormTextBox.propTypes = {
	name: PropTypes.string.isRequired,
	register: PropTypes.func,
	errors: PropTypes.object,
	control: PropTypes.object,
	setValue: PropTypes.func,
	placeholder: PropTypes.string,
	defaultValue: PropTypes.string,
	label: PropTypes.string,
	type: PropTypes.string,
	inputWidth: PropTypes.string,
	labelWidth: PropTypes.string,
	direction: PropTypes.oneOf(['row', 'column']),
	autoFocus: PropTypes.bool,
	lock: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FormTextBox;
