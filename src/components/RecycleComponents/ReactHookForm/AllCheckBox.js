import React, {useCallback, useEffect, useState} from 'react';
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

const AllCheckBox = ({name, values, label, isDisabled = false}) => {
	const methods = useFormContext();
	const {watch, setValue} = methods;
	const [indeterminate, setIndeterminate] = useState(false);

	const [ischecked, setIschecked] = useState(false);

	const handleChange = useCallback(() => {
		if (indeterminate) {
			setValue(name, values);
			setIndeterminate(false);
			setIschecked(true);
		} else {
			if (ischecked) {
				setValue(name, []);
			} else {
				setValue(name, values);
			}
			//
		}
	}, [indeterminate, ischecked, name, setValue, values]);

	useEffect(() => {
		if (watch(name).length) {
			if (watch(name).length === values.length) {
				setIndeterminate(false);
				setIschecked(true);
			} else {
				setIndeterminate(true);
				setIschecked(false);
			}
		} else {
			setIndeterminate(false);
			setIschecked(false);
		}
	}, [name, values, watch]);

	return (
		<Label
			// opacity={isDisabled.toString()}
			label={label}
			className='pretty p-svg p-curve p-plain p-toggle p-thick'
		>
			<input
				type={'checkbox'}
				value={ischecked}
				disabled={isDisabled}
				onChange={handleChange}
			/>
			{indeterminate ? (
				<InputContainer
					type={'indeterminate'}
					disabled={isDisabled}
					className='state'
				>
					{indeterminateIcon}
				</InputContainer>
			) : ischecked ? (
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

AllCheckBox.propTypes = {
	name: PropTypes.string,
	values: PropTypes.array,
	label: PropTypes.string,
	isDisabled: PropTypes.bool,
};

export default AllCheckBox;
