import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../../utils/tableDataConverter';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import IAM_ROLES from '../../../../reducers/api/ PAM/Role/roles';
import Table from '../../../Table/Table';
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
import IAM_ROLES_GRANT_ROLE_USER from "../../../../reducers/api/IAM/User/Role/GrantRole/user";

const UserRolesTab = ({userId, space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {roles} = useSelector(IAM_ROLES_GRANT_ROLE_USER.selector);
	const [select, setSelect] = useState({});
	const user = useMemo(() => users.find((v) => v.userUid === userId), [
		users,
		userId,
	]);

	const [includedDataIds, setIncludedDataIds] = useState([]);

	console.log(includedDataIds);

	const includedData = useMemo(() => {
		return (
			roles
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}))  || []
		);
	}, [includedDataIds, roles]);

	const excludedData = useMemo(() => {

		return (
			roles
			.filter((v) => !includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			})) || []
		);
	}, []);

	const onClickDeleteRolesFromUser = useCallback(() => {
		dispatch(
			IAM_USER.action.deleteRolesFromUser({
				userUid: userId,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.include],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.deleteRolesFromUser({
				userUid: userId,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.include],
				),
			}),
		);
	}, [dispatch, select, userId]);

	const onClickAddRolesToUser = useCallback(() => {
		dispatch(
			IAM_USER.action.addRolesToUser({
				userUid: userId,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.exclude],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.addRolesToUser({
				userUid: userId,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.exclude],
				),
			}),
		);
	}, [dispatch, select, userId]);

	// useEffect(() => {
	// 	setIncludedDataIds(user.roles);
	// }, [user.roles]);

	return (
		<TabContentContainer>
			<TableTitle>
				이 사용자의 권한: {includedData.length}{' '}
				<TransparentButton
					margin='0px 0px 0px 5px'
					onClick={onClickDeleteRolesFromUser}
				>
					삭제
				</TransparentButton>
			</TableTitle>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.groups.add.roles.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<TableContainer
					data={includedData}
					tableKey={tableKeys.users.summary.tabs.roles.include}
					columns={
						tableColumns[tableKeys.users.summary.tabs.roles.include]
					}
				>
					<TableOptionsBar />
					<Table setSelect={setSelect} isDraggable />
				</TableContainer>
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
							onClick={onClickAddRolesToUser}
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
									tableKeys.users.summary.tabs.roles.exclude
								}
								columns={
									tableColumns[
										tableKeys.users.summary.tabs.roles
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

UserRolesTab.propTypes = {
	userId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default UserRolesTab;
