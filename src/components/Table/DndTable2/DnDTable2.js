import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useSortBy, useTable} from 'react-table';
import {useDispatch} from 'react-redux';
import {settingAction} from '../../../reducers/setting';

const DnDTable2 = ({tableKey, data, columns}) => {
	const dispatch = useDispatch();
	const getRowId = React.useCallback((v) => {
		return v.id;
	}, []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		rows,
	} = useTable(
		{
			data,
			columns,
			getRowId,
		},
		useSortBy,
	);

	const onDragStart = useCallback(
		(e) => {
			e.dataTransfer.setData('id', e.target.id);
			e.dataTransfer.setData('target', tableKey);
			e.target.style.opacity = '0.2';
		},
		[tableKey],
	);

	const onDragEnd = useCallback((e) => {
		e.target.style.opacity = '';
	}, []);

	const onDrop = useCallback(
		(e) => {
			e.preventDefault();
			if (e.dataTransfer.getData('target') !== tableKey) {
				//TODO: add actions depends on tableKey
				switch (tableKey) {
					case 1234:
						break;
					default:
						//has to delete
						dispatch(
							settingAction.changeTable({
								start: e.dataTransfer.getData('target'),
								id: e.dataTransfer.getData('id'),
								end: tableKey,
							}),
						);
						break;
				}
			}
		},
		[tableKey],
	);

	const onDragOver = useCallback((e) => {
		e.preventDefault();
	}, []);

	return (
		<div>
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
								<th
									key={id}
									{...column.getHeaderProps(
										column.getSortByToggleProps(),
									)}
								>
									{column.render('Header')}
									<span>
										{column.isSortedDesc ? ' 🔽' : ' 🔼'}
									</span>
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
								{row.cells.map((cell, id) => (
									<td key={id} {...cell.getCellProps()}>
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

DnDTable2.propTypes = {
	tableKey: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
	columns: PropTypes.object.isRequired,
};

export default DnDTable2;
