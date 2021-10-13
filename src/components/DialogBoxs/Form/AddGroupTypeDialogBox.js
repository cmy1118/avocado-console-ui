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
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import Form from '../../RecycleComponents/Form';

const AddGroupTypeDialogBox = ({isOpened, setIsOpened}) => {
	const dispatch = useDispatch();

	const [name, onChangeName] = useInput('');
	const [description, onChangeDescription] = useInput('');

	const onClickCloseDialogBox = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	const onSubmitForm = useCallback(() => {
		console.log(name, description);

		dispatch(
			IAM_USER_GROUP_TYPE.action.addGroupType({
				name: name,
				parentId: null,
				description: description,
			}),
		);
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
				<div>Add Group Type Dialog Box</div>
				<IconButton onClick={onClickCloseDialogBox}>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<Form onSubmit={onSubmitForm}>
				<input
					type='text'
					placeholder={'그룹 유형'}
					onChange={onChangeName}
					required
				/>
				<textarea
					placeholder={'설명'}
					onChange={onChangeDescription}
					required
				/>
			</Form>

			<DialogBoxFooter>
				<button onClick={onClickCloseDialogBox}>Cancel</button>
				<button onClick={onSubmitForm}>Save</button>
			</DialogBoxFooter>
		</DialogBox>
	);
};

AddGroupTypeDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};

export default AddGroupTypeDialogBox;
