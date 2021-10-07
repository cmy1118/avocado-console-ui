import PropTypes from 'prop-types';
import React from 'react';
import PageSizing from '../Tableheader/components/PageSizing';
import SelectColumn from '../Tableheader/components/SelectColumn';
import Pagination from '../Tableheader/components/Pagination';

const DnDTableHeader = ({
	tableKey,
	gotoPage,
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageOptions,
	pageIndex,
	pageSize,
	setPageSize,
	onClickOpenSelectColumn,
	isSearchable,
	isSearchFilterable,
	isRefreshable,
	isPageable,
	isNumberOfRowsAdjustable,
	isColumnFilterable,
}) => {
	return (
		<>
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
				<PageSizing setPageSize={setPageSize} pageSize={pageSize} />
			)}
			{isColumnFilterable && (
				<SelectColumn
					onClickOpenSelectColumn={onClickOpenSelectColumn}
				/>
			)}
		</>
	);
};
DnDTableHeader.propTypes = {
	tableKey: PropTypes.string.isRequired,
	gotoPage: PropTypes.func.isRequired,
	canPreviousPage: PropTypes.bool.isRequired,
	previousPage: PropTypes.func.isRequired,
	nextPage: PropTypes.func.isRequired,
	canNextPage: PropTypes.bool.isRequired,
	pageCount: PropTypes.number.isRequired,
	pageOptions: PropTypes.array.isRequired,
	pageIndex: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
	onClickOpenSelectColumn: PropTypes.func,
	isSearchable: PropTypes.bool,
	isSearchFilterable: PropTypes.bool,
	isRefreshable: PropTypes.bool,
	isPageable: PropTypes.bool,
	isNumberOfRowsAdjustable: PropTypes.bool,
	isColumnFilterable: PropTypes.bool,
};

export default DnDTableHeader;
