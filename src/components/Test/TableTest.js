import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useTable} from 'react-table';
import {useDispatch} from 'react-redux';
import {settingAction} from '../../reducers/setting';

const TableTest = ({tableKey, data, columns}) => {
	const dispatch = useDispatch();
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
		data,
		columns,
		getRowId,
	});

	const onDragStart = useCallback(
		(e) => {
			e.dataTransfer.setData('id', e.target.id);
			e.dataTransfer.setData('target', tableKey);
			e.target.style.opacity = '0.1';
		},
		[tableKey],
	);

	const onDrop = useCallback(
		(e) => {
			e.preventDefault();

			if (e.dataTransfer.getData('target') !== tableKey) {
				dispatch(
					settingAction.changeTable({
						start: e.dataTransfer.getData('target'),
						id: e.dataTransfer.getData('id'),
						end: tableKey,
					}),
				);
			}
		},
		[tableKey],
	);

	const onDragOver = useCallback((e) => {
		e.preventDefault();
	}, []);

	const onDragEnd = useCallback((e) => {
		e.target.style.opacity = '';
	}, []);

	return (
		<table
			{...getTableProps()}
			onDrop={onDrop}
			onDragOver={onDragOver}
			onDragEnd={onDragEnd}
		>
			<thead>
				{headerGroups.map((headerGroup, id) => (
					<tr key={id} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column, id) => (
							<th key={id} {...column.getHeaderProps()}>
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
							id={row.id}
							key={row.id}
							{...row.getRowProps()}
							draggable={true}
							onDragStart={onDragStart}
						>
							{row.cells.map((cell, id) => {
								return (
									<td key={id} {...cell.getCellProps()}>
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
	tableKey: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
	columns: PropTypes.object.isRequired,
};

export default TableTest;
