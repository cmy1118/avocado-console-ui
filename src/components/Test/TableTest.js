import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useTable} from 'react-table';

const TableTest = ({data, columns}) => {
	const [records, setRecords] = React.useState(data);

	const getRowId = React.useCallback((v) => {
		return v.id;
	}, []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		data: records,
		columns,
		getRowId,
	});

	const onDragStart = useCallback((e) => {
		console.log(e.target);
	}, []);

	return (
		<table {...getTableProps()} style={{border: 'solid 1px blue'}}>
			<thead>
				{headerGroups.map((headerGroup, id) => (
					<tr key={id} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column, id) => (
							<th
								key={id}
								{...column.getHeaderProps()}
								style={{
									borderBottom: 'solid 3px red',
									background: 'aliceblue',
									color: 'black',
									fontWeight: 'bold',
								}}
							>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, id) => {
					prepareRow(row);
					return (
						<tr
							key={row.id}
							{...row.getRowProps()}
							draggable={true}
							onDragStart={onDragStart}
						>
							{row.cells.map((cell, id) => {
								return (
									<td
										key={id}
										{...cell.getCellProps()}
										style={{
											padding: '10px',
											border: 'solid 1px gray',
											background: 'papayawhip',
										}}
									>
										{cell.render('Cell')}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

TableTest.propTypes = {
	data: PropTypes.object.isRequired,
	columns: PropTypes.object.isRequired,
};

export default TableTest;
