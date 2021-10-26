import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../icons/icons';

const Container = styled.div`
	z-index: 0;
	display: block !important;
	height: 15px;
	width: 15px;
	margin: 2.5px;
	opacity: ${(props) => (props.opacity === 'true' ? 0.24 : 1)};
`;

const InputContainer = styled.div`
	height: 15px;
	svg {
		fill: ${(props) =>
			(props.type === 'indeterminate' && props.disabled
				? '#757575'
				: '#178082') ||
			(props.type === 'check' && '#178082') ||
			(props.type === 'checkout' && '#757575')};
	}
`;

const CheckBoxContainer = ({
	children,
	title = '',
	indeterminate = false, // 체크박스 하위 항목중 일부 체크 시
	disabled = false,
}) => {
	return (
		<Container
			opacity={disabled.toString()}
			className='pretty p-svg p-curve p-plain p-toggle p-thick'
		>
			{React.Children.map(children, (child) => {
				return child;
			})}
			{indeterminate ? (
				<InputContainer
					type={'indeterminate'}
					disabled={children.props.disabled}
					className='state'
				>
					{indeterminateIcon}
					<label>{title}</label>
				</InputContainer>
			) : children.props.checked ? (
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
		</Container>
	);
};

CheckBoxContainer.propTypes = {
	children: PropTypes.object.isRequired,
	// options
	title: PropTypes.string,
	indeterminate: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default CheckBoxContainer;
