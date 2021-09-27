import styled from 'styled-components';
import Modal from 'react-modal';

export const DialogBox = styled(Modal)`
	z-index: 10;
	position: absolute;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
`;
export const DialogBoxHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;
export const DialogBoxFooter = styled.div``;
