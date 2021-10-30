import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../../icons/icons';

const _CheckboxContainer = styled.div`
	height: 32px;
	display: flex;
	align-items: center;
	padding: 0px 10px;
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
	cursor: pointer;
`;

const _Container = styled.div`
	z-index: 0;
	display: flex !important;
	align-items: center;
	margin: 0px;
	width: 100%;
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

const NewCheckBox = ({
	title = '',
	indeterminate = false, // 체크박스 하위 항목중 일부 체크 시
	disabled = false,
	checked = false,
	...props
}) => {
	return (
		<_CheckboxContainer>
			<_Container
				opacity={disabled.toString()}
				className='pretty p-svg p-curve p-plain p-toggle p-thick'
			>
				<input type='checkbox' checked={checked} {...props} />
				{indeterminate ? (
					<InputContainer
						type={'indeterminate'}
						disabled={disabled}
						className='state'
					>
						{indeterminateIcon}
						<label>{title}</label>
					</InputContainer>
				) : checked ? (
					<InputContainer type={'check'} className='state'>
						{checkIcon}
						<label>{title}</label>
					</InputContainer>
				) : (
					<InputContainer type={'checkout'} className='state'>
						{checkOutlineIcon}
						<label>{title}</label>
					</InputContainer>
				)}
			</_Container>
		</_CheckboxContainer>
	);
};

NewCheckBox.propTypes = {
	// options
	title: PropTypes.string,
	indeterminate: PropTypes.bool,
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default NewCheckBox;
