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
	width: 70%;
	height: 80vh;
	display: flex;
	flex-direction: column;
`;

const _DialogBoxContent = styled.div`
	flex: 1;
	// padding: 16px;
	overflow-y: scroll;
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

	const onSubmitCreateUser = useCallback(() => {
		setIsOpened(false);
		handleSubmit();
	}, [handleSubmit, setIsOpened]);

	return (
		<_DialogBox
			isOpen={isOpened}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				<div>{title}</div>
				<IconButton color={'font'} onClick={onClickCloseDialogBox}>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<_DialogBoxContent>
				{React.Children.map(children, (child) => {
					return child;
				})}
			</_DialogBoxContent>

			<DialogBoxFooter>
				<NormalButton
					width={'120px'}
					margin={'0px 8px 0px 0px'}
					onClick={onSubmitCreateUser}
					type={'submit'}
				>
					Save
				</NormalButton>
				<TransparentButton
					type={'button'}
					width={'120px'}
					margin={'0px 0px 0px 8px'}
					onClick={onClickCloseDialogBox}
				>
					Cancel
				</TransparentButton>
			</DialogBoxFooter>
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
