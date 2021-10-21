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

const _DialogBox = styled(DialogBox)`
	padding: 50px;
	background: lightgray;
`;

const ModalFormContainer = ({
	isOpened,
	setIsOpened,
	title,
	formKey,
	children,
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
			<DialogBoxHeader>
				<div>{title}</div>
				<IconButton onClick={onClickCloseDialogBox}>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			{React.Children.map(children, (child) => {
				return child;
			})}

			<DialogBoxFooter>
				<button type={'button'} onClick={onClickCloseDialogBox}>
					Cancel
				</button>
				<button form={formKey} type={'submit'}>
					Save
				</button>
			</DialogBoxFooter>
		</_DialogBox>
	);
};

ModalFormContainer.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	formKey: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
		.isRequired,
};

export default ModalFormContainer;
