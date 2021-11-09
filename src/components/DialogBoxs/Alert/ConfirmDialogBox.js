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
import {CheckDropDataType} from '../../../utils/dropTableDataCheck';
import {Icon, IconButton} from '../../../styles/components/icons';
import {
	confirmAlertMessages,
	alertMessageTypes,
} from '../../../utils/alertMessage';

export const checkDropTypeAlertMessage = (tableKey) => {
	switch (CheckDropDataType(tableKey)) {
		case 'users':
			return confirmAlertMessages.maxNumberOfUsers.key;
		case 'groups':
			return confirmAlertMessages.maxNumberOfGroups.key;
		case 'roles':
			return confirmAlertMessages.maxNumberOfRoles.key;
		case 'tags':
			return confirmAlertMessages.maxNumberOfTags.key;
		default:
			return confirmAlertMessages.maxNumberOfDatas.key;
	}
};

const ConfirmDialogBox = () => {
	const dispatch = useDispatch();
	const {alert} = useSelector(DIALOG_BOX.selector);

	const onClickCloseDialogBox = useCallback(() => {
		dispatch(DIALOG_BOX.action.closeAlert());
	}, [dispatch]);

	return (
		<AlertDialogBox
			isOpen={
				alert.open &&
				Object.prototype.hasOwnProperty.call(
					confirmAlertMessages,
					alert.key,
				)
			}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				{confirmAlertMessages[alert.key]?.type ===
				alertMessageTypes.alert ? (
					<div>Alert</div>
				) : (
					<div>Confirm</div>
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
				{confirmAlertMessages[alert.key]?.type ===
				alertMessageTypes.alert ? (
					<Icon>{alertIcon}</Icon>
				) : (
					<Icon>{confirmIcon}</Icon>
				)}
				<AlertDialogBoxText>
					{confirmAlertMessages[alert.key]?.message}
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

				{confirmAlertMessages[alert.key]?.type ===
				alertMessageTypes.alert ? (
					<WarningButton
						width={'120px'}
						margin={'0px 0px 0px 8px'}
						onClick={onClickCloseDialogBox}
					>
						Ok
					</WarningButton>
				) : (
					<NormalButton
						width={'120px'}
						margin={'0px 0px 0px 8px'}
						onClick={onClickCloseDialogBox}
					>
						Ok
					</NormalButton>
				)}
			</DialogBoxFooter>
		</AlertDialogBox>
	);
};

export default ConfirmDialogBox;
