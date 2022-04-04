import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	DialogBox,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../../styles/components/dialogBox';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import RRM_GROUP from '../../../reducers/api/RRM/Group/group';
import {useDispatch} from 'react-redux';
import {isFulfilled} from '../../../utils/redux';
import ResourceGroup from '../../IAM/Policy/Components/Templates/PAM/Resource/ResourceGroup';
import {Icon, IconButton} from '../../../styles/components/icons';
import {closeIcon, searchIcon} from '../../../icons/icons';
import TextBox from '../../RecycleComponents/New/TextBox';
import Form from '../../RecycleComponents/New/Form';

const _DialogBox = styled(DialogBox)`
	display: flex;
	flex-direction: column;
	width: 400px;
	height: 500px;
`;

const _Contents = styled.div`
	flex: 1;
`;

const selectResourceGroupDialogBox = {
	title: '자원 그룹 추가',
	searchBar: {placeholder: '그룹 이름'},
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
	const searchRef = useRef(null);
	//groups: 화면에 나타나는 그룹들
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
		setSelected((prev) => [...prev, ...addedSelection]);
		setIsOpened(false);
	}, [addedSelection]);

	/**************************************************
	 * ambacc244 - 자원 그룹 검색
	 **************************************************/
	const onSubmitSearchVal = useCallback((v) => {
		console.log(v.search);
		//TODO: 그룹 검색
	}, []);

	/**************************************************
	 * ambacc244 - root에 존재하는 그룹들을 불러오기
	 **************************************************/
	useEffect(() => {
		const getRootResourceGroups = async () => {
			const res = await dispatch(
				RRM_GROUP.asyncAction.findAllGroupAction({
					parentId: 'null',
				}),
			);
			//요청에 대한 응답 성공
			if (isFulfilled(res)) setGroups(res.payload.data || []);
		};
		//다이얼로그박스가 열림
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
			<DialogBoxHeader>
				<div>{selectResourceGroupDialogBox.title}</div>
				<IconButton onClick={onClickCloseDialogBox}>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<_Contents>
				<Form
					onSubmit={onSubmitSearchVal}
					innerRef={searchRef}
					initialValues={{search: ''}}
				>
					<TextBox
						placeholder={
							selectResourceGroupDialogBox.searchBar.placeholder
						}
						front={
							<Icon size={'sm'} margin_right={'0px'}>
								{searchIcon}
							</Icon>
						}
						name={'search'}
					/>
				</Form>

				{groups.map((v) => (
					<ResourceGroup
						key={v.id}
						selected={addedSelection}
						setSelect={setAddedSelection}
						disabledGroups={selected}
						data={v}
					/>
				))}
			</_Contents>

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
