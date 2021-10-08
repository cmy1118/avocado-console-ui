import React from 'react';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import {Link} from 'react-router-dom';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';
import {settingSelector} from '../../../reducers/setting';

import {usersSelector} from '../../../reducers/users';
import {groupsSelector} from '../../../reducers/groups';
import {columnsAsType} from '../../../utils/TableColumns/index';

const PolicySpace = () => {
	const {data1, data2} = useSelector(settingSelector.all);
	const {users, userTags} = useSelector(usersSelector.all);
	const {groupTypes, groups} = useSelector(groupsSelector.all);

	const columns = [
		{
			Header: 'id',
			accessor: 'id',
		},
		{
			Header: 'name',
			accessor: 'name',
		},
	];

	// const columns = useMemo(() => {
	// 	return columnsAsType[tableKey];
	// }, [tableKey]);

	// const data = useMemo(() => {
	// 	switch (tableKey) {
	// 		case 'users':
	// 			return users.map((v) => ({
	// 				...v,
	// 				groups: numberOfGroupsConvertor(
	// 					v.groups.map(
	// 						(val) =>
	// 							groups.find((val2) => val2.id === val).name,
	// 					),
	// 				),
	// 				status: statusConvertor(v.status),
	// 				passwordExpiryTime: passwordExpiryTimeConvertor(
	// 					v.passwordExpiryTime,
	// 				),
	// 			}));
	//
	// 		case 'groups':
	// 			return groups.map((v) => ({
	// 				...v,
	// 				numberOfUsers: v.members.length,
	// 			}));
	//
	// 		case 'groupTypes':
	// 			return groupTypes.map((v) => ({
	// 				...v,
	// 				numberOfGroups: groups.filter(
	// 					(val) => val.clientGroupTypeId === v.id,
	// 				).length,
	// 			}));
	//
	// 		case 'addUsersToGroup':
	// 			return users.map((v) => ({
	// 				...v,
	// 				groupsLength: v.groups.length,
	// 			}));
	//
	// 		case 'addTagsToUser':
	// 			return userTags.map((v) => ({
	// 				...v,
	// 				rolesLength: v.permissions.length,
	// 			}));
	//
	// 		default:
	// 			return [];
	// 	}
	// }, [tableKey, users, groups, groupTypes, userTags]);

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policies'>정책</Link>
			</PathContainer>
			<div>Policy Space</div>
			<div style={{display: 'flex'}}>
				{/*<Table*/}
				{/*	tableKey={'users'}*/}
				{/*	columns={columnsAsType['users']}*/}
				{/*	data={users}*/}
				{/*	isSelectable={'ture'}*/}
				{/*	isColumnFilterable={'true'}*/}
				{/*/>*/}
				{/*<Table*/}
				{/*	tableKey={'table1'}*/}
				{/*	columns={columns}*/}
				{/*	data={data1}*/}
				{/*	isColumnFilterable={'true'}*/}
				{/*/>*/}
				{/*<Table*/}
				{/*	tableKey={'addTagsToUser'}*/}
				{/*	columns={columnsAsType['addTagsToUser']}*/}
				{/*	data={userTags}*/}
				{/*	isColumnFilterable={true}*/}
				{/*/>*/}
			</div>
		</IamContainer>
	);
};

export default PolicySpace;
