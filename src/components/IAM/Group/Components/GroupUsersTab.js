import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Table from '../../../Table/Table';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {TableTitle} from '../../../../styles/components/table';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import TableOptionText from '../../../Table/Options/TableOptionText';
import DragContainer from '../../../Table/DragContainer';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';
import PAGINATION from '../../../../reducers/pagination';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';
import FoldableContainer from '../../../Table/Options/FoldableContainer';

const GroupUsersTab = ({groupId, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {page} = useSelector(PAGINATION.selector);
	const {users} = useSelector(IAM_USER.selector);

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.summary.tabs.users.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.summary.tabs.users.exclude],
	);
	const [selected, setSelected] = useState({});

	const [otherMembers, setOtherMembers] = useState(0);
	const [search, setSearch] = useState('');
	const [members, setMembers] = useState([]);
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [excludedDataIds, setExcludedDataIds] = useState([]);

	const includedData = useMemo(() => {
		//	console.log(includedDataIds);
		return includedDataIds
			? includedDataIds.map((v) => ({
					...v,
					id: v.userId ? v.userId : v.id,
					//TODO userName 요청
					name: v.name ? v.name : v.userName,
					numberOfGroups: v.groups ? v.groups.length : 0,
					createdTime: v.createdTag ? v.createdTag.createdTime : '',
					[DRAGGABLE_KEY]: v.userUid,
			  }))
			: [];
	}, [includedDataIds]);

	const excludedData = useMemo(() => {
		return excludedDataIds
			? excludedDataIds.map((v) => ({
					...v,
					id: v.id ? v.id : v.userId,
					name: v.name ? v.name : v.userName,
					numberOfGroups: v.groups ? v.groups.length : 0,
					createdTime: v.createdTag.createdTime,
					[DRAGGABLE_KEY]: v.userUid,
			  }))
			: [];
	}, [excludedDataIds]);

	const onClickDeleteUsersFromGroup = useCallback(
		async (data) => {
			try {
				await dispatch(
					IAM_USER_GROUP_MEMBER.asyncAction.disjointAction({
						groupId: groupId,
						userUid: data,
					}),
				).unwrap();
				await setIncludedDataIds(
					includedDataIds.filter((v) => !data.includes(v.userUid)),
				);

				await setExcludedDataIds([
					...includedDataIds.filter((v) => data.includes(v.userUid)),
					...excludedData,
				]);
				alert('삭제 완료');
			} catch (err) {
				await alert('삭제 오류');
				console.error(err);
			}
		},
		[dispatch, excludedData, groupId, includedDataIds],
	);

	const onClickAddUsersToGroup = useCallback(
		async (data) => {
			try {
				await dispatch(
					IAM_USER_GROUP_MEMBER.asyncAction.joinAction({
						groupId: groupId,
						userUid: data,
					}),
				).unwrap();
				await setIncludedDataIds([
					...excludedDataIds.filter((v) => data.includes(v.userUid)),
					...includedDataIds,
				]);
				await setExcludedDataIds(
					excludedDataIds.filter((v) => !data.includes(v.userUid)),
				);
				alert('추가 완료');
			} catch (err) {
				alert('추가 오류');
				console.error(err);
			}
		},
		[dispatch, excludedDataIds, groupId, includedDataIds],
	);

	//그룹에 부여된 사용자 조회
	// ToDO: 포함안함 api - 기능 없음 추가 요청 예정
	const groupUserApi = useCallback(async () => {
		try {
			//포함
			const includeGrantUser = await dispatch(
				IAM_USER_GROUP_MEMBER.asyncAction.findAllAction({
					groupId: groupId,
					range: 'elements=0-50',
				}),
			).unwrap();
			//비포함 (전체 - 포함)
			const allGrantUser = await dispatch(
				IAM_USER.asyncAction.findAllAction({
					range: 'elements=0-50',
				}),
			).unwrap();
			const excludeGrantUser = await allGrantUser['data'].filter(
				(x) =>
					!includeGrantUser['data']
						.map((v) => v.userUid)
						.includes(x.userUid),
			);
			//api 요청 데이터 (포함/비포함)테이블 삽입
			await setIncludedDataIds(includeGrantUser.data);
			await setExcludedDataIds(excludeGrantUser);
			// await setExcludedDataIds(excludeGrantUser.data);
		} catch (err) {
			alert('조회 에러');
			console.log(err);
		}
	}, [dispatch, groupId]);

	//그룹 사용자 데이터 api 호출 (포함/비포함)
	useEffect(() => {
		if (!isSummaryOpened) {
			groupUserApi();
		}
	}, [groupUserApi, isSummaryOpened]);

	useEffect(() => {
		setSelected({
			[tableKeys.groups.summary.tabs.users.include]: includeSelect,
			[tableKeys.groups.summary.tabs.users.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<TabContentContainer>
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.groups.summary.tabs.users.include}
				excludedData={excludedData}
				includedData={includedData}
				joinFunction={onClickAddUsersToGroup}
				disjointFunction={onClickDeleteUsersFromGroup}
			>
				<TableTitle>
					이 그룹의 사용자 : {includedData.length}
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={() =>
							onClickDeleteUsersFromGroup(
								includeSelect.map((v) => v.userUid),
							)
						}
					>
						사용자 삭제
					</TransparentButton>
				</TableTitle>
				<Table
					isDraggable
					data={includedData}
					tableKey={tableKeys.groups.summary.tabs.users.include}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
					setSearch={setSearch}
				/>
				<FoldableContainer
					title={<>이 그룹의 다른 사용자 : {excludedData.length}</>}
					buttons={(isDisabled) => (
						<NormalButton
							margin='0px 0px 0px 5px'
							onClick={() =>
								onClickAddUsersToGroup(
									excludeSelect.map((v) => v.userUid),
								)
							}
							disabled={isDisabled}
						>
							사용자 추가
						</NormalButton>
					)}
				>
					<TableOptionText data={'usersGroups'} />
					<Table
						isDraggable
						data={excludedData}
						tableKey={tableKeys.groups.summary.tabs.users.exclude}
						columns={excludeColumns}
						isPaginable
						isSearchable
						isSearchFilterable
						isColumnFilterable
						setSearch={setSearch}
					/>
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

GroupUsersTab.propTypes = {
	groupId: PropTypes.string.isRequired,
	isSummaryOpened: PropTypes.bool,
};

export default GroupUsersTab;
