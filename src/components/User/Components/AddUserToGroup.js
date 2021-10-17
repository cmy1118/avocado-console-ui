import React, {useMemo} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import CURRENT_TARGET from '../../../reducers/currentTarget';
const DndKey = 'groupsIncludedInUserOnAddPage_DndKey';

const AddUserToGroup = () => {
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {currentDropId} = useSelector(CURRENT_TARGET.selector);
	const dataLeft = useMemo(() => {
		if (currentDropId[DndKey]) {
			const dropDataTypeId = groups
				.filter((v) => currentDropId[DndKey].includes(v.id))
				.map((v) => v.clientGroupTypeId);
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
	}, [currentDropId, groups]);
	const dataRight = useMemo(() => {
		if (currentDropId[DndKey]) {
			const currentDataRight = groups.filter((v) =>
				currentDropId[DndKey].includes(v.id),
			);
			return currentDataRight.map((v) => ({
				...v,
			}));
		} else {
			return [].map((v) => ({
				...v,
			}));
		}
	}, [currentDropId, groups]);

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
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					dndKey={'groupsIncludedInUserOnAddPage_DndKey'}
				/>
				<Table
					tableKey='groupsExcludedFromUserOnAddPage'
					columns={
						getColumnsAsKey[
							'groupsExcludedFromUserOnAddPageColumns'
						]
					}
					data={dataRight}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					dndKey={'groupsIncludedInUserOnAddPage_DndKey'}
				/>
			</div>
		</>
	);
};

export default AddUserToGroup;
