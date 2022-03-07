import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {arrowDownIcon, arrowUpIcon, dragIndicator} from '../../icons/icons';
import {Icon} from '../../styles/components/icons';
import {RowDiv} from '../../styles/components/style';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import * as _ from 'lodash';
import {DRAGGABLE_KEY} from '../../Constants/Table/keys';
import InnerTableContainer from './InnerTableContainer';
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
import TableCheckbox from './Options/TableCheckbox';
import {TableMode} from '../../Constants/Table/mode';

const TableStyledContainer = styled.div`
	margin: ${(props) =>
		props.mode === TableMode.INNER ? '0px' : ' 0px 16px'};
	display: flex;
	min-width: 380px;
	min-height: ${(props) => props.mode === TableMode.NOMAL && '240px'};
	height: ${(props) => props.mode === TableMode.NOMAL && '0'};
	flex: ${(props) => props.mode === TableMode.NOMAL && '1 1 auto'};

	.table {
		width: 100%;
		overflow-x: scroll;
		height: ${(props) => (props.isDraggable ? '240px' : '100%')};
		display: grid;
		grid-template-rows: 40px;
		border-spacing: 0;
		border-bottom: ${(props) =>
			props.mode === TableMode.INNER ? 'none' : '1px solid #e3e5e5'};
		border-left: ${(props) =>
			props.mode === TableMode.INNER && '2px solid #4ca6a8'};
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
				margin-left: ${(props) => props.mode === 'inner' && '80px'};
			}
		}

		.head {
			color: ${(props) => props.mode === TableMode.INNER && '#0a6f71'};
			height: 40px;
			background: #f8f9fa;
			border-top: ${(props) =>
				props.mode === TableMode.INNER ? 'none' : '1px solid #e3e5e5'};
			border-bottom: 1px solid #e3e5e5;
			font-weight: 500;
		}
		.body {
			background: ${(props) =>
				props.mode === TableMode.INNER ? '#f8f9fa' : '#fff'};
			border-bottom: 1px solid #e3e5e5;
		}
		.odd {
			background: ${(props) =>
				props.mode === TableMode.READ_ONLY ||
				(TableMode.CHECKBOX && '#f8f9fa')};
		}

		.selected {
			background: rgba(228, 243, 244, 0.7);
		}

		.th,
		.td {
			display: flex;
			margin-right: 12px;
			height: ${(props) =>
				props.mode === TableMode.NOMAL ? '40px' : ''};
			min-height: 40px;
			white-space: nowrap;
			text-align: left;
			text-overflow: ellipsis;
			:first-child {
				padding-left: ${(props) =>
					props.mode === TableMode.READ_ONLY ||
					('checkBox' && '16px')};
			}
		}
	}
`;

const Tds = styled(RowDiv)`
	align-items: center;
	min-width: ${(props) => props.width};
`;

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	// width: 0;
`;

const BodyContainer = styled.div`
	flex: 1;
	overflow-y: scroll;
	overflow-x: hidden;
	min-height: 40px;
`;

const Table = ({
	data,
	columns,
	tableKey,
	setData,
	setSelect,
	isDraggable,
	mode = TableMode.NOMAL,
	isPaginable = false,
	isSearchable = false,
	isSearchFilterable = false,
	isColumnFilterable = false,
	setSearch,
}) => {
	const [skipPageReset, setSkipPageReset] = useState(false);

	const getColumnWidth = (data, accessor, headerText, id, columnWidth) => {
		const cellLength = Math.max(
			...data.map((row) => {
				let value = '';
				if (typeof accessor === 'string') {
					value = _.get(row, accessor);
				} else {
					value = accessor(row);
					if (typeof value === 'string' && value.includes('\n')) {
						let maxValue = '';
						const temp = value;
						temp.split('\n').forEach((v) => {
							if (v.length > maxValue.length) maxValue = v;
						});
						value = maxValue;
					}
					if (typeof value === 'object' && id === 'grantUser') {
						value = `${row.grantUser.name}(${row.grantUser.id})`;
					}
				}

				if (typeof value === 'number') return value.toString().length;
				if (
					isNaN(
						(value || '').length -
							Math.ceil(
								value
									?.toString()
									.split('')
									.map((char) => char)
									.filter((v) => v.match(/[a-z0-9]/i))
									.length / 2,
							),
					)
				)
					return 1;
				else {
					return (
						(value || '').length -
						Math.ceil(
							value
								?.toString()
								.split('')
								.map((char) => char)
								.filter((v) => v.match(/[a-z0-9]/i)).length / 2,
						)
					);
				}
			}),
			headerText.length,
		);

		const magicSpacing = 10;

		return columnWidth
			? `${columnWidth}px`
			: cellLength * magicSpacing + 24 + 'px';
	};

	const updateMyData = (rowIndex, columnId, value) => {
		// We also turn on the flag to not reset the page
		if (mode === TableMode.READ_ONLY || mode === TableMode.INNER) return;
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
		if (v.userUid) return v.userUid;
		return v.id;
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
		state: {pageIndex, selectedRowIds, pageSize, filters, expanded},
	} = useTable(
		{
			data,
			columns,
			initialState: {pageSize: 50},
			getRowId,
			filterTypes,
			autoResetPage: !skipPageReset,
			updateMyData,
		},
		useGlobalFilter,
		useFilters,
		useGlobalFilter,
		useSortBy,
		useExpanded,
		usePagination,
		useRowSelect,
		(hooks) => {
			mode === TableMode.NOMAL &&
				hooks.visibleColumns.push((columns) => [
					{
						id: 'selection',
						// eslint-disable-next-line react/prop-types,react/display-name
						Header: ({getToggleAllPageRowsSelectedProps}) => (
							<TableCheckbox
								{...getToggleAllPageRowsSelectedProps()}
								tablekey={tableKey}
							/>
						),
						// eslint-disable-next-line react/prop-types,react/display-name
						Cell: ({row}) => (
							<TableCheckbox
								// eslint-disable-next-line react/prop-types,react/display-name
								{...row.getToggleRowSelectedProps()}
								tablekey={tableKey}
							/>
						),
						width: 40,
						disableChangeVisible: true,
					},
					...columns,
				]);
		},
	);
	const [position, setPosition] = useState({x: 0, y: 0});

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
			setSelect && setSelect(data);
		},
		[setSelect, tableKey],
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

	useEffect(() => {
		setSelect && selectedFlatRows && selectedDropButton(selectedFlatRows);
	}, [selectedRowIds, setSelect, selectedDropButton, selectedFlatRows]);

	return (
		<_Container>
			{(isPaginable || isSearchable) && (
				<TableOptionsBar
					isSearchable={isSearchable}
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
			<TableStyledContainer mode={mode}>
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
						<div
							className={`${tableKey} table`}
							{...getTableProps()}
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{headerGroups.map((headerGroup, i) => (
								<div
									className={'tr head'}
									key={i}
									{...headerGroup.getHeaderGroupProps()}
								>
									{headerGroup.headers.map((column, i) => {
										return (
											<Tds
												className={
													column.id === 'selection'
														? 'th table-check-box'
														: 'th'
												}
												width={
													column.id === 'selection'
														? '40px'
														: getColumnWidth(
																page.map(
																	(v) =>
																		v.original,
																),
																column.accessor,
																column.Header,
																column.id,
																column.width,
														  )
												}
												key={i}
												alignItems={'center'}
												{...column.getHeaderProps(
													mode ===
														(TableMode.NOMAL ||
															TableMode.CHECKBOX) &&
														column.getSortByToggleProps(),
												)}
											>
												{column.render('Header')}
												{mode ===
													(TableMode.NOMAL ||
														TableMode.CHECKBOX) &&
													column.id !==
														'selection' && (
														<Icon margin={'0px'}>
															{column.isSortedDesc ===
																'ture' ||
															column.isSortedDesc ===
																undefined
																? arrowDownIcon
																: arrowUpIcon}
														</Icon>
													)}
											</Tds>
										);
									})}
								</div>
							))}

							<BodyContainer>
								{page.map((row, index) => {
									prepareRow(row);
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
														<div
															ref={
																provided.innerRef
															}
															{...provided.dragHandleProps}
															{...provided.draggableProps}
															style={getItemStyle(
																snapshot.isDragging,
																provided
																	.draggableProps
																	.style,
															)}
															onMouseDown={
																onMouseDownItem
															}
															className={`tr body ${
																Object.keys(
																	selectedRowIds,
																).includes(
																	row
																		.original[
																		DRAGGABLE_KEY
																	],
																) && 'selected'
															}
													 ${index % 2 === 0 ? 'even' : 'odd'}
													`}
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
																		<Tds
																			className={
																				cell
																					.column
																					.id ===
																				'selection'
																					? 'td table-check-box'
																					: 'td'
																			}
																			width={
																				cell
																					.column
																					.id ===
																				'selection'
																					? '40px'
																					: getColumnWidth(
																							page.map(
																								(
																									v,
																								) =>
																									v.original,
																							),
																							cell
																								.column
																								.accessor,
																							cell
																								.column
																								.Header,
																							cell
																								.column
																								.id,
																							cell
																								.column
																								.width,
																					  )
																			}
																			key={
																				i
																			}
																			{...cell.getCellProps}
																		>
																			{cell.render(
																				'Cell',
																			)}
																		</Tds>
																	);
																},
															)}
														</div>
														{expanded &&
															Object.keys(
																expanded,
															).includes(
																row.original[
																	DRAGGABLE_KEY
																],
															) && (
																<InnerTableContainer
																	policyId={
																		row
																			.original
																			.id
																	}
																	attributes={
																		row
																			.original
																			.attributes
																	}
																/>
															)}
													</>
												);
											}}
										</Draggable>
									);
								})}
							</BodyContainer>
						</div>
					)}
				</Droppable>
			</TableStyledContainer>
		</_Container>
	);
};

Table.propTypes = {
	tableKey: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	isSortable: PropTypes.bool,
	isSelectable: PropTypes.bool,
	setData: PropTypes.func,
	setSelect: PropTypes.func,
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
	isSearchable: PropTypes.bool,
	isColumnFilterable: PropTypes.bool,
	isSearchFilterable: PropTypes.bool,
	mode: PropTypes.oneOf([
		TableMode.NOMAL,
		TableMode.READ_ONLY,
		TableMode.INNER,
		TableMode.CHECKBOX,
	]),
	isDraggable: PropTypes.bool,
};

export default Table;
