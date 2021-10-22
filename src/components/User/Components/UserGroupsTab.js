import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import Table from '../../Table/Table';
import {tableKeys} from '../../../utils/data';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';

const RightTableKey = tableKeys.groupsIncludedInUserOnDescPage;
const leftTableKey = tableKeys.groupsExcludedFromUserOnDescPage;

const UserGroupsTab = ({userId}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const [select, setSelect] = useState([]);
	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const [rightDataIds, setRightDataIds] = useState(user.groups);

	const dataLeft = useMemo(() => {
		return groups
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				numberOfRoles: v.roles.length,
			}));
	}, [groups, rightDataIds]);

	const dataRight = useMemo(() => {
		return groups
			.filter((v) => !rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				numberOfRoles: v.roles.length,
			}));
	}, [groups, rightDataIds]);
	//삭제
	const onClickDeleteRolesFromUser = useCallback(() => {
		dispatch(
			IAM_USER.action.deleteGroupsFromUser({
				uid: userId,
				groups: Object.keys(select[RightTableKey]),
			}),
		);
		dispatch(
			IAM_USER_GROUP.action.deleteGroupsFromUser({
				uid: userId,
				groups: Object.keys(select[RightTableKey]),
			}),
		);
	}, [dispatch, select, userId]);

	const onClickAddRolesToUser = useCallback(() => {
		dispatch(
			IAM_USER.action.addGroupsToUser({
				uid: userId,
				groups: Object.keys(select[leftTableKey]),
			}),
		);
		dispatch(
			IAM_USER_GROUP.action.addGroupsToUser({
				uid: userId,
				groups: Object.keys(select[leftTableKey]),
			}),
		);
	}, [dispatch, select, userId]);

	useEffect(() => {
		setRightDataIds(user.groups);
	}, [user.groups]);

	return (
		<>
			<div>
				이 사용자의 그룹: {dataLeft.length}{' '}
				<button onClick={onClickDeleteRolesFromUser}>삭제</button>
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
				dndKey={'groups'}
				setSelect={setSelect}
			/>
			<div>
				이 사용자의 다른그룹 : {dataRight.length}{' '}
				<button onClick={onClickAddRolesToUser}>그룹 추가</button>
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
				dndKey={'groups'}
				setSelect={setSelect}
			/>
		</>
	);
};

UserGroupsTab.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserGroupsTab;
