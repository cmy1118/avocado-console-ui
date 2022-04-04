import {Controller, useFormContext} from 'react-hook-form';
import React, {memo, useState} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../../icons/icons';

const _Container = styled.div`
	z-index: 0;
	margin: ${(props) => props.margin || 'auto'};
	display: flex !important;
	align-items: center;
	width: ${(props) => props.label === '' && '15px'};
	cursor: pointer;
	opacity: ${(props) => (props.opacity === 'true' ? 0.24 : 1)};
`;

const InputContainer = styled.div`
	line-height: 17px !important;
	width: 15px;
	height: 15px;
	svg {
		position: absolute !important;
		top: -2.5px !important;
		left: -2.5px !important;
		fill: ${(props) =>
			(props.type === 'indeterminate' && props.disabled && '#757575') ||
			(props.type === 'indeterminate' && !props.disabled && '#178082') ||
			(props.type === 'check' && '#178082') ||
			(props.type === 'checkout' && '#757575')};
		width: 15px !important;
		height: 15px !important;
		margin: 2.5px !important;
	}
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
		isDisabled = false,
		options,
		getValues,
	}) => {
		const [indeterminate, setIndeterminate] = useState(false);
		const values = getValues(name);
		console.log(values);
		return (
			<div>
				{/*<SubContainer*/}
				{/*	error={Object.keys(errors).includes(name)}*/}
				{/*	isFocused={isFocused}*/}
				{/*	disabled={isDisabled}*/}
				{/*>*/}
				{/*	<Input*/}
				{/*		{...register(name)}*/}
				{/*		onBlur={(e) => {*/}
				{/*			register(name).onBlur(e);*/}
				{/*			setIsFocused(false);*/}
				{/*		}}*/}
				{/*		onFocus={() => setIsFocused(true)}*/}
				{/*		disabled={isDisabled}*/}
				{/*	/>*/}
				{/*</SubContainer>*/}
				{/*{options.map((v) => (*/}
				{/*	<CheckBox label={v.label} />*/}
				{/*))}*/}

				{options.map((item) => {
					return (
						// <Controller
						// 	key={item.value}
						// 	name={name}
						// 	control={control}
						// 	render={({
						// 		field: {onChange, name, value},
						// 		fieldState: {
						// 			invalid,
						// 			isTouched,
						// 			isDirty,
						// 			error,
						// 		},
						// 		formState,
						// 	}) => {
						// 		// console.log(getValues(name));
						// 		// console.log(value);
						// 		return (
						<_Container
							// margin={props.margin}
							key={item.value}
							opacity={isDisabled.toString()}
							label={item.label}
							className='pretty p-svg p-curve p-plain p-toggle p-thick'
						>
							<input
								ref={register({})}
								type={'checkbox'}
								value={item.value}
								name={name}
								// onChange={(e) => onChange(e)}
							/>
							{indeterminate ? (
								<InputContainer
									type={'indeterminate'}
									disabled={isDisabled}
									className='state'
								>
									{indeterminateIcon}
									<label>{item.label}</label>
								</InputContainer>
							) : values ? (
								<InputContainer
									type={'check'}
									className='state'
								>
									{checkIcon}
									<label>{item.label}</label>
								</InputContainer>
							) : (
								<InputContainer
									type={'checkout'}
									className='state'
								>
									{checkOutlineIcon}
									<label>{item.label}</label>
								</InputContainer>
							)}
						</_Container>
						// );
						// }}
						// />
					);
				})}

				<ErrorMessage
					errors={errors}
					name={name}
					render={({message}) => (
						<ErrorMessageText>{message}</ErrorMessageText>
					)}
				/>
			</div>
		);
	},
);

NestedInput.propTypes = {
	name: PropTypes.string,
	formState: PropTypes.object,
	isDisabled: PropTypes.bool,
	placeholder: PropTypes.string,
	options: PropTypes.array,
	register: PropTypes.func,
	getValues: PropTypes.func,
};

const RHF_Checkbox = ({name, isDisabled, options}) => {
	const methods = useFormContext();
	return (
		<NestedInput
			{...methods}
			name={name}
			isDisabled={isDisabled}
			options={options}
		/>
	);
};

RHF_Checkbox.propTypes = {
	name: PropTypes.string,
	isDisabled: PropTypes.bool,
	options: PropTypes.array,
};

export default RHF_Checkbox;
