import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import DropButton from '../../../../Table/DropButton';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../../../reducers/currentTarget';
import {
	ColDiv,
	CollapsbleContent,
	RowDiv,
	TableHeader,
} from '../../../../../styles/components/style';
import PropTypes from 'prop-types';
import FoldableContainer from '../../../../Table/Options/FoldableContainer';
import DragContainer from '../../../../Table/DragContainer';
import PAGINATION from '../../../../../reducers/pagination';
import {totalNumberConverter} from '../../../../../utils/tableDataConverter';
import IAM_USER_GROUP from '../../../../../reducers/api/IAM/User/Group/group';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../../reducers/api/IAM/User/Role/GrantRole/group';
import IAM_USER_GROUP_MEMBER from '../../../../../reducers/api/IAM/User/Group/groupMember';
import {isFulfilled} from '../../../../../utils/redux';
import ConnectPolicyToRole from './ConnectPolicyToRole';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import {IamSectionContents} from "../../../../../styles/components/iam/addPage";
import useSelectColumn from "../../../../../hooks/table/useSelectColumn";

const ConnectGroupToRole = ({usage, maxGrants}) => {
	const [selectExCludeColumns, exCludeColumns] = useSelectColumn(tableColumns[tableKeys.roles.add.policies.exclude]);
	const [selectIncludeColumns, includeColumns] = useSelectColumn(tableColumns[tableKeys.roles.add.policies.include]);
	const [selected, setSelected] = useState({});

	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);

	const [search, setSearch] = useState('');
	const [userGroups, setUserGroups] = useState([]);

	const [includedDataIds, setIncludedDataIds] = useState([]);

	const includedData = useMemo(() => {
		return (
			userGroups
				.filter((v) => includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					[DRAGGABLE_KEY]: v.id,
				})) || []
		);
	}, [userGroups, includedDataIds]);
	const excludedData = useMemo(() => {
		return (
			userGroups
				.filter((v) => !includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					[DRAGGABLE_KEY]: v.id,
				})) || []
		);
	}, [userGroups, includedDataIds]);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.roles.add.groups.exclude,
				data: includedData,
			}),
		);
	}, [dispatch, includedData]);

	const getUserGroupsApi = useCallback(
		async (search) => {
			if (page[tableKeys.roles.add.groups.exclude]) {
				const res = await dispatch(
					IAM_USER_GROUP.asyncAction.findAllAction({
						range: page[tableKeys.roles.add.groups.exclude],
						...(search && {keyword: search}),
					}),
				);

				if (isFulfilled(res)) {
					dispatch(
						PAGINATION.action.setTotal({
							tableKey: tableKeys.roles.add.groups.exclude,
							element: totalNumberConverter(
								res.payload.headers['content-range'],
							),
						}),
					);
					res.payload.data.length
						? await getUserGroupsDetailApi(res.payload)
						: setUserGroups([]);
				}
			}
		},
		[dispatch, page],
	);
	const getUserGroupsDetailApi = useCallback(
		async (groups) => {
			const arr = [];
			groups.data.map((group) => {
				getNumberOfUsers(group.id).then((user) => {
					getNumberOfRoles(group.id).then((role) => {
						arr.push({
							...group,
							name: group.name,
							userGroupType: group.userGroupType.name,
							numberOfUsers: user,
							roles: role === 0 ? '없음' : '정의됨',
							createdTime: group.createdTag.createdTime,
						});
						if (groups.data.length === arr.length) {
							setUserGroups(arr);
						}
					});
				});
			});
		},
		[dispatch],
	);

	const getNumberOfUsers = useCallback(
		async (groupsId) => {
			const res = await dispatch(
				IAM_USER_GROUP_MEMBER.asyncAction.findAllAction({
					groupId: groupsId,
					range: 'elements=0-1',
				}),
			);
			if (isFulfilled(res)) {
				return totalNumberConverter(
					res.payload.headers['content-range'],
				);
			}
		},
		[dispatch],
	);
	const getNumberOfRoles = useCallback(
		async (groupsId) => {
			const res = await dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction({
					id: groupsId,
					range: 'elements=0-1',
				}),
			);

			if (isFulfilled(res)) {
				return totalNumberConverter(
					res.payload.headers['content-range'],
				);
			}
		},
		[dispatch],
	);

	useEffect(() => {
		getUserGroupsApi(search);
	}, [getUserGroupsApi, page, search]);

	return (
		<FoldableContainer title={'사용자 그룹 연결'} bottomMargin={true}>
			<DragContainer
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.add.groups.include}
				excludedData={excludedData}
				includedData={includedData}
				maxCount={5}
			>
				<IamSectionContents>
					<RowDiv>
						<Table
							isDraggable
							tableKey={tableKeys.roles.add.groups.exclude}
							columns={exCludeColumns}
							data={excludedData}
							isPaginable
							isSearchable
							isSearchFilterable
							isColumnFilterable
							setSearch={setSearch}
						/>

						<RowDiv alignItems={'center'}>
							<DropButton
								leftTableKey={tableKeys.roles.add.groups.exclude}
								rightTableKey={tableKeys.roles.add.groups.include}
								select={selected}
								dataLeft={excludedData}
								dataRight={includedData}
								rightDataIds={includedDataIds}
								setRightDataIds={setIncludedDataIds}
							/>
						</RowDiv>
						<ColDiv>
							<TableHeader>
								추가 정책: {includedDataIds.length}건
							</TableHeader>
						</ColDiv>

						<Table
							isDraggable
							tableKey={tableKeys.roles.add.groups.include}
							columns={includeColumns}
							data={includedData}
						/>
					</RowDiv>
				</IamSectionContents>
			</DragContainer>
		</FoldableContainer>






		// <FoldableContainer title={'역할에 사용자 그룹 연결'}>
		// 	<TableOptionText data={'rolePolicy'} />
		// 	<DragContainer
		// 		selected={select}
		// 		data={includedDataIds}
		// 		setData={setIncludedDataIds}
		// 		includedKey={tableKeys.roles.add.groups.include}
		// 		excludedData={excludedData}
		// 		includedData={includedData}
		// 		maxCount={maxGrants}
		// 		usage={usage}
		// 	>
		// 		<RowDiv>
		// 			<Table
		// 				setSelect={setSelect}
		// 				isDraggable
		// 				data={excludedData}
		// 				tableKey={tableKeys.roles.add.groups.exclude}
		// 				columns={
		// 					tableColumns[tableKeys.roles.add.groups.exclude]
		// 				}
		// 				isPaginable
		// 				isSearchable
		// 				isSearchFilterable
		// 				isColumnFilterable
		// 				setSearch={setSearch}
		// 			/>
		// 			<RowDiv alignItems={'center'}>
		// 				<DropButton
		// 					leftTableKey={tableKeys.roles.add.groups.exclude}
		// 					rightTableKey={tableKeys.roles.add.groups.include}
		// 					select={select}
		// 					dataLeft={excludedData}
		// 					dataRight={includedData}
		// 					rightDataIds={includedDataIds}
		// 					setRightDataIds={setIncludedDataIds}
		// 					maxCount={maxGrants}
		// 					usage={usage}
		// 				/>
		// 			</RowDiv>
		// 			<ColDiv>
		// 				<TableHeader>
		// 					추가 사용자: {includedDataIds.length}건
		// 				</TableHeader>
		// 				<Table
		// 					setSelect={setSelect}
		// 					isDraggable
		// 					data={includedData}
		// 					tableKey={tableKeys.roles.add.groups.include}
		// 					columns={tableColumns[tableKeys.roles.add.groups.include]}
		// 				/>
		// 			</ColDiv>
		// 		</RowDiv>
		// 	</DragContainer>
		// </FoldableContainer>
	);
};
ConnectGroupToRole.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	usage: PropTypes.string,
	maxGrants: PropTypes.number,
};
export default ConnectGroupToRole;
