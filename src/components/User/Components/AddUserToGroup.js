import React, {useMemo} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {
	groupsExcludedFromUserOnAddPageColumns,
	groupsIncludedInUserOnAddPage,
} from '../../../utils/TableColumns/users';

const AddUserToGroup = () => {
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const data = useMemo(() => {
		return groups.map((v) => ({
			...v,
			numberOfUsers: v.members.length,
		}));
	}, [groups]);

	return (
		<>
			<div>그룹에 사용자에 추가</div>
			<div style={{display: 'flex'}}>
				<Table
					tableKey='groupsIncludedInUserOnAddPage'
					columns={
						getColumnsAsKey['groupsIncludedInUserOnAddPageColumns']
					}
					data={data}
					isPageable={true}
					isNumberOfRowsAdjustable={true}
					isColumnFilterable={true}
					isSortable={true}
					isDnDPossible={true}
					dndKey={'dndKey1'}
				/>
				{/*<Table*/}
				{/*	tableKey='groupsExcludedFromUserOnAddPage'*/}
				{/*	columns={*/}
				{/*		getColumnsAsKey[*/}
				{/*			'groupsExcludedFromUserOnAddPageColumns'*/}
				{/*		]*/}
				{/*	}*/}
				{/*	data={''}*/}
				{/*	isPageable={true}*/}
				{/*	isNumberOfRowsAdjustable={true}*/}
				{/*	isColumnFilterable={true}*/}
				{/*	isSortable={true}*/}
				{/*	isDnDPossible={true}*/}
				{/*	dndKey={'dndKey1'}*/}
				{/*/>*/}
			</div>
		</>
	);
};

export default AddUserToGroup;
