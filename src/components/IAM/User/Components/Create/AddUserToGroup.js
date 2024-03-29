import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../../../reducers/api/IAM/User/Group/group';
import DropButton from '../../../../Table/DropButton';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../../../reducers/currentTarget';
import {
	ColDiv,
	RowDiv,
	TableHeader,
} from '../../../../../styles/components/style';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import DragContainer from '../../../../Table/DragContainer';
import PAGINATION from '../../../../../reducers/pagination';
import IAM_USER_GROUP_MEMBER from '../../../../../reducers/api/IAM/User/Group/groupMember';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../../reducers/api/IAM/User/Role/GrantRole/group';
import {totalNumberConverter} from '../../../../../utils/tableDataConverter';
import useSelectColumn from '../../../../../hooks/table/useSelectColumn';
import FoldableContainer from '../../../../Table/Options/FoldableContainer';
import {IamSectionContents} from '../../../../../styles/components/iam/addPage';

const AddUserToGroup = () => {
	const dispatch = useDispatch();
	const [groups, setGroups] = useState([]);
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [search, setSearch] = useState('');
	const {page} = useSelector(PAGINATION.selector);

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.add.groups.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.add.groups.exclude],
	);
	const [selected, setSelected] = useState({});

	const includedData = useMemo(() => {
		return (
			groups
				.filter((v) => includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					userGroupType: v.userGroupType.name,
					[DRAGGABLE_KEY]: v.id,
				})) || []
		);
	}, [groups, includedDataIds]);

	const excludedData = useMemo(() => {
		const types = groups
			.filter((v) => includedDataIds?.includes(v.id))
			.map((v) => v.userGroupType.name);

		return (
			groups
				.filter((v) => !includedDataIds.includes(v.id))
				.filter((v) => !types.includes(v.userGroupType.name))
				.map((v) => ({
					...v,
					userGroupType: v.userGroupType.name,
					roles: v.numberOfRoles === 0 ? '없음' : '정의됨',
					createdTime: v.createdTag.createdTime,
					[DRAGGABLE_KEY]: v.id,
				})) || []
		);
	}, [groups, includedDataIds]);

	const getUsersGroupDetailApi = useCallback(
		(res) => {
			const arr = [];
			res.data.forEach((group) => {
				dispatch(
					IAM_USER_GROUP_MEMBER.asyncAction.findAllAction({
						groupId: group.id,
						range: 'elements=0-1',
					}),
				)
					.unwrap()
					.then((member) => {
						dispatch(
							IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction({
								id: group.id,
								range: 'elements=0-1',
							}),
						)
							.unwrap()
							.then((roles) => {
								//		console.log(roles);
								arr.push({
									...group,
									numberOfRoles: totalNumberConverter(
										roles.headers['content-range'],
									),
									numberOfUsers: totalNumberConverter(
										member.headers['content-range'],
									),
								});
								if (res.data.length === arr.length) {
									setGroups(arr);
								}
							});
					});
			});
		},
		[dispatch],
	);

	const getUsersGroupApi = useCallback(() => {
		page[tableKeys.users.add.groups.exclude] &&
			dispatch(
				IAM_USER_GROUP.asyncAction.findAllAction({
					range: page[tableKeys.users.add.groups.exclude],
				}),
			)
				.unwrap()
				.then((res) => {
					res.data.length
						? getUsersGroupDetailApi(res)
						: setGroups([]);
				});
	}, [dispatch, getUsersGroupDetailApi, page]);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.users.add.groups.exclude,
				data: includedData,
			}),
		);
	}, [dispatch, includedData]);

	useEffect(() => {
		getUsersGroupApi();
	}, [getUsersGroupApi, page]);

	useEffect(() => {
		setSelected({
			[tableKeys.users.add.groups.include]: includeSelect,
			[tableKeys.users.add.groups.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<FoldableContainer title={'그룹에 사용자에 추가'} bottomMargin={true}>
			<DragContainer
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.users.add.groups.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<IamSectionContents>
					<TableOptionText data={'groups'} />
					<RowDiv>
						<Table
							isDraggable
							tableKey={tableKeys.users.add.groups.exclude}
							columns={excludeColumns}
							data={excludedData}
							isPaginable
							isSearchable
							isSearchFilterable
							isColumnFilterable
							setSearch={setSearch}
						/>
						<RowDiv alignItems={'center'}>
							<DropButton
								leftTableKey={
									tableKeys.users.add.groups.exclude
								}
								RightTableKey={
									tableKeys.users.add.groups.include
								}
								select={selected}
								dataLeft={excludedData}
								dataRight={includedData}
								rightDataIds={includedDataIds}
								setRightDataIds={setIncludedDataIds}
							/>
						</RowDiv>
						<ColDiv>
							<TableHeader>
								추가 그룹: {includedDataIds.length}건
							</TableHeader>
							<Table
								isDraggable
								tableKey={tableKeys.users.add.groups.include}
								columns={includeColumns}
								data={includedData}
							/>
						</ColDiv>
					</RowDiv>
				</IamSectionContents>
			</DragContainer>
		</FoldableContainer>
	);
};

export default AddUserToGroup;
