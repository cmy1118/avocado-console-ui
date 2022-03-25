import React, {useCallback, useState} from 'react';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../../../styles/components/buttons';
import Table from '../../../../../../Table/Table';
import {tableColumns} from '../../../../../../../Constants/Table/columns';
import {tableKeys} from '../../../../../../../Constants/Table/keys';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SelectResourceGroupDialogBox from '../../../../../../DialogBoxs/Table/SelectResourceGroupDialogBox';
import useSelectColumn from '../../../../../../../hooks/table/useSelectColumn';

const _ButtonContianer = styled.div`
	display: flex;
`;

const resourceGrooupTableContainer = {
	button: {
		add: '추가',
		delete: '삭제',
	},
};

/**************************************************
 * ambacc244 - 선택된 자원 그룹을 테이블에 보여주는 컴포넌트
 **************************************************/
const ResourceGrooupTableContainer = ({selected, setSelected}) => {
	const [isOpened, setIsOpened] = useState(false);
	const [select, columns] = useSelectColumn(
		tableColumns[tableKeys.policy.add.pamTemplate.resoureGroup],
	);

	/**************************************************
	 * ambacc244 - 자원 그룹을 추가로 선택해 추가 하기 위한 DialogBox 열기
	 **************************************************/
	const onClickAddResourceSelection = useCallback(() => {
		setIsOpened(true);
	}, []);

	/**************************************************
	 * ambacc244 - 체크된 자원 그룹을 선택 해제
	 **************************************************/
	const onClickDeselectResourceGroup = useCallback(() => {
		setSelected((prev) => prev.filter((p) => !select.includes(p)));
	}, [select, setSelected]);

	return (
		<div>
			<_ButtonContianer>
				<NormalButton onClick={onClickAddResourceSelection}>
					{resourceGrooupTableContainer.button.add}
				</NormalButton>
				<TransparentButton onClick={onClickDeselectResourceGroup}>
					{resourceGrooupTableContainer.button.delete}
				</TransparentButton>
			</_ButtonContianer>

			<Table
				data={selected}
				columns={columns}
				tableKey={tableKeys.policy.add.pamTemplate.resoureGroup}
			/>

			<SelectResourceGroupDialogBox
				setIsOpened={setIsOpened}
				isOpened={isOpened}
				selected={selected}
				setSelected={setSelected}
			/>
		</div>
	);
};

ResourceGrooupTableContainer.propTypes = {
	selected: PropTypes.array.isRequired,
	setSelected: PropTypes.func.isRequired,
};

export default ResourceGrooupTableContainer;
