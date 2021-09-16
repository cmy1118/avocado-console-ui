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
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	pageSize: PropTypes.number.isRequired,
	gotoPage: PropTypes.func.isRequired,
	canPreviousPage: PropTypes.array.isRequired,
	previousPage: PropTypes.array.isRequired,
	nextPage: PropTypes.array.isRequired,
	canNextPage: PropTypes.array.isRequired,
	pageCount: PropTypes.number.isRequired,
	pageOptions: PropTypes.array.isRequired,
	pageIndex: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
	setGlobalFilter: PropTypes.func.isRequired,
	onClickOpenSelectColumn: PropTypes.func.isRequired,
};
export default TableHeader;
