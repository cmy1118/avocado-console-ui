import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Pagination from './components/Pagination';
import SelectColumn from './components/SelectColumn';
import PageSizing from './components/PageSizing';

const TableHeader = ({
	pageSize,
	gotoPage,
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageOptions,
	pageIndex,
	setPageSize,
	onClickOpenSelectColumn,
}) => {
	return (
		<>
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
			<PageSizing setPageSize={setPageSize} pageSize={pageSize} />
			<SelectColumn onClickOpenSelectColumn={onClickOpenSelectColumn} />
		</>
	);
};
TableHeader.propTypes = {
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
	onClickOpenSelectColumn: PropTypes.func.isRequired,
};
export default memo(TableHeader);
