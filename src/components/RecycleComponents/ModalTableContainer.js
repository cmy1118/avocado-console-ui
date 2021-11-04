import React, {useCallback} from 'react';
import {
	DialogBox,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../styles/components/dialogBox';
import {IconButton} from '../../styles/components/icons';
import {closeIcon} from '../../icons/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {NormalButton, TransparentButton} from '../../styles/components/buttons';

const _DialogBox = styled(DialogBox)`
	position: relative;
	width: 70%;
	border: 1px solid;
	background: white;
	height: 80vh;
	overflow: scroll;
`;

const _DialogBoxHeader = styled(DialogBoxHeader)`
	position: sticky;
	background: #fff;
	top: 0;
`;

const _DialogBoxFooter = styled(DialogBoxFooter)`
	position: sticky;
	background: #fff;
	bottom: 0;
`;

const ModalTableContainer = ({
	isOpened,
	setIsOpened,
	title,
	children,
	handleSubmit,
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
			<_DialogBoxHeader>
				<div>{title}</div>
				<IconButton onClick={onClickCloseDialogBox}>
					{closeIcon}
				</IconButton>
			</_DialogBoxHeader>

			{React.Children.map(children, (child) => {
				return child;
			})}

			<_DialogBoxFooter>
				<NormalButton onClick={handleSubmit} type={'submit'}>
					Save
				</NormalButton>
				<TransparentButton
					type={'button'}
					onClick={onClickCloseDialogBox}
				>
					Cancel
				</TransparentButton>
			</_DialogBoxFooter>
		</_DialogBox>
	);
};

ModalTableContainer.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
		.isRequired,
};

export default ModalTableContainer;
