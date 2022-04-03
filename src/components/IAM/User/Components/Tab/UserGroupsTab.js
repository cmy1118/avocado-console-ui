import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../../reducers/api/IAM/User/User/user';
import Table from '../../../../Table/Table';
import IAM_USER_GROUP from '../../../../../reducers/api/IAM/User/Group/group';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import {TableTitle} from '../../../../../styles/components/table';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import TableFold from '../../../../Table/Options/TableFold';
import DragContainer from '../../../../Table/DragContainer';
import {TabContentContainer} from '../../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../../styles/components/iam/iam';
import PAGINATION from '../../../../../reducers/pagination';
import IAM_USER_GROUP_MEMBER from '../../../../../reducers/api/IAM/User/Group/groupMember';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../../reducers/api/IAM/User/Role/GrantRole/group';
import {
	parentGroupConverter,
	roleTypeConverter,
} from '../../../../../utils/tableDataConverter';
import * as _ from 'lodash';
import {CollapsbleContent} from '../../../../../styles/components/style';
import useSelectColumn from '../../../../../hooks/table/useSelectColumn';

const UserGroupsTab = ({
	userUid,
	space,
	isFold,
	setIsFold,
	isSummaryOpened,
}) => {
	const dispatch = useDispatch();

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.summary.tabs.groups.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.summary.tabs.groups.exclude],
	);
	const [selected, setSelected] = useState({});

	const [search, setSearch] = useState('');
	const [total, setTotal] = useState(0);

	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [excludedDataIds, setExcludedDataIds] = useState([]);

	const includedData = useMemo(() => {
		return includedDataIds
			? includedDataIds.map((v) => ({
					...v,
					name: v.name ? v.name : '',
					type: v.userGroupType ? v.userGroupType.name : '',
					parentGroup: v.userGroupType
						? parentGroupConverter(v.parentGroup.name)
						: '',
					createdTime: v.createdTag ? v.createdTag.createdTime : '',
					[DRAGGABLE_KEY]: v.id,
			  }))
			: [];
	}, [includedDataIds]);

	const excludedData = useMemo(() => {
		return excludedDataIds
			? excludedDataIds.map((v) => ({
					...v,
					name: v.name ? v.name : '',
					type: v.userGroupType.name ? v.userGroupType.name : '',
					parentGroup: parentGroupConverter(v.parentGroup.name),
					createdTime: v.createdTag ? v.createdTag.createdTime : '',
					[DRAGGABLE_KEY]: v.id,
			  }))
			: [];
	}, [excludedDataIds]);

	//그룹삭제
	const onClickDeleteGroupFromUser = useCallback(
		async (data) => {
			try {
				if (data) {
					await Promise.all([
						data.forEach((groupId) => {
							dispatch(
								IAM_USER_GROUP_MEMBER.asyncAction.disjointAction(
									{
										groupId: groupId,
										userUid: userUid,
									},
								),
							).unwrap();
						}),
					]);
					await setIncludedDataIds(
						includedDataIds.filter((v) => !data.includes(v.id)),
					);
					await setExcludedDataIds([
						...includedDataIds.filter((v) => data.includes(v.id)),
						...excludedData,
					]);
					await alert('삭제 완료');
				}
			} catch (err) {
				alert('삭제 오류');
				console.log(err);
			}
		},
		[dispatch, excludedData, includedDataIds, userUid],
	);
	//그룹추가
	const onClickAddGroupToUser = useCallback(
		async (data) => {
			try {
				if (data) {
					// for (const groupId of data) {
					await Promise.all([
						data.forEach((groupId) => {
							dispatch(
								IAM_USER_GROUP_MEMBER.asyncAction.joinAction({
									groupId: groupId,
									userUid: [userUid],
								}),
							).unwrap();
						}),
					]);
					await setIncludedDataIds([
						...excludedDataIds.filter((v) => data.includes(v.id)),
						...includedDataIds,
					]);
					await setExcludedDataIds(
						excludedDataIds.filter((v) => !data.includes(v.id)),
					);
					alert('추가 완료');
				}
			} catch (err) {
				alert('추가 오류');
				console.log(err);
			}
		},
		[dispatch, excludedDataIds, includedDataIds, userUid],
	);

	const userGroupsApi = useCallback(async () => {
		try {
			//포함
			const includeData = await dispatch(
				IAM_USER.asyncAction.getUserGroupsAction({
					userUid: userUid,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			//포함안함
			const excludeData = await dispatch(
				IAM_USER.asyncAction.getUserGroupsAction({
					userUid: userUid,
					includeGroup: false,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();

			//api 요청 데이터 (포함/비포함)테이블 삽입
			await setIncludedDataIds(includeData.data);
			await setExcludedDataIds(excludeData.data);
		} catch (err) {
			alert('조회 오류');
			console.log(err);
		}
	}, [dispatch, userUid]);

	//사용자 그룹 데이터 api 호출 (포함/비포함)
	useEffect(() => {
		if (!isSummaryOpened) {
			userGroupsApi();
		}
	}, [isSummaryOpened, userGroupsApi]);

	useEffect(() => {
		setSelected({
			[tableKeys.users.summary.tabs.groups.include]: includeSelect,
			[tableKeys.users.summary.tabs.groups.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<TabContentContainer>
			<DragContainer
				selected={selected}
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
								includeSelect.map((v) => v.id),
							)
						}
					>
						삭제
					</TransparentButton>
				</TableTitle>
				<Table
					isDraggable
					data={includedData}
					tableKey={tableKeys.users.summary.tabs.groups.include}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
					setSearch={setSearch}
				/>
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
									excludeSelect.map((v) => v.id),
								)
							}
						>
							그룹 추가
						</NormalButton>
					</TableFold>
					<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>
						<TableOptionText data={'groups'} />
						<Table
							isDraggable
							data={excludedData}
							tableKey={
								tableKeys.users.summary.tabs.groups.exclude
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

UserGroupsTab.propTypes = {
	userUid: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default UserGroupsTab;
