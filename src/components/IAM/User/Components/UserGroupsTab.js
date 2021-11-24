import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import Table from '../../../Table/Table';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../../Constants/Table/keys';
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

const UserGroupsTab = ({
	userUid,
	space,
	isFold,
	setIsFold,
	isSummaryOpened,
}) => {
	const dispatch = useDispatch();
	const {user} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {page} = useSelector(PAGINATION.selector);
	const [includedGroups, setIncludedGroups] = useState([]);
	const [select, setSelect] = useState({});

	const [includedDataIds, setIncludedDataIds] = useState(
		user?.groupIds || [],
	);

	const includedData = useMemo(() => {
		return (
			includedGroups
				.filter((v) => includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					name: v.name,
					type: v.userGroupType.name,
					parentGroup: v.parentGroup.name,
				})) || []
		);
	}, [includedGroups, includedDataIds]);

	const excludedData = useMemo(() => {
		const types = groups
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => v.userGroupType.name);

		return (
			groups
				.filter((v) => !includedDataIds.includes(v.id))
				.filter((v) => !types.includes(v.userGroupType.name))
				.map((v) => ({
					...v,
					name: v.name,
					type: v.userGroupType.name,
					parentGroup: v.parentGroup.name,
				})) || []
		);
	}, [groups, includedDataIds]);
	//삭제
	const onClickDeleteRolesFromUser = useCallback(
		(data) => {
			data.forEach((v) => {
				dispatch(
					IAM_USER_GROUP_MEMBER.asyncAction.disjointAction({
						groupId: v,
						userUid: userUid,
					}),
				);
			});
		},
		[dispatch, userUid],
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
		},
		[dispatch, userUid],
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
		if (user && user.groupIds[0]) {
			console.log(user.groupIds);
			const arr = [];
			user.groupIds.forEach((v) =>
				dispatch(
					IAM_USER_GROUP.asyncAction.findByIdAction({
						id: v,
					}),
				)
					.unwrap()
					.then((res) => {
						arr.push(res);
						if (user.groupIds.length === arr.length) {
							setIncludedGroups(arr);
						}
					}),
			);
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (includedGroups) {
			includedGroups.forEach((v) => {
				dispatch(
					IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction({
						id: v.id,
						range:
							page[tableKeys.users.summary.tabs.groups.include],
					}),
				);
			});
		}
	}, [dispatch, includedGroups, page]);

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
				disjointFunction={onClickDeleteRolesFromUser}
			>
				<TableTitle>
					이 사용자의 그룹: {includedData.length}{' '}
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={() =>
							onClickDeleteRolesFromUser(
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
