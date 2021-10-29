import React, {useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useRootClose} from 'react-overlays';

const _Container = styled.div`
	z-index: 99;
	position: absolute;
	width: ${(props) => props.width};
	min-width: 90px;
	border-radius: 4px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.22);
	background: white;
`;

const _Option = styled.option`
	width: ${(props) => props.width};
	font-size: 14px;
	display: flex;
	align-items: center;
	height: 32px;
	cursor: pointer;
	outline: none;
	border: none;
	background: transparent;
	padding: 5px 10px;
	box-sizing: border-box;
`;

const _Input = styled.input`
	width: ${(props) => props.width};
	font-size: 14px;
	display: flex;
	align-items: center;
	height: 32px;
	cursor: pointer;
	outline: none;
	border: none;
	background: transparent;
	padding: 5px 10px;
	box-sizing: border-box;
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
	name,
	register,
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
			setValue(item);
			onClickCloseContextMenu();
		},
		[onClickCloseContextMenu, setValue],
	);
	useEffect(() => {
		if (register) {
			console.log({...register(name)});
		}
	}, [name, register]);

	return isOpened ? (
		<_Container ref={ref} alignEnd width={width}>
			{register ? (
				<_Body>
					{options.map((item, key) => (
						<_CheckboxContainer
							key={key}
							current={item.value === value}
						>
							<_Option
								width={width}
								value={item.value}
								onClick={onClickValue(item)}
								{...register(name)}
							>
								{item.label}
							</_Option>
						</_CheckboxContainer>
					))}
				</_Body>
			) : (
				<_Body>
					{options.map((item, key) => (
						<_CheckboxContainer
							key={key}
							current={item.value === value}
						>
							<_Input
								width={width}
								value={item.label}
								onClick={onClickValue(item)}
								readOnly
							/>
						</_CheckboxContainer>
					))}
				</_Body>
			)}
		</_Container>
	) : (
		<></>
	);
};
DropDownContext.propTypes = {
	name: PropTypes.string,
	register: PropTypes.func,
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	setValue: PropTypes.func.isRequired,
	value: PropTypes.any,
	options: PropTypes.array.isRequired,
	width: PropTypes.string,
};
export default DropDownContext;
