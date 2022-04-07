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
import TableFold from '../../../../../Table/Options/TableFold';
import TableOptionText from '../../../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {
	FoldableContainer,
	TitleBarButtons,
} from '../../../../../../styles/components/iam/iam';
import {CollapsbleContent} from '../../../../../../styles/components/style';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';
import IAM_ROLES_GRANT_ROLE_USER from "../../../../../../reducers/api/IAM/User/Role/GrantRole/user";
import IAM_USER_GROUP_MEMBER from "../../../../../../reducers/api/IAM/User/Group/groupMember";
import IAM_USER from "../../../../../../reducers/api/IAM/User/User/user";
import {useDispatch} from "react-redux";
import {parentGroupConverter} from "../../../../../../utils/tableDataConverter";

const roleUserTab = {
	include: {title: '이 역할의 사용자 : ', button: {delete: '연결 해제'}},
	exclude: {
		title: '이 역할의 다른 사용자 : ',
		button: {create: '사용자 생성', add: '사용자 연결'},
	},
};
// IAM_ROLES_GRANT_ROLE_USER
const RoleUserTab = ({roleId, space, isFold, setIsFold,isSummaryOpened}) => {
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
				id:v.userId ? v.userId : '',
				name: v.userName ? v.userName : '',
				createdTime: v.createdTime? v.createdTime : '',
				grantUser: v.grantedCreateUserId ? `${v.grantedCreateUserId}(${v.grantedCreateUserName})`:'',
				numberOfGroups:v.groupCount?v.groupCount:'',
				lastConsoleLogin:v.lastConsoleLogin?v.lastConsoleLogin:'',
				[DRAGGABLE_KEY]: v.userId,
			}))
			: [];
	}, [includedDataIds]);
	//excludedData : 이 역할을 할당받지 않은 사용자
	const excludedData = useMemo(() => {
		return excludedDataIds
			? excludedDataIds.map((v) => ({
				...v,
				id:v.userId ? v.userId : '',
				name: v.userName ? v.userName : '',
				createdTime: v.createdTime? v.createdTime : '',
				grantUser: v.grantedCreateUserId? `${v.grantedCreateUserId}(${v.grantedCreateUserName})`:'',
				numberOfGroups:v.groupCount?v.groupCount:'',
				lastConsoleLogin:v.lastConsoleLogin?v.lastConsoleLogin:'',
				[DRAGGABLE_KEY]: v.userId,
			}))
			: [];
	}, [excludedDataIds]);


	// // 삭제
	// const onClickDeleteTableData = useCallback(
	// 	async (data) => {
	// 		try {
	// 			if (data) {
	// 				await Promise.all([
	// 					data.forEach((groupId) => {
	// 						dispatch(
	// 							IAM_USER_GROUP_MEMBER.asyncAction.disjointAction(
	// 								{
	// 									groupId: groupId,
	// 									userUid: userUid,
	// 								},
	// 							),
	// 						).unwrap();
	// 					}),
	// 				]);
	// 				await setIncludedDataIds(
	// 					includedDataIds.filter((v) => !data.includes(v.id)),
	// 				);
	// 				await setExcludedDataIds([
	// 					...includedDataIds.filter((v) => data.includes(v.id)),
	// 					...excludedData,
	// 				]);
	// 				await alert('삭제 완료');
	// 			}
	// 		} catch (err) {
	// 			alert('삭제 오류');
	// 			console.log(err);
	// 		}
	// 	},
	// 	[],
	// );
	// // 추가
	// const onClickAddTableData = useCallback(
	// 	async (data) => {
	// 		try {
	// 			if (data) {
	// 				// for (const groupId of data) {
	// 				await Promise.all([
	// 					data.forEach((groupId) => {
	// 						dispatch(
	// 							IAM_USER_GROUP_MEMBER.asyncAction.joinAction({
	// 								groupId: groupId,
	// 								userUid: [userUid],
	// 							}),
	// 						).unwrap();
	// 					}),
	// 				]);
	// 				await setIncludedDataIds([
	// 					...excludedDataIds.filter((v) => data.includes(v.id)),
	// 					...includedDataIds,
	// 				]);
	// 				await setExcludedDataIds(
	// 					excludedDataIds.filter((v) => !data.includes(v.id)),
	// 				);
	// 				alert('추가 완료');
	// 			}
	// 		} catch (err) {
	// 			alert('추가 오류');
	// 			console.log(err);
	// 		}
	// 	},
	// 	[],
	// );

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
			console.log('includeData:',includeData)
			//포함안함
			const excludeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.findUsersByIdAction({
					roleId: roleId,
					exclude: true,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			console.log('excludeData:',excludeData)
			//api 요청 데이터 (포함/비포함)테이블 삽입
			await setIncludedDataIds(includeData);
			await setExcludedDataIds(excludeData);
		} catch (err) {
			alert('조회 오류');
			console.log(err);
		}
	}, [dispatch, roleId]);

	//사용자 그룹 데이터 api 호출 (포함/비포함)
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
				<NormalBorderButton margin={'0px 0px 0px 5px'}>
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
				<FoldableContainer>
					<TableFold
						title={roleUserTab.include.title + excludedData.length}
						space={'RoleUserTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<TitleBarButtons>
							<NormalButton>
								{roleUserTab.exclude.button.create}
							</NormalButton>
							<NormalButton margin={'0px 0px 0px 5px'}>
								{roleUserTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					</TableFold>
					<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>
						<TableOptionText data={'usersRoles'} />

						<Table
							isDraggable
							data={excludedData}
							tableKey={
								tableKeys.roles.summary.tabs.users.exclude
							}
							columns={excludeColumns}
							isPaginable
							isSearchable
							isSearchFilterable
							isColumnFilterable
						/>
					</CollapsbleContent>
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
