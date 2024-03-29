import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import Table from '../../../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../../styles/components/buttons';
import {
	TableTitle,
	TabTableTitle,
} from '../../../../../../styles/components/table';
import TableOptionText from '../../../../../Table/Options/TableOptionText';
import DragContainer from '../../../../../Table/DragContainer';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import IAM_ROLES_GRANT_ROLE_USER from '../../../../../../reducers/api/IAM/User/Role/GrantRole/user';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';
import FoldableContainer from '../../../../../Table/Options/FoldableContainer';
import {IamTabSectionContents} from '../../../../../../styles/components/iam/addPage';
import {IncludeTableContainer} from '../../../../../../styles/components/iam/iam';

const UserRoleTab = ({userUid, isSummaryOpened}) => {
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
					type: v.type ? v.type.name : '',
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
					type: v.type.name ? v.type.name : '',
					// numberOfUsers: v.users?.length,
					createdTime: v.createdTime,
					[DRAGGABLE_KEY]: v.id,
			  }))
			: [];
	}, [excludedDataIds]);

	const onClickDeleteRolesFromUser = useCallback(
		async (data) => {
			try {
				if (data.length) {
					await dispatch(
						IAM_ROLES_GRANT_ROLE_USER.asyncAction.revokeAction({
							userUid: userUid,
							roleId: data,
						}),
					).unwrap();

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

	const onClickAddRolesToUser = useCallback(
		async (data) => {
			try {
				if (data.length) {
					await dispatch(
						IAM_ROLES_GRANT_ROLE_USER.asyncAction.grantAction({
							roleIds: data,
							userUid: userUid,
						}),
					).unwrap();

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
				<IncludeTableContainer>
					<TabTableTitle>
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
					</TabTableTitle>
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
				</IncludeTableContainer>

				<FoldableContainer
					title={<>이 사용자의 다른권한 : {excludedData.length}</>}
					buttons={(isDisabled) => (
						<NormalButton
							margin='0px 0px 0px 5px'
							disabled={isDisabled}
							onClick={() =>
								onClickAddRolesToUser(
									excludeSelect.map((v) => v.id),
								)
							}
						>
							권한 추가
						</NormalButton>
					)}
					type={'tab'}
				>
					<IamTabSectionContents>
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
					</IamTabSectionContents>
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

UserRoleTab.propTypes = {
	userUid: PropTypes.string.isRequired,
	isSummaryOpened: PropTypes.bool,
};

export default UserRoleTab;
