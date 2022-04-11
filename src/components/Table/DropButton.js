import React, {useCallback , useEffect , useState} from 'react';
import PropTypes from 'prop-types';
import DIALOG_BOX from '../../reducers/dialogBoxs';
import {checkDropTypeAlertMessage} from '../DialogBoxs/Alert/ConfirmDialogBox';
import {useDispatch, useSelector} from 'react-redux';
import {CheckDropDataType} from '../../utils/dropTableDataCheck';
import {
	checkArrayhasDuplicates,
	checkArrayIsUniqueHasDuplicates,
	checkArraysIsUniqueHasDuplicates, countArrayDuplicates,
} from '../../utils/dataFitering';
import {ColDiv} from '../../styles/components/style';
import {IconButton} from '../../styles/components/icons';
import {arrowLeft, arrowRight} from '../../icons/icons';
import styled from 'styled-components';
import {confirmAlertMessages} from '../../utils/alertMessage';
import {tableKeys} from "../../Constants/Table/keys";

const BorderHoverIconButton = styled(IconButton)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 34px;
	height: 34px;
	box-sizing: border-box;
	padding: 2px;
	margin: 6px;
	border-radius: 4px;
	border: solid 1px #c2c2c2;
	&:hover {
		color: #fff;
		background: #178082;
	}
`;

const DropButton = ({
						select,
						rightDataIds,
						dataRight,
						setRightDataIds,
						leftTableKey,
						rightTableKey,
						maxCount,
						usage
					}) => {
	/***************************************************************************/
	/* DndTable_update : 유형별 조건에 맞는 경고 알림추가
	/*
	/***************************************************************************/
	const dispatch = useDispatch();


	const onClickTypeLimited = useCallback(
		(selectdata, predata, leftTablekey, rightTableKey) => {
			// 이미 선택된 데이터
			let preDataType = [];
			if (predata) {
				preDataType = predata.map((v) => {
					return v.type;
				});
			}

			// 새로 선택된 데이터
			const CheckDataType = selectdata[leftTablekey] && selectdata[leftTablekey].map((v) => v.type);

			const GROUP = 'groups';
			const ROLES = 'roles';
			const UESRS = 'users';
			const POLICY = 'policy';
			const FILTER_TYPE = 'Private';

			if (CheckDropDataType(rightTableKey)) {
				if (CheckDropDataType(rightTableKey) === GROUP) {
					const TypeLimited = CheckDataType.filter((v) => preDataType ?? preDataType.includes(v),).length;
					if (
						TypeLimited > 1 &&
						checkArrayhasDuplicates(CheckDataType)
					) {
						dispatch(
							DIALOG_BOX.action.openAlert({
								key: confirmAlertMessages.singleCountGroupTypes.key,
							}),
						);
						return false;
					}
					return true;
				} else if (CheckDropDataType(rightTableKey) === ROLES) {
					// API : roles 일때 - 역할 유형 검사 : Private 유형은 한사용자에게만
					if (
						checkArrayIsUniqueHasDuplicates(CheckDataType, FILTER_TYPE) || checkArraysIsUniqueHasDuplicates(preDataType, CheckDataType, FILTER_TYPE)
					) {
						dispatch(
							DIALOG_BOX.action.openAlert({key: confirmAlertMessages.singleCountRolesTypes.key,}),
						);
						return false;
					} else {
						return true;
					}
				}else {
					return true;
				}
			}
		},
		[dispatch],
	);

	const onClickMaxNumber = useCallback((selectdata, predata, tableKey) => {
			const max = 10;
			const selectDataLength = selectdata && selectdata.length;
			let preDataLength = 0;
			if (predata) {
				preDataLength = predata.length;
			}
			if (preDataLength + selectDataLength > max) {
				dispatch(
					DIALOG_BOX.action.openAlert({key: checkDropTypeAlertMessage(tableKey),}),
				);
				return false;
			} else {
				return true;
			}
		},
		[dispatch],
	);

	// 역할 > 역할생성 > 역할+정책 연결 Table / 정책유형별 최대 추가 갯수 Validation [22.04.01 11:55 최미영]
	const onClickMaxTypeLimited = useCallback((select, dataRight, leftTableKey) => {
		// 이미 선택된 데이터
		let preDataType = [];
		if (dataRight) {preDataType = dataRight.map((v) => {
			return v.type;
		});
		}

		// 새로 선택된 데이터
		const checkDataType = select[leftTableKey] && select[leftTableKey].map((v) => v.type);

		// 새로 선택한 데이터 유형 + 이미 선택된 데이터 유형
		const totalType = [...checkDataType , ...preDataType];

		// totalType의 중복 데이터 갯수 확인
		const checkDuplicateType = countArrayDuplicates(totalType);

		let flags = true;

		Object.keys(checkDuplicateType).forEach((k) => {
			if (Number(checkDuplicateType[k]) > maxCount) {
				dispatch(DIALOG_BOX.action.openAlert({key: confirmAlertMessages.maxNumberOfPolicy.key}));
				flags = false;
				return;
			}
		});

		return flags;

	},[dispatch ,usage , maxCount])

	// 역할 > 역할생성 > 역할+사용자/그룹 연결 Table / 부여제한 횟수에 따른 최대 추가 갯수 Validation [22.04.01 11:55 최미영]
	const onClickMaxNumberLimited = useCallback((selectId, rightDataIds) => {
		if(usage === 'restrict'){
			if(maxCount > 0){
				const selectDataLength = selectId && selectId.length;
				let preDataLength = 0;
				if (rightDataIds) preDataLength = rightDataIds.length;

				if (preDataLength + selectDataLength > maxCount) {
					dispatch(DIALOG_BOX.action.openAlert({key: 'limitedNumberOfUsers'}));
					return false;
				} else {
					return true;
				}
			}else{
				dispatch(DIALOG_BOX.action.openAlert({key: 'limitedNumberCheck'}),);
			}
		}else{
			return true;
		}
	},[dispatch, usage, maxCount]);

	/***************************************************************************/



	// 역할 > 역할생성 > 역할+정책 연결 Table [22.04.01 12:17 최미영]
	const connectPolicyToRole = useCallback((select, selectId, dataRight, leftTableKey) => {
		rightDataIds && select && onClickMaxTypeLimited(select, dataRight, leftTableKey,maxCount) &&
		setRightDataIds && setRightDataIds(rightDataIds.concat(selectId))
	},[usage , maxCount])

	// 역할 > 역할생성 > 역할+사용자/그룹 연결 Table [22.04.01 12:17 최미영]
	const connectUserGroupToRole = useCallback((selectId , rightDataIds) => {
		rightDataIds && selectId && onClickMaxNumberLimited(selectId, rightDataIds) &&
		setRightDataIds && setRightDataIds(rightDataIds.concat(selectId));
	},[ usage , maxCount ])


	//데이터 추가
	const onClickLeftDropButton = useCallback(() => {
		let selectId;
		const UESRS = 'users';

		//TODO: users 의 uid 데이터 처리 수정
		if (CheckDropDataType(leftTableKey) === UESRS) {
			selectId = select[leftTableKey] && select[leftTableKey].map((v) => v.userUid);
		} else {
			selectId = select[leftTableKey] && select[leftTableKey].map((v) => v.id);
		}

		// 역할 > 역할생성 > 역할+정책 연결 Table [22.04.01 11:55 최미영]
		const CONNECT_POLICY_TO_ROLE_EXCLUDE = tableKeys.roles.add.policies.exclude;
		const CONNECT_POLICY_TO_ROLE_INCLUDE = tableKeys.roles.add.policies.include;

		// 역할 > 역할생성 > 역할+사용자 연결 Table [22.04.01 11:55 최미영]
		const CONNECT_USER_TO_ROLE_EXCLUDE = tableKeys.roles.add.users.exclude;
		const CONNECT_USER_TO_ROLE_INCLUDE = tableKeys.roles.add.users.include;

		// 역할 > 역할생성 > 역할+사용자그룹 연결 Table [22.04.01 11:55 최미영]
		const CONNECT_GROUPS_TO_ROLE_EXCLUDE = tableKeys.roles.add.groups.exclude;
		const CONNECT_GROUPs_TO_ROLE_INCLUDE = tableKeys.roles.add.groups.include;

		if(leftTableKey === CONNECT_POLICY_TO_ROLE_EXCLUDE && rightTableKey === CONNECT_POLICY_TO_ROLE_INCLUDE){
			connectPolicyToRole(select, selectId ,dataRight, leftTableKey, rightTableKey)
		}else if((leftTableKey === CONNECT_USER_TO_ROLE_EXCLUDE &&  rightTableKey === CONNECT_USER_TO_ROLE_INCLUDE) ||
			(leftTableKey === CONNECT_GROUPS_TO_ROLE_EXCLUDE &&  rightTableKey === CONNECT_GROUPs_TO_ROLE_INCLUDE)
		){
			connectUserGroupToRole(selectId , rightDataIds , rightTableKey);
		}else{
			rightDataIds && selectId && onClickMaxNumber(selectId, rightDataIds, rightTableKey) && onClickTypeLimited(
				select,
				dataRight,
				leftTableKey,
				rightTableKey,
			) && setRightDataIds && setRightDataIds(rightDataIds.concat(selectId));
		}
	}, [
		rightTableKey,
		dataRight,
		leftTableKey,
		onClickMaxNumber,
		onClickTypeLimited,
		rightDataIds,
		select,
		setRightDataIds,
		usage,
		maxCount
	]);

	//데이터 회수
	const onClickRightDropButton = useCallback(() => {
		const UESRS = 'users';
		//TODO: users 의 uid 데이터 처리 수정
		let selectId = null;

		if(CheckDropDataType(leftTableKey) === UESRS){
			selectId = select[rightTableKey] && select[rightTableKey].map((v) => v.userUid);
		}else{
			selectId = select[rightTableKey] && select[rightTableKey].map((v) => v.id);
		}

		rightDataIds && selectId &&
		setRightDataIds(rightDataIds.filter((v) => !selectId.includes(v)));
	}, [rightTableKey, rightDataIds, select, setRightDataIds]);

	return (
		<ColDiv>
			<BorderHoverIconButton size={'sm'} onClick={onClickLeftDropButton}>
				{arrowRight}
			</BorderHoverIconButton>

			<BorderHoverIconButton size={'sm'} onClick={onClickRightDropButton}>
				{arrowLeft}
			</BorderHoverIconButton>
		</ColDiv>
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
	rightTableKey: PropTypes.string.isRequired,
	maxCount : PropTypes.number,
	usage : PropTypes.string
};

export default DropButton;
