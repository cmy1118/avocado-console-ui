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

const WarningDialogBox = () => {
	const dispatch = useDispatch();
	const {alert} = useSelector(DIALOG_BOX.selector);

	const alertMessages = {
		duplicateGroupTypes: '그룹 유형별 1개의 그룹만 추가 가능합니다.',
		maxNumberOfGroups: '최대 10개의 그룹만 추가 가능합니다.',
		maxNumberOfRoles: '최대 10개의 권한만 부여 가능합니다.',
		maxNumberOfTags: '최대 10개의 태그만 등록 가능합니다.',
	};

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
				<button onClick={onClickCloseDialogBox}>Ok</button>
			</DialogBoxFooter>
		</AlertDialogBox>
	);
};

export default WarningDialogBox;
