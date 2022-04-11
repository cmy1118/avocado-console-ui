import React from 'react';
import {DialogBoxFooter, DialogBoxHeader} from "../../../styles/components/dialogBox";
import {IconButton} from "../../../styles/components/icons";
import {closeIcon} from "../../../icons/icons";
import {NormalButton, TransparentButton} from "../../../styles/components/buttons";

const PolicyTemplateDialogBox = () => {

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
					// onClick={onClickCloseDialogBox}
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
	)
};

export default PolicyTemplateDialogBox;
