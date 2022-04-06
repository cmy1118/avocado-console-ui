import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import {
	NormalBorderButton,
	TransparentBorderButton,
} from '../../styles/components/buttons';
import {PositionRelativeDiv} from '../../styles/components/style';

const _Container = styled.div`
	z-index: 99;
	position: absolute;
	top: 10px;
	right: ${(props) => (props?.position.x === 'right' ? 'initial' : '0px')};
	left: ${(props) => (props.position.x === 'left' ? 'initial' : '0px')};
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
const Modal = ({modalOption, hiddenFooter = false}) => {
	const ref = useRef(null);

	const [position, setPosition] = useState({x: '', y: ''});
	const [initial, setInitial] = useState(null);

	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	// handleResize 함수를 debounce로 감싸고, 시간을 설정한다
	// 1000ms = 1sec
	const handleResize = _.debounce(() => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, 1000);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			// cleanup
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	useEffect(() => {
		// if (!ref.current) return;
		// window.addEventListener('scroll', yScrollEvent);
		// return () => {
		// 	window.removeEventListener('scroll', yScrollEvent);
		// };
		console.log(windowSize);

		// if (ref.current) {
		// 	const domRect = ref.current;
		// 	const position = domRect.getBoundingClientRect();

		// console.log(position);
		if (initial) {
			const x = initial.right > windowSize.width ? 'left' : 'right';
			const y = initial.bottom > windowSize.height ? 'top' : 'bottom';

			setPosition({x, y});
		}
		// }
	}, [initial, windowSize]);

	useEffect(() => {
		if (!initial) {
			if (ref.current) {
				const domRect = ref.current;
				const position = domRect.getBoundingClientRect();
				setInitial(position);
			}
		}
	}, [initial]);

	return (
		<PositionRelativeDiv>
			{modalOption?.show && (
				<_Container ref={ref} position={position}>
					<Background onClick={() => modalOption.onClose()} />

					{modalOption.title && (
						<_Header>
							<span>{modalOption.title}</span>
						</_Header>
					)}
					<_Content>{modalOption?.element}</_Content>
					{!hiddenFooter && (
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
					)}
				</_Container>
			)}
		</PositionRelativeDiv>
	);
};
Modal.propTypes = {
	modalOption: PropTypes.object.isRequired,
	hiddenFooter: PropTypes.bool,
};

export default Modal;
