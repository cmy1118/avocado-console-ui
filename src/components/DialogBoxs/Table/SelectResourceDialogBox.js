import React, {useCallback, useMemo, useState} from 'react';
import {DialogBox, DialogBoxFooter} from '../../../styles/components/dialogBox';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';

const _DialogBox = styled(DialogBox)`
	width: 800px;
`;

const selectResourceGroupDialogBox = {
	button: {
		confirm: '확인',
		cancel: '취소',
	},
};

const SelectResourceDialogBox = ({
	isOpened,
	setIsOpened,
	selected,
	setSelected,
}) => {
	//addedSelection: 추가로 선택될 자원
	const [addedSelection, setAddedSelection] = useState([]);
	const tempData = useMemo(
		() => [
			{
				id: '1',
				group: '그룹 1 > 그룹 2',
				name: '자원 1',
				address: '023.233.123',
				protocol: 'SSH',
			},
			{
				id: '2',
				group: '그룹 1',
				name: '자원 2',
				address: '023.233.123',
				protocol: 'SSH',
			},
			{
				id: '3',
				group: '그룹 3',
				name: '자원 3',
				address: '023.233.123',
				protocol: 'SSH',
			},
		],
		[],
	);
	/**************************************************
	 * ambacc244 - 추가적인 자원 선택 취소
	 **************************************************/
	const onClickCloseDialogBox = useCallback(() => {
		//다이얼로그박스 닫기
		setIsOpened(false);
	}, [setIsOpened]);

	/**************************************************
	 * ambacc244 - 선택한 자원들을 추가
	 **************************************************/
	const onClickAddSelection = useCallback(() => {
		//선택된 자원에 추가로 선택된 자원 추가
		setSelected([
			...selected,
			...addedSelection[tableKeys.policy.add.pamTemplate.resource],
		]);
		//다이얼로그박스 닫기
		setIsOpened(false);
	}, [addedSelection, selected, setIsOpened, setSelected]);

	return (
		<_DialogBox
			isOpen={isOpened}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<Table
				columns={
					tableColumns[tableKeys.policy.add.pamTemplate.resource]
				}
				tableKey={tableKeys.policy.add.pamTemplate.resource}
				data={tempData}
				setSelect={setAddedSelection}
				isCheckBox
			/>
			<DialogBoxFooter>
				<TransparentButton onClick={onClickAddSelection}>
					{selectResourceGroupDialogBox.button.confirm}
				</TransparentButton>
				<NormalButton onClick={onClickCloseDialogBox}>
					{selectResourceGroupDialogBox.button.cancel}
				</NormalButton>
			</DialogBoxFooter>
		</_DialogBox>
	);
};

SelectResourceDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	selected: PropTypes.array.isRequired,
	setSelected: PropTypes.func.isRequired,
};

export default SelectResourceDialogBox;
