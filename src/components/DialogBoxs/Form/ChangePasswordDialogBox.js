import React, {useCallback} from 'react';
import {
	DialogBox,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../../styles/components/dialogBox';
import {IconButton} from '../../../styles/components/icons';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput';
import {closeIcon} from '../../../icons/icons';
import {useDispatch} from 'react-redux';
import Form from '../../RecycleComponents/Form';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';

const ChangePasswordDialogBox = ({isOpened, setIsOpened}) => {
	const dispatch = useDispatch();

	const [name, onChangeName] = useInput('');
	const [description, onChangeDescription] = useInput('');

	const onClickCloseDialogBox = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	const onSubmitForm = useCallback(() => {
		console.log(name, description);

		setIsOpened(false);
	}, [description, name]);

	return (
		<DialogBox
			isOpen={isOpened}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				<div>Identification Dialog Box</div>
				<IconButton onClick={onClickCloseDialogBox}>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<Form onSubmit={onSubmitForm}>
				<input
					type='text'
					placeholder={'E-mail 주소'}
					onChange={onChangeName}
					required
				/>
				<input
					type='text'
					placeholder={'E-mail 주소'}
					onChange={onChangeName}
					required
				/>
				<input
					type='text'
					placeholder={'E-mail 주소'}
					onChange={onChangeName}
					required
				/>
			</Form>

			<DialogBoxFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					Cancel
				</TransparentButton>
				<NormalButton onClick={onSubmitForm}>Save</NormalButton>
			</DialogBoxFooter>
		</DialogBox>
	);
};

ChangePasswordDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};

export default ChangePasswordDialogBox;
