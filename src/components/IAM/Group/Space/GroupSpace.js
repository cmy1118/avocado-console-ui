import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import Table from '../../../Table/Table';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {
	IamContainer,
	IamContents,
	IamSection,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../reducers/api/IAM/User/Role/GrantRole/group';
import {totalNumberConverter} from '../../../../utils/tableDataConverter';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';
import {RowDiv} from '../../../../styles/components/style';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/groups', label: '사용자 그룹'},
];

const GroupSpace = () => {
	const dispatch = useDispatch();
	const [select, columns] = useSelectColumn(
		tableColumns[tableKeys.groups.basic],
	);
	const history = useHistory();
	const [groups, setGroups] = useState([]);
	const {page} = useSelector(PAGINATION.selector);
	const [search, setSearch] = useState('');
	const [total, setTotal] = useState(0);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const data = useMemo(() => {
		// groups ?
		return groups.map((v) => ({
			...v,
			name: v.name,
			userGroupType: v.userGroupType.name,
			parentGroup: v.parentGroup.name ? v.parentGroup.name : '없음',
			createdTime: v.createdTag.createdTime,
			roles: v.numberOfRoles === 0 ? '없음' : '정의됨',
			[DRAGGABLE_KEY]: v.id,
		}));
	}, [groups]);

	const onCLickLinkToAddGroup = useCallback(() => {
		history.push('/groups/add');
	}, [history]);

	const onClickDeleteGroup = useCallback(() => {
		if (select.length) {
			select.forEach((v) => {
				dispatch(
					IAM_USER_GROUP.asyncAction.deleteAction({
						id: v.id,
					}),
				);
			});
			setGroups((prev) =>
				prev.filter((v) => !select.map((s) => s.id).includes(v.id)),
			);
		}
	}, [dispatch, select]);

	useEffect(() => {
		const arr = [];
		page[tableKeys.groups.basic] &&
			dispatch(
				IAM_USER_GROUP.asyncAction.findAllAction({
					range: page[tableKeys.groups.basic],
				}),
			)
				.unwrap()
				.then((groups) => {
					//		console.log(groups);
					groups.data.forEach((group) => {
						dispatch(
							IAM_USER_GROUP_MEMBER.asyncAction.findAllAction({
								groupId: group.id,
								range: 'elements=0-1',
							}),
						)
							.unwrap()
							.then((member) => {
								//			console.log(member);
								dispatch(
									IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction(
										{id: group.id, range: 'elements=0-1'},
									),
								)
									.unwrap()
									.then((roles) => {
										//					console.log(roles);
										arr.push({
											...group,
											numberOfRoles: totalNumberConverter(
												roles.headers['content-range'],
											),
											numberOfUsers: totalNumberConverter(
												member.headers['content-range'],
											),
										});
										if (groups.data.length === arr.length) {
											setGroups(arr);
										}
									});
							});
					});
				});
	}, [dispatch, page]);

	const getDetailApi = useCallback(
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
						//			console.log(member);
						dispatch(
							IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction({
								id: group.id,
								range: 'elements=0-1',
							}),
						)
							.unwrap()
							.then((roles) => {
								//					console.log(roles);
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
	const getDataApi = useCallback(
		(search) => {
			if (page[tableKeys.groups.basic]) {
				dispatch(
					IAM_USER_GROUP.asyncAction.findAllAction({
						range: page[tableKeys.groups.basic],
						keyword: search ? search : '',
					}),
				)
					.unwrap()
					.then((res) => {
						setTotal(
							totalNumberConverter(res.headers['content-range']),
						);
						dispatch(
							PAGINATION.action.setTotal({
								tableKey: tableKeys.groups.basic,
								element: totalNumberConverter(
									res.headers['content-range'],
								),
							}),
						);
						res.data.length ? getDetailApi(res) : setGroups([]);
					})
					.catch((error) => {
						console.error('error:', error);
						setTotal(totalNumberConverter(0));
						setGroups([]);
					});
			}
		},
		[dispatch, getDetailApi, page],
	);

	useEffect(() => {
		getDataApi(search);
	}, [getDataApi, page, search]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />
			<TitleBar>
				<RowDiv
					alignItems={'center'}
					width={'100%'}
					justifyContent={'space-between'}
				>
					<div>사용자 그룹 : {total} </div>
					<TitleBarButtons>
						<NormalButton onClick={onCLickLinkToAddGroup}>
							그룹 생성
						</NormalButton>
						<TransparentButton
							margin={'0px 0px 0px 5px'}
							onClick={onClickDeleteGroup}
						>
							삭제
						</TransparentButton>
					</TitleBarButtons>
				</RowDiv>
			</TitleBar>
			<IamContents>
				<IamSection>
					<Table
						tableKey={tableKeys.groups.basic}
						columns={columns}
						data={data}
						isPaginable
						isSearchable
						isSearchFilterable
						isColumnFilterable
						setSearch={setSearch}
					/>
				</IamSection>
			</IamContents>
		</IamContainer>
	);
};

export default GroupSpace;
