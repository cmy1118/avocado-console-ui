import React from 'react';
import PropTypes from 'prop-types';
import {selectedPageSize} from '../../settings/SettingsPage';

const TagPagination = ({
	gotoPage,
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageCount,
	pageOptions,
	pageIndex,
	pageSize,
	setPageSize,
	onClickOpenSelectColumn,
	isPagingEnable,
	isFilterable,
}) => {
	return (
		<div className='pagination'>
			{isPagingEnable && (
				<>
					<button
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
					>
						{'<<'}
					</button>
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
					{/* <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '} */}
					{/* 페이지 사이즈 조정  */}
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{selectedPageSize.map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</>
			)}
			{isFilterable && (
				<span>
					<button onClick={onClickOpenSelectColumn}>{'✅'}</button>
				</span>
			)}
		</div>
	);
};

TagPagination.propTypes = {
	gotoPage: PropTypes.func,
	canPreviousPage: PropTypes.bool,
	previousPage: PropTypes.func,
	nextPage: PropTypes.func,
	canNextPage: PropTypes.bool,
	pageCount: PropTypes.number,
	pageOptions: PropTypes.array,
	pageIndex: PropTypes.number,
	pageSize: PropTypes.number,
	setPageSize: PropTypes.func,
	onClickOpenSelectColumn: PropTypes.func,
	isPagingEnable: PropTypes.bool,
	isFilterable: PropTypes.bool,
};

export default TagPagination;
