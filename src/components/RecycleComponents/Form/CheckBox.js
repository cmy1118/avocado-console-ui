import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../../icons/icons';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const _CheckBox = styled.div`
	z-index: 0;
	margin: ${(props) => props.margin || 'auto'};
	display: flex !important;
	align-items: center;
	width: ${(props) => props.label === '' && '15px'};
	cursor: pointer;
	opacity: ${(props) => (props.opacity === 'true' ? 0.24 : 1)};
`;

const _InputContainer = styled.div`
	line-height: 17px !important;
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

const CheckBox = ({checkKey, checked, label, onCheck, disabled}) => {
	return (
		<_CheckBox
			opacity={disabled.toString()}
			label={label}
			className='pretty p-svg p-curve p-plain p-toggle p-thick'
		>
			<input
				type='checkbox'
				checked={checked}
				onChange={() => onCheck(checkKey)}
			/>
			{disabled ? (
				<_InputContainer
					type={'indeterminate'}
					disabled={disabled}
					className='state'
				>
					{indeterminateIcon}
					<label>{label}</label>
				</_InputContainer>
			) : checked ? (
				<_InputContainer type={'check'} className='state'>
					{checkIcon}
					<label>{label}</label>
				</_InputContainer>
			) : (
				<_InputContainer type={'checkout'} className='state'>
					{checkOutlineIcon}
					<label>{label}</label>
				</_InputContainer>
			)}
		</_CheckBox>
	);
};

CheckBox.propTypes = {
	checked: PropTypes.bool,
	checkKey: PropTypes.string,
	label: PropTypes.string,
	onCheck: PropTypes.func,
	disabled: PropTypes.bool,
};

export default CheckBox;
