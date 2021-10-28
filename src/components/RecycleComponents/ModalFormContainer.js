import React, {useCallback} from 'react';
import {DialogBox} from '../../styles/components/dialogBox';
import {IconButton} from '../../styles/components/icons';
import {closeIcon} from '../../icons/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {NormalButton, TransparentButton} from '../../styles/components/buttons';
import {Span} from '../../styles/components/text';

const _DialogBox = styled(DialogBox)`
	border-radius: 4px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.22);
	border: solid 1px #e3e5e5;
	background-color: #fff;
`;

const _CancelBtn = styled(TransparentButton)`
	width: 120px;
`;
const _OkBtn = styled(NormalButton)`
	width: 120px;
`;

const _Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40px;
	padding: 0px 10px 0px 16px;
`;

const _Body = styled.div`
	padding: 16px;
	border-top: 1px solid #e3e5e5;
	border-bottom: 1px solid #e3e5e5;
`;

const _Footer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 13px 8px;
`;

const ModalFormContainer = ({
	isOpened,
	setIsOpened,
	title,
	children,
	onClickOkBtn,
	id,
}) => {
	const onClickCloseDialogBox = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	return (
		<_DialogBox
			isOpen={isOpened}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<_Header>
				<Span>{title}</Span>
				<IconButton
					margin={'0px'}
					size={'sm'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</_Header>
			<_Body>
				{React.Children.map(children, (child) => {
					return child;
				})}
			</_Body>

			<_Footer>
				<_CancelBtn onClick={onClickCloseDialogBox}>취소</_CancelBtn>
				{id ? (
					<_OkBtn form={id} type={'submit'}>
						저장
					</_OkBtn>
				) : (
					<_OkBtn onClick={onClickOkBtn}>저장</_OkBtn>
				)}
			</_Footer>
		</_DialogBox>
	);
};

ModalFormContainer.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	onClickOkBtn: PropTypes.func,
	id: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
		.isRequired,
};

export default ModalFormContainer;
