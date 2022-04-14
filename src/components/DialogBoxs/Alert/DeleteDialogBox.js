import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {alertIcon, closeIcon, confirmIcon} from '../../../icons/icons';
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
	WarningButton,
} from '../../../styles/components/buttons';
import {Icon, IconButton} from '../../../styles/components/icons';
import {
	alertMessageTypes,
	confirmAlertMessages,
	deleteAlertMessages,
} from '../../../utils/alertMessage';

const DeleteDialogBox = () => {
	const dispatch = useDispatch();
	const {alert} = useSelector(DIALOG_BOX.selector);

	const onClickCloseDialogBox = useCallback(() => {
		dispatch(DIALOG_BOX.action.closeAlert());
	}, [dispatch]);

	const onClickProcessDeleteAction = useCallback(() => {
		dispatch(DIALOG_BOX.action.closeAlert({isConfirmed: true}));
	}, [dispatch]);

	return (
		<AlertDialogBox
			isOpen={
				alert.open &&
				Object.prototype.hasOwnProperty.call(
					deleteAlertMessages,
					alert.value,
				)
			}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				{confirmAlertMessages[alert.value]?.type ===
				alertMessageTypes.confirm ? (
					<div>Confirm</div>
				) : (
					<div>Alert</div>
				)}
				<IconButton
					size={'sm'}
					color={'font'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<AlertDialogBoxContent>
				{confirmAlertMessages[alert.value]?.type ===
				alertMessageTypes.confirm ? (
					<Icon>{confirmIcon}</Icon>
				) : (
					<Icon>{alertIcon}</Icon>
				)}
				<AlertDialogBoxText>
					{deleteAlertMessages[alert.value]?.message}
				</AlertDialogBoxText>
			</AlertDialogBoxContent>

			<DialogBoxFooter>
				<TransparentButton
					width={'120px'}
					margin={'0px 8px 0px 0px'}
					onClick={onClickCloseDialogBox}
				>
					Cancel
				</TransparentButton>

				{confirmAlertMessages[alert.value]?.type ===
				alertMessageTypes.confirm ? (
					<NormalButton
						width={'120px'}
						margin={'0px 0px 0px 8px'}
						onClick={onClickProcessDeleteAction}
					>
						Delete
					</NormalButton>
				) : (
					<WarningButton
						width={'120px'}
						margin={'0px 0px 0px 8px'}
						onClick={onClickProcessDeleteAction}
					>
						Delete
					</WarningButton>
				)}
			</DialogBoxFooter>
		</AlertDialogBox>
	);
};

export default DeleteDialogBox;
