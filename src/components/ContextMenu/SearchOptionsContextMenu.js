import React, {useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DropdownBtnContainer from '../RecycleComponents/DropdownBtnContainer';
import CheckBox from '../RecycleComponents/New/CheckBox';

const _CheckboxContainer = styled.div`
	height: 32px;
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
	allColumns,
	selectedOptions, //선택된 필터 옵션들
	setSelectedOptions,
	filters, // 필터링될 값
	setAllFilters,
}) => {
	const [tempSelectedOptions, setTempSelectedOptions] = useState(
		selectedOptions,
	);

	const allOptions = useMemo(() => {
		return allColumns.filter(
			(v) =>
				Object.prototype.hasOwnProperty.call(v, 'filter') &&
				v.isVisible === true,
		);
	}, [allColumns]);

	const onClickSelectFilter = useCallback(
		(columns) => (e) => {
			e.stopPropagation();
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
			{allOptions.map((column) => (
				<_CheckboxContainer
					key={column.id}
					onClick={onClickSelectFilter(column.id)}
				>
					<CheckBox
						label={column.Header}
						checked={tempSelectedOptions.includes(column.id)}
						readOnly
					/>
				</_CheckboxContainer>
			))}
		</DropdownBtnContainer>
	);
};
SearchOptionsContextMenu.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	allColumns: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	setSelectedOptions: PropTypes.func.isRequired,
	filters: PropTypes.array.isRequired,
	setAllFilters: PropTypes.func.isRequired,
};
export default SearchOptionsContextMenu;
