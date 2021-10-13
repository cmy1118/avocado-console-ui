import PropTypes from 'prop-types';
import React, {useCallback, useState} from 'react';
import PageSizing from './Options/PageSizing';
import ColumnFilter from './Options/ColumnFilter';
import Pagination from './Options/Pagination';
import styled from 'styled-components';
import FilterColumnsContextMenu from '../ContextMenu/FilterColumnsContextMenu';

const _Container = styled.div`
	display: flex;
`;

const TableOptionsBar = ({
	tableKey,
	isSearchable = false,
	isSearchFilterable = false,
	isRefreshable = false,
	isPageable = false,
	isNumberOfRowsAdjustable = false,
	isColumnFilterable = false,
	gotoPage,
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageOptions,
	pageIndex = 0,
	pageSize,
	setPageSize,
	allColumns,
}) => {
	const [
		isColumnFilterContextMenuOpened,
		setIsColumnFilterContextMenuOpened,
	] = useState(false);

	const onClickSelectColumns = useCallback(() => {
		setIsColumnFilterContextMenuOpened(true);
	}, [setIsColumnFilterContextMenuOpened]);

	return (
		<_Container>
			{/*{isSearchable <Search/>}*/}
			{/*{isSearchFilterable <SearchFilter/>}*/}
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
					<ColumnFilter
						onClickOpenSelectColumn={onClickSelectColumns}
					/>
					<FilterColumnsContextMenu
						isOpened={isColumnFilterContextMenuOpened}
						setIsOpened={setIsColumnFilterContextMenuOpened}
						allColumns={allColumns}
					/>
				</div>
			)}
		</_Container>
	);
};
TableOptionsBar.propTypes = {
	tableKey: PropTypes.string.isRequired,
	isSearchable: PropTypes.bool.isRequired,
	isSearchFilterable: PropTypes.bool.isRequired,
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
};

export default TableOptionsBar;
