import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {checkIcon, checkOutlineIcon} from '../../../icons/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
	display: flex !important;
	align-items: end;
	cursor: pointer;
	margin: 0px;
	width: 100%;
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

const CheckBox = ({name, value, label, isDisabled = false}) => {
	const methods = useFormContext();
	const {register, watch} = methods;
	const [values, setValues] = useState([]);

	const currentValue = watch(name);

	useEffect(() => {
		setValues(currentValue ? currentValue : []);
	}, [currentValue]);

	return (
		<Label
			// opacity={isDisabled.toString()}
			label={label}
			className='pretty p-svg p-curve p-plain p-toggle p-thick'
		>
			<input
				{...register(name)}
				type={'checkbox'}
				value={value}
				disabled={isDisabled}
			/>
			{values.includes(value) ? (
				<InputContainer type={'check'} className='state'>
					{checkIcon}
				</InputContainer>
			) : (
				<InputContainer type={'checkout'} className='state'>
					{checkOutlineIcon}
				</InputContainer>
			)}
			{label}
		</Label>
	);
};

CheckBox.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	label: PropTypes.string,
	isDisabled: PropTypes.bool,
};

export default CheckBox;
