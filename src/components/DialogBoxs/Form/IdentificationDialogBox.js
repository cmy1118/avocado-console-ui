import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
	DialogBox,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../../styles/components/dialogBox';
import {IconButton} from '../../../styles/components/icons';
import useInput from '../../../hooks/useInput';
import {closeIcon} from '../../../icons/icons';
import Form from '../../RecycleComponents/Form';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';

const _DialogBox = styled(DialogBox)`
	width: 404px;
`;

const _Form = styled(Form)`
	height: 176px;
`;

const IdentificationDialogBox = ({isOpened, setIsOpened}) => {
	const [name, onChangeName] = useInput('');
	const [description, onChangeDescription] = useInput('');

	const onClickCloseDialogBox = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	const onSubmitForm = useCallback(() => {
		setIsOpened(false);
		//		console.log('인증 완료 api 받아서 패스워드 변경 폼 open 처리');
	}, [description, name]);

	return (
		<_DialogBox
			isOpen={isOpened}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				<div>본인 확인</div>
				<IconButton
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<_Form onSubmit={onSubmitForm}>
				<div>
					<input
						type='text'
						placeholder={'E-mail 주소'}
						onChange={onChangeName}
						required
					/>
					<NormalButton type='button'>인증번호 전송</NormalButton>
				</div>
				<div>
					<input
						type='number'
						placeholder={'인증번호 입력'}
						onChange={onChangeDescription}
						required
					/>
					<NormalButton>인증하기</NormalButton>
				</div>
			</_Form>

			<DialogBoxFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					Cancel
				</TransparentButton>
				<NormalButton onClick={onSubmitForm}>Save</NormalButton>
			</DialogBoxFooter>
		</_DialogBox>
	);
};

IdentificationDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};

export default IdentificationDialogBox;
