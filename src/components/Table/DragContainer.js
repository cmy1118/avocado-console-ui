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
    maxCount,
	usage
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
			const POLICY = 'policy'
			const FILTER_TYPE = 'Private';
			//  API : groups 일때 - 그룹 유형 검사 : 그룹유형별 1개의 그룹만 추가

			if (CheckDropDataType(tableKey)) {
				if (CheckDropDataType(tableKey) === GROUP) {
					if (checkArrayhasDuplicates(excludedData.filter((v) => selected.includes(v.id)).map((v) => v.type))) {
						dispatch(DIALOG_BOX.action.openAlert({key: confirmAlertMessages.singleCountGroupTypes.key,}),);
						return true;
					}
					return false;
				} else if (CheckDropDataType(tableKey) === ROLES) {
					// API : roles 일때 - 역할 유형 검사 : Private 유형은 한사용자에게만
					if (checkArrayIsUniqueHasDuplicates(excludedData.filter((v) => selected.includes(v.id)).map((v) => v.type),FILTER_TYPE,) ||
						checkArraysIsUniqueHasDuplicates(includedData.map((v) => v.type), excludedData.filter((v) => selected.includes(v.id)).map((v) => v.type), FILTER_TYPE,)
					) {
						dispatch(DIALOG_BOX.action.openAlert({key: confirmAlertMessages.singleCountRolesTypes.key}),);
						return true;
					} else {
						return false;
					}
				}else {
					return false;
				}
			}
		},
		[dispatch, excludedData, includedData],
	);


	// 역할 > 역할생성 > 역할+정책 연결 Table [22.04.01 12:17 최미영]
	const connectPolicyToRole = useCallback((selected, data) => {
		return onClickMaxTypeLimited(selected, data, maxCount);
	},[dispatch, excludedData, includedData]);

	// 역할 > 역할생성 > 역할+사용자/그룹 연결 Table [22.04.01 12:17 최미영]
	const connectUserGroupToRole = useCallback((selected,data) => {
		return onClickMaxNumberLimited(selected,data);
	},[usage, maxCount]);

	// 역할 > 역할생성 > 역할+정책 연결 Table / 정책유형별 최대 추가 갯수 Validation [22.04.01 11:55 최미영]
	const onClickMaxTypeLimited = useCallback((selected, data, maxCount) => {
			// 새로 선택한 데이터의 유형
			const newType = excludedData.filter((v) => selected.includes(v.id)).map((v) => v.type);

			// 이미 선택된 데이터의 유형
			const preType = includedData.filter((v) => data.includes(v.id)).map((v) => v.type)

			// 새로 선택한 데이터 유형 + 이미 선택된 데이터 유형
			const totalType = [...newType , ...preType];

			// totalType의 중복 데이터 갯수 확인
			const checkDuplicateType = countArrayDuplicates(totalType);
			let flag = false;
			Object.keys(checkDuplicateType).forEach((k) => {
				if (Number(checkDuplicateType[k]) > maxCount) {
					dispatch(DIALOG_BOX.action.openAlert({key: confirmAlertMessages.maxNumberOfPolicy.key}),);
					flag = true;
					return;
				}
			});
			return flag;
	},[dispatch, excludedData, includedData]);

	// 역할 > 역할생성 > 역할+사용자/그룹 연결 Table / 부여제한 횟수에 따른 최대 추가 갯수 Validation [22.04.01 11:55 최미영]
	const onClickMaxNumberLimited = useCallback((selected,data) => {
		if(usage === 'restrict'){
			let flag = false;
			if(maxCount > 0){
				const selectDataLength = selected && selected.length;

				let preDataLength = 0;
				if (data) preDataLength = data.length;

				if (preDataLength + selectDataLength > maxCount) {
					dispatch(DIALOG_BOX.action.openAlert({key: 'limitedNumberOfUsers'}));
					flag = true;
				}
				return flag;
			}else{
				dispatch(DIALOG_BOX.action.openAlert({key: 'limitedNumberCheck'}));
				return true;
			}
		}else{
			return false;
		}
	},[usage, maxCount])

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
				//하나 선택 드래그할때
			} else {
				setSelectedItems([result.draggableId]);
			}

			//	console.log(result);
		},
		[selected],
	);

	const onDragEnd = useCallback(
		async (result) => {
			const {source, destination} = result;
			if (!destination) { return; }

			if (destination.droppableId !== source.droppableId) {
				if (destination.droppableId === includedKey) {
					if(includedKey === tableKeys.roles.add.policies.include){
						if (connectPolicyToRole(selectedItems, data , maxCount)) return;
					}else if((includedKey === tableKeys.roles.add.users.include) || (includedKey === tableKeys.roles.add.groups.include)){
						if(connectUserGroupToRole(selectedItems, data)) return;
					}else{
						if (onDropCheckMaxNumber(selectedItems, data, includedKey)) return;
						if (onDropCheckTypeLimited(selectedItems, data, includedKey))return;
					}
				}

				if (destination.droppableId === includedKey) {
					joinFunction && joinFunction(selectedItems);
					//:TODO joinFunction 내부에서 데이터 처리해줌
					// data
					// 	? setData([...data, ...selectedItems])
					// 	: setData([...selectedItems]);
				} else {
					disjointFunction && disjointFunction(selectedItems);
					//:TODO disjointFunction 내부에서 데이터 처리해줌
					// setData(data.filter((v) => !selectedItems.includes(v)));
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
			usage,
			maxCount
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
	maxCount : PropTypes.number,
	usage:PropTypes.string
};

export default DragContainer;
