import React from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import Search from './Search';

const TableHeader = ({
	columns,
	data,
	pageSize,
	gotoPage,
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageCount,
	pageOptions,
	pageIndex,
	setPageSize,
	setGlobalFilter,
	onClickOpenSelectColumn,
}) => {
	return (
		<>
			<Search onSubmit={setGlobalFilter} />
			<Pagination
				onClickOpenSelectColumn={onClickOpenSelectColumn}
				pageSize={pageSize}
				setPageSize={setPageSize}
				gotoPage={gotoPage}
				canPreviousPage={canPreviousPage}
				previousPage={previousPage}
				nextPage={nextPage}
				canNextPage={canNextPage}
				pageCount={pageIndex}
				pageOptions={pageOptions}
				pageIndex={pageIndex}
			/>
		</>
	);
};
TableHeader.propTypes = {
	columns: PropTypes.array,
	data: PropTypes.array,
	pageSize: PropTypes.number.isRequired,
	gotoPage: PropTypes.func.isRequired,
	canPreviousPage: PropTypes.bool.isRequired,
	previousPage: PropTypes.func.isRequired,
	nextPage: PropTypes.func.isRequired,
	canNextPage: PropTypes.bool.isRequired,
	pageCount: PropTypes.number.isRequired,
	pageOptions: PropTypes.array.isRequired,
	pageIndex: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
	setGlobalFilter: PropTypes.func,
	onClickOpenSelectColumn: PropTypes.func.isRequired,
};
export default TableHeader;
