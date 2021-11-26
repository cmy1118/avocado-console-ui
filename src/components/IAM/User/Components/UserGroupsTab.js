import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import Table from '../../../Table/Table';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {TableTitle} from '../../../../styles/components/table';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableFold from '../../../Table/Options/TableFold';
import TableContainer from '../../../Table/TableContainer';
import DragContainer from '../../../Table/DragContainer';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../reducers/api/IAM/User/Role/GrantRole/group';
import {parentGroupConverter} from '../../../../utils/tableDataConverter';
import * as _ from 'lodash';

const UserGroupsTab = ({
	userUid,
	space,
	isFold,
	setIsFold,
	isSummaryOpened,
}) => {
	const dispatch = useDispatch();
	const [user, setUser] = useState(null);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {page} = useSelector(PAGINATION.selector);
	const [includedGroups, setIncludedGroups] = useState([]);
	const [excluedeGroups, setExcluedeGroups] = useState([]);
	const [select, setSelect] = useState({});

	const [includedDataIds, setIncludedDataIds] = useState(
		user?.groups?.map((v) => v.id) || [],
	);

	const includedData = useMemo(() => {
		return (
			_.uniqBy(includedGroups.concat(excluedeGroups), 'id')
				.filter((v) => includedDataIds?.includes(v.id))
				.map((v) => ({
					...v,
					name: v.name,
					type: v.userGroupType.name,
					parentGroup: parentGroupConverter(v.parentGroup.name),
					createdTime: v.createdTag.createdTime,
					[DRAGGABLE_KEY]: v.id,
				})) || []
		);
	}, [includedGroups, excluedeGroups, includedDataIds]);

	const excludedData = useMemo(() => {
		const types = excluedeGroups
			.filter((v) => includedDataIds?.includes(v.id))
			.map((v) => v.userGroupType.name);

		return (
			excluedeGroups
				.filter((v) => !includedDataIds?.includes(v.id))
				.filter((v) => !types.includes(v.userGroupType.name))
				.map((v) => ({
					...v,
					name: v.name,
					type: v.userGroupType.name,
					parentGroup: parentGroupConverter(v.parentGroup.name),
					createdTime: v.createdTag.createdTime,
					[DRAGGABLE_KEY]: v.id,
				})) || []
		);
	}, [excluedeGroups, includedDataIds]);
	//삭제
	const onClickDeleteGroupFromUser = useCallback(
		(data) => {
			data.forEach((v) => {
				dispatch(
					IAM_USER_GROUP_MEMBER.asyncAction.disjointAction({
						groupId: v,
						userUid: userUid,
					}),
				);
			});
			setIncludedDataIds(
				includedDataIds.filter((v) => !data.includes(v)),
			);
		},
		[dispatch, includedDataIds, userUid],
	);

	const onClickAddGroupToUser = useCallback(
		(data) => {
			data.forEach((v) => {
				dispatch(
					IAM_USER_GROUP_MEMBER.asyncAction.joinAction({
						groupId: v,
						userUid: [userUid],
					}),
				);
			});
			setIncludedDataIds(includedDataIds.concat(data));
		},
		[dispatch, includedDataIds, userUid],
	);

	const getExcludedGroupData = useCallback(
		(groups) => {
			const arr = [];
			groups.forEach((group) => {
				dispatch(
					IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction({
						id: group.id,
						range:
							page[tableKeys.users.summary.tabs.groups.exclude] ||
							'elements=0-50',
					}),
				)
					.unwrap()
					.then((roles) => {
						arr.push({
							...group,
							numberOfRoles: !roles.data ? 0 : roles.data.length,
						});
						if (arr.length === groups.length) {
							setExcluedeGroups(arr);
						}
					});
			});
		},
		[dispatch, page],
	);

	const getIncludedGroupsData = useCallback(
		(user) => {
			const arr = [];
			user.groups?.forEach((v) =>
				dispatch(
					IAM_USER_GROUP.asyncAction.findByIdAction({
						id: v.id,
					}),
				)
					.unwrap()
					.then((group) => {
						dispatch(
							IAM_USER.asyncAction.findByUidAction({
								userUid: group.createdTag.actorTag.userUid,
							}),
						)
							.unwrap()
							.then((grantUser) => {
								arr.push({
									...group,
									grantUser: {
										userUid: grantUser.userUid,
										id: grantUser.id,
										name: grantUser.name,
									},
								});
								if (user.groups.length === arr.length) {
									if (arr[0]) {
										const arr2 = [];
										arr.forEach((v) => {
											dispatch(
												IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction(
													{
														id: v.id,
														range:
															page[
																tableKeys.users
																	.summary
																	.tabs.groups
																	.include
															],
													},
												),
											)
												.unwrap()
												.then((role) => {
													arr2.push({
														...v,
														numberOfRoles: !role.data
															? 0
															: role.data.length,
													});
													if (
														arr.length ===
														arr2.length
													) {
														setIncludedGroups(arr2);
													}
												});
										});
									}
								}
							});
					}),
			);
		},
		[dispatch, page],
	);

	useEffect(() => {
		if (
			!isSummaryOpened &&
			page[tableKeys.users.summary.tabs.groups.include] &&
			user
		) {
			dispatch(
				IAM_USER_GROUP.asyncAction.findAllAction({
					range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			);
		}
	}, [dispatch, isSummaryOpened, page, user]);

	useEffect(() => {
		if (
			!user &&
			page[tableKeys.users.summary.tabs.groups.include] &&
			!isSummaryOpened
		) {
			dispatch(
				IAM_USER.asyncAction.findByUidAction({
					userUid: userUid,
				}),
			)
				.unwrap()
				.then((res) => {
					setUser(res);
					setIncludedDataIds(
						res.groups ? res.groups.map((v) => v.id) : [],
					);
					getIncludedGroupsData(res);
				});
		}
	}, [user, dispatch, userUid, getIncludedGroupsData, page, isSummaryOpened]);

	useEffect(() => {
		if (!isSummaryOpened && groups[0]) {
			getExcludedGroupData(groups);
		}
	}, [getExcludedGroupData, groups, isSummaryOpened]);

	return (
		<TabContentContainer>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.users.summary.tabs.groups.include}
				excludedData={excludedData}
				includedData={includedData}
				joinFunction={onClickAddGroupToUser}
				disjointFunction={onClickDeleteGroupFromUser}
			>
				<TableTitle>
					이 사용자의 그룹: {includedData.length}{' '}
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={() =>
							onClickDeleteGroupFromUser(
								select[
									tableKeys.users.summary.tabs.groups.include
								].map((v) => v.id),
							)
						}
					>
						삭제
					</TransparentButton>
				</TableTitle>
				<TableContainer
					data={includedData}
					tableKey={tableKeys.users.summary.tabs.groups.include}
					columns={
						tableColumns[
							tableKeys.users.summary.tabs.groups.include
						]
					}
				>
					<TableOptionsBar />
					<Table setSelect={setSelect} isDraggable />
				</TableContainer>
				<FoldableContainer>
					<TableFold
						title={
							<>이 사용자의 다른그룹 : {excludedData.length}</>
						}
						space={'UserGroupsTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<NormalButton
							margin='0px 0px 0px 5px'
							onClick={() =>
								onClickAddGroupToUser(
									select[
										tableKeys.users.summary.tabs.groups
											.exclude
									].map((v) => v.id),
								)
							}
						>
							그룹 추가
						</NormalButton>
					</TableFold>
					{isFold[space] && (
						<>
							<TableOptionText data={'groups'} />
							<TableContainer
								data={excludedData}
								tableKey={
									tableKeys.users.summary.tabs.groups.exclude
								}
								columns={
									tableColumns[
										tableKeys.users.summary.tabs.groups
											.exclude
									]
								}
							>
								<TableOptionsBar />
								<Table setSelect={setSelect} isDraggable />
							</TableContainer>
						</>
					)}
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

UserGroupsTab.propTypes = {
	userUid: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default UserGroupsTab;
