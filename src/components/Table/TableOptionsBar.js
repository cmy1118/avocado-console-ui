import PropTypes from 'prop-types';
import React, {useCallback, useState} from 'react';
import PageSizing from './Options/PageSizing';
import Pagination from './Options/Pagination';
import styled from 'styled-components';
import FilterColumnsContextMenu from '../ContextMenu/FilterColumnsContextMenu';
import SearchOptionsContextMenu from '../ContextMenu/SearchOptionsContextMenu';
import {NormalBorderButton} from '../../styles/components/buttons';

const _Container = styled.div`
	display: flex;
	justify-content: space-between;
`;

const _OptionContainer = styled.div`
	display: flex;
`;

const TableOptionsBar = ({
	tableKey,
	gotoPage,
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageOptions,
	pageIndex = 0,
	pageSize,
	setPageSize,
	isSearchable = false,
	isSearchFilterable = false,
	searchFilters,
	selectedSearchFilters,
	setSelectedSearchFilters,
	isRefreshable = false,
	isPageable = false,
	isNumberOfRowsAdjustable = false,
	isColumnFilterable = false,
	allColumns,
	filters,
	setAllFilters,
	getToggleHideAllColumnsProps,
	setHiddenColumns,
}) => {
	const [
		isSearchFilterContextMenuOpened,
		setIsSearchFilterContextMenuOpened,
	] = useState(false);
	const [
		isColumnFilterContextMenuOpened,
		setIsColumnFilterContextMenuOpened,
	] = useState(false);

	const onClickOpenSearchFilterContextMenu = useCallback(() => {
		setIsSearchFilterContextMenuOpened(true);
	}, [setIsColumnFilterContextMenuOpened]);
	const onClickOpenSelectColumnsContextMenu = useCallback(() => {
		setIsColumnFilterContextMenuOpened(true);
	}, [setIsColumnFilterContextMenuOpened]);

	return (
		<_Container>
			<_OptionContainer>
				{/*{isSearchable <Search/>}*/}
				{isSearchFilterable && (
					<div>
						<NormalBorderButton
							onClick={onClickOpenSearchFilterContextMenu}
						>
							필터 추가
						</NormalBorderButton>
						{isSearchFilterContextMenuOpened && (
							<SearchOptionsContextMenu
								isOpened={isSearchFilterContextMenuOpened}
								setIsOpened={setIsSearchFilterContextMenuOpened}
								allOptions={searchFilters}
								selectedOptions={selectedSearchFilters}
								setSelectedOptions={setSelectedSearchFilters}
								filters={filters}
								setAllFilters={setAllFilters}
							/>
						)}
					</div>
				)}
			</_OptionContainer>
			<_OptionContainer>
				{/*{isRefreshable <Refresher/>}*/}
				{isPageable && (
					<Pagination
						gotoPage={gotoPage}
						canPreviousPage={canPreviousPage}
						previousPage={previousPage}
						nextPage={nextPage}
						canNextPage={canNextPage}
						pageCount={pageIndex}
						pageOptions={pageOptions}
						pageIndex={pageIndex}
					/>
				)}
				{isNumberOfRowsAdjustable && (
					<PageSizing pageSize={pageSize} setPageSize={setPageSize} />
				)}
				{isColumnFilterable && (
					<div>
						<button onClick={onClickOpenSelectColumnsContextMenu}>
							{'✅'}
						</button>
						<FilterColumnsContextMenu
							isOpened={isColumnFilterContextMenuOpened}
							setIsOpened={setIsColumnFilterContextMenuOpened}
							allColumns={allColumns}
							getToggleHideAllColumnsProps={
								getToggleHideAllColumnsProps
							}
							setHiddenColumns={setHiddenColumns}
						/>
					</div>
				)}
			</_OptionContainer>
		</_Container>
	);
};

TableOptionsBar.propTypes = {
	tableKey: PropTypes.string.isRequired,
	isSearchable: PropTypes.bool.isRequired,
	isSearchFilterable: PropTypes.bool.isRequired,
	searchFilters: PropTypes.array.isRequired,
	selectedSearchFilters: PropTypes.array.isRequired,
	setSelectedSearchFilters: PropTypes.func.isRequired,
	isRefreshable: PropTypes.bool.isRequired,
	isPageable: PropTypes.bool.isRequired,
	isNumberOfRowsAdjustable: PropTypes.bool.isRequired,
	isColumnFilterable: PropTypes.bool.isRequired,
	gotoPage: PropTypes.func.isRequired,
	canPreviousPage: PropTypes.bool.isRequired,
	previousPage: PropTypes.func.isRequired,
	nextPage: PropTypes.func.isRequired,
	canNextPage: PropTypes.bool.isRequired,
	pageCount: PropTypes.number,
	pageOptions: PropTypes.array.isRequired,
	pageIndex: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
	allColumns: PropTypes.array.isRequired,
	filters: PropTypes.array.isRequired,
	setAllFilters: PropTypes.func.isRequired,
	getToggleHideAllColumnsProps: PropTypes.func.isRequired,
	setHiddenColumns: PropTypes.func.isRequired,
};

export default TableOptionsBar;
