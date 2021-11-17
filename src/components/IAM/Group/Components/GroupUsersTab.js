import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Table from '../../../Table/Table';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {TableTitle} from '../../../../styles/components/table';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableFold from '../../../Table/Options/TableFold';
import TableContainer from '../../../Table/TableContainer';
import DragContainer from '../../../Table/DragContainer';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../styles/components/iam/iam';

const GroupUsersTab = ({groupId, space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {users} = useSelector(IAM_USER.selector);
	const [select, setSelect] = useState({});
	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);
	const [includedDataIds, setIncludedDataIds] = useState(group.members);

	const includedData = useMemo(() => {
		return users
			.filter((v) => includedDataIds.includes(v.userUid))
			.map((v) => ({
				...v,
				numberOfGroups: v.groups.length,
			}));
	}, [users, includedDataIds]);

	const excludedData = useMemo(() => {
		return users
			.filter((v) => !includedDataIds.includes(v.userUid))
			.map((v) => ({
				...v,
				numberOfGroups: v.groups.length,
			}));
	}, [users, includedDataIds]);

	const onClickDeleteRolesFromGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.deleteUsersFromGroup({
				id: groupId,
				users: Object.keys(
					select[tableKeys.groups.summary.tabs.users.include],
				),
			}),
		);
		dispatch(
			IAM_USER.action.deleteUsersFromGroup({
				id: groupId,
				users: Object.keys(
					select[tableKeys.groups.summary.tabs.users.include],
				),
			}),
		);
	}, [dispatch, groupId, select]);

	const onClickAddRolesToGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.addUsersToGroup({
				id: groupId,
				users: Object.keys(
					select[tableKeys.groups.summary.tabs.users.exclude],
				),
			}),
		);
		dispatch(
			IAM_USER.action.addUsersToGroup({
				id: groupId,
				users: Object.keys(
					select[tableKeys.groups.summary.tabs.users.exclude],
				),
			}),
		);
	}, [dispatch, groupId, select]);
	useEffect(() => {
		setIncludedDataIds(group.members);
	}, [group.members]);
	return (
		<TabContentContainer>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.groups.summary.tabs.users.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<TableTitle>
					이 그룹의 사용자 : {includedData.length}
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={onClickDeleteRolesFromGroup}
					>
						사용자 삭제
					</TransparentButton>
				</TableTitle>
				<TableContainer
					data={includedData}
					tableKey={tableKeys.groups.summary.tabs.users.include}
					columns={
						tableColumns[
							tableKeys.groups.summary.tabs.users.include
						]
					}
				>
					<TableOptionsBar />
					<Table setSelect={setSelect} isDraggable />
				</TableContainer>
				<FoldableContainer>
					<TableFold
						title={
							<>이 그룹의 다른 사용자 : {excludedData.length}</>
						}
						space={'GroupUsersTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<NormalButton
							margin='0px 0px 0px 5px'
							onClick={onClickAddRolesToGroup}
						>
							사용자 추가
						</NormalButton>
					</TableFold>
					{isFold[space] && (
						<>
							<TableOptionText data={'usersGroups'} />

							<TableContainer
								data={excludedData}
								tableKey={
									tableKeys.groups.summary.tabs.users.exclude
								}
								columns={
									tableColumns[
										tableKeys.groups.summary.tabs.users
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
			</DragContainer>
		</TabContentContainer>
	);
};

GroupUsersTab.propTypes = {
	groupId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default GroupUsersTab;
