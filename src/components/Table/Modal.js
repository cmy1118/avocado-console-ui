import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import TableOptionsBar from './TableOptionsBar';
import {
	NormalBorderButton,
	TransparentBorderButton,
} from '../../styles/components/buttons';
import {PositionRelativeDiv} from '../../styles/components/style';

const _Container = styled.div`
	z-index: 99;
	position: absolute;
	top: 10px;
	right: ${(props) => (props.direction === 'right' ? 'initial' : '0px')};
	left: ${(props) => (props.direction === 'left' ? 'initial' : '0px')};
	width: 230px;
	border-radius: 4px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.22);
	border: solid 1px #e3e5e5;
	background: white;
`;

const _Header = styled.div`
	height: 41px;
	display: flex;
	align-items: center;
	padding: 0px 16px;
	font-family: NotoSansCJKKR;
	font-size: 14px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: 0.14px;
	color: #212121;
	border-bottom: 1px solid #e3e5e5;
`;
const _Content = styled.div`
	padding: 8px 0px;
	width: 100%;
`;
const _Footer = styled.div`
	height: 60px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border-top: 1px solid #e3e5e5;
`;

const Background = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	z-index: -1;
	width: 100vw;
	height: 100vh;
	// background-color: rgba(0, 0, 0, 0.3);
`;
const Modal = ({modalOption, direction}) => {
	return (
		<PositionRelativeDiv>
			{modalOption?.show && (
				<_Container direction={direction}>
					<Background onClick={() => modalOption.onClose()} />

					<_Header>
						<span>{modalOption?.title}</span>
					</_Header>
					<_Content>{modalOption?.element}</_Content>
					<_Footer>
						<TransparentBorderButton
							onClick={() => modalOption.onSubmit()}
						>
							확인
						</TransparentBorderButton>
						<NormalBorderButton
							onClick={() => modalOption.onClose()}
						>
							닫기
						</NormalBorderButton>
					</_Footer>
					{/*<ButtonBox>*/}
					{/*    <button onClick={() => modalOption.onSubmit()}>확인</button>*/}
					{/*    <button onClick={() => modalOption.onClose()}>닫기</button>*/}
					{/*</ButtonBox>*/}
				</_Container>
			)}
		</PositionRelativeDiv>
	);
};
Modal.propTypes = {
	modalOption: PropTypes.object.isRequired,
	direction: PropTypes.oneOf(['left', 'right']),
};

export default Modal;
