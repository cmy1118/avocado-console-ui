import React, {useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useRootClose} from 'react-overlays';

const _Container = styled.div`
	// z-index: 99;
	// position: absolute;
	// top: 10px;
	// right: ${(props) => (props.direction === 'right' ? 'initial' : '0px')};
	// left: ${(props) => (props.direction === 'left' ? 'initial' : '0px')};
	// width: 230px;
	// border-radius: 4px;
	// box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.22);
	// border: solid 1px #e3e5e5;
	// background: white;
`;

const _Header = styled.div`
	// height: 41px;
	// display: flex;
	// align-items: center;
	// padding: 0px 16px;
	// font-family: NotoSansCJKKR;
	// font-size: 14px;
	// font-weight: 500;
	// font-stretch: normal;
	// font-style: normal;
	// line-height: normal;
	// letter-spacing: 0.14px;
	// color: #212121;
	// border-bottom: 1px solid #e3e5e5;
`;
const _Content = styled.div`
	// padding: 8px 0px;
	// width: 100%;
`;
const _Footer = styled.div`
	// height: 60px;
	// display: flex;
	// justify-content: flex-end;
	// align-items: center;
	// border-top: 1px solid #e3e5e5;
`;

const DropdownBtnContainer = ({
	title,
	isOpened,
	onClickOkBtn,
	onClickCancelBtn,
	children,
	direction = 'right',
}) => {
	const ref = useRef();

	useRootClose(ref, onClickCancelBtn, {
		disabled: !isOpened,
	});

	return (
		<_Container ref={ref} alignEnd direction={direction}>
			<_Header>
				<span>{title}</span>
			</_Header>
			<_Content>
				{React.Children.map(children, (child) => {
					return child;
				})}
			</_Content>
			{/*<_Footer>*/}
			{/*	<TransparentBorderButton onClick={onClickCancelBtn}>*/}
			{/*		취소*/}
			{/*	</TransparentBorderButton>*/}
			{/*	<NormalBorderButton onClick={onClickOkBtn}>*/}
			{/*		확인*/}
			{/*	</NormalBorderButton>*/}
			{/*</_Footer>*/}
		</_Container>
	);
};
DropdownBtnContainer.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	isOpened: PropTypes.bool.isRequired,
	onClickOkBtn: PropTypes.func.isRequired,
	onClickCancelBtn: PropTypes.func.isRequired,
	direction: PropTypes.oneOf(['left', 'right']),
};
export default DropdownBtnContainer;
