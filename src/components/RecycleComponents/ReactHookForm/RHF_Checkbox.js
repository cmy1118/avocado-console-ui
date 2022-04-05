import {useFormContext} from 'react-hook-form';
import React, {memo, useEffect, useState} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../../icons/icons';

const BoxContainer = styled.div`
	margin: 6px;
`;

const Container = styled.div`
	display: flex;
`;

const Label = styled.label`
	display: flex !important;
	align-items: center;
	cursor: pointer;
	z-index: 0;
`;

const InputContainer = styled.div`
	line-height: 17px !important;
	margin-right: 2px;
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
		const [values, setValues] = useState([]);

		useEffect(() => {
			setValues(getValues(name) ? getValues(name) : []);
		}, [getValues, name]);

		return (
			<BoxContainer>
				<Container>
					{options.map((item) => {
						return (
							<Label
								key={item.value}
								// opacity={isDisabled.toString()}
								label={item.label}
								className='pretty p-svg p-curve p-plain p-toggle p-thick'
							>
								<input
									type={'checkbox'}
									value={item.value}
									disabled={isDisabled}
									{...register(name)}
									onChange={(e) => {
										if (isDisabled) return;
										const {value} = e.target;
										setValues((prev) =>
											prev.includes(value)
												? prev.filter(
														(v) => v !== value,
												  )
												: [...prev, value],
										);
										register(name).onChange(e);
									}}
								/>
								{indeterminate ? (
									<InputContainer
										type={'indeterminate'}
										disabled={isDisabled}
										className='state'
									>
										{indeterminateIcon}
									</InputContainer>
								) : values.includes(item.value) ? (
									<InputContainer
										type={'check'}
										className='state'
									>
										{checkIcon}
									</InputContainer>
								) : (
									<InputContainer
										type={'checkout'}
										className='state'
									>
										{checkOutlineIcon}
									</InputContainer>
								)}

								{item.label}
							</Label>
						);
					})}
				</Container>
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
