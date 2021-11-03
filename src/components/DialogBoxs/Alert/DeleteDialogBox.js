import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {alertIcon, closeIcon} from '../../../icons/icons';

import DIALOG_BOX from '../../../reducers/dialogBoxs';
import {
	AlertDialogBox,
	AlertDialogBoxContent,
	AlertDialogBoxText,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../../styles/components/dialogBox';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import {Icon, IconButton} from '../../../styles/components/icons';
import {alertMessages} from './ConfirmDialogBox';

const DeleteDialogBox = () => {
	const dispatch = useDispatch();
	const {alert} = useSelector(DIALOG_BOX.selector);

	const alertMessages = {};

	const onClickCloseDialogBox = useCallback(() => {
		dispatch(DIALOG_BOX.action.closeAlert());
	}, [dispatch]);

	const handleOnClickDeleteEvents = useCallback(() => {}, []);

	return (
		<AlertDialogBox
			isOpen={
				alert.open &&
				Object.prototype.hasOwnProperty.call(alertMessages, alert.key)
			}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				<div>Warning Alert</div>
				<IconButton
					size={'sm'}
					color={'#212121'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<AlertDialogBoxContent>
				<Icon>{alertIcon}</Icon>
				<AlertDialogBoxText>
					{alertMessages[alert.key]}
					{/*ConfirmDialogBox.js 에는 아래처럼 작성되어 있습니다.*/}
					{/*{alertMessages[alert.key]?.message}*/}
				</AlertDialogBoxText>
			</AlertDialogBoxContent>

			<DialogBoxFooter>
				<TransparentButton
					width={'120px'}
					onClick={onClickCloseDialogBox}
				>
					Cancel
				</TransparentButton>
				<NormalButton
					width={'120px'}
					onClick={handleOnClickDeleteEvents}
				>
					Delete
				</NormalButton>
			</DialogBoxFooter>
		</AlertDialogBox>
	);
};

export default DeleteDialogBox;
