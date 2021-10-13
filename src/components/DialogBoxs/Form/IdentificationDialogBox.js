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

const IdentificationDialogBox = ({isOpened, setIsOpened}) => {
	const dispatch = useDispatch();

	const [name, onChangeName] = useInput('');
	const [description, onChangeDescription] = useInput('');

	const onClickCloseDialogBox = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	const onSubmitForm = useCallback(() => {
		setIsOpened(false);
		console.log('인증 완료 api 받아서 패스워드 변경 폼 open 처리');
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
				<button type='button'>인증번호 전송</button>
				<input
					type='number'
					placeholder={'인증번호 입력'}
					onChange={onChangeDescription}
					required
				/>
				<button>인증하기</button>
			</Form>

			<DialogBoxFooter>
				<button onClick={onClickCloseDialogBox}>Cancel</button>
				<button onClick={onSubmitForm}>Save</button>
			</DialogBoxFooter>
		</DialogBox>
	);
};

IdentificationDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};

export default IdentificationDialogBox;
