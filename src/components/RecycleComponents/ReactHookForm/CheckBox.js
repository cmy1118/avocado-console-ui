import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../../icons/icons';
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
	const {register, getValues} = methods;
	const [indeterminate, setIndeterminate] = useState(false);
	const [values, setValues] = useState([]);

	useEffect(() => {
		setValues(getValues(name) ? getValues(name) : []);
	}, [getValues, name]);

	return (
		<Label
			key={value}
			// opacity={isDisabled.toString()}
			label={label}
			className='pretty p-svg p-curve p-plain p-toggle p-thick'
		>
			<input
				type={'checkbox'}
				value={value}
				disabled={isDisabled}
				{...register(name)}
				onChange={(e) => {
					if (isDisabled) return;
					const {value} = e.target;
					setValues((prev) =>
						prev.includes(value)
							? prev.filter((v) => v !== value)
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
			) : values.includes(value) ? (
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
