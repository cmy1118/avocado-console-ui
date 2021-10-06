import React, {memo} from 'react';
import PropTypes from 'prop-types';
import TagPagination from './TagPagination';

const TagTableHeader = ({
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
	isPagingEnable,
	isFilterable,
}) => {
	return (
		(isPagingEnable || isFilterable) && (
			<TagPagination
				isPagingEnable={isPagingEnable}
				isFilterable={isFilterable}
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
		)
	);
};
TagTableHeader.propTypes = {
	pageSize: PropTypes.number,
	gotoPage: PropTypes.func,
	canPreviousPage: PropTypes.bool,
	previousPage: PropTypes.func,
	nextPage: PropTypes.func,
	canNextPage: PropTypes.bool,
	pageCount: PropTypes.number,
	pageOptions: PropTypes.array,
	pageIndex: PropTypes.number,
	setPageSize: PropTypes.func,
	onClickOpenSelectColumn: PropTypes.func,
	isPagingEnable: PropTypes.bool,
	isFilterable: PropTypes.bool,
};
export default memo(TagTableHeader);
