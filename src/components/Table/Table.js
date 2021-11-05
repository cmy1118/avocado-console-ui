import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {
	useFilters,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';
import TableOptionsBar from './TableOptionsBar';
import TableCheckbox from './Options/TableCheckbox';
import {NormalBorderButton} from '../../styles/components/buttons';
import {
	arrowDownIcon,
	arrowUpIcon,
	cancelIcon,
	dragIndicator,
} from '../../icons/icons';
import {HoverIconButton, Icon} from '../../styles/components/icons';
import {ColDiv, HoverTableContainer, RowDiv} from '../../styles/components/div';
import {Label} from '../../styles/components/text';
import styled from 'styled-components';
import {FixedSizeList} from 'react-window';

const FiltersContainer = styled(RowDiv)`
	border-top: 1px solid #e3e5e5;
`;

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

const placeholders = {
	status: '계정상태',
	authType: '인증유형',
	MFA: 'MFA',
	passwordExpiryTime: '비밀번호 수명',
};

const Table = ({
	tableKey,
	data,
	columns,
	isSearchable = false,
	isSearchFilterable = false,
	isRefreshable = false,
	isPageable = false,
	isNumberOfRowsAdjustable = false,
	isColumnFilterable = false,
	isSortable = false,
	isSelectable = false,
	setData,
	setSelect,
	fullSize = false,
}) => {
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

	const [tableHeight, setTableHeight] = useState(0);
	const [headerHeight, setHeaderHeight] = useState(0);
	const [position, setPosition] = useState({x: 0, y: 0});

	const searchFilters = useMemo(() => {
		return columns.filter((v) =>
			Object.prototype.hasOwnProperty.call(v, 'filter'),
		);
	}, [columns]);
	const [selectedSearchFilters, setSelectedSearchFilters] = useState([]);

	const getRowId = useCallback((v) => {
		if (v.uid) return v.uid;
		return v.id;
	}, []);

	const getStyle = ({
		draggableStyle,
		isDragging,
		draggingOver,
		isDropAnimating,
	}) => {
		return {
			...draggableStyle,
			// height: isDragging ? draggableStyle.height : draggableStyle.height,
			// left: isDragging ? 300 : draggableStyle.left,
			// width: isDragging ? '100px' : `calc(${draggableStyle.width}px)`,
			border: '1px solid',
			borderColor: draggingOver ? '#4ca6a8' : '#e3e5e5',
			borderRadius: '4px',
			backgroundColor: 'rgba(255, 255, 255, 0.8)',
			margin: 'auto',
			width: '320px',
			height: '54px',
			top: position.y,
			left: position.x,
		};
	};

	/***************************************************************************/

	const {
		getTableProps,
		headerGroups,
		prepareRow,
		allColumns,
		canPreviousPage,
		canNextPage,
		pageOptions,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		setAllFilters,
		selectedFlatRows,
		getToggleHideAllColumnsProps,
		setHiddenColumns,
		rows,
		state: {pageIndex, pageSize, selectedRowIds, filters},
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
		(hooks) => {
			isSelectable &&
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
								row={row}
							/>
						),
						width: 40,
						disableChangeVisible: true,
					},
					...columns,
				]);
		},
	);

	const onClickCloseFilter = useCallback(
		(v) => () => {
			setSelectedSearchFilters(
				selectedSearchFilters.filter((val) => val !== v),
			);
			setAllFilters(filters.filter((val) => val.id !== v));
		},
		[selectedSearchFilters, setAllFilters, filters],
	);

	const onClickResetFilters = useCallback(() => {
		setSelectedSearchFilters([]);
		setAllFilters([]);
	}, [setAllFilters]);

	const selectedDropButton = useCallback(
		(selectedFlatRows) => {
			const data = {};
			data[tableKey] = selectedFlatRows.map((v) => v.original);
			setSelect && setSelect(data);
		},
		[setSelect, tableKey],
	);

	const onMouseDownItem = useCallback((e) => {
		const x = e.pageX - 160 + 'px';
		const y = e.pageY - 27 + 'px';
		setPosition({x, y});
	}, []);

	const RenderRow = useCallback(
		({index, style}) => {
			const row = rows[index];
			prepareRow(row);
			return (
				<Draggable
					draggableId={
						row.original.uid ? row.original.uid : row.original.id
					}
					index={index}
				>
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.dragHandleProps}
							{...provided.draggableProps}
							style={style}
							onMouseDown={onMouseDownItem}
							className={
								Object.keys(selectedRowIds).includes(
									row.original.uid
										? row.original.uid
										: row.original.id,
								)
									? 'tr body selected'
									: 'tr body'
							}
							id={
								row.original.uid
									? row.original.uid
									: row.original.id
							}
							key={
								row.original.uid
									? row.original.uid
									: row.original.id
							}
						>
							{row.cells.map((cell, i) => {
								return (
									<RowDiv
										onDrag={(e) => console.log(e)}
										alignItems={'center'}
										className={'td'}
										width={`${cell.column.width}px`}
										key={i}
										{...cell.getCellProps}
									>
										{cell.render('Cell', {
											setData,
										})}
									</RowDiv>
								);
							})}
						</div>
					)}
				</Draggable>
			);
		},
		[onMouseDownItem, prepareRow, rows, selectedRowIds, setData],
	);

	useEffect(() => {
		setTableHeight(
			document.querySelector(`.${tableKey}[role = 'table']`)
				?.offsetHeight,
		);
		setHeaderHeight(
			document.querySelector(`.${tableKey}[role = 'table'] > .head`)
				?.offsetHeight,
		);
	}, [tableKey]);

	useEffect(() => {
		setSelect && selectedFlatRows && selectedDropButton(selectedFlatRows);
	}, [selectedRowIds, setSelect, selectedDropButton, selectedFlatRows]);

	return (
		<HoverTableContainer>
			<TableOptionsBar
				tableKey={tableKey}
				gotoPage={gotoPage}
				canPreviousPage={canPreviousPage}
				previousPage={previousPage}
				nextPage={nextPage}
				canNextPage={canNextPage}
				pageOptions={pageOptions}
				pageIndex={pageIndex}
				pageSize={pageSize}
				setPageSize={setPageSize}
				isSearchable={isSearchable}
				isSearchFilterable={isSearchFilterable}
				searchFilters={searchFilters}
				selectedSearchFilters={selectedSearchFilters}
				setSelectedSearchFilters={setSelectedSearchFilters}
				isRefreshable={isRefreshable}
				isPageable={isPageable}
				isNumberOfRowsAdjustable={isNumberOfRowsAdjustable}
				isColumnFilterable={isColumnFilterable}
				allColumns={allColumns}
				filters={filters}
				setAllFilters={setAllFilters}
				setHiddenColumns={setHiddenColumns}
				getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
			/>

			{selectedSearchFilters[0] &&
				headerGroups.map((headerGroup, i) => (
					<FiltersContainer
						justifyContent={'space-between'}
						key={i}
						height={'84px'}
						{...headerGroup.getHeaderGroupProps()}
					>
						<RowDiv alignItems={'center'} margin={'11px 0px 16px'}>
							{headerGroup.headers.map(
								(column, i) =>
									column.canFilter &&
									selectedSearchFilters.includes(
										column.id,
									) && (
										<ColDiv key={i}>
											<Label>
												{placeholders[column.id]}
											</Label>
											<RowDiv alignItems={'center'}>
												{column.render('Filter')}
												<HoverIconButton
													size={'sm'}
													onClick={onClickCloseFilter(
														column.id,
													)}
												>
													{cancelIcon}
												</HoverIconButton>
											</RowDiv>
										</ColDiv>
									),
							)}
						</RowDiv>
						{selectedSearchFilters.length !== 0 && (
							<RowDiv
								alignItems={'flex-end'}
								margin={'11px 0px 16px'}
							>
								<NormalBorderButton
									onClick={onClickResetFilters}
								>
									모두 삭제
								</NormalBorderButton>
							</RowDiv>
						)}
					</FiltersContainer>
				))}
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
								draggableStyle: provided.draggableProps.style,
								isDragging: snapshot.isDragging,
								draggingOver: snapshot.draggingOver,
								isDropAnimating: snapshot.isDropAnimating,
							})}
						>
							<RowDiv padding={'15px 12px'} alignItems={'center'}>
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
											{isSortable &&
												!(i === 0 && isSelectable) && (
													<Icon margin={'0px'}>
														{column.isSortedDesc ===
															'ture' ||
														column.isSortedDesc ===
															undefined
															? arrowDownIcon
															: arrowUpIcon}
													</Icon>
												)}
										</RowDiv>
									);
								})}
							</div>
						))}
						<FixedSizeList
							height={fullSize ? tableHeight - headerHeight : 300}
							itemCount={
								rows.length > pageSize ? pageSize : rows.length
							}
							itemSize={40}
							outerRef={provided.innerRef}
						>
							{RenderRow}
						</FixedSizeList>
					</div>
				)}
			</Droppable>
		</HoverTableContainer>
	);
};

Table.propTypes = {
	tableKey: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	isSearchable: PropTypes.bool,
	isSearchFilterable: PropTypes.bool,
	isRefreshable: PropTypes.bool,
	isPageable: PropTypes.bool,
	isNumberOfRowsAdjustable: PropTypes.bool,
	isColumnFilterable: PropTypes.bool,
	isSortable: PropTypes.bool,
	isSelectable: PropTypes.bool,
	isDnDPossible: PropTypes.bool,
	setData: PropTypes.func,
	setSelect: PropTypes.func,
	control: PropTypes.bool,
	fullSize: PropTypes.bool,
	// dndKey: requiredIf(PropTypes.string, (props) => props.isDnDPossible),
};

export default Table;
