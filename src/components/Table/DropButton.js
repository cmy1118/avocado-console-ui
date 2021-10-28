import React, {useCallback} from 'react';
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

const DropButton = ({
	select,
	rightDataIds,
	dataRight,
	setRightDataIds,
	leftTableKey,
	RightTableKey,
}) => {
	/***************************************************************************/
	/* DndTable_update : 유형별 조건에 맞는 경고 알림추가
	/*
	/***************************************************************************/
	const dispatch = useDispatch();
	const onClickMaxNumber = useCallback(
		(selectdata, predata, tableKey) => {
			const max = 10;
			const selectDataLength = selectdata && selectdata.length;
			let preDataLength = 0;
			if (predata) {
				preDataLength = predata.length;
			}
			if (preDataLength + selectDataLength > max) {
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

	const onClickTypeLimited = useCallback(
		(selectdata, predata, leftTablekey, rightTableKey) => {
			const GROUP = 'groups';
			const ROLES = 'roles';
			const UESRS = 'users';
			const FILTER_TYPE = 'Private';
			let preDataType = [];
			if (predata) {
				preDataType = predata.map((v) => {
					return v.type;
				});
			}
			console.log(predata);
			console.log(preDataType);
			const CheckDataType =
				selectdata[leftTablekey] &&
				selectdata[leftTablekey].map((v) => v.type);
			if (CheckDropDataType(rightTableKey)) {
				if (CheckDropDataType(rightTableKey) === GROUP) {
					const TypeLimited = CheckDataType.filter(
						(v) => preDataType ?? preDataType.includes(v),
					).length;
					if (
						TypeLimited > 1 &&
						checkArrayhasDuplicates(CheckDataType)
					) {
						dispatch(
							DIALOG_BOX.action.openAlert({
								key: 'singleCountGroupTypes',
							}),
						);
						return false;
					}
					return true;
				} else if (CheckDropDataType(rightTableKey) === ROLES) {
					// API : roles 일때 - 역할 유형 검사 : Private 유형은 한사용자에게만
					if (
						checkArrayIsUniqueHasDuplicates(
							CheckDataType,
							FILTER_TYPE,
						) ||
						checkArraysIsUniqueHasDuplicates(
							preDataType,
							CheckDataType,
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

	//데이터 추가
	const onClickLeftDropButton = useCallback(() => {
		let selectId;
		const UESRS = 'users';
		//TODO: users 의 uid 데이터 처리 수정
		if (CheckDropDataType(leftTableKey) === UESRS) {
			selectId =
				select[leftTableKey] && select[leftTableKey].map((v) => v.uid);
		} else {
			selectId =
				select[leftTableKey] && select[leftTableKey].map((v) => v.id);
		}
		rightDataIds &&
			selectId &&
			onClickMaxNumber(selectId, rightDataIds, RightTableKey) &&
			onClickTypeLimited(
				select,
				dataRight,
				leftTableKey,
				RightTableKey,
			) &&
			setRightDataIds &&
			setRightDataIds(rightDataIds.concat(selectId));
	}, [
		RightTableKey,
		dataRight,
		leftTableKey,
		onClickMaxNumber,
		onClickTypeLimited,
		rightDataIds,
		select,
		setRightDataIds,
	]);

	//데이터 회수
	const onClickRightDropButton = useCallback(() => {
		const UESRS = 'users';
		//TODO: users 의 uid 데이터 처리 수정
		const selectId =
			select[RightTableKey] && select[RightTableKey].map((v) => v.id);

		rightDataIds &&
			selectId &&
			setRightDataIds(rightDataIds.filter((v) => !selectId.includes(v)));
	}, [RightTableKey, leftTableKey, rightDataIds, select, setRightDataIds]);

	return (
		<div>
			<button onClick={onClickLeftDropButton}>-&gt;</button>
			<button onClick={onClickRightDropButton}>&lt;-</button>
		</div>
	);
};

DropButton.propTypes = {
	select: PropTypes.oneOfType([
		PropTypes.object.isRequired,
		PropTypes.array.isRequired,
	]),
	dataRight: PropTypes.oneOfType([
		PropTypes.object.isRequired,
		PropTypes.array.isRequired,
	]),
	rightDataIds: PropTypes.array.isRequired,
	setRightDataIds: PropTypes.func.isRequired,
	leftTableKey: PropTypes.string.isRequired,
	RightTableKey: PropTypes.string.isRequired,
};

export default DropButton;
