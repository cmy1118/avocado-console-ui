import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
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
import DIALOG_BOX from '../../reducers/dialogBoxs';
import {useDispatch} from 'react-redux';
import {CheckDropDataType} from '../../utils/dropTableDataCheck';
import {
	checkArrayhasDuplicates,
	checkArrayIsUniqueHasDuplicates,
	checkArraysIsUniqueHasDuplicates,
} from '../../utils/dataFitering';
import {NormalBorderButton} from '../../styles/components/buttons';
import {checkDropTypeAlertMessage} from '../DialogBoxs/Alert/ConfirmDialogBox';
import {arrowDownIcon, arrowUpIcon, cancelIcon} from '../../icons/icons';
import {HoverIconButton, Icon} from '../../styles/components/icons';
import {ColDiv, RowDiv} from '../../styles/components/div';
import {Label} from '../../styles/components/text';
import styled from 'styled-components';
import {FixedSizeList} from 'react-window';

const Container = styled.div`
	margin: 0px 16px;
	flex: 1;
	.table {
		display: flex;
		flex-direction: column;
		border-spacing: 0;
		border-top: 1px solid #e3e5e5;
		border-bottom: 1px solid #e3e5e5;
		font-size: 13px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: 0.13px;
		text-align: left;
		color: #212121;
		.head {
			background: #f8f9fa;
			border-bottom: 1px solid #e3e5e5;
		}
		.body {
			border-bottom: 1px solid #e3e5e5;
			// :last-child {
			// 	border: none;
			// }
		}
		.selected {
			background: rgba(228, 243, 244, 0.7);
		}

		.dragging {
			width: 320px;
			height: 54px;
			// margin: 54px 161px 12px 61px;
			// padding: 15px 192px 15px 12px;
			// border-radius: 4px;
			// border: solid 1px #4ca6a8;
			// background-color: rgba(255, 255, 255, 0.8);
		}

		.tr {
			display: flex;
			height: 40px;
			:last-child {
				.td {
					border-bottom: 0;
				}
			}
		}

		.th,
		.td {
			white-space: nowrap;
			box-sizing: border-box;
			text-align: left;
			margin: 0;
			padding: 0.5rem;
		}
	}
`;

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
	isDnDPossible = false,
	dndKey,
	setData,
	control = false,
	setSelect,
}) => {
	const dispatch = useDispatch();
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

	const searchFilters = useMemo(() => {
		console.log(columns);
		return columns.filter((v) =>
			Object.prototype.hasOwnProperty.call(v, 'filter'),
		);
	}, [columns]);
	const [selectedSearchFilters, setSelectedSearchFilters] = useState([]);

	const getRowId = useCallback((v) => {
		if (v.uid) return v.uid;
		return v.id;
	}, []);

	/***************************************************************************/
	/* DndTable_update : 유형별 조건에 맞는 경고 알림추가
	/*
	/***************************************************************************/
	const onDropCheckMaxNumber = useCallback(
		(e, data, tableKey) => {
			const max = 10;
			const preDataLength = data.length;
			const dropDataLength = e.dataTransfer.getData('ids').split(',')
				.length;
			if (preDataLength + dropDataLength > max) {
				dispatch(
					DIALOG_BOX.action.openAlert({
						key: checkDropTypeAlertMessage(tableKey),
					}),
				);
				return false;
			} else {
				return true;
			}
		},
		[dispatch],
	);

	const onDropCheckTypeLimited = useCallback(
		(e, data, tableKey) => {
			const GROUP = 'groups';
			const ROLES = 'roles';
			const UESRS = 'users';
			const FILTER_TYPE = 'Private';
			const preDataType = data.map((v) => {
				return v.type;
			});
			const dropDataType = e.dataTransfer
				.getData('selectedType')
				.split(',');
			//  API : groups 일때 - 그룹 유형 검사 : 그룹유형별 1개의 그룹만 추가
			if (CheckDropDataType(tableKey)) {
				if (CheckDropDataType(tableKey) === GROUP) {
					const TypeLimited = dropDataType.filter((v) =>
						preDataType.includes(v),
					).length;
					if (
						TypeLimited > 1 ||
						checkArrayhasDuplicates(dropDataType)
					) {
						dispatch(
							DIALOG_BOX.action.openAlert({
								key: 'singleCountGroupTypes',
							}),
						);
						return false;
					}
					return true;
				} else if (CheckDropDataType(tableKey) === ROLES) {
					// API : roles 일때 - 역할 유형 검사 : Private 유형은 한사용자에게만
					if (
						checkArrayIsUniqueHasDuplicates(
							dropDataType,
							FILTER_TYPE,
						) ||
						checkArraysIsUniqueHasDuplicates(
							preDataType,
							dropDataType,
							FILTER_TYPE,
						)
					) {
						dispatch(
							DIALOG_BOX.action.openAlert({
								key: 'singleCountRolesTypes',
							}),
						);
						return false;
					} else {
						return true;
					}
				} else {
					return true;
				}
			}
		},
		[dispatch],
	);
	/***************************************************************************/

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		allColumns,
		page, // Instead of using 'rows', we'll use page,
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
							/>
						),
						width: 40,
						disableChangeVisible: true,
					},
					...columns,
				]);
		},
	);

	const onDragEnd = useCallback((e) => {
		e.target.classList.remove('dragging');
	}, []);

	const onDragStart = useCallback(
		(row) => (e) => {
			e.target.classList.add('dragging');
			const firstTarget = e.target.firstChild.childNodes[0].childNodes[0];
			const flatRows = selectedFlatRows;

			console.log(e);

			console.log('onDragStart ::: ', tableKey);
			const selected = Object.keys(selectedRowIds);
			if (firstTarget.type === 'checkbox' && !firstTarget.checked) {
				selected.push(row.id);
				flatRows.push(row);
				firstTarget.click();
				// firstTarget.checked = true;
			}
			if (dndKey) {
				const selectedType = flatRows.map((v) => v.values.type);
				e.dataTransfer.setData('selectedType', selectedType.toString());
				console.log('dndKey');
			}
			e.dataTransfer.setData('ids', selected.toString());
			e.dataTransfer.setData(
				'prevIds',
				data.map((v) => v.id),
			);
			e.dataTransfer.setData('tableKey', tableKey);
			e.dataTransfer.setData('dndKey', dndKey);
		},

		[data, dndKey, selectedFlatRows, selectedRowIds, tableKey],
	);

	const onDrop = useCallback(
		(e) => {
			e.preventDefault();
			if (e.dataTransfer.getData('dndKey') !== dndKey) return;
			if (setData) {
				control // data를 control하는 쪽이면? 추가 아니면 삭제
					? onDropCheckMaxNumber(e, data, tableKey) &&
					  onDropCheckTypeLimited(e, data, tableKey) &&
					  setData([
							...data.map((v) => v.id),
							...e.dataTransfer.getData('ids').split(','),
					  ])
					: setData(
							e.dataTransfer
								.getData('prevIds')
								.split(',')
								.filter(
									(v) =>
										!e.dataTransfer
											.getData('ids')
											.split(',')
											.includes(v),
								),
					  );
			}
		},
		[
			dndKey,
			setData,
			control,
			onDropCheckMaxNumber,
			data,
			tableKey,
			onDropCheckTypeLimited,
		],
	);

	const onDragOver = useCallback((e) => {
		e.preventDefault();
	}, []);

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

	const RenderRow = useCallback(
		({index, style}) => {
			const row = rows[index];
			prepareRow(row);
			return (
				<div
					style={style}
					onDragStart={onDragStart(row)}
					onDragEnd={onDragEnd}
					className={
						Object.keys(selectedRowIds).includes(
							row.original.uid
								? row.original.uid
								: row.original.id,
						)
							? 'tr body selected'
							: 'tr body'
					}
					draggable={isDnDPossible ? 'true' : 'false'}
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
								{cell.render('Cell', {setData})}
							</RowDiv>
						);
					})}
				</div>
			);
		},
		[isDnDPossible, onDragStart, prepareRow, rows, selectedRowIds, setData],
	);

	useEffect(() => {
		setSelect && selectedFlatRows && selectedDropButton(selectedFlatRows);
	}, [selectedRowIds, setSelect, selectedDropButton, selectedFlatRows]);

	return (
		<Container>
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

			<div
				className={'table'}
				{...getTableProps()}
				onDrop={onDrop}
				onDragOver={onDragOver}
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
				<div {...getTableBodyProps()}>
					<FixedSizeList
						height={300}
						itemCount={
							rows.length > pageSize ? pageSize : rows.length
						}
						itemSize={40}
						// width={totalColumnsWidth + scrollBarSize}
					>
						{RenderRow}
					</FixedSizeList>
				</div>
			</div>
		</Container>
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
	dndKey: requiredIf(PropTypes.string, (props) => props.isDnDPossible),
};

export default Table;
