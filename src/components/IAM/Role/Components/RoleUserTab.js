import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../../styles/components/buttons';
import Table from '../../../Table/Table';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../../reducers/api/ PAM/Role/roles';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import {dummyUsers} from '../../../../utils/dummyData';
import TableContainer from '../../../Table/TableContainer';
import DragContainer from '../../../Table/DragContainer';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import {TableTitle} from '../../../../styles/components/table';
import TableFold from '../../../Table/Options/TableFold';
import TableOptionText from '../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import {DRAGGABLE_KEY} from '../../../../Constants/Table/keys';

const RoleUserTab = ({roleId, space, isFold, setIsFold}) => {
	const {roles} = useSelector(IAM_ROLES.selector);
	const {users} = useSelector(IAM_USER.selector);

	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);

	const role = useMemo(() => roles.find((v) => v.id === roleId), [
		roles,
		roleId,
	]);

	const excludedData = useMemo(() => {
		return users
			.filter((v) => role.users.includes(v.userUid))
			.map((v, i) => ({
				...v,
				numberOfGroups: v.groups.length,
				grantUser: dummyUsers[i],
				[DRAGGABLE_KEY]: v.userUid,
			}));
	}, [users, role]);

	const includedData = useMemo(
		() =>
			users
				.filter((v) => !role.users.includes(v.userUid))
				.map((v, i) => ({
					...v,
					numberOfGroups: v.groups.length,
					grantUser: dummyUsers[dummyUsers.length - i - 1],
					[DRAGGABLE_KEY]: v.userUid,
				})),
		[users, role],
	);

	return (
		<TabContentContainer>
			<TableTitle>
				이 역할의 사용자: {includedData.length}
				<NormalBorderButton margin={'0px 0px 0px 5px'}>
					연결 해제
				</NormalBorderButton>
			</TableTitle>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.summary.tabs.users.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<TableContainer
					data={includedData}
					tableKey={tableKeys.roles.summary.tabs.users.include}
					columns={
						tableColumns[tableKeys.roles.summary.tabs.users.include]
					}
				>
					<TableOptionsBar />
					<Table setSelect={setSelect} isDraggable />
				</TableContainer>
				<FoldableContainer>
					<TableFold
						title={
							<> 이 역할의 다른 사용자: {excludedData.length}</>
						}
						space={'RoleUserTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<NormalButton margin={'0px 0px 0px 5px'}>
							그룹 추가
						</NormalButton>
					</TableFold>
					{isFold[space] && (
						<>
							<TableOptionText data={'usersRoles'} />

							<TableContainer
								data={excludedData}
								tableKey={
									tableKeys.roles.summary.tabs.users.exclude
								}
								columns={
									tableColumns[
										tableKeys.roles.summary.tabs.users
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

RoleUserTab.propTypes = {
	roleId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default RoleUserTab;
