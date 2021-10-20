import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {closeIcon} from '../../../icons/icons';

import DIALOG_BOX from '../../../reducers/dialogBoxs';
import {
	AlertDialogBox,
	AlertDialogBoxContent,
	AlertDialogBoxText,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../../styles/components/dialogBox';

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
				<button onClick={onClickCloseDialogBox}>{closeIcon}</button>
			</DialogBoxHeader>

			<AlertDialogBoxContent>
				<AlertDialogBoxText>
					{alertMessages[alert.key]}
				</AlertDialogBoxText>
			</AlertDialogBoxContent>

			<DialogBoxFooter>
				<button onClick={onClickCloseDialogBox}>Cancel</button>
				<button onClick={handleOnClickDeleteEvents}>Delete</button>
			</DialogBoxFooter>
		</AlertDialogBox>
	);
};

export default DeleteDialogBox;
