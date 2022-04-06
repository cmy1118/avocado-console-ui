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

/**************************************************
 * roberto - 주석 작성해주세요!
 ***************************************************/
const Modal = ({modalOption, hiddenFooter = false}) => {
	// element의 위치를 읽어오기 위한 ref
	const ref = useRef(null);

	// 스크린 넓이와 element의 위치를 계산한 element가 위치할 position
	const [position, setPosition] = useState({x: '', y: ''});
	// element의 현재위치를 결정하기 위한 초기 element의 위치
	const [initial, setInitial] = useState(null);
	// window의 width, height
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	/**************************************************
	 * seob - 윈도우 크기 변경시 setWindowSize하는 함수
	 * (디바운스 적용으로 px단위로 호출하지 않음)
	 ***************************************************/
	const handleResize = _.debounce(() => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, 1000);

	/**************************************************
	 * seob - window 사이즈를 계산하는 effect
	 ***************************************************/
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			// cleanup
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	/**************************************************
	 * seob - window 사이즈 변화를 감지하여 element 위치 설정
	 ***************************************************/
	useEffect(() => {
		if (initial) {
			const x = initial.right > windowSize.width ? 'left' : 'right';
			const y = initial.bottom > windowSize.height ? 'top' : 'bottom';

			setPosition({x, y});
		}
	}, [initial, windowSize]);

	/**************************************************
	 * seob - 초기 element위치 설정
	 ***************************************************/
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
