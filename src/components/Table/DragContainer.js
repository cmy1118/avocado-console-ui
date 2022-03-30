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
import styled from 'styled-components';
import {confirmAlertMessages} from '../../utils/alertMessage';
import {DRAGGABLE_KEY} from '../../Constants/Table/keys';

const Container = styled(DragDropContext)`
	height: 300px;
`;

const DragContainer = ({
	selected,
	children,
	data,
	setData,
	includedKey,
	excludedData,
	includedData,
	joinFunction,
	disjointFunction,
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
			if (selected?.length + current?.length > max) {
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
			//  API : groups 일때 - 그룹 유형 검사 : 그룹유형별 1개의 그룹만 추가
			if (CheckDropDataType(tableKey)) {
				if (CheckDropDataType(tableKey) === GROUP) {
					if (
						checkArrayhasDuplicates(excludedData.filter((v) => selected.includes(v.id)).map((v) => v.type))
					) {
						dispatch(
							DIALOG_BOX.action.openAlert({key: confirmAlertMessages.singleCountGroupTypes.key,}),
						);
						return true;
					}
					return false;
				} else if (CheckDropDataType(tableKey) === ROLES) {
					// API : roles 일때 - 역할 유형 검사 : Private 유형은 한사용자에게만
					if (checkArrayIsUniqueHasDuplicates(
							excludedData.filter((v) => selected.includes(v.id)).map((v) => v.type),FILTER_TYPE,
						) ||
						checkArraysIsUniqueHasDuplicates(
							includedData.map((v) => v.type),
							excludedData.filter((v) => selected.includes(v.id)).map((v) => v.type), FILTER_TYPE,)
					) {
						dispatch(
							DIALOG_BOX.action.openAlert({key: confirmAlertMessages.singleCountRolesTypes.key,
							}),
						);


						return true;
					} else {
						return false;
					}
				}




				else {
					return false;
				}
			}
		},
		[dispatch, excludedData, includedData],
	);

	const onDragStart = useCallback(
		(result) => {
			const items = selected[result.source.droppableId]?.map(
				(v) => v[DRAGGABLE_KEY],
				// v.userUid ? v.userUid : v.id,
			);

			//	console.log('result.draggableId', result.draggableId);
			if (items) {
				if (items.includes(result.draggableId)) {
					//		console.log('포함');
					setSelectedItems(items);
				} else {
					//	console.log('미포함');
					setSelectedItems([...items, result.draggableId]);
				}
			} else {
				setSelectedItems([result.draggableId]);
			}

			//	console.log(result);
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
					//		console.log('check');
					if (onDropCheckMaxNumber(selectedItems, data, includedKey))
						return;
					if (
						onDropCheckTypeLimited(selectedItems, data, includedKey)
					) {
						return;
					}
				}

				//	console.log('selectedItems :: ', selectedItems);
				//	console.log('data:', data);
				if (destination.droppableId === includedKey) {
					joinFunction && joinFunction(selectedItems);
					data
						? setData([...data, ...selectedItems])
						: setData([...selectedItems]);
				} else {
					disjointFunction && disjointFunction(selectedItems);
					setData(data.filter((v) => !selectedItems.includes(v)));
				}
			}
		},
		[
			includedKey,
			selectedItems,
			onDropCheckMaxNumber,
			data,
			onDropCheckTypeLimited,
			joinFunction,
			setData,
			disjointFunction,
		],
	);

	return (
		<Container onDragStart={onDragStart} onDragEnd={onDragEnd}>
			{children}
		</Container>
	);
};

DragContainer.propTypes = {
	selected: PropTypes.object,
	data: PropTypes.array,
	setData: PropTypes.func,
	joinFunction: PropTypes.func,
	disjointFunction: PropTypes.func,
	includedKey: PropTypes.string,
	excludedData: PropTypes.array,
	includedData: PropTypes.array,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default DragContainer;
