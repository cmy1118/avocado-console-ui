import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import DropButton from '../../../Table/DropButton';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../../reducers/currentTarget';
import {
	ColDiv,
	CollapsbleContent,
	RowDiv,
	TableHeader,
} from '../../../../styles/components/style';
import TableOptionText from '../../../Table/Options/TableOptionText';
import PropTypes from 'prop-types';
import TableFold from '../../../Table/Options/TableFold';
import DragContainer from '../../../Table/DragContainer';
import TableContainer from '../../../Table/TableContainer';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import {DRAGGABLE_KEY} from '../../../../Constants/Table/keys';
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../reducers/api/IAM/User/Role/GrantRole/group';
import {totalNumberConverter} from '../../../../utils/tableDataConverter';

const AddUserToGroup = ({space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const [groups, setGroups] = useState([]);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const {page} = useSelector(PAGINATION.selector);

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

	console.log('excludedData ::', excludedData);
	console.log('includedData ::', includedData);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.users.add.groups.exclude,
				data: includedData,
			}),
		);
	}, [dispatch, includedData]);

	useEffect(() => {
		if (isFold[space]) {
			const arr = [];
			page[tableKeys.users.add.groups.exclude] &&
				dispatch(
					IAM_USER_GROUP.asyncAction.findAllAction({
						range: page[tableKeys.users.add.groups.exclude],
					}),
				)
					.unwrap()
					.then((groups) => {
						groups.data.forEach((group) => {
							console.log(group);
							dispatch(
								IAM_USER_GROUP_MEMBER.asyncAction.findAllAction(
									{
										groupId: group.id,
										range: 'elements=0-1',
									},
								),
							)
								.unwrap()
								.then((member) => {
									dispatch(
										IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction(
											{
												id: group.id,
												range: 'elements=0-1',
											},
										),
									)
										.unwrap()
										.then((roles) => {
											console.log(roles);
											arr.push({
												...group,
												numberOfRoles: totalNumberConverter(
													roles.headers[
														'content-range'
													],
												),
												numberOfUsers: totalNumberConverter(
													member.headers[
														'content-range'
													],
												),
											});
											if (
												groups.data.length ===
												arr.length
											) {
												setGroups(arr);
											}
										});
								});
						});
					});
		}
	}, [dispatch, page]);

	return (
		<FoldableContainer>
			<TableFold
				title={'그룹에 사용자에 추가'}
				space={space}
				isFold={isFold}
				setIsFold={setIsFold}
			/>

			<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>
				<TableOptionText data={'groups'} />
				<DragContainer
					selected={select}
					data={includedDataIds}
					setData={setIncludedDataIds}
					includedKey={tableKeys.users.add.groups.include}
					excludedData={excludedData}
					includedData={includedData}
				>
					<RowDiv>
						<TableContainer
							tableKey={tableKeys.users.add.groups.exclude}
							columns={
								tableColumns[tableKeys.users.add.groups.exclude]
							}
							data={excludedData}
						>
							<TableOptionsBar />
							<Table setSelect={setSelect} isDraggable />
						</TableContainer>
						<RowDiv alignItems={'center'}>
							<DropButton
								leftTableKey={
									tableKeys.users.add.groups.exclude
								}
								RightTableKey={
									tableKeys.users.add.groups.include
								}
								select={select}
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
							<TableContainer
								tableKey={tableKeys.users.add.groups.include}
								columns={
									tableColumns[
										tableKeys.users.add.groups.include
									]
								}
								data={includedData}
							>
								<Table setSelect={setSelect} isDraggable />
							</TableContainer>
						</ColDiv>
					</RowDiv>
				</DragContainer>
			</CollapsbleContent>
		</FoldableContainer>
	);
};
AddUserToGroup.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};
export default AddUserToGroup;
