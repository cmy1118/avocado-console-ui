import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../../utils/tableDataConverter';
import IAM_ROLES from '../../../../reducers/api/ PAM/Role/roles';
import Table from '../../../Table/Table';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {TableTitle} from '../../../../styles/components/table';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableFold from '../../../Table/Options/TableFold';
import TableContainer from '../../../Table/TableContainer';
import DragContainer from '../../../Table/DragContainer';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import {DRAGGABLE_KEY} from '../../../../Constants/Table/keys';


const GroupRolesTab = ({groupId, space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {roles} = useSelector(IAM_ROLES.selector);
	const [select, setSelect] = useState({});
	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);
	const [includedDataIds, setIncludedDataIds] = useState(group.roles);

	const includedData = useMemo(() => {
		return roles
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
				[DRAGGABLE_KEY]: v.roleId,
			}));
	}, [roles, includedDataIds]);

	const excludedData = useMemo(() => {
		return roles
			.filter((v) => !includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
				[DRAGGABLE_KEY]: v.roleId,
			}));
	}, [roles, includedDataIds]);

	const onClickDeleteRolesFromGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.deleteRolesFromGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.include],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.deleteRolesFromGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.include],
				),
			}),
		);
	}, [dispatch, groupId, select]);

	const onClickAddRolesToGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.addRolesToGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.exclude],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.addRolesToGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.exclude],
				),
			}),
		);
	}, [dispatch, groupId, select]);

	useEffect(() => {
		setIncludedDataIds(group.roles);
	}, [group.roles]);
	return (
		<TabContentContainer>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.groups.summary.tabs.roles.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<TableTitle>
					이 그룹의 권한 : {excludedData.length}
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={onClickDeleteRolesFromGroup}
					>
						삭제
					</TransparentButton>
				</TableTitle>
				<TableContainer
					data={excludedData}
					tableKey={tableKeys.groups.summary.tabs.roles.include}
					columns={
						tableColumns[
							tableKeys.groups.summary.tabs.roles.include
						]
					}
				>
					<TableOptionsBar />
					<Table setSelect={setSelect} isDraggable />
				</TableContainer>
				<FoldableContainer>
					<TableFold
						title={<>이 그룹의 다른권한 : {excludedData.length}</>}
						space={'GroupRolesTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<NormalButton
							margin='0px 0px 0px 5px'
							onClick={onClickAddRolesToGroup}
						>
							권한 추가
						</NormalButton>
					</TableFold>
					{isFold[space] && (
						<>
							<TableOptionText data={'roles'} />
							<TableContainer
								data={excludedData}
								tableKey={
									tableKeys.groups.summary.tabs.roles.exclude
								}
								columns={
									tableColumns[
										tableKeys.groups.summary.tabs.roles
											.exclude
									]
								}
							>
								<TableOptionsBar />
								<Table setSelect={setSelect} isDraggable />
							</TableContainer>
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
};

export default GroupRolesTab;
