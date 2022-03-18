import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {DialogBox, DialogBoxFooter} from '../../../styles/components/dialogBox';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import RRM_GROUP from '../../../reducers/api/RRM/Group/group';
import {useDispatch} from 'react-redux';
import {isFulfilled} from '../../../utils/redux';
import ResourceGroup from '../../IAM/Policy/Components/Templates/PAM/Resource/ResourceGroup';

const _DialogBox = styled(DialogBox)`
	width: 404px;
`;

const selectResourceGroupDialogBox = {
	button: {
		confirm: '확인',
		cancel: '취소',
	},
};
/**************************************************
 * ambacc244 - 자원 그룹을 추가로 선택하기 위한 DialogBox
 **************************************************/
const SelectResourceGroupDialogBox = ({
	isOpened,
	setIsOpened,
	selected,
	setSelected,
}) => {
	const dispatch = useDispatch();
	//
	const [groups, setGroups] = useState([]);
	//addedSelection: 추가로 선택될 자원 그룹
	const [addedSelection, setAddedSelection] = useState([]);

	/**************************************************
	 * ambacc244 - 추가적인 자원 그룹 선택 취소
	 **************************************************/
	const onClickCloseDialogBox = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	/**************************************************
	 * ambacc244 - 선택한 자원 그룹들을 추가
	 **************************************************/
	const onSubmitAddSelection = useCallback(() => {
		console.log(selected, addedSelection);
		setSelected([...selected, ...addedSelection]);
		setIsOpened(false);
	}, [selected, addedSelection]);

	/**************************************************
	 * ambacc244 - root에 존재하는 그룹들을 불러오기
	 **************************************************/
	useEffect(() => {
		const getRootResourceGroups = async () => {
			const response = await dispatch(
				RRM_GROUP.asyncAction.findAllGroupAction({
					parentId: 'null',
				}),
			);

			if (isFulfilled(response)) setGroups(response.payload.data || []);
		};

		if (isOpened) {
			getRootResourceGroups();
			setAddedSelection([]);
		}
	}, [isOpened]);

	return (
		<_DialogBox
			isOpen={isOpened}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			{groups.map((v) => (
				<ResourceGroup
					key={v.id}
					selected={addedSelection}
					setSelect={setAddedSelection}
					disabledGroups={selected}
					data={v}
				/>
			))}

			<DialogBoxFooter>
				<TransparentButton onClick={onSubmitAddSelection}>
					{selectResourceGroupDialogBox.button.confirm}
				</TransparentButton>
				<NormalButton onClick={onClickCloseDialogBox}>
					{selectResourceGroupDialogBox.button.cancel}
				</NormalButton>
			</DialogBoxFooter>
		</_DialogBox>
	);
};

SelectResourceGroupDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	selected: PropTypes.array.isRequired,
	setSelected: PropTypes.func.isRequired,
};

export default SelectResourceGroupDialogBox;
