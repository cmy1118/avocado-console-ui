import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {NormalBorderButton, NormalButton,} from '../../../../../../styles/components/buttons';
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
import {useDispatch} from 'react-redux';

const roleUserTab = {
	include: {title: '이 역할의 사용자 : ', button: {delete: '연결 해제'}},
	exclude: {
		title: '이 역할의 다른 사용자 : ',
		button: {create: '사용자 생성', add: '사용자 연결'},
	},
};
// IAM_ROLES_GRANT_ROLE_USER
const RoleUserTab = ({roleId, isSummaryOpened}) => {
	const dispatch = useDispatch();

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.roles.summary.tabs.users.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.roles.summary.tabs.users.exclude],
	);
	const [selected, setSelected] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [excludedDataIds, setExcludedDataIds] = useState([]);

	//includedData : 이 역할을 할당받은 사용자
	const includedData = useMemo(() => {
		return includedDataIds
			? includedDataIds.map((v) => ({
					...v,
					id: v.userId ? v.userId : '',
					name: v.userName ? v.userName : '',
					createdTime: v.createdTime ? v.createdTime : '',
					grantUser: v.grantedCreateUserId
						? `${v.grantedCreateUserId}(${v.grantedCreateUserName})`
						: '',
					numberOfGroups: v.groupCount ? v.groupCount : '',
					lastConsoleLogin: v.lastConsoleLogin
						? v.lastConsoleLogin
						: '',
					[DRAGGABLE_KEY]: v.userUid,
			  }))
			: [];
	}, [includedDataIds]);
	//excludedData : 이 역할을 할당받지 않은 사용자
	const excludedData = useMemo(() => {
		return excludedDataIds
			? excludedDataIds.map((v) => ({
					...v,
					name: v.userName ? v.userName : '',
					createdTime: v.createdTime ? v.createdTime : '',
					grantUser: v.grantedCreateUserId
						? `${v.grantedCreateUserId}(${v.grantedCreateUserName})`
						: '',
					numberOfGroups: v.groupCount ? v.groupCount : '',
					lastConsoleLogin: v.lastConsoleLogin
						? v.lastConsoleLogin
						: '',
					[DRAGGABLE_KEY]: v.userUid,
			  }))
			: [];
	}, [excludedDataIds]);

	const onClickDeleteData = useCallback(
		async (data) => {
			try {
				if (data) {
					await Promise.all([
						data.forEach((userUid) => {
							dispatch(
								IAM_ROLES_GRANT_ROLE_USER.asyncAction.revokeAction(
									{
										roleIds: [roleId],
										userUid: userUid,
									},
								),
							).unwrap();
						}),
					]);
					await setIncludedDataIds(
						includedDataIds.filter(
							(v) => !data.includes(v.userUid),
						),
					);
					await setExcludedDataIds([
						...includedDataIds.filter((v) =>
							data.includes(v.userUid),
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
				if (data) {
					await Promise.all([
						data.forEach((userUid) => {
							dispatch(
								IAM_ROLES_GRANT_ROLE_USER.asyncAction.grantAction(
									{
										roleIds: [roleId],
										userUid: userUid,
									},
								),
							).unwrap();
						}),
					]);
					await setIncludedDataIds([
						...excludedDataIds.filter((v) =>
							data.includes(v.userUid),
						),
						...includedDataIds,
					]);
					await setExcludedDataIds(
						excludedDataIds.filter(
							(v) => !data.includes(v.userUid),
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

	const getApi = useCallback(async () => {
		try {
			//포함
			const includeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.findUsersByIdAction({
					roleId: roleId,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			//포함안함
			const excludeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.findUsersByIdAction({
					roleId: roleId,
					exclude: true,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			//api 요청 데이터 (포함/비포함)테이블 삽입
			await setIncludedDataIds(includeData);
			await setExcludedDataIds(excludeData);
		} catch (err) {
			alert('조회 오류');
			console.log(err);
		}
	}, [dispatch, roleId]);

	//테이블 데이터 api 호출 (포함/비포함)
	useEffect(() => {
		if (!isSummaryOpened) {
			getApi();
		}
	}, [getApi, isSummaryOpened]);

	useEffect(() => {
		setSelected({
			[tableKeys.roles.summary.tabs.users.include]: includeSelect,
			[tableKeys.roles.summary.tabs.users.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<TabContentContainer>
			<TableTitle>
				{roleUserTab.include.title}
				{includedData.length}
				<NormalBorderButton
					margin={'0px 0px 0px 5px'}
					onClick={() =>
						onClickDeleteData(includeSelect.map((v) => v.userUid))
					}
				>
					{roleUserTab.include.button.delete}
				</NormalBorderButton>
			</TableTitle>
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.summary.tabs.users.include}
				excludedData={excludedData}
				includedData={includedData}
				joinFunction={onClickAddData}
				disjointFunction={onClickDeleteData}
			>
				<Table
					isDraggable
					data={includedData}
					tableKey={tableKeys.roles.summary.tabs.users.include}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>
				<FoldableContainer
					title={roleUserTab.include.title + excludedData.length}
					buttons={(isDisabled) => (
						<TitleBarButtons>
							<NormalButton disabled={isDisabled}>
								{roleUserTab.exclude.button.create}
							</NormalButton>
							<NormalButton
								margin={'0px 0px 0px 5px'}
								disabled={isDisabled}
								onClick={() =>
									onClickAddData(
										excludeSelect.map((v) => v.userUid),
									)
								}
							>
								{roleUserTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					)}
				>
					<TableOptionText data={'usersRoles'} />
					<Table
						isDraggable
						data={excludedData}
						tableKey={tableKeys.roles.summary.tabs.users.exclude}
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

RoleUserTab.propTypes = {
	roleId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default RoleUserTab;
