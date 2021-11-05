import React, {useCallback, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import DIALOG_BOX from '../../reducers/dialogBoxs';
import {checkDropTypeAlertMessage} from '../DialogBoxs/Alert/ConfirmDialogBox';
import {useDispatch} from 'react-redux';
import {CheckDropDataType} from '../../utils/dropTableDataCheck';
import {
	checkArrayhasDuplicates,
	checkArrayIsUniqueHasDuplicates,
	checkArraysIsUniqueHasDuplicates,
} from '../../utils/dataFitering';

const DragContainer = ({
	selected,
	children,
	data,
	setData,
	includedKey,
	excludedData,
	includedData,
}) => {
	const dispatch = useDispatch();
	const [selectedItems, setSelectedItems] = useState([]);

	/***************************************************************************/
	/* DndTable_update : 유형별 조건에 맞는 경고 알림추가
	/*
	/***************************************************************************/
	const onDropCheckMaxNumber = useCallback(
		(selected, current, tableKey) => {
			const max = 10;
			if (selected.length + current.length > max) {
				dispatch(
					DIALOG_BOX.action.openAlert({
						key: checkDropTypeAlertMessage(tableKey),
					}),
				);
				return true;
			}
			return false;
		},
		[dispatch],
	);

	const onDropCheckTypeLimited = useCallback(
		(selected, current, tableKey) => {
			const GROUP = 'groups';
			const ROLES = 'roles';
			const UESRS = 'users';
			const FILTER_TYPE = 'Private';
			console.log(excludedData);
			//  API : groups 일때 - 그룹 유형 검사 : 그룹유형별 1개의 그룹만 추가
			if (CheckDropDataType(tableKey)) {
				if (CheckDropDataType(tableKey) === GROUP) {
					if (
						checkArrayhasDuplicates(
							excludedData
								.filter((v) => selected.includes(v.id))
								.map((v) => v.type),
						)
					) {
						dispatch(
							DIALOG_BOX.action.openAlert({
								key: 'singleCountGroupTypes',
							}),
						);
						return true;
					}
					return false;
				} else if (CheckDropDataType(tableKey) === ROLES) {
					// API : roles 일때 - 역할 유형 검사 : Private 유형은 한사용자에게만
					if (
						checkArrayIsUniqueHasDuplicates(
							excludedData
								.filter((v) => selected.includes(v.id))
								.map((v) => v.type),
							FILTER_TYPE,
						) ||
						checkArraysIsUniqueHasDuplicates(
							includedData.map((v) => v.type),
							excludedData
								.filter((v) => selected.includes(v.id))
								.map((v) => v.type),
							FILTER_TYPE,
						)
					) {
						dispatch(
							DIALOG_BOX.action.openAlert({
								key: 'singleCountRolesTypes',
							}),
						);
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
		},
		[dispatch, excludedData, includedData],
	);

	// const onDrop = useCallback(
	// 	(e) => {
	// 		e.preventDefault();
	// 		if (setData) {
	// 				? onDropCheckMaxNumber(e, data, tableKey) &&
	// 				onDropCheckTypeLimited(e, data, tableKey) &&
	// 				setData([
	// 					...data.map((v) => v.id),
	// 					...e.dataTransfer.getData('ids').split(','),
	// 				])
	// 				: setData(
	// 					e.dataTransfer
	// 						.getData('prevIds')
	// 						.split(',')
	// 						.filter(
	// 							(v) =>
	// 								!e.dataTransfer
	// 									.getData('ids')
	// 									.split(',')
	// 									.includes(v),
	// 						),
	// 				);
	// 		}
	// 	},
	// 	[
	// 		setData,
	// 		onDropCheckMaxNumber,
	// 		data,
	// 		onDropCheckTypeLimited,
	// 	],
	// );

	const onDragStart = useCallback(
		(result) => {
			console.log('selected!');
			const items = selected[result.source.droppableId]?.map((v) => v.id);
			if (items) {
				if (items.includes(result.draggableId)) {
					setSelectedItems(items);
				} else {
					setSelectedItems([...items, result.draggableId]);
				}
			} else {
				setSelectedItems([result.draggableId]);
			}

			console.log(result);
		},
		[selected],
	);

	const onDragEnd = useCallback(
		(result) => {
			const {source, destination} = result;
			if (!destination) {
				return;
			}

			if (destination.droppableId !== source.droppableId) {
				if (destination.droppableId === includedKey) {
					console.log('check');
					if (onDropCheckMaxNumber(selectedItems, data, includedKey))
						return;
					if (
						onDropCheckTypeLimited(selectedItems, data, includedKey)
					) {
						return;
					}
				}
				if (destination.droppableId === includedKey) {
					setData([...data, ...selectedItems]);
					//추가
				} else {
					console.log(data);
					setData(data.filter((v) => !selectedItems.includes(v)));
					// 제거
				}
			}
		},
		[
			includedKey,
			onDropCheckMaxNumber,
			selectedItems,
			data,
			onDropCheckTypeLimited,
			setData,
		],
	);

	return (
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
			{children}
		</DragDropContext>
	);
};

DragContainer.propTypes = {
	selected: PropTypes.object,
	data: PropTypes.array,
	setData: PropTypes.func,
	includedKey: PropTypes.string,
	excludedData: PropTypes.array,
	includedData: PropTypes.array,
	children: PropTypes.array,
};

export default DragContainer;
