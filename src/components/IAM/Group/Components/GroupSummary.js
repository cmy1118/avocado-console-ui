import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {useHistory, useLocation} from 'react-router-dom';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../styles/components/iam/descriptionPage';
import PAGINATION from '../../../../reducers/pagination';
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';
import {TableMode} from '../../../../Constants/Table/mode';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../reducers/api/IAM/User/Role/GrantRole/group';
import {roleTypeConverter} from '../../../../utils/tableDataConverter';
import {groupTabs} from '../../../../utils/tabs';
import IAM_USER_GROUP_TAG from '../../../../reducers/api/IAM/User/Group/tags';

const GroupSummary = ({groupId}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const location = useLocation();
	const {page} = useSelector(PAGINATION.selector);
	const [groupUserMembers, setGroupUserMembers] = useState([]);
	const [groupRoleData, setGroupRoleData] = useState([]);
	const [groupTags, setGroupTags] = useState([]);

	const isSummaryOpened = useMemo(() => {
		if (location.search) return false;
		else return true;
	}, [location.search]);

	const userData = useMemo(() => {
		return groupUserMembers.map((v) => ({
			...v,
			id: v.id,
			name: v.name,
			groupsLength: v.groups ? v.groups.length : 0,
			status: v.status.code,
			createdTime: v.createdTag.createdTime,
			// grantUser: groupUserMembers.find((x) => x.userUid === v.userUid)
			// 	?.grantedTag.userUid,
			[DRAGGABLE_KEY]: v.userUid,
		}));
	}, [groupUserMembers]);

	const groupData = useMemo(() => {
		return groupRoleData
			? groupRoleData.map((v) => ({
					...v,
					type: roleTypeConverter(v.companyId),
					numberOfUsers: '',
					createdTime: v.createdTag ? v.createdTag.createdTime : '',
					[DRAGGABLE_KEY]: v.id,
			  }))
			: [];
	}, [groupRoleData]);

	const roleData = useMemo(() => [], []);

	const tagData = useMemo(() => {
		return groupTags.map((v) => ({
			...v,
			createdTime: v.createdTag.createdTime,
			[DRAGGABLE_KEY]: v.name,
		}));
		// return group.tags.map((v, i) => ({
		// 	...v,
		// 	id: v.name,
		// 	numberOfPermissions: v.permissions.length,
		// 	createdTime: dummyDates[i],
		// }));
	}, [groupTags]);

	const onClickChangeTab = useCallback(
		(v) => () => {
			history.push({
				pathname: location.pathname,
				search: `tabs=${v}`,
			});
		},
		[history, location],
	);
	const groupRolesApi = useCallback(async () => {
		try {
			//포함
			const includeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction({
					id: groupId,
				}),
			).unwrap();
			console.log('includeData:', includeData);
			await setGroupRoleData(includeData.data);
		} catch (err) {
			alert('조회 오류');
			console.log(err);
		}
	}, [dispatch, groupId]);

	const groupUserApi = useCallback(async () => {
		try {
			isSummaryOpened &&
				dispatch(
					IAM_USER_GROUP_MEMBER.asyncAction.findAllAction({
						groupId: groupId,
						range: 'elements=0-50', // todo : 상세 페이지는 페이지네이션이 없음 => how?
					}),
				)
					.unwrap()
					.then((member) => {
						//	console.log(member.data);
						return member.data.map((x) => x.userUid);
					})
					.then((uids) => {
						const arr = [];
						//	console.log(uids);
						if (!uids) return;
						uids.forEach((uid) => {
							dispatch(
								IAM_USER.asyncAction.findByUidAction({
									userUid: uid,
								}),
							)
								.unwrap()
								.then((data) => {
									console.log(data);
									arr.push(data);
									if (arr.length === uids.length)
										setGroupUserMembers(arr);
								});
						});
					});
		} catch (err) {
			alert('조회 오류');
			console.log(err);
		}
	}, [dispatch, groupId, isSummaryOpened]);

	//TODO : 유섭님 Tag  관련
	const groupTagApi = useCallback(async () => {
		try {
			if (isSummaryOpened) {
				const res = await dispatch(
					IAM_USER_GROUP_TAG.asyncAction.getsAction({
						groupId: groupId,
						range: 'elements=0-50', // todo : 상세 페이지는 페이지네이션이 없음 => how?
					}),
				).unwrap();

				console.log(res.data);
				await setGroupTags(res.data);
			}
		} catch (err) {
			alert('조회 오류');
			await setGroupTags([]);
			console.error(err);
		}
	}, [dispatch, groupId, isSummaryOpened]);

	useEffect(async () => {
		await Promise.all([
			await groupUserApi(),
			await groupRolesApi(),
			await groupTagApi(),
		]);
	}, [groupRolesApi, groupTagApi, groupUserApi]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab(groupTabs.user)}>
				사용자 : {userData.length}
			</SummaryTableTitle>

			<Table
				readOnly
				data={userData}
				tableKey={tableKeys.groups.summary.user}
				columns={tableColumns[tableKeys.groups.summary.user]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab(groupTabs.role)}>
				권한 : {roleData.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={groupData}
				tableKey={tableKeys.groups.summary.permission}
				columns={tableColumns[tableKeys.groups.summary.permission]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab(groupTabs.tag)}>
				태그 : {tagData.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={tagData}
				tableKey={tableKeys.groups.summary.tag}
				columns={tableColumns[tableKeys.groups.summary.tag]}
			/>
		</SummaryTablesContainer>
	);
};

GroupSummary.propTypes = {
	groupId: PropTypes.string.isRequired,
};
export default GroupSummary;
