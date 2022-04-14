import {useFormContext} from 'react-hook-form';
import React, {memo} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox';

const BoxContainer = styled.div`
	margin: 6px;
`;

const Container = styled.div`
	display: flex;
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
	({name, formState: {errors}, isDisabled = false, options}) => {
		return (
			<BoxContainer>
				<Container>
					{options.map((item) => {
						return (
							<CheckBox
								key={item.value}
								value={item.value}
								label={item.label}
								isDisabled={isDisabled}
								name={name}
							/>
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
