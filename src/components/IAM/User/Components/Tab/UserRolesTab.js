import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../../../reducers/api/IAM/User/Role/roles';
import Table from '../../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import {TableTitle} from '../../../../../styles/components/table';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import TableFold from '../../../../Table/Options/TableFold';
import DragContainer from '../../../../Table/DragContainer';
import {TabContentContainer} from '../../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../../styles/components/iam/iam';
import IAM_ROLES_GRANT_ROLE_USER from '../../../../../reducers/api/IAM/User/Role/GrantRole/user';
import PAGINATION from '../../../../../reducers/pagination';
import * as _ from 'lodash';
import {CollapsbleContent} from '../../../../../styles/components/style';
import useSelectColumn from '../../../../../hooks/table/useSelectColumn';
import IAM_USER_GROUP_MEMBER from '../../../../../reducers/api/IAM/User/Group/groupMember';
import IAM_USER from '../../../../../reducers/api/IAM/User/User/user';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../../reducers/api/IAM/User/Role/GrantRole/group';

const UserRolesTab = ({userUid, space, isFold, setIsFold, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [excludedDataIds, setExcludedDataIds] = useState([]);

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.summary.tabs.roles.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.summary.tabs.roles.exclude],
	);
	const [selected, setSelected] = useState({});

	const includedData = useMemo(() => {
		return includedDataIds
			? includedDataIds.map((v) => ({
					...v,
					type: v.type.name,
					// numberOfUsers: v.users?.length,
					createdTime: v.createdTime,
					[DRAGGABLE_KEY]: v.id,
			  }))
			: [];
	}, [includedDataIds]);
	const excludedData = useMemo(() => {
		return excludedDataIds
			? excludedDataIds.map((v) => ({
					...v,
					applicationCode: '',
					type: v.type.name,
					// numberOfUsers: v.users?.length,
					createdTime: v.createdTime,
					[DRAGGABLE_KEY]: v.id,
			  }))
			: [];
	}, [excludedDataIds]);

	const onClickAddRolesToUser = useCallback(
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

	const onClickDeleteRolesFromUser = useCallback(
		(data) => {
			data &&
				dispatch(
					IAM_ROLES_GRANT_ROLE_USER.asyncAction.revokeAction({
						roleId: data,
						userUid: userUid,
					}),
				);

			setIncludedDataIds(
				includedDataIds.filter((v) => !data.includes(v)),
			);
		},
		[dispatch, includedDataIds, userUid],
	);

	//그룹에 부여된 사용자 조회
	// ToDO: 포함안함 api - 기능 없음 추가 요청 예정
	const userRolesApi = useCallback(async () => {
		try {
			//포함
			const includeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
					userUid: userUid,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			//포함안함
			const excludeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
					userUid: userUid,
					exclude: true,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			//api 요청 데이터 (포함/비포함)테이블 삽입
			console.log('includeData:', includeData);
			console.log('excludeData:', excludeData);
			await setIncludedDataIds(includeData.data);
			await setExcludedDataIds(excludeData.data);
		} catch (err) {
			alert('조회 오류');
			console.log(err);
		}
	}, [dispatch, userUid]);

	useEffect(() => {
		if (!isSummaryOpened) {
			userRolesApi();
		}
	}, [isSummaryOpened, userRolesApi]);

	useEffect(() => {
		setSelected({
			[tableKeys.users.summary.tabs.roles.include]: includeSelect,
			[tableKeys.users.summary.tabs.roles.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<TabContentContainer>
			<TableTitle>
				이 사용자의 권한: {includedData.length}{' '}
				<TransparentButton
					margin='0px 0px 0px 5px'
					onClick={() =>
						onClickDeleteRolesFromUser(
							includeSelect.map((v) => v.id),
						)
					}
				>
					삭제
				</TransparentButton>
			</TableTitle>
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.users.summary.tabs.roles.include}
				excludedData={excludedData}
				includedData={includedData}
				joinFunction={onClickAddRolesToUser}
				disjointFunction={onClickDeleteRolesFromUser}
			>
				<Table
					isDraggable
					data={includedData}
					tableKey={tableKeys.users.summary.tabs.roles.include}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>
				<FoldableContainer>
					<TableFold
						title={
							<>이 사용자의 다른권한 : {excludedData.length}</>
						}
						space={'UserRolesTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<NormalButton
							margin='0px 0px 0px 5px'
							onClick={() =>
								onClickAddRolesToUser(
									excludeSelect.map((v) => v.id),
								)
							}
						>
							권한 추가
						</NormalButton>
					</TableFold>
					<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>
						<TableOptionText data={'roles'} />

						<Table
							isDraggable
							data={excludedData}
							tableKey={
								tableKeys.users.summary.tabs.roles.exclude
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

UserRolesTab.propTypes = {
	userUid: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default UserRolesTab;
