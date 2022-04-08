import {useFormContext} from 'react-hook-form';
import React, {memo, useState} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {TextBoxDescription} from '../../../styles/components/iam/addPage';
import {RowDiv} from '../../../styles/components/style';

const BoxContainer = styled.div`
	margin: 6px;
`;

const Input = styled.input`
	display: flex;
	width: 100%;
	align-items: center;
	font-size: 13px;
	// height: 32px;
	border: none;
	background: ${(props) => (props.disabled ? '#f8f9fa' : 'transparent')};
	box-sizing: border-box;
	outline: none;
	&::-webkit-input-placeholder {
		color: ${(props) => (props.placeholder_text_color ? '#D7D7D7' : '')};
	}
`;

const SubContainer = styled.div`
	display: flex;
	align-items: ${(props) =>
		props?.direction === 'col' ? 'initial' : 'center'};
	flex-direction: ${(props) =>
		props?.direction === 'col' ? 'column' : 'row'};
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
	border-color: ${(props) =>
		props.error ? '#d45959' : props.isFocused ? '#4ca6a8' : '#e3e5e5'};
	height: 32px;
	width: ${(props) => props.width + 'px'};
	background: ${(props) => (props.disabled ? '#f8f9fa' : 'white')};
`;

const ErrorMessageText = styled.span`
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.75;
	letter-spacing: 0.1px;
	text-align: left;
	color: #f34722;
`;

// eslint-disable-next-line react/display-name
const NestedInput = memo(
	({
		name,
		register,
		formState: {errors},
		isDisabled,
		width = 300,
		placeholder = '',
		description = '',
		onFocus,
		onBlur,
	}) => {
		const [isFocused, setIsFocused] = useState(false);
		return (
			<BoxContainer>
				<RowDiv alignItems={'center'}>
					<SubContainer
						error={Object.keys(errors).includes(name)}
						isFocused={isFocused}
						disabled={isDisabled}
						width={width}
					>
						<Input
							{...register(name)}
							onBlur={(e) => {
								register(name).onBlur(e);
								setIsFocused(false);
								onBlur && onBlur(e);
							}}
							onFocus={(e) => {
								onFocus && onFocus(e);
								setIsFocused(true);
							}}
							placeholder={placeholder}
							disabled={isDisabled}
							width={width}
						/>
					</SubContainer>
					<TextBoxDescription>{description}</TextBoxDescription>
				</RowDiv>
				<ErrorMessage
					errors={errors}
					name={name}
					render={({message}) => (
						<ErrorMessageText>{message}</ErrorMessageText>
					)}
				/>
			</BoxContainer>
		);
	},
);

NestedInput.propTypes = {
	name: PropTypes.string,
	register: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	formState: PropTypes.object,
	isDisabled: PropTypes.bool,
	placeholder: PropTypes.string,
	width: PropTypes.number,
	description: PropTypes.string,
};

const RHF_Textbox = ({
	name,
	placeholder,
	description,
	width,
	isDisabled,
	onFocus,
	onBlur,
}) => {
	const methods = useFormContext();
	return (
		<NestedInput
			{...methods}
			name={name}
			placeholder={placeholder}
			isDisabled={isDisabled}
			width={width}
			description={description}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	);
};

RHF_Textbox.propTypes = {
	name: PropTypes.string,
	isDisabled: PropTypes.bool,
	placeholder: PropTypes.string,
	width: PropTypes.number,
	description: PropTypes.string,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
};

export default RHF_Textbox;
