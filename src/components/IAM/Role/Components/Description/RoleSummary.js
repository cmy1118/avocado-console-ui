import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';

import Table from '../../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../../styles/components/iam/descriptionPage';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../../reducers/api/IAM/User/Role/GrantRole/group';
import IAM_ROLES_GRANT_ROLE_USER from '../../../../../reducers/api/IAM/User/Role/GrantRole/user';
import {
	descriptionConverter,
	descValues,
	expiredConverter,
} from '../../../../../utils/tableDataConverter';
import IAM_USER_GROUP from '../../../../../reducers/api/IAM/User/Group/group';
import IAM_USER from '../../../../../reducers/api/IAM/User/User/user';
import PAM_SESSION from '../../../../../reducers/api/PAM/session';
import {roleTabs} from '../../../../../utils/tabs';
import IAM_USER_POLICY_GRANT_REVOKE_ROLE from '../../../../../reducers/api/IAM/User/Policy/GrantRevoke/role';

const roleSummary = {
	policy: '권한/정책 : ',
	user: '이 역할의 사용자 : ',
	group: '이 역할의 사용자 그룹 : ',
};

/**************************************************
 * ambacc244 - 이 역할의 권한,정책 이 역할을 가지는 사용자,그룹들을 보여줌
 **************************************************/
const RoleSummary = ({roleId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const isSummaryOpened = useMemo(() => {
		if (location.search) return false;
		else return true;
	}, [location.search]);
	//permissions: 이 역할의 권한,정책
	const [permissions, setPermissions] = useState(null);
	//user: 이 역할을 가지는 사용자
	const [user, setUser] = useState([]);
	//group: 이 역할을 가지는 그룹
	const [group, setGroup] = useState([]);
	//permissionData: 이 역할의 권한,정책(화면에 필요에 따라 수정)
	const permissionData = useMemo(() => {
		console.log('permissions:', permissions);
		return (
			permissions?.map((v) => ({
				id: v.id,
				name: v.name ? v.name : '',
				type: v.type ? v.type.name : '',
				description: '',
				// description:policyDescription[v.id] || pamPolicyDescription[v.id],
				numberOfRoles: '',
				// policyNmberOfRoles[v.id] || pamPolicyNmberOfRoles[v.id],
				createdTime: v.createdTag ? v.createdTag.createdTime : '',
				[DRAGGABLE_KEY]: v.id,
				// attributes: v.attributes
				// 	? calculatettribute(v.attributes)
				// 	: null,
			})) || []
		);
	}, [permissions]);
	//userData: 이 역할을 가지는 사용자(화면에 필요에 따라 수정)
	const userData = useMemo(() => {
		console.log('user:', user);
		return (
			user?.map((v, i) => ({
				...v,
				id: v.userId ? v.userId : '',
				name: v.userName ? v.userName : '',
				createdTime: v.createdTime ? v.createdTime : '',
				grantUser: v.grantedCreateUserId
					? `${v.grantedCreateUserId}(${v.grantedCreateUserName})`
					: '',
				numberOfGroups: v.groupCount ? v.groupCount : '',
				lastConsoleLogin: v.lastConsoleLogin ? v.lastConsoleLogin : '',
				[DRAGGABLE_KEY]: v.userUid,
			})) || []
		);
	}, [user]);
	//groupData: 이 역할을 가지는 그룹(화면에 필요에 따라 수정)
	const groupData = useMemo(() => {
		console.log('group:', group);
		return (
			group?.map((v) => ({
				...v,
				id: v.userGroupId ? v.userGroupId : '',
				name: v.userGroupName ? v.userGroupName : '',
				type: v.userGroupTypeName ? v.userGroupTypeName : '',
				createdTime: v.createdTime ? v.createdTime : '',
				grantDate: v.grantedTime ? v.grantedTime : '',
				grantUser: v.grantedCreateUserId
					? `${v.grantedCreateUserId}(${v.grantedCreateUserName})`
					: '',
				numberOfPermissions: v.grantedCount ? v.grantedCount : '',
				lastConsoleLogin: v.lastConsoleLogin ? v.lastConsoleLogin : '',
				parentGroup: v.parentGroupName ? v.parentGroupName : '',
				[DRAGGABLE_KEY]: v.userGroupId,
			})) || []
		);
	}, [group]);

	/**************************************************
	 * roberto6385 - 탭 변경
	 **************************************************/
	const onClickChangeTab = useCallback(
		(v) => () => {
			history.push({
				pathname: location.pathname,
				search: `tabs=${v}`,
			});
		},
		[history],
	);
	/**************************************************
	 * 역할에대한 권한/정책 조회
	 **************************************************/
	const getPolicyApi = useCallback(async () => {
		try {
			//포함
			const includeData = await dispatch(
				IAM_USER_POLICY_GRANT_REVOKE_ROLE.asyncAction.findAllAction({
					roleId: roleId,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			console.log('includeData타입 : ', typeof includeData);
			await setPermissions(includeData);
		} catch (err) {
			alert('역할에대한 권한/정책 조회 오류');
			console.log(err);
		}
	}, [dispatch, roleId]);
	/**************************************************
	 * 역할에대한 사용자 조회
	 **************************************************/
	const getUserApi = useCallback(async () => {
		try {
			//포함
			const includeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.findUsersByIdAction({
					roleId: roleId,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			await setUser(includeData);
		} catch (err) {
			alert('역할에대한 사용자 오류');
			console.log(err);
		}
	}, [dispatch, roleId]);

	/**************************************************
	 * 역할에대한 그룹 조회
	 **************************************************/
	const getGroupApi = useCallback(async () => {
		try {
			const includeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.findUserGroupsById({
					roleId: roleId,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			if (includeData) {
				await setGroup(includeData);
			} else {
				await setGroup([]);
			}
		} catch (err) {
			alert('역할에대한 그룹 조회 오류');
			console.log(err);
		}
	}, [dispatch, roleId]);

	/**************************************************
	 * 역할에대한 기본정보 조회 조회
	 **************************************************/
	useEffect(async () => {
		try {
			await Promise.all([
				await getPolicyApi(),
				await getUserApi(),
				await getGroupApi(),
			]);
		} catch (err) {
			alert('역할에대한 기본정보 조회 오류');
			console.error(err);
		}
	}, [getGroupApi, getPolicyApi, getUserApi]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab(roleTabs.policy)}>
				{roleSummary.policy}
				{permissionData?.length}
			</SummaryTableTitle>

			<Table
				readOnly
				data={permissionData}
				tableKey={tableKeys.roles.summary.permission}
				columns={tableColumns[tableKeys.roles.summary.permission]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab(roleTabs.user)}>
				{roleSummary.user}
				{user?.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={userData}
				tableKey={tableKeys.roles.summary.user}
				columns={tableColumns[tableKeys.roles.summary.user]}
				isPaginable
				isSearchable
				isSearchFilterable
				isColumnFilterable
			/>

			<SummaryTableTitle onClick={onClickChangeTab(roleTabs.group)}>
				{roleSummary.group}
				{groupData?.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={groupData}
				tableKey={tableKeys.roles.summary.group}
				columns={tableColumns[tableKeys.roles.summary.group]}
				isPaginable
				isSearchable
				isSearchFilterable
				isColumnFilterable
			/>
		</SummaryTablesContainer>
	);
};

RoleSummary.propTypes = {
	roleId: PropTypes.string.isRequired,
};
export default RoleSummary;
