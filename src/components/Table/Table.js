import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
	arrowDownIcon,
	arrowUpIcon,
	dragIndicator,
	keyboardArrowDownIcon,
	NavigateNextIcon,
} from '../../icons/icons';
import {Icon} from '../../styles/components/icons';
import {RowDiv} from '../../styles/components/style';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {DRAGGABLE_KEY} from '../../Constants/Table/keys';
import TableOptionsBar from './TableOptionsBar';
import {
	useExpanded,
	useFilters,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';

const Styles = styled.div`
	table {
		width: 100%;
		// table-layout: fixed;

		box-sizing: border-box;
		border-left: ${(props) => props.inner && '3px solid #4ca6a8'};
		height: ${(props) => (props.isDraggable ? '240px' : '100%')};
		border-spacing: 0;
		border-bottom: ${(props) =>
			props.readOnly === 'inner' ? 'none' : '1px solid #e3e5e5'};
		border-left: ${(props) =>
			props.readOnly === 'inner' && '2px solid #4ca6a8'};
		font-size: 13px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: 0.13px;
		text-align: left;
		color: #212121;

		thead {
			color: #0a6f71;
			height: 40px;
			background: #f8f9fa;
			// border-bottom: 1px solid #e3e5e5;
			font-weight: 500;
		}
		tbody {
			border-bottom: 1px solid #e3e5e5;
			overflow: scroll;
		}

		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}
			border-bottom: 1px solid #e3e5e5;
		}

		th,
		td {
			white-space: nowrap;
			text-align: left;
			box-sizing: border-box;
			// margin: 0;
			padding: 0 12px;
			:last-child {
				border-right: 0;
			}
			white-space: pre-wrap;
			height: 40px;
		}

		.selected {
			background: rgba(228, 243, 244, 0.7);
		}
		.expanded {
			padding: 0px;
			margin: 0px 16px;
		}
	}
`;

const TableStyledContainer = styled.div`
	margin: ${(props) => (props.readOnly ? '0px' : ' 0px 16px')};
	display: flex;
	min-width: 380px;
	flex: ${(props) => !props.readOnly && '1 1 auto'};
	min-height: ${(props) => !props.readOnly && '240px'};
	height: ${(props) => !props.readOnly && '0'};

	.table {
		width: 100%;
		overflow-x: scroll;
		height: ${(props) => (props.isDraggable ? '240px' : '100%')};
		display: grid;
		grid-template-rows: 40px;
		border-spacing: 0;
		border-bottom: ${(props) =>
			props.readOnly === 'inner' ? 'none' : '1px solid #e3e5e5'};
		border-left: ${(props) =>
			props.readOnly === 'inner' && '2px solid #4ca6a8'};
		font-size: 13px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: 0.13px;
		text-align: left;
		color: #212121;
		.tr {
			display: flex;
			justify-content: space-between;
			.td,
			.th {
				flex: 1;
			}
			.table-check-box {
				flex: 0;
			}
			.th:first-child,
			.td:first-of-type {
				margin-left: ${(props) => props.readOnly === 'inner' && '80px'};
			}
		}

		.head {
			color: ${(props) => props.mode === 'inner' && '#0a6f71'};
			height: 40px;
			background: #f8f9fa;
			border-top: ${(props) =>
				props.mode === 'inner' ? 'none' : '1px solid #e3e5e5'};
			border-bottom: 1px solid #e3e5e5;
			font-weight: 500;
		}
		.body {
			background: ${(props) =>
				props.mode === 'inner' ? '#f8f9fa' : '#fff'};
			border-bottom: 1px solid #e3e5e5;
		}
		.odd {
			background: ${(props) => props.mode === 'readOnly' && '#f8f9fa'};
		}

		.selected {
			background: rgba(228, 243, 244, 0.7);
		}

		.th,
		.td {
			display: flex;
			margin-right: 12px;
			height: ${(props) => (props.mode === 'normal' ? '40px' : '')};
			min-height: 40px;
			white-space: nowrap;
			text-align: left;
			text-overflow: ellipsis;
			:first-child {
				padding-left: ${(props) => props.mode === 'readOnly' && '16px'};
			}
		}
	}
`;

const Tds = styled(RowDiv)`
	align-items: center;
	min-width: ${(props) => props.width};
`;

const BodyContainer = styled.div`
	flex: 1;
	overflow-y: scroll;
	overflow-x: hidden;
	min-height: 40px;
`;

// This could be inlined into SubRowAsync, this this lets you reuse it across tables
function SubRows({
	row,
	rowProps,
	visibleColumns,
	data,
	columns,
	loading,
	tableKey,
}) {
	if (loading) {
		return (
			<div
			// colSpan={visibleColumns?.length - 1}
			>
				Loading...
			</div>
		);
	}

	// error handling here :)

	return (
		<Table
			data={data}
			columns={columns}
			tableKey={tableKey}
			readOnly
			inner
		/>
	);
}

SubRows.propTypes = {
	row: PropTypes.object,
	rowProps: PropTypes.object,
	visibleColumns: PropTypes.object,
	data: PropTypes.array,
	columns: PropTypes.array,
	loading: PropTypes.bool,
	tableKey: PropTypes.string,
};

function SubRowAsync({
	row,
	rowProps,
	visibleColumns,
	subComponentHandler,
	tableKey,
}) {
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
			tableKey={tableKey}
		/>
	);
}

SubRowAsync.propTypes = {
	row: PropTypes.object,
	rowProps: PropTypes.object,
	visibleColumns: PropTypes.object,
	subComponentHandler: PropTypes.func,
	tableKey: PropTypes.string,
};

// const sortArr = ['expander', 'selection'];

const Table = ({
	data,
	columns,
	tableKey,
	setData,
	isDraggable,
	readOnly = false,
	isSortable = false,
	isPaginable = false,
	isSearchable = false,
	isStrSearchable = false,
	isSearchFilterable = false,
	isColumnFilterable = false,
	setSearch,
	subComponentHandler,
	inner = false,
	rowClick,
	tableRefs,
	validationSchema,
	cellClick,
	defaultClick, //테이블 특정 row를 미리 클릭된 화면으로 보여주는 기능
}) => {
	const [skipPageReset, setSkipPageReset] = useState(false);
	const [lastClickedIndex, setLastClickedIndex] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const skipPageResetRef = useRef(false);

	// Create a function that will render our row sub components
	const renderRowSubComponent = useCallback(
		({row, rowProps, visibleColumns}) => (
			<SubRowAsync
				row={row}
				rowProps={rowProps}
				visibleColumns={visibleColumns}
				subComponentHandler={subComponentHandler}
				tableKey={tableKey}
			/>
		),
		[subComponentHandler, tableKey],
	);

	// const getColumnWidth = (data, accessor, headerText, id, columnWidth) => {
	// 	const cellLength = Math.max(
	// 		...data.map((row) => {
	// 			let value = '';
	// 			if (typeof accessor === 'string') {
	// 				value = _.get(row, accessor);
	// 			} else {
	// 				value = accessor(row);
	// 				if (typeof value === 'string' && value.includes('\n')) {
	// 					let maxValue = '';
	// 					const temp = value;
	// 					temp.split('\n').forEach((v) => {
	// 						if (v.length > maxValue.length) maxValue = v;
	// 					});
	// 					value = maxValue;
	// 				}
	// 				if (typeof value === 'object' && id === 'grantUser') {
	// 					value = `${row.grantUser.name}(${row.grantUser.id})`;
	// 				}
	// 			}
	//
	// 			if (typeof value === 'number') return value.toString().length;
	// 			if (
	// 				isNaN(
	// 					(value || '').length -
	// 						Math.ceil(
	// 							value
	// 								?.toString()
	// 								.split('')
	// 								.map((char) => char)
	// 								.filter((v) => v.match(/[a-z0-9]/i))
	// 								.length / 2,
	// 						),
	// 				)
	// 			)
	// 				return 1;
	// 			else {
	// 				return (
	// 					(value || '').length -
	// 					Math.ceil(
	// 						value
	// 							?.toString()
	// 							.split('')
	// 							.map((char) => char)
	// 							.filter((v) => v.match(/[a-z0-9]/i)).length / 2,
	// 					)
	// 				);
	// 			}
	// 		}),
	// 		headerText.length,
	// 	);
	//
	// 	const magicSpacing = 10;
	//
	// 	return columnWidth
	// 		? `${columnWidth}px`
	// 		: cellLength * magicSpacing + 24 + 'px';
	// };

	// const updateMyData = useCallback(
	// 	(rowIndex, columnId, value) => {
	// 		// We also turn on the flag to not reset the page
	// 		if (readOnly) return;
	// 		setSkipPageReset(true);
	// 		setData &&
	// 			setData((old) =>
	// 				old.map((row, index) => {
	// 					if (index === rowIndex) {
	// 						return {
	// 							...old[rowIndex],
	// 							[columnId]: value,
	// 						};
	// 					}
	// 					return row;
	// 				}),
	// 			);
	// 	},
	// 	[readOnly, setData],
	// );

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
		// id, userUid가 아닌 DRAGGABLE_KEY가 key 역할을 함
		if (v[DRAGGABLE_KEY]) return v[DRAGGABLE_KEY];
	}, []);

	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		selectedFlatRows,
		allColumns,
		canPreviousPage,
		canNextPage,
		pageOptions,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		setAllFilters,
		getToggleHideAllColumnsProps,
		setHiddenColumns,
		setGlobalFilter,
		visibleColumns,
		state: {pageIndex, selectedRowIds, pageSize, filters, expanded},
	} = useTable(
		{
			data,
			columns,
			initialState: {pageSize: 50},
			getRowId,
			filterTypes,
			// autoResetPage: !skipPageReset,
			// autoResetExpanded: !skipPageReset,
			// autoResetGroupBy: !skipPageReset,
			// autoResetSelectedRows: !skipPageReset,
			// autoResetSortBy: !skipPageReset,
			// autoResetFilters: !skipPageReset,
			// autoResetRowState: !skipPageReset,
			// updateMyData,
		},
		useGlobalFilter,
		useFilters,
		useGlobalFilter,
		useSortBy,
		useExpanded,
		usePagination,
		useRowSelect,
		(hooks) => {
			subComponentHandler &&
				hooks.visibleColumns.push((columns) => [
					{
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
						// width: 40,
						// disableChangeVisible: true,
					},
					...columns,
				]);
			// isCheckBox &&
			// 	hooks.visibleColumns.push((columns) => [
			// 		{
			// 			id: 'selection',
			// 			// eslint-disable-next-line react/prop-types,react/display-name
			// 			Header: ({getToggleAllPageRowsSelectedProps}) => (
			// 				<TableCheckbox
			// 					{...getToggleAllPageRowsSelectedProps()}
			// 					tablekey={tableKey}
			// 				/>
			// 			),
			// 			// eslint-disable-next-line react/prop-types,react/display-name
			// 			Cell: ({row}) => (
			// 				<TableCheckbox
			// 					// eslint-disable-next-line react/prop-types,react/display-name
			// 					{...row.getToggleRowSelectedProps()}
			// 					tablekey={tableKey}
			// 				/>
			// 			),
			// 			// width: 40,
			// 			// disableChangeVisible: true,
			// 		},
			// 		...columns,
			// 	]);
		},
	);
	const [position, setPosition] = useState({x: 0, y: 0});
	// const [selectRow, setSelectRow] = useState(selectedFlatRows);
	const [checkRow, setCheckRow] = useState(true);
	// const prevSelectRow = usePrevious(selectRow);

	const getItemStyle = (isDragging, draggableStyle, style) => ({
		// 혹시 모를 나중의 스타일 적용을 대비해서 제거 ㄴㄴ
		userSelect: 'none',
		// background: isDragging ? 'lightgreen' : 'grey',
		...style,
		...draggableStyle,
	});

	const getStyle = ({provided, snapshot}) => {
		const style = {
			...provided.draggableProps.style,
			border: '1px solid',
			borderColor: snapshot.draggingOver ? '#4ca6a8' : '#e3e5e5',
			borderRadius: '4px',
			backgroundColor: 'rgba(255, 255, 255, 0.8)',
			margin: 'auto',
			width: '320px',
			height: '54px',
			top: position.y,
			left: position.x,
		};

		if (!snapshot.isDropAnimating) {
			return {
				...style,
			};
		} else {
			const {moveTo, curve, duration} = snapshot.dropAnimation;
			const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
			return {
				...style,
				transform: `${translate}`,
				transition: `all ${curve} ${duration + 1}s`,
				transitionDuration: `0.001s`,
			};
		}
	};

	/***************************************************************************/

	const selectedDropButton = useCallback(
		(selectedFlatRows) => {
			const data = {};
			data[tableKey] = selectedFlatRows.map((v) => v.original);
			// setSelect && setSelect(data);
		},
		[tableKey],
	);

	const onMouseDownItem = useCallback(
		(e) => {
			if (isDraggable) {
				let checkbox;
				if (e.target.classList.contains('td')) {
					checkbox =
						e.target.parentNode.childNodes[0]?.childNodes[0]
							?.childNodes[0];
					if (checkbox.type === 'checkbox' && !checkbox.checked)
						checkbox.click();
				} else if (e.target.classList.contains('tr')) {
					checkbox =
						e.target.childNodes[0]?.childNodes[0]?.childNodes[0];
					if (checkbox.type === 'checkbox' && !checkbox.checked)
						checkbox.click();
				}
				const x = e.pageX - 160 + 'px';
				const y = e.pageY - 27 + 'px';
				setPosition({x, y});
			}
		},
		[isDraggable],
	);

	/******************************************************************
	 * seob - 테이블 데이터 클릭 기능
	 ******************************************************************/
	const handleClick = useCallback(
		(row) => (e) => {
			console.log('handleClick');
			//handleClick 시 defaultClick 기능 해제
			// setSelectRow(false);
			rowClick && rowClick(e, row.original);
			const checkboxes = document.querySelectorAll(
				`.${tableKey}[type='checkbox']`,
			);
			// checkboxes[row.index + 1].click();
			setLastClickedIndex(row.index + 1);
			if (e.shiftKey) {
				if (lastClickedIndex) {
					console.log('lastClickedIndex => ', lastClickedIndex);
					console.log('currentClickedIndex => ', row.index + 1);
					let max = Math.max(lastClickedIndex, row.index + 1);
					let min = Math.min(lastClickedIndex, row.index + 1);
					if (lastClickedIndex >= row.index + 1) {
						while (max >= min) {
							if (checkboxes[row.index + 1].checked)
								checkboxes[max].checked &&
									checkboxes[max]?.click();
							else
								!checkboxes[max].checked &&
									checkboxes[max]?.click();
							max--;
						}
					} else {
						while (max >= min) {
							if (checkboxes[row.index + 1].checked)
								checkboxes[min].checked &&
									checkboxes[min]?.click();
							else
								!checkboxes[min].checked &&
									checkboxes[min]?.click();
							min++;
						}
					}
				} else {
					checkboxes[row.index + 1]?.click();
				}
			} else if (e.metaKey) {
				checkboxes[row.index + 1]?.click();
			} else {
				checkboxes.forEach((checkbox, i) => {
					if (checkbox.checked) checkbox?.click();
				});
				checkboxes[row.index + 1]?.click();
			}
			//
			console.log(row);
		},
		[lastClickedIndex, rowClick, tableKey],
	);
	/*******************************************************************************
	 * roberto - defaultClick 을위한 렌더링 기능 : 처음 렌더링시에만 특정 행을 선택되게한다
	 *
	 *  prevSelectRow :이전 선택된 행
	 *  selectRow	  :선택된 행
	 *  defaultClick  :defaultClick 사용유뮤 props
	 *******************************************************************************/
	// useEffect(() => {
	// 	//처음 렌더링인지 확인
	// 	if (
	// 		setCheckRow &&
	// 		defaultClick &&
	// 		prevSelectRow?.length === selectRow?.length &&
	// 		prevSelectRow[0]?.id === selectRow[0]?.id
	// 	) {
	// 		//div[type='row'] : 테이블 행 dom 요소
	// 		const firstRow = document.querySelectorAll(`div[type='row']`);
	// 		// 렌더링시 테이블 첫번째 행이 선택되지 않았으면 클릭
	// 		if (!firstRow[0]?.className.includes('selected')) {
	// 			firstRow[0]?.click();
	// 		}
	// 		setCheckRow(false);
	// 	} else {
	// 		setCheckRow(false);
	// 	}
	// }, [checkRow, defaultClick, prevSelectRow, selectRow, tableKey]);
	// useEffect(() => {
	// 	setSelect && selectedFlatRows && selectedDropButton(selectedFlatRows);
	// }, [selectedRowIds, setSelect, selectedDropButton, selectedFlatRows]);
	// useMountedLayoutEffect(() => {
	//defualtClick을 위한 기능
	// setSelect && setSelect(selectedFlatRows.map((v) => v.original));
	// defaultClick && setSelectRow(selectedFlatRows);
	// }, []);
	return (
		<div>
			{(isPaginable || isSearchable || isStrSearchable) && (
				<TableOptionsBar
					isSearchable={isSearchable}
					isStrSearchable={isStrSearchable}
					isPaginable={isPaginable}
					isColumnFilterable={isColumnFilterable}
					isSearchFilterable={isSearchFilterable}
					tableKey={tableKey}
					columns={columns}
					setAllFilters={setAllFilters}
					filters={filters}
					gotoPage={gotoPage}
					canPreviousPage={canPreviousPage}
					previousPage={previousPage}
					nextPage={nextPage}
					canNextPage={canNextPage}
					pageIndex={pageIndex}
					pageOptions={pageOptions}
					setGlobalFilter={setGlobalFilter}
					pageSize={pageSize}
					setPageSize={setPageSize}
					allColumns={allColumns}
					getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
					setHiddenColumns={setHiddenColumns}
					headerGroups={headerGroups}
					setSearch={setSearch}
				/>
			)}
			<Styles readOnly={readOnly} inner={inner}>
				<Droppable
					droppableId={tableKey}
					mode={'Virtual'}
					renderClone={(provided, snapshot, rubric) => {
						return (
							<div
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								ref={provided.innerRef}
								style={getStyle({
									provided: provided,
									snapshot: snapshot,
								})}
							>
								<RowDiv
									padding={'15px 12px'}
									alignItems={'center'}
								>
									<Icon>{dragIndicator}</Icon>
									<RowDiv width={'100%'}>
										그룹 이동 {selectedFlatRows.length}건
									</RowDiv>
								</RowDiv>
								{provided.placeholder}
							</div>
						);
					}}
				>
					{(provided) => (
						<table
							className={`${tableKey} table`}
							{...getTableProps()}
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							<thead>
								{headerGroups.map((headerGroup, i) => (
									<tr
										// className={'tr head'}
										key={i}
										{...headerGroup.getHeaderGroupProps()}
									>
										{headerGroup.headers.map(
											(column, i) => {
												return (
													<td
														key={i}
														{...column.getHeaderProps(
															isSortable &&
																column.getSortByToggleProps(),
														)}
														width={column.width}
													>
														<span>
															{column.render(
																'Header',
															)}
														</span>
														{isSortable &&
															column.id ===
																'expander' && (
																<Icon
																	margin={
																		'0px'
																	}
																>
																	{column.isSortedDesc ===
																		'ture' ||
																	column.isSortedDesc ===
																		undefined
																		? arrowDownIcon
																		: arrowUpIcon}
																</Icon>
															)}
													</td>
												);
											},
										)}
									</tr>
								))}
							</thead>
							<tbody>
								{/*<BodyContainer>*/}
								{page.map((row, index) => {
									prepareRow(row);
									const rowProps = row.getRowProps();

									return (
										<Draggable
											key={row.original[DRAGGABLE_KEY]}
											draggableId={
												row.original[DRAGGABLE_KEY]
											}
											isDragDisabled={!isDraggable}
											index={index}
										>
											{(provided, snapshot) => {
												return (
													<>
														<tr
															ref={
																provided.innerRef
															}
															{...provided.dragHandleProps}
															{...provided.draggableProps}
															// style={getItemStyle(
															// 	snapshot.isDragging,
															// 	provided
															// 		.draggableProps
															// 		.style,
															// )}
															onMouseDown={
																onMouseDownItem
															}
															className={
																index % 2 === 0
																	? Object.keys(
																			selectedRowIds,
																	  ).includes(
																			row
																				.original
																				.id,
																	  )
																		? 'selected even'
																		: 'even'
																	: Object.keys(
																			selectedRowIds,
																	  ).includes(
																			row
																				.original
																				.id,
																	  )
																	? 'selected odd'
																	: 'odd'
															}
															id={
																row.original[
																	DRAGGABLE_KEY
																]
															}
															key={
																row.original[
																	DRAGGABLE_KEY
																]
															}
														>
															{row.cells.map(
																(cell, i) => {
																	return (
																		<td
																			// className={
																			// 	cell
																			// 		.column
																			// 		.id ===
																			// 	'selection'
																			// 		? 'td table-check-box'
																			// 		: 'td'
																			// }
																			onClick={() =>
																				cellClick &&
																				cellClick(
																					cell,
																				)
																			}
																			width={
																				cell
																					.column
																					.width
																			}
																			key={
																				i
																			}
																			{...cell.getCellProps}
																		>
																			{cell.render(
																				'Cell',
																				{
																					tableRefs,
																					setData,
																					validationSchema,
																				},
																			)}
																		</td>
																	);
																},
															)}
														</tr>

														{row.isExpanded ? (
															<tr
																className={
																	'expanded'
																}
															>
																<td
																	className={
																		'expanded'
																	}
																	colSpan={
																		visibleColumns.length
																			? visibleColumns.length
																			: 0
																	}
																>
																	{renderRowSubComponent(
																		{row},
																	)}
																</td>
															</tr>
														) : null}
													</>
												);
											}}
										</Draggable>
									);
								})}
								{/*</BodyContainer>*/}
							</tbody>
						</table>
					)}
				</Droppable>
			</Styles>
		</div>
	);
};

Table.propTypes = {
	tableKey: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	isSortable: PropTypes.bool,
	isSelectable: PropTypes.bool,
	setData: PropTypes.func,
	setSearch: PropTypes.func,
	getTableProps: PropTypes.func,
	getColumnWidth: PropTypes.func,
	headerGroups: PropTypes.array,
	prepareRow: PropTypes.func,
	setAllFilters: PropTypes.func,
	page: PropTypes.array,
	selectedFlatRows: PropTypes.array,
	selectedRowIds: PropTypes.object,
	tableOptions: PropTypes.object,
	expanded: PropTypes.object,
	isPaginable: PropTypes.bool,
	isStrSearchable: PropTypes.bool,
	isSearchable: PropTypes.bool,
	isColumnFilterable: PropTypes.bool,
	isSearchFilterable: PropTypes.bool,
	// mode: PropTypes.oneOf(['normal', 'readOnly', 'inner']),
	readOnly: PropTypes.bool,
	isCheckBox: PropTypes.bool,
	isDraggable: PropTypes.bool,
	inner: PropTypes.bool,
	subComponentHandler: PropTypes.func,
	defaultClick: PropTypes.bool,
	rowClick: PropTypes.func,
	cellClick: PropTypes.func,
	tableRefs: PropTypes.object,
	validationSchema: PropTypes.object,
};

export default Table;
