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
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.22);
	border-radius: 4px;
	border: 1px solid #e3e5e5;
	font-size: 14px;
	background: #ffffff;
`;

export const DialogBoxHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 41px;
	padding: 0px 8px 0px 16px;
	border-bottom: 1px solid #e3e5e5;
	font-weight: 500;
`;
export const DialogBoxFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 60px;
	padding: 13px 16px;
	box-sizing: border-box;
	border-top: 1px solid #e3e5e5;
`;

export const AlertDialogBox = styled(DialogBox)`
	z-index: 15;
`;

export const AlertDialogBoxContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	// width: 288px;
	height: 71px;
`;

export const AlertDialogBoxText = styled.div`
	margin-right: 8px;
`;
