import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../../../../styles/components/buttons';
import Table from '../../../../../Table/Table';

import {DRAGGABLE_KEY, tableKeys} from '../../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../../Constants/Table/columns';
import DragContainer from '../../../../../Table/DragContainer';
import {TableTitle} from '../../../../../../styles/components/table';
import FoldableContainer from '../../../../../Table/Options/FoldableContainer';
import TableOptionText from '../../../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {TitleBarButtons} from '../../../../../../styles/components/iam/iam';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';
import IAM_ROLES_GRANT_ROLE_USER from '../../../../../../reducers/api/IAM/User/Role/GrantRole/user';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../../../reducers/api/IAM/User/Role/GrantRole/group';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

const roleGroupTab = {
	include: {title: '이 역할의 그룹 : ', button: {delete: '연결 해제'}},
	exclude: {
		title: '이 역할의 다른 그룹 : ',
		button: {create: '그룹 생성', add: '그룹 연결'},
	},
};

const RoleGroupTab = ({roleId, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.roles.summary.tabs.groups.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.roles.summary.tabs.groups.exclude],
	);
	const [selected, setSelected] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [excludedDataIds, setExcludedDataIds] = useState([]);

	const includedData = useMemo(() => {
		return includedDataIds
			? includedDataIds.map((v) => ({
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
					lastConsoleLogin: v.lastConsoleLogin
						? v.lastConsoleLogin
						: '',
					parentGroup: v.parentGroupName ? v.parentGroupName : '',
					[DRAGGABLE_KEY]: v.userGroupId,
			  }))
			: [];
	}, [includedDataIds]);
	//excludedData : 이 역할을 할당받지 않은 그룹자
	const excludedData = useMemo(() => {
		return excludedDataIds
			? excludedDataIds.map((v) => ({
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
					lastConsoleLogin: v.lastConsoleLogin
						? v.lastConsoleLogin
						: '',
					parentGroup: v.parentGroupName ? v.parentGroupName : '',
					[DRAGGABLE_KEY]: v.userGroupId,
			  }))
			: [];
	}, [excludedDataIds]);

	const onClickDeleteData = useCallback(
		async (data) => {
			try {
				if (data.length) {
					await Promise.all([
						data.forEach((groupId) => {
							dispatch(
								IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.revokeAction(
									{
										id: groupId,
										roleId: [roleId],
									},
								),
							).unwrap();
						}),
					]);
					await setIncludedDataIds(
						includedDataIds.filter(
							(v) => !data.includes(v.userGroupId),
						),
					);
					await setExcludedDataIds([
						...includedDataIds.filter((v) =>
							data.includes(v.userGroupId),
						),
						...excludedData,
					]);
					await alert('삭제 완료');
				}
			} catch (err) {
				alert('삭제 오류');
				console.log(err);
			}
		},
		[dispatch, excludedData, includedDataIds, roleId],
	);

	const onClickAddData = useCallback(
		async (data) => {
			try {
				if (data.length) {
					await Promise.all([
						data.forEach((groupId) => {
							dispatch(
								IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.grantAction(
									{
										id: groupId,
										roleId: [roleId],
									},
								),
							).unwrap();
						}),
					]);
					await setIncludedDataIds([
						...excludedDataIds.filter((v) =>
							data.includes(v.userGroupId),
						),
						...includedDataIds,
					]);
					await setExcludedDataIds(
						excludedDataIds.filter(
							(v) => !data.includes(v.userGroupId),
						),
					);
					alert('추가 완료');
				}
			} catch (err) {
				alert('추가 오류');
				console.log(err);
			}
		},
		[dispatch, excludedDataIds, includedDataIds, roleId],
	);

	//테이블 데이터 api 호출 (포함/비포함)
	const getApi = useCallback(async () => {
		try {
			//포함
			const includeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.findUserGroupsById({
					roleId: roleId,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			console.log('includeData:', includeData);
			//포함안함
			const excludeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.findUserGroupsById({
					roleId: roleId,
					exclude: true,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			console.log('excludeData:', excludeData);
			//api 요청 데이터 (포함/비포함)테이블 삽입
			await setIncludedDataIds(includeData);
			await setExcludedDataIds(excludeData);
		} catch (err) {
			alert('조회 오류');
			console.log(err);
		}
	}, [dispatch, roleId]);

	useEffect(() => {
		if (!isSummaryOpened) {
			getApi();
		}
	}, [getApi, isSummaryOpened]);

	useEffect(() => {
		setSelected({
			[tableKeys.roles.summary.tabs.groups.include]: includeSelect,
			[tableKeys.roles.summary.tabs.groups.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<TabContentContainer>
			<TableTitle>
				{roleGroupTab.include.title}
				{includedData.length}
				<NormalBorderButton
					margin={'0px 0px 0px 5px'}
					onClick={() =>
						onClickDeleteData(
							includeSelect.map((v) => v.userGroupId),
						)
					}
				>
					{roleGroupTab.include.button.delete}
				</NormalBorderButton>
			</TableTitle>
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.summary.tabs.groups.include}
				excludedData={excludedData}
				includedData={includedData}
				joinFunction={onClickAddData}
				disjointFunction={onClickDeleteData}
			>
				<Table
					isDraggable
					data={includedData}
					tableKey={tableKeys.roles.summary.tabs.groups.include}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>
				<FoldableContainer
					title={roleGroupTab.exclude.title + excludedData.length}
					buttons={(isDisabled) => (
						<TitleBarButtons>
							<NormalButton
								disabled={isDisabled}
								onClick={() => history.push('/groups/add')}
							>
								{roleGroupTab.exclude.button.create}
							</NormalButton>
							<NormalButton
								margin={'0px 0px 0px 5px'}
								disabled={isDisabled}
								onClick={() =>
									onClickAddData(
										excludeSelect.map((v) => v.userGroupId),
									)
								}
							>
								{roleGroupTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					)}
				>
					<TableOptionText data={'groups'} />
					<Table
						isDraggable
						data={excludedData}
						tableKey={tableKeys.roles.summary.tabs.groups.exclude}
						columns={excludeColumns}
						isPaginable
						isSearchable
						isSearchFilterable
						isColumnFilterable
					/>
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

RoleGroupTab.propTypes = {
	roleId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default RoleGroupTab;
