import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
	gotoPage,
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageCount,
	pageOptions,
	pageIndex,
}) => {
	return (
		<div>
			<div className='pagination'>
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{'<<'}
				</button>{' '}
				<button
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					{'<'}
				</button>{' '}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{'>'}
				</button>{' '}
				<button
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					{'>>'}
				</button>{' '}
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
			</div>
		</div>
	);
};

Pagination.propTypes = {
	gotoPage: PropTypes.func.isRequired,
	canPreviousPage: PropTypes.bool.isRequired,
	previousPage: PropTypes.func.isRequired,
	nextPage: PropTypes.func.isRequired,
	canNextPage: PropTypes.bool.isRequired,
	pageCount: PropTypes.number.isRequired,
	pageOptions: PropTypes.array.isRequired,
	pageIndex: PropTypes.number.isRequired,
};

export default Pagination;
