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

const TableStyledContainer = styled.div`
	margin: ${(props) => (props.mode === 'inner' ? '0px' : ' 0px 16px')};
	display: flex;
	min-width: 380px;
	min-height: ${(props) =>
		props.isOptionBar ? '62px' : props.mode === 'normal' && '240px'};
	height: ${(props) => props.mode === 'normal' && '0'};
	flex: ${(props) =>
		props.mode === 'normal' && !props.isOptionBar && '1 1 auto'};

	.table {
		width: 100%;
		overflow-x: scroll;
		height: ${(props) => (props.isDraggable ? '240px' : '100%')};
		display: grid;
		grid-template-rows: 40px;
		border-spacing: 0;
		border-bottom: ${(props) =>
			props.mode === 'inner' ? 'none' : '1px solid #e3e5e5'};
		border-left: ${(props) =>
			props.mode === 'inner' && '2px solid #4ca6a8'};
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

const _Container = styled.div`
	flex: 1 1 auto;
	width: 0;
`;

const BodyContainer = styled.div`
	flex: 1;
	overflow-y: scroll;
	overflow-x: hidden;
	min-height: 40px;
`;

const Table = ({
	tableKey,
	selectedFlatRows,
	selectedRowIds,
	isSortable = false,
	isSelectable = false,
	setData,
	getColumnWidth,
	setSelect,
	isDraggable = false,
	getTableProps,
	headerGroups,
	prepareRow,
	page,
	mode,
	expanded,
	isShowOptionBar,
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
			{isShowOptionBar && <TableOptionsBar tableKey={tableKey} />}
			<TableStyledContainer>
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
							//{...getTableProps()}
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
														  )
												}
												key={i}
												alignItems={'center'}
												{...column.getHeaderProps(
													mode === 'normal' &&
														column.getSortByToggleProps(),
												)}
											>
												{column.render('Header')}
												{mode === 'normal' &&
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
	tableKey: PropTypes.string,
	isSortable: PropTypes.bool,
	mode: PropTypes.string,
	isSelectable: PropTypes.bool,
	setData: PropTypes.func,
	setSelect: PropTypes.func,
	isDraggable: PropTypes.bool,
	getTableProps: PropTypes.func,
	getColumnWidth: PropTypes.func,
	headerGroups: PropTypes.array,
	prepareRow: PropTypes.func,
	page: PropTypes.array,
	selectedFlatRows: PropTypes.array,
	selectedRowIds: PropTypes.object,
	expanded: PropTypes.object,
	isShowOptionBar: PropTypes.bool,
};

export default Table;
