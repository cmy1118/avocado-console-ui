import {useFormContext} from 'react-hook-form';
import React, {memo, useEffect, useState} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
	display: flex;
`;

const Label = styled.label`
	display: inline-flex;
	align-items: center;
	&:hover {
		cursor: pointer;
	}
	input {
		accent-color: #178082;
		margin: auto 2px;
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
		const [initial, setInitial] = useState(null);

		useEffect(() => {
			console.log(getValues(name));
		}, [getValues, name]);

		return (
			<div>
				<Container>
					{options.map((item, index) => {
						return (
							<Label key={item.value}>
								<input
									{...register(name)}
									type='radio'
									name={name}
									value={item.value}
									disabled={isDisabled}
								/>
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

const RHF_Radio = ({name, isDisabled, options}) => {
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

RHF_Radio.propTypes = {
	name: PropTypes.string,
	isDisabled: PropTypes.bool,
	options: PropTypes.array,
};

export default RHF_Radio;
