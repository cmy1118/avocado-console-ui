import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {
	useFilters,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';
import {RowDiv, TableContainer} from '../../styles/components/div';
import {VariableSizeList} from 'react-window';

function dateBetweenFilterFn(rows, id, filterValues) {
	let sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
	let ed = filterValues[1] ? new Date(filterValues[1]) : undefined;

	if (ed || sd) {
		return rows.filter((r) => {
			let time = new Date(r.values[id]);

			if (ed && sd) {
				return time >= sd && time <= ed;
			} else if (sd) {
				return time >= sd;
			} else if (ed) {
				return time <= ed;
			}
		});
	} else {
		return rows;
	}
}

const ReadOnlyTable = ({tableKey, data, columns}) => {
	const ref = useRef(null);

	const filterTypes = React.useMemo(
		() => ({
			dateBetween: dateBetweenFilterFn,
			text: (rows, id, filterValue) => {
				return rows.filter((row) => {
					const rowValue = row.values[id];
					return rowValue !== undefined
						? String(rowValue)
								.toLowerCase()
								.startsWith(String(filterValue).toLowerCase())
						: true;
				});
			},
		}),
		[],
	);

	const getRowId = useCallback((v) => {
		if (v.uid) return v.uid;
		return v.id;
	}, []);

	/***************************************************************************/
	/* DndTable_update : 유형별 조건에 맞는 경고 알림추가
    /*
    /***************************************************************************/
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		rows,
		state: {pageSize},
	} = useTable(
		{
			data,
			columns,
			initialState: {pageSize: 50},
			getRowId,
			filterTypes,
		},
		useGlobalFilter,
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
	);

	const RenderRow = useCallback(
		({index, style}) => {
			const row = rows[index];
			prepareRow(row);
			return (
				<div
					className={index % 2 === 0 ? 'tr body even' : 'tr body odd'}
					style={style}
					id={row.original.uid ? row.original.uid : row.original.id}
					key={row.original.uid ? row.original.uid : row.original.id}
				>
					{row.cells.map((cell, i) => {
						return (
							<RowDiv
								alignItems={'center'}
								className={'td'}
								width={`${cell.column.width}px`}
								key={i}
								{...cell.getCellProps}
							>
								{cell.render('Cell')}
							</RowDiv>
						);
					})}
				</div>
			);
		},
		[prepareRow, rows],
	);

	const getItemSize = useCallback(
		(index) => {
			const row = rows[index];
			prepareRow(row);
			let height = 0;
			row.cells.map((cell) => {
				if (typeof cell.value === 'object') {
					if (height < 1) height = 1;
				} else {
					if (
						height <
						cell.value.toString().split(/\r\n|\r|\n/).length
					) {
						height = cell.value.toString().split(/\r\n|\r|\n/)
							.length;
					}
				}
			});
			console.log(height);
			return height * 30;
		},
		[prepareRow, rows],
	);

	return (
		<TableContainer>
			<div className={'table'} {...getTableProps()}>
				{headerGroups.map((headerGroup, i) => (
					<div
						className={'tr head'}
						key={i}
						{...headerGroup.getHeaderGroupProps()}
					>
						{headerGroup.headers.map((column, i) => {
							// console.log(column);
							return (
								<RowDiv
									className={'th'}
									width={`${column.width}px`}
									key={i}
									alignItems={'center'}
									{...column.getHeaderProps(
										column.getSortByToggleProps(),
									)}
								>
									{column.render('Header')}
								</RowDiv>
							);
						})}
					</div>
				))}
				<VariableSizeList
					height={300}
					itemCount={rows.length > pageSize ? pageSize : rows.length}
					itemSize={getItemSize}
				>
					{RenderRow}
				</VariableSizeList>
			</div>
		</TableContainer>
	);
};

ReadOnlyTable.propTypes = {
	tableKey: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
};

export default ReadOnlyTable;
