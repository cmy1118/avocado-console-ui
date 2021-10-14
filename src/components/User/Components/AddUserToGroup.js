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

const AddUserToGroup = () => {
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {currentTarget} = useSelector(CURRENT_TARGET.selector);
	const [dropData, setDropData] = useState([]);
	/***************************+*****************************/
	// COLUMN_DATA
	/********************************************************/
	const dataLeft = useMemo(() => {
		//COLUMN_FILTERING
		const dropDataTypeId = groups.find(
			(v) => v.id === currentTarget['groupsIncludedInUserOnAddPage'],
		)?.clientGroupTypeId;

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
		let arr = [];
		dropData?.map((v) => {
			arr = [...arr, ...groups.filter((s) => s.id === v)];
		});
		return arr.map((v) => ({
			...v,
		}));
	}, [dropData]);
	/********************************************************/
	useEffect(() => {
		const result = [
			...new Set([
				...dropData,
				currentTarget['groupsIncludedInUserOnAddPage'],
			]),
		];
		setDropData((prev) => result.filter((n) => n));
	}, [currentTarget]);

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
