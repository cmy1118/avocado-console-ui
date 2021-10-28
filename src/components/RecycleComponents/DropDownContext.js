import React, {useCallback, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useRootClose} from 'react-overlays';

const _Container = styled.div`
	z-index: 99;
	position: absolute;
	min-width: 90px;
	border-radius: 4px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.22);
	border: solid 1px #e3e5e5;
	background: white;
`;

const _Input = styled.input`
	width: ${(props) => props.width};
	height: 32px;
	cursor: pointer;
	outline: none;
	border: none;
	background: transparent;
`;

const _CheckboxContainer = styled.div`
	height: 32px;
	width: 100%;
	display: flex;
	align-items: center;
	background: ${(props) => props.current && 'rgba(228, 243, 244, 0.7)'};
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
	cursor: pointer;
`;

const _Body = styled.div`
	padding: 8px 0px;
	width: 100%;
`;

const DropDownContext = ({
	isOpened,
	setIsOpened,
	options,
	value,
	setValue,
	width = '90px',
}) => {
	const ref = useRef();

	const onClickCloseContextMenu = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	useRootClose(ref, onClickCloseContextMenu, {
		disabled: !isOpened,
	});

	const onClickValue = useCallback(
		(item) => () => {
			if (parseInt(item.value)) {
				setValue(parseInt(item.value));
			} else {
				setValue(item.value);
			}
			onClickCloseContextMenu();
		},
		[onClickCloseContextMenu, setValue],
	);

	return isOpened ? (
		<_Container ref={ref} alignEnd>
			<_Body>
				{options.map((item, key) => (
					<_CheckboxContainer
						key={key}
						current={item.value === value}
					>
						<_Input
							width={width}
							readOnly
							value={item.label}
							onClick={onClickValue(item)}
						/>
					</_CheckboxContainer>
				))}
			</_Body>
		</_Container>
	) : (
		<></>
	);
};
DropDownContext.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	setValue: PropTypes.func.isRequired,
	value: PropTypes.any.isRequired,
	options: PropTypes.array.isRequired,
	width: PropTypes.string,
};
export default DropDownContext;
