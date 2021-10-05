import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useTable} from 'react-table';
import {useDispatch} from 'react-redux';
import {groupsAction} from '../../reducers/groups';
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
			// console.log(e.target.id);
			// console.log(tableKey);
			e.dataTransfer.setData('id', e.target.id);
			e.dataTransfer.setData('target', tableKey);
		},
		[tableKey],
	);

	const onDrop = useCallback(
		(e) => {
			e.preventDefault();
			console.log(e.dataTransfer.getData('id'));
			console.log(e.dataTransfer.getData('target'));
			console.log(tableKey);
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

	return (
		<table
			{...getTableProps()}
			style={{border: 'solid 1px blue'}}
			onDrop={onDrop}
			onDragOver={onDragOver}
		>
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
							id={row.id}
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
	tableKey: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
	columns: PropTypes.object.isRequired,
};

export default TableTest;
