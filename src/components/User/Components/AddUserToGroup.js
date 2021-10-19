import React, {useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
const DndKey = 'groupsIncludedInUserOnAddPage_DndKey';

const AddUserToGroup = () => {
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const [rightDataIds, setRightDataIds] = useState([]);

	const dataLeft = useMemo(() => {
		const dropDataTypeId = groups
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => v.clientGroupTypeId);
		return groups
			.filter((v) => !dropDataTypeId.includes(v.clientGroupTypeId))
			.map((v) => ({
				...v,
				numberOfUsers: v.members.length,
			}));
	}, [groups, rightDataIds]);

	const dataRight = useMemo(() => {
		return groups
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
			}));
	}, [groups, rightDataIds]);

	console.log('dataLeft ::', dataLeft);
	console.log('dataRight ::', dataRight);

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
					dndKey={DndKey}
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
					dndKey={DndKey}
					setData={setRightDataIds}
				/>
			</div>
		</>
	);
};

export default AddUserToGroup;
