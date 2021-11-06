import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {arrowDownIcon, arrowUpIcon, dragIndicator} from '../../icons/icons';
import {Icon} from '../../styles/components/icons';
import {RowDiv, TableContainer} from '../../styles/components/div';
import styled from 'styled-components';

const Tds = styled(RowDiv)`
	overflow: hidden;
	align-items: center;
`;

const HoverTableContainer = styled(TableContainer)`
	display: flex;
	flex-direction: column;
	.table {
		height: 300px;
		border-bottom: 1px solid #e3e5e5;
	}
	.head {
		min-height: 40px;
	}
	.body {
		min-height: 40px;
		border-bottom: 1px solid #e3e5e5;
		&:hover {
			background: #f8f9fa;
		}
	}
`;

const Table = ({
	tableKey,
	selectedFlatRows,
	selectedRowIds,
	isSortable = false,
	isSelectable = false,
	setData,
	setSelect,
	isDraggable = false,
	getTableProps,
	headerGroups,
	prepareRow,
	page,
}) => {
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

	const onMouseDownItem = useCallback((e) => {
		let checkbox;
		if (e.target.classList.contains('td')) {
			checkbox =
				e.target.parentNode.childNodes[0]?.childNodes[0]?.childNodes[0];
			if (checkbox.type === 'checkbox' && !checkbox.checked)
				checkbox.click();
		} else if (e.target.classList.contains('tr')) {
			checkbox = e.target.childNodes[0]?.childNodes[0]?.childNodes[0];
			if (checkbox.type === 'checkbox' && !checkbox.checked)
				checkbox.click();
		}
		const x = e.pageX - 160 + 'px';
		const y = e.pageY - 27 + 'px';
		setPosition({x, y});
	}, []);

	// useEffect(() => {
	// setTableHeight(
	// 	document.querySelector(`.${tableKey}[role = 'table']`)
	// 		?.offsetHeight,
	// );
	// setHeaderHeight(
	// 	document.querySelector(`.${tableKey}[role = 'table'] > .head`)
	// 		?.offsetHeight,
	// );
	// }, [tableKey]);

	useEffect(() => {
		setSelect && selectedFlatRows && selectedDropButton(selectedFlatRows);
	}, [selectedRowIds, setSelect, selectedDropButton, selectedFlatRows]);

	return (
		<HoverTableContainer>
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
									return (
										<Tds
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
										</Tds>
									);
								})}
							</div>
						))}
						{page.map((row, index) => {
							prepareRow(row);
							return (
								<Draggable
									key={
										row.original.uid
											? row.original.uid
											: row.original.id
									}
									draggableId={
										row.original.uid
											? row.original.uid
											: row.original.id
									}
									isDragDisabled={!isDraggable}
									index={index}
								>
									{(provided, snapshot) => {
										return (
											<div
												ref={provided.innerRef}
												{...provided.dragHandleProps}
												{...provided.draggableProps}
												style={getItemStyle(
													snapshot.isDragging,
													provided.draggableProps
														.style,
												)}
												onMouseDown={onMouseDownItem}
												onDragStart={(e) =>
													console.log(e)
												}
												className={
													Object.keys(
														selectedRowIds,
													).includes(
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
														<Tds
															className={'td'}
															width={`${cell.column.width}px`}
															key={i}
															{...cell.getCellProps}
														>
															{cell.render(
																'Cell',
																{
																	setData,
																},
															)}
														</Tds>
													);
												})}
											</div>
										);
									}}
								</Draggable>
							);
						})}
					</div>
				)}
			</Droppable>
		</HoverTableContainer>
	);
};

Table.propTypes = {
	tableKey: PropTypes.string,
	isSortable: PropTypes.bool,
	isSelectable: PropTypes.bool,
	setData: PropTypes.func,
	setSelect: PropTypes.func,
	isDraggable: PropTypes.bool,
	getTableProps: PropTypes.func,
	headerGroups: PropTypes.array,
	prepareRow: PropTypes.func,
	page: PropTypes.array,
	selectedFlatRows: PropTypes.array,
	selectedRowIds: PropTypes.object,
};

export default Table;
