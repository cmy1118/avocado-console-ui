import React, {useCallback, memo} from 'react';
import PropTypes from 'prop-types';

import '../styles.css';
import {useTable} from 'react-table';
const ReadOnlyTable = ({columns, data}) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		rows,
		//pagination
		//page, Instead of using 'rows', we'll use page for pagination,
	} = useTable({
		columns,
		data,
	});
	return (
		<div>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup, index) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{headerGroup.headers.map((column, index) => (
								<th {...column.getHeaderProps()} key={index}>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, index) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()} key={index}>
								{row.cells.map((cell, index) => (
									<td {...cell.getCellProps()} key={index}>
										{cell.render('Cell')}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
ReadOnlyTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
};
export default memo(ReadOnlyTable);
