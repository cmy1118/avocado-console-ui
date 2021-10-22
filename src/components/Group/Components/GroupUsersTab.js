import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../utils/tableDataConverter';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {tableKeys} from '../../../utils/data';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import Table from '../../Table/Table';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';

const RightTableKey = tableKeys.usersIncludedInGroupOnDescPage;
const leftTableKey = tableKeys.usersExcludedFromGroupOnDescPage;

const GroupUsersTab = ({groupId}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {users} = useSelector(IAM_USER.selector);
	const [select, setSelect] = useState([]);

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);
	const [rightDataIds, setRightDataIds] = useState(group.members);
	//
	// users
	// 	.map(({uid: id, id: _id, ...rest}) => ({
	// 		id,
	// 		_id,
	// 		...rest,
	// 	}))

	const dataLeft = useMemo(() => {
		return users
			.filter((v) => rightDataIds.includes(v.uid))
			.map((v) => ({
				...v,
			}));
	}, [users, rightDataIds]);

	const dataRight = useMemo(() => {
		return users
			.filter((v) => !rightDataIds.includes(v.uid))
			.map((v) => ({
				...v,
			}));
	}, [users, rightDataIds]);

	const onClickDeleteRolesFromGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.deleteUsersFromGroup({
				id: groupId,
				users: Object.keys(select[RightTableKey]),
			}),
		);
		dispatch(
			IAM_USER.action.deleteUsersFromGroup({
				id: groupId,
				users: Object.keys(select[RightTableKey]),
			}),
		);
	}, [dispatch, groupId, select]);

	const onClickAddRolesToGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.addUsersToGroup({
				id: groupId,
				users: Object.keys(select[leftTableKey]),
			}),
		);
		dispatch(
			IAM_USER.action.addUsersToGroup({
				id: groupId,
				users: Object.keys(select[leftTableKey]),
			}),
		);
	}, [dispatch, groupId, select]);
	useEffect(() => {
		setRightDataIds(group.members);
	}, [group.members]);
	return (
		<>
			<div>
				이 그룹의 권한 : {dataLeft.length}
				<button onClick={onClickDeleteRolesFromGroup}>삭제</button>
			</div>
			<Table
				data={dataLeft}
				tableKey={RightTableKey}
				columns={getColumnsAsKey[RightTableKey]}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={'role'}
				setSelect={setSelect}
			/>
			<div>
				이 그룹의 다 른권한 : {dataRight.length}
				<button onClick={onClickAddRolesToGroup}>권한 추가</button>
			</div>
			<Table
				data={dataRight}
				tableKey={leftTableKey}
				columns={getColumnsAsKey[leftTableKey]}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={'role'}
				setSelect={setSelect}
			/>
		</>
	);
};

GroupUsersTab.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupUsersTab;
