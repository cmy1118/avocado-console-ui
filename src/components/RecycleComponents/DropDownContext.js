import React, {useCallback, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useRootClose} from 'react-overlays';
import {
	NormalBorderButton,
	TransparentBorderButton,
} from '../../styles/components/buttons';

const _Container = styled.div`
	padding: 8px 0px;
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

const _Header = styled.div`
	height: 41px;
	display: flex;
	align-items: center;
	padding: 0px 16px;
	font-size: 14px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: 0.14px;
	color: #212121;
	border-bottom: 1px solid #e3e5e5;
`;

const _Body = styled.div`
	width: 100%;
`;
const _Footer = styled.div`
	height: 60px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border-top: 1px solid #e3e5e5;
`;

const DropDownContext = ({
	isOpened,
	setIsOpened,
	title,
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

	return isOpened ? (
		<_Container ref={ref} alignEnd>
			{title && (
				<_Header>
					<span>{title}</span>
				</_Header>
			)}
			<_Body>
				{options.map((item, key) => (
					<_CheckboxContainer key={key} current={item === value}>
						<_Input
							width={width}
							readOnly
							value={item}
							onClick={(e) => {
								if (parseInt(e.target.value)) {
									setValue(parseInt(e.target.value));
								} else {
									setValue(e.target.value);
								}
							}}
						/>
					</_CheckboxContainer>
				))}
			</_Body>
			{title && (
				<_Footer>
					<TransparentBorderButton onClick={onClickCloseContextMenu}>
						취소
					</TransparentBorderButton>
					<NormalBorderButton onClick={onClickCloseContextMenu}>
						확인
					</NormalBorderButton>
				</_Footer>
			)}
		</_Container>
	) : (
		<></>
	);
};
DropDownContext.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	setValue: PropTypes.func.isRequired,
	title: PropTypes.string,
	value: PropTypes.any,
	options: PropTypes.array.isRequired,
	width: PropTypes.string,
};
export default DropDownContext;
