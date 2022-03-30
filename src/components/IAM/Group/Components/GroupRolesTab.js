import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../../utils/tableDataConverter';
import Table from '../../../Table/Table';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {TableTitle} from '../../../../styles/components/table';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableFold from '../../../Table/Options/TableFold';
import DragContainer from '../../../Table/DragContainer';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../reducers/api/IAM/User/Role/GrantRole/group';

const GroupRolesTab = ({
	groupId,
	space,
	isFold,
	setIsFold,
	isSummaryOpened,
}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);
	//포함된 테이블 선택정보
	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.summary.tabs.roles.include],
	);
	//포함되지 않은 테이블 선택정보
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.summary.tabs.roles.exclude],
	);
	const [selected, setSelected] = useState({});

	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [excludedDataIds, setExcludedDataIds] = useState([]);

	const includedData = useMemo(() => {
		return includedDataIds
			? includedDataIds.map((v) => ({
					...v,
					type: roleTypeConverter(v.companyId),
					numberOfUsers: '',
					createdTime: v.createdTag ? v.createdTag.createdTime : '',
					[DRAGGABLE_KEY]: v.id,
			  }))
			: [];
	}, [includedDataIds]);

	const excludedData = useMemo(() => {
		return excludedDataIds
			? excludedDataIds.map((v) => ({
					...v,
					type: roleTypeConverter(v.companyId),
					numberOfUsers: '',
					createdTime: v.createdTag ? v.createdTag.createdTime : '',
					[DRAGGABLE_KEY]: v.id,
			  }))
			: [];
	}, [excludedDataIds]);

	//그룹에 권한 삭제 실행 함수
	const onClickDeleteRolesFromGroup = useCallback(
		async (data) => {
			try {
				if (data) {
					await dispatch(
						IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.revokeAction({
							id: groupId,
							roleId: data,
						}),
					).unwrap();
					//테이블 데이터 변경 - api 새로고침 x
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
		[dispatch, excludedData, groupId, includedDataIds],
	);

	//그룹에 권한 추가 실행 함수
	const onClickAddRolesToGroup = useCallback(
		async (data) => {
			try {
				if (data) {
					await dispatch(
						IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.grantAction({
							id: groupId,
							roleld: data,
							// roleld: excludeSelect.map((v) => v.id),
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
		[dispatch, excludedDataIds, groupId, includedDataIds],
	);

	//그룹에 부여된 역할 조회 (포함,포함안함)
	const groupRolesApi = useCallback(async () => {
		try {
			//포함
			const includeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction({
					id: groupId,
				}),
			).unwrap();
			//포함안함
			const excludeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction({
					id: groupId,
					exclude: true,
				}),
			).unwrap();

			//api 요청 데이터 (포함/비포함)테이블 삽입
			await setIncludedDataIds(includeData.data);
			await setExcludedDataIds(excludeData.data);
		} catch (err) {
			alert('조회 오류');
			console.log(err);
		}
	}, [dispatch, groupId]);

	useEffect(() => {
		setIncludedDataIds(group.roles);
	}, [group.roles]);

	useEffect(() => {
		setSelected({
			[tableKeys.groups.summary.tabs.roles.include]: includeSelect,
			[tableKeys.groups.summary.tabs.roles.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	//그룹 권한 데이터 api 호출 (포함/비포함)
	useEffect(() => {
		if (!isSummaryOpened) {
			groupRolesApi();
		}
	}, [groupRolesApi, isSummaryOpened]);
	return (
		<TabContentContainer>
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.groups.summary.tabs.roles.include}
				excludedData={excludedData}
				includedData={includedData}
				joinFunction={onClickAddRolesToGroup}
				disjointFunction={onClickDeleteRolesFromGroup}
			>
				<TableTitle>
					이 그룹의 권한 : {includedData.length}
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={() =>
							onClickDeleteRolesFromGroup(
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
					tableKey={tableKeys.groups.summary.tabs.roles.include}
					columns={includeColumns}
				/>
				<FoldableContainer>
					<TableFold
						title={<>이 그룹의 다른권한 : {excludedData.length}</>}
						space={'GroupRolesTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<NormalButton
							margin='0px 0px 0px 5px'
							onClick={() =>
								onClickAddRolesToGroup(
									excludeSelect.map((v) => v.id),
								)
							}
						>
							권한 추가
						</NormalButton>
					</TableFold>
					{isFold[space] && (
						<>
							<TableOptionText data={'roles'} />
							<Table
								isDraggable
								data={excludedData}
								tableKey={
									tableKeys.groups.summary.tabs.roles.exclude
								}
								columns={excludeColumns}
							/>
						</>
					)}
				</FoldableContainer>
			</DragContainer>{' '}
		</TabContentContainer>
	);
};

GroupRolesTab.propTypes = {
	groupId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default GroupRolesTab;
