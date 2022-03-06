import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../../icons/icons';
import styled from 'styled-components';

const _Container = styled.div`
	z-index: 0;
	margin: ${(props) => props.margin || 'auto'};
	display: flex !important;
	align-items: center;
	// width: ${(props) => props.label === '' && '15px'};
	cursor: pointer;
	// opacity: ${(props) => (props.opacity === 'true' ? 0.24 : 1)};
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

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<_Container
			// opacity={rest.disabled.toString()}
			className='pretty p-svg p-curve p-plain p-toggle p-thick'
		>
			<input type='checkbox' ref={resolvedRef} {...rest} />
			{indeterminate ? (
				<InputContainer
					type={'indeterminate'}
					// disabled={rest.disabled}
					className='state'
				>
					{indeterminateIcon}
				</InputContainer>
			) : (
				{
					...(rest.checked ? (
						<InputContainer type={'check'} className='state'>
							{checkIcon}
						</InputContainer>
					) : (
						<InputContainer type={'checkout'} className='state'>
							{checkOutlineIcon}
						</InputContainer>
					)),
				}
			)}
		</_Container>
	);
});

IndeterminateCheckbox.propTypes = {
	indeterminate: PropTypes.bool,
};

export default IndeterminateCheckbox;
