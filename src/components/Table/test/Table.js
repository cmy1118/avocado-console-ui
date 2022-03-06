import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {useTable, useExpanded, useRowSelect} from 'react-table';

import PropTypes from 'prop-types';
import {keyboardArrowDownIcon, NavigateNextIcon} from '../../../icons/icons';
import IndeterminateCheckbox from './IndeterminateCheckbox';

const Styles = styled.div`
	padding: 1rem;

	table {
		border-spacing: 0;
		border: 1px solid black;

		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}
		}

		th,
		td {
			text-align: left;
			margin: 0;
			padding: 0.5rem;
			border-bottom: 1px solid black;
			/* border-right: 1px solid black; */

			:last-child {
				border-right: 0;
			}
		}
	}
`;

// This could be inlined into SubRowAsync, this this lets you reuse it across tables
function SubRows({row, rowProps, visibleColumns, data, columns, loading}) {
	if (loading) {
		return (
			<tr>
				<td />
				<td colSpan={visibleColumns?.length - 1}>Loading...</td>
			</tr>
		);
	}

	// error handling here :)

	return (
		<Styles>
			<Table columns={columns} data={data} />
		</Styles>
	);
}

SubRows.propTypes = {
	row: PropTypes.object,
	rowProps: PropTypes.object,
	visibleColumns: PropTypes.object,
	data: PropTypes.array,
	columns: PropTypes.array,
	loading: PropTypes.bool,
};

function SubRowAsync({row, rowProps, visibleColumns, subComponentHandler}) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [columns, setColumns] = useState([]);

	// row별 data, column을 생성한다.

	useEffect(() => {
		if (row.isExpanded) {
			subComponentHandler({row, setData, setColumns, setLoading});
		} else {
			setData([]);
			setColumns([]);
			setLoading(true);
		}
	}, [row, subComponentHandler]);

	return (
		<SubRows
			row={row}
			rowProps={rowProps}
			visibleColumns={visibleColumns}
			data={data}
			columns={columns}
			loading={loading}
		/>
	);
}

SubRowAsync.propTypes = {
	row: PropTypes.object,
	rowProps: PropTypes.object,
	visibleColumns: PropTypes.object,
	subComponentHandler: PropTypes.func,
};

// A simple way to support a renderRowSubComponent is to make a render prop
// This is NOT part of the React Table API, it's merely a rendering
// option we are creating for ourselves in our table renderer
function Table({columns, data, renderRowSubComponent}) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		visibleColumns,
		state: {expanded},
	} = useTable(
		{
			columns,
			data,
		},
		useExpanded, // We can useExpanded to track the expanded state
		useRowSelect,
		// for sub components too!
	);

	return (
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup, i) => (
					<tr key={i} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column, j) => (
							<th key={j} {...column.getHeaderProps()}>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, i) => {
					prepareRow(row);
					return (
						// Use a React.Fragment here so the table markup is still valid
						<React.Fragment key={i} {...row.getRowProps()}>
							<tr>
								{row.cells.map((cell, j) => {
									return (
										<td key={j} {...cell.getCellProps()}>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
							{/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
							{row.isExpanded ? (
								<tr className={'expanded'}>
									<td
										className={'expanded'}
										colSpan={visibleColumns.length}
									>
										{/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
										{renderRowSubComponent({row})}
									</td>
								</tr>
							) : null}
						</React.Fragment>
					);
				})}
			</tbody>
		</table>
	);
}

Table.propTypes = {
	columns: PropTypes.array,
	data: PropTypes.array,
	subComponentHandler: PropTypes.func,
	renderRowSubComponent: PropTypes.func,
};

export const callExpander = () => {
	return {
		id: 'expander', // It needs an ID
		// Make an expander cell
		Header: () => null, // No header
		Cell: function Component(cell) {
			// Use Cell to render an expander for each row.
			// We can use the getToggleRowExpandedProps prop-getter
			// to build the expander.
			return (
				<span {...cell.row.getToggleRowExpandedProps()}>
					{cell.row.isExpanded
						? keyboardArrowDownIcon
						: NavigateNextIcon}
				</span>
			);
		},
	};
};

export const callCheckbox = () => {
	return {
		id: 'selection',
		// The header can use the table's getToggleAllRowsSelectedProps method
		// to render a checkbox
		// eslint-disable-next-line react/prop-types,react/display-name
		Header: ({getToggleAllRowsSelectedProps}) => (
			<div>
				<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
			</div>
		),
		// The cell can use the individual row's getToggleRowSelectedProps method
		// to the render a checkbox
		Cell: function Component(cell) {
			return (
				<div>
					<IndeterminateCheckbox
						{...cell.row.getToggleRowSelectedProps()}
					/>
				</div>
			);
		},
	};
};

const EditableCell = ({
	value: initialValue,
	row: {index},
	column: {id},
	updateMyData, // This is a custom function that we supplied to our table instance
}) => {
	// We need to keep and update the state of the cell normally
	const [value, setValue] = React.useState(initialValue);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	// We'll only update the external data when the input is blurred
	const onBlur = () => {
		updateMyData(index, id, value);
	};

	// If the initialValue is changed external, sync it up with our state
	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

EditableCell.propTypes = {
	value: PropTypes.any,
	row: PropTypes.object,
	column: PropTypes.object,
	updateMyData: PropTypes.func,
};

function TestTable({data, setData, columns, subComponentHandler}) {
	const [skipPageReset, setSkipPageReset] = useState(false);

	const tableData = useMemo(() => data, [data]);

	// // Create a function that will render our row sub components
	// const renderRowSubComponent = useCallback(
	// 	({row}) => {
	// 		console.log(row);
	// 		return (
	// 			<Styles>
	// 				<Table
	// 					columns={columns}
	// 					data={data}
	// 					// We added this as a prop for our table component
	// 					// Remember, this is not part of the React Table API,
	// 					// it's merely a rendering option we created for
	// 					// ourselves
	// 					renderRowSubComponent={renderRowSubComponent}
	// 				/>
	// 			</Styles>
	// 		);
	// 	},
	// 	[columns, data],
	// );

	// Create a function that will render our row sub components
	const renderRowSubComponent = useCallback(
		({row, rowProps, visibleColumns}) => (
			<SubRowAsync
				row={row}
				rowProps={rowProps}
				visibleColumns={visibleColumns}
				subComponentHandler={subComponentHandler}
			/>
		),
		[subComponentHandler],
	);

	const updateMyData = (rowIndex, columnId, value) => {
		// We also turn on the flag to not reset the page
		setSkipPageReset(true);
		setData((old) =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex],
						[columnId]: value,
					};
				}
				return row;
			}),
		);
	};

	return (
		<Styles>
			<Table
				columns={columns}
				data={tableData}
				// We added this as a prop for our table component
				// Remember, this is not part of the React Table API,
				// it's merely a rendering option we created for
				// ourselves
				updateMyData={updateMyData}
				skipPageReset={skipPageReset}
				renderRowSubComponent={renderRowSubComponent}
				subComponentHandler={subComponentHandler}
			/>
		</Styles>
	);
}

TestTable.propTypes = {
	data: PropTypes.array,
	setData: PropTypes.func,
	columns: PropTypes.array,
	subComponentHandler: PropTypes.func,
};

export default TestTable;
