import React, {useCallback, useEffect} from 'react';
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
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';

//type: 'alert' or 'confirm'
const alertMessages = {
	duplicateGroupTypes: {
		type: 'alert',
		message: '그룹 유형별 1개의 그룹만 추가 가능합니다.',
	},
	maxNumberOfGroups: {
		type: 'alert',
		message: '최대 10개의 그룹만 추가 가능합니다.',
	},
	maxNumberOfRoles: {
		type: 'alert',
		message: '최대 10개의 권한만 부여 가능합니다.',
	},
	maxNumberOfTags: {
		type: 'alert',
		message: '최대 10개의 태그만 등록 가능합니다.',
	},
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
				Object.prototype.hasOwnProperty.call(alertMessages, alert.key)
			}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				{alertMessages[alert.key]?.type === 'alert' && <div>Alert</div>}
				{alertMessages[alert.key]?.type === 'confirm' && (
					<div>Confirm</div>
				)}
				<button onClick={onClickCloseDialogBox}>{closeIcon}</button>
			</DialogBoxHeader>

			<AlertDialogBoxContent>
				<AlertDialogBoxText>
					{alertMessages[alert.key]?.message}
				</AlertDialogBoxText>
			</AlertDialogBoxContent>

			<DialogBoxFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					Cancel
				</TransparentButton>
				<NormalButton onClick={onClickCloseDialogBox}>Ok</NormalButton>
			</DialogBoxFooter>
		</AlertDialogBox>
	);
};

export default ConfirmDialogBox;
