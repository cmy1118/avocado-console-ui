import React, {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useRootClose} from 'react-overlays';
import CheckBoxContainer from '../RecycleComponents/CheckBoxContainer';
import DropdownBtnContainer from '../RecycleComponents/DropdownBtnContainer';

const _CheckboxContainer = styled.div`
	height: 32px;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0px 10px;
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
	cursor: pointer;
`;

const SearchOptionsContextMenu = ({
	isOpened,
	setIsOpened,
	allOptions,
	selectedOptions,
	setSelectedOptions,
	filters,
	setAllFilters,
}) => {
	const [tempSelectedOptions, setTempSelectedOptions] = useState(
		selectedOptions,
	);

	const onClickSetCheck = useCallback(
		(columns) => (e) => {
			e.stopPropagation();
			console.log(columns);
			if (tempSelectedOptions.includes(columns))
				setTempSelectedOptions(
					tempSelectedOptions.filter((v) => v !== columns),
				);
			else setTempSelectedOptions([...tempSelectedOptions, columns]);
		},
		[tempSelectedOptions],
	);

	const onClickCloseContextMenu = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	const onClickApplyFilters = useCallback(() => {
		setSelectedOptions(tempSelectedOptions);
		setAllFilters(
			filters.filter((v) => tempSelectedOptions.includes(v.id)),
		);
		onClickCloseContextMenu();
	}, [
		setSelectedOptions,
		tempSelectedOptions,
		setAllFilters,
		filters,
		onClickCloseContextMenu,
	]);

	return (
		<DropdownBtnContainer
			title={'조회 필터 추가'}
			isOpened={isOpened}
			onClickOkBtn={onClickApplyFilters}
			onClickCancelBtn={onClickCloseContextMenu}
		>
			<>
				{allOptions.map((column) => (
					<_CheckboxContainer
						key={column.accessor}
						onClick={onClickSetCheck(column.accessor)}
					>
						<CheckBoxContainer title={column.Header}>
							<input
								type='checkbox'
								checked={tempSelectedOptions.includes(
									column.accessor,
								)}
								readOnly
							/>
						</CheckBoxContainer>
					</_CheckboxContainer>
				))}
			</>
		</DropdownBtnContainer>
	);
};
SearchOptionsContextMenu.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	allOptions: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	setSelectedOptions: PropTypes.func.isRequired,
	filters: PropTypes.array.isRequired,
	setAllFilters: PropTypes.func.isRequired,
};
export default SearchOptionsContextMenu;
