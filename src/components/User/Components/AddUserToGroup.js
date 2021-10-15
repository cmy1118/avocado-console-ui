import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {
	groupsExcludedFromUserOnAddPageColumns,
	groupsIncludedInUserOnAddPageColumns,
} from '../../../utils/TableColumns/users';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {element} from 'prop-types';
let dropDataTypeId = [];
let dropDataId = [];
let allArr = [];

const AddUserToGroup = () => {
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {currentTarget} = useSelector(CURRENT_TARGET.selector);
	const [dropData, setDropData] = useState([]);

	const groupArr2 = (dropDataId) => {
		allArr = groups.filter((v) => dropDataId.includes(v.id));
	};
	/***************************+*****************************/
	// COLUMN_DATA
	/********************************************************/
	const dataLeft = useMemo(() => {
		//COLUMN_FILTERING
		if (dropDataTypeId) {
			const selectGroupType = groups.find(
				(v) => v.id === currentTarget['groupsIncludedInUserOnAddPage'],
			)?.clientGroupTypeId;

			if (dropDataTypeId.includes(selectGroupType)) {
				const index = dropDataTypeId.indexOf(
					currentTarget['groupsIncludedInUserOnAddPage'],
				);
				dropDataTypeId.splice(index, 1);
			} else {
				dropDataTypeId.push(selectGroupType);
			}
		}

		if (dropDataTypeId) {
			return groups
				.filter((v) => !dropDataTypeId.includes(v.clientGroupTypeId))
				.map((v) => ({
					...v,
					numberOfUsers: v.members.length,
				}));
		} else {
			return groups.map((v) => ({
				...v,
				numberOfUsers: v.members.length,
			}));
		}
	}, [currentTarget, groups]);

	const dataRight = useMemo(() => {
		console.log(1);
		const groupArr = groups.filter((v) => dropDataId.includes(v.id));
		console.log('allArr:', allArr);
		return allArr.map((v) => ({
			...v,
		}));
	}, [currentTarget, dropDataId, groupArr2]);
	/********************************************************/
	useEffect(() => {
		console.log(2);
		/********************************************************/
		// *dropDataId : 선택된 행들의 groupid 배열
		//  -모든 상태변수 전역 관리
		/********************************************************/
		const currentGroupId = currentTarget['groupsIncludedInUserOnAddPage'];
		if (dropDataId.includes(currentGroupId)) {
			//선택되있으면 삭제
			const index = dropDataId.indexOf(currentGroupId);
			dropDataId.splice(index, 1);
		} else {
			//선택안되있으면 추가
			dropDataId.push(currentGroupId);
		}
		groupArr2(dropDataId);
		console.log('dropDataId:', dropDataId);
		/********************************************************/
	}, [currentTarget, dropDataId]);

	return (
		<>
			<div>그룹에 사용자에 추가</div>
			<div style={{display: 'flex'}}>
				<Table
					tableKey='groupsIncludedInUserOnAddPage'
					columns={
						getColumnsAsKey['groupsIncludedInUserOnAddPageColumns']
					}
					data={dataLeft}
					isPageable={true}
					isNumberOfRowsAdjustable={true}
					isColumnFilterable={true}
					isSortable={true}
					isDnDPossible={true}
					dndKey={'dndKey1'}
				/>
				<Table
					tableKey='groupsExcludedFromUserOnAddPage'
					columns={
						getColumnsAsKey[
							'groupsExcludedFromUserOnAddPageColumns'
						]
					}
					data={dataRight}
					isPageable={true}
					isNumberOfRowsAdjustable={true}
					isColumnFilterable={true}
					isSortable={true}
					isDnDPossible={true}
					dndKey={'dndKey1'}
				/>
			</div>
		</>
	);
};

export default AddUserToGroup;
