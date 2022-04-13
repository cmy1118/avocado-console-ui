import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import Table from '../../../../Table/Table';
import {useHistory, useLocation} from 'react-router-dom';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../../styles/components/iam/descriptionPage';
import IAM_USER from '../../../../../reducers/api/IAM/User/User/user';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../../reducers/api/IAM/User/Role/GrantRole/group';
import PAGINATION from '../../../../../reducers/pagination';
import IAM_USER_TAG from '../../../../../reducers/api/IAM/User/Tag/tags';
import {
	descriptionConverter,
	descValues,
} from '../../../../../utils/tableDataConverter';
import AUTH from '../../../../../reducers/api/Auth/auth';

const UserSummary = ({userUid}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const {companyId} = useSelector(AUTH.selector);
	const isSummaryOpened = useMemo(() => {
		if (location.search) return false;
		else return true;
	}, [location.search]);

	const [user, setUser] = useState(null);
	const {initialPage} = useSelector(PAGINATION.selector);
	const [groups, setGroups] = useState([]);
	const [roles, setRoles] = useState([]);
	const [tags, setTags] = useState([]);

	const onClickChangeTab = useCallback(
		(v) => () => {
			history.push({
				pathname: location.pathname,

				search: `tabs=${v}`,
			});
		},
		[history],
	);

	const groupData = useMemo(() => {
		return groups
			.filter((v) =>
				user?.groups
					? user.groups.map((x) => x.id).includes(v.id)
					: [].includes(v.id),
			)
			.map((v) => ({
				...v,
				userGroupType: v.userGroupType.name,
				parentGroup: v.parentGroup.name ? v.parentGroup.name : '없음',
				createdTime: v.createdTag.createdTime,
				grantDate: v.grantUser?.createdTag?.createdTime,
				grantUser: v.grantUser,
				numberOfRoles: v.roles ? v.roles.length : 0,

				[DRAGGABLE_KEY]: v.id,
			}));
	}, [groups, user]);

	const roleData = useMemo(() => {
		const temp = roles
			.filter((v) => v.policy)
			.map((v, i) => ({
				...v,
				permission: descValues(v.policy?.details[0].policyType),
				policyName: v.policy?.templateName,
				authTarget: '사용자',
				description: `${descriptionConverter(v.policy?.details)}`,
				roleName: v.role.name,
				grantDate: v.grantUser?.createdTag?.createdTime,
				grantUser: v.grantUser,
				id: v.role.id + '/' + i,
				[DRAGGABLE_KEY]: v.role.id + '/' + i,
			}));

		return temp;
	}, [roles, companyId]);

	const tagData = useMemo(() => {
		return tags.map((tag) => ({
			...tag,
			id: tag.name,
			numberOfPermissions: 0,
			[DRAGGABLE_KEY]: tag.name,
		}));
	}, [tags]);

	useEffect(() => {
		isSummaryOpened &&
			dispatch(
				IAM_USER.asyncAction.findByUidAction({
					userUid: userUid,
				}),
			)
				.unwrap()
				.then((res) => setUser({...res}));
	}, [dispatch, isSummaryOpened, userUid]);

	//:TODO 수정예정
	useEffect(() => {
		// const templatesArr = [];
		// isSummaryOpened &&
		// 	dispatch(
		// 		IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
		// 			userUid,
		// 			range: initialPage,
		// 		}),
		// 	)
		// 		.unwrap()
		// 		.then((roles) => {
		// 			console.log('roles:',roles)
		// 			if (!roles.data[0]) setRoles([]);
		// 			roles.data.forEach((role) => {
		// 				console.log(role);
		// 				dispatch(
		// 					IAM_ROLES.asyncAction.findByIdAction({
		// 						id: role.roleId,
		// 					}),
		// 				)
		// 					.unwrap()
		// 					.then((detailRole) => {
		// 						console.log(detailRole);
		// 						dispatch(
		// 							IAM_USER.asyncAction.findByUidAction({
		// 								userUid:
		// 									detailRole.createdTag.actorTag
		// 										.userUid,
		// 							}),
		// 						)
		// 							.unwrap()
		// 							.then((grantUser) => {
		// 								dispatch(
		// 									IAM_GRANT_POLICY_BY_ROLE.asyncAction.getsAction(
		// 										{
		// 											roleId: detailRole.id,
		// 											range: `elements=0-50`,
		// 										},
		// 									),
		// 								)
		// 									.unwrap()
		// 									.then((policies) => {
		// 										console.log(
		// 											'policies ::',
		// 											policies,
		// 										);
		// 										const arr = [];
		// 										if (!policies.data) {
		// 											arr.push({
		// 												role: detailRole,
		// 												grantUser: {
		// 													...grantUser,
		// 													createdTag:
		// 														role.createdTag,
		// 												},
		// 											});
		// 										} else {
		// 											policies.data.forEach(
		// 												(policy) => {
		// 													console.log(policy);
		// 													arr.push({
		// 														role: detailRole,
		// 														policy: policy,
		// 														grantUser: {
		// 															...grantUser,
		// 															createdTag:
		// 																role.createdTag,
		// 														},
		// 													});
		// 												},
		// 											);
		// 										}
		// 										templatesArr.push(arr);
		// 										if (
		// 											templatesArr.length ===
		// 											roles.data.length
		// 										) {
		// 											console.log(templatesArr);
		// 											setRoles(
		// 												_.flatten(templatesArr),
		// 											);
		// 										}
		// 									});
		// 							});
		// 					});
		// 			});
		// 		});
	}, [dispatch, initialPage, isSummaryOpened, userUid]);

	useEffect(() => {
		console.log(user);
		if (user && user.groups) {
			const arr = [];
			dispatch(
				IAM_USER.asyncAction.getUserGroupsAction({
					userUid: user.userUid,
					range: `elements=0-50`,
				}),
			)
				.unwrap()
				.then((groups) => {
					groups.data.forEach((group) => {
						dispatch(
							IAM_USER.asyncAction.findByUidAction({
								userUid: group.createdTag.actorTag?.userUid,
							}),
						)
							.unwrap()
							.then((grantUser) => {
								dispatch(
									IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction(
										{
											id: group.id,
											range: `elements=0-1`,
										},
									),
								)
									.unwrap()
									.then((roles) => {
										arr.push({
											...group,
											roles: roles.data,
											grantUser,
										});
										if (arr.length === groups.data.length) {
											setGroups(arr);
										}
									});
							});
					});
				});
		}
	}, [dispatch, initialPage, user]);

	useEffect(() => {
		if (user && user.tags) {
			dispatch(
				IAM_USER_TAG.asyncAction.getsAction({
					userUid: user.userUid,
					range: `elements=0-10`,
				}),
			)
				.unwrap()
				.then((tag) => {
					setTags(tag.data);
				});
		}
	}, [dispatch, user]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('group')}>
				그룹 : {groupData.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={groupData}
				tableKey={tableKeys.users.summary.group}
				columns={tableColumns[tableKeys.users.summary.group]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				권한 : {roleData.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={roleData}
				tableKey={tableKeys.users.summary.permission}
				columns={tableColumns[tableKeys.users.summary.permission]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab('tag')}>
				태그 : {tagData.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={tagData}
				tableKey={tableKeys.users.summary.tag}
				columns={tableColumns[tableKeys.users.summary.tag]}
			/>
		</SummaryTablesContainer>
	);
};

UserSummary.propTypes = {
	userUid: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	isSummaryOpened: PropTypes.bool.isRequired,
};
export default UserSummary;
