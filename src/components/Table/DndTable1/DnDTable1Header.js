import {selectedPageSize} from '../settings/SettingsPage';
import PropTypes from 'prop-types';
import React from 'react';

const DnDTable1Header = ({
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
				<span>
					<button onClick={onClickOpenSelectColumn}>{'✅'}</button>
				</span>
			</div>
		</div>
	);
};
DnDTable1Header.propTypes = {
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
	onClickOpenSelectColumn: PropTypes.func.isRequired,
};

export default DnDTable1Header;
