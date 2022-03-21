import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
	NormalButton,
	TransparentButton,
} from '../../../../../../../styles/components/buttons';
import {tableColumns} from '../../../../../../../Constants/Table/columns';
import {tableKeys} from '../../../../../../../Constants/Table/keys';
import Table from '../../../../../../Table/Table';
import SelectResourceDialogBox from '../../../../../../DialogBoxs/Table/SelectResourceDialogBox';

const _ButtonContianer = styled.div`
	display: flex;
`;

const resourceTableContainer = {
	button: {
		add: '추가',
		delete: '삭제',
	},
};

/**************************************************
 * ambacc244 - 선택된 자원을 테이블에 보여주는 컴포넌트
 **************************************************/
const ResourceTableContainer = ({selected, setSelected}) => {
	const [isOpened, setIsOpened] = useState(false);
	const [deselected, setDeseleted] = useState({});

	/**************************************************
	 * ambacc244 - 자원을 추가로 선택해 추가 하기 위한 DialogBox 열기
	 **************************************************/
	const onClickAddResourceSelection = useCallback(() => {
		setIsOpened(true);
	}, []);

	/**************************************************
	 * ambacc244 - 체크된 자원을 선택 해제
	 **************************************************/
	const onClickDeselectResourceGroup = useCallback(() => {
		setSelected(
			selected.filter(
				(v) =>
					!deselected[
						tableKeys.policy.add.pamTemplate.resource
					].includes(v),
			),
		);
	}, [deselected, selected]);

	return (
		<div>
			<_ButtonContianer>
				<NormalButton onClick={onClickAddResourceSelection}>
					{resourceTableContainer.button.add}
				</NormalButton>
				<TransparentButton onClick={onClickDeselectResourceGroup}>
					{resourceTableContainer.button.delete}
				</TransparentButton>
			</_ButtonContianer>
			<Table
				columns={
					tableColumns[tableKeys.policy.add.pamTemplate.resource]
				}
				tableKey={tableKeys.policy.add.pamTemplate.resource}
				data={selected}
				isCheckBox
				setSelect={setDeseleted}
			/>
			<SelectResourceDialogBox
				setIsOpened={setIsOpened}
				isOpened={isOpened}
				selected={selected}
				setSelected={setSelected}
			/>
		</div>
	);
};

ResourceTableContainer.propTypes = {
	selected: PropTypes.array.isRequired,
	setSelected: PropTypes.func.isRequired,
};

export default ResourceTableContainer;
