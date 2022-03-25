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
	const {roles} = useSelector(IAM_ROLES.selector);
	const [select, setSelect] = useState({});
	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);
	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.summary.tabs.roles.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.summary.tabs.roles.exclude],
	);
	const [selected, setSelected] = useState({});

	console.log('select:', select);
	//그룹에 부여된 역할 관리 훅
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [excludedDataIds, setExcludedDataIds] = useState([]);
	console.log('roles:', roles);
	console.log('includedDataIds:', includedDataIds);
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
					createdTime: v.createdTag.createdTime,
					[DRAGGABLE_KEY]: v.id,
			  }))
			: [];
	}, [excludedDataIds]);

	const onClickDeleteRolesFromGroup = useCallback(
		async (data) => {
			try {
				if (data) {
					await dispatch(
						IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.revokeAction({
							groupId: groupId,
							roleId: data,
						}),
					).unwrap();
					await alert('그룹 권한 삭제 완료');
				}
			} catch (err) {
				alert('그룹 권한 삭제 오류');
				console.log(err);
			}
		},
		[dispatch, groupId],
	);

	const onClickAddRolesToGroup = useCallback(
		async (data) => {
			try {
				if (data) {
					console.log('데이터:', data);
					await dispatch(
						IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.grantAction({
							groupId: groupId,
							roleld: data,
						}),
					).unwrap();
					await alert('그룹 권한 추가 완료');
				}
			} catch (err) {
				alert('그룹 권한 추가 오류');
				console.log(err);
			}
		},
		[dispatch, groupId],
	);

	//그룹에 부여된 역할 조회 (포함,포함안함)
	const groupRolesApi = useCallback(async () => {
		try {
			//포함
			const includeGrantRole = await dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction({
					id: groupId,
				}),
			).unwrap();
			//포함안함
			const excludeGrantRole = await dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction({
					id: groupId,
					exclude: true,
				}),
			).unwrap();

			//api 요청 데이터 삽입
			await setIncludedDataIds(includeGrantRole.data);
			await setExcludedDataIds(excludeGrantRole.data);
		} catch (err) {
			console.log(err);
		}
	}, [dispatch, groupId]);
	useEffect(() => {
		setIncludedDataIds(group.roles);
	}, [group.roles]);

	useEffect(() => {
		setSelected({
			[tableKeys.roles.add.users.include]: includeSelect,
			[tableKeys.roles.add.users.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

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
							onClick={onClickAddRolesToGroup(
								excludeSelect.map((v) => v.id),
							)}
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
