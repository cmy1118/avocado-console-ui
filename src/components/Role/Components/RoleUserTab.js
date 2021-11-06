import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../styles/components/buttons';
import Table from '../../Table/Table';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import {dummyUsers} from '../../../utils/dummyData';
import TableContainer from '../../Table/TableContainer';
import DragContainer from '../../Table/DragContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';

const RoleUserTab = ({roleId}) => {
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
			.filter((v) => role.users.includes(v.uid))
			.map((v, i) => ({
				...v,
				numberOfGroups: v.groups.length,
				grantUser: dummyUsers[i],
			}));
	}, [users, role]);

	const includedData = useMemo(
		() =>
			users
				.filter((v) => !role.users.includes(v.uid))
				.map((v) => ({...v, numberOfGroups: v.groups.length})),
		[users, role],
	);

	return (
		<DragContainer
			selected={select}
			data={includedDataIds}
			setData={setIncludedDataIds}
			includedKey={tableKeys.roles.summary.tabs.users.include}
			excludedData={excludedData}
			includedData={includedData}
		>
			<div>
				이 역할의 사용자: {includedData.length}{' '}
				<NormalBorderButton>연결 해제</NormalBorderButton>
			</div>
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
			<div>
				이 역할의 다른 사용자 : {excludedData.length}{' '}
				<NormalButton>사용자 생성</NormalButton>
				<NormalButton>사용자 연결</NormalButton>
			</div>
			<TableContainer
				data={excludedData}
				tableKey={tableKeys.roles.summary.tabs.users.exclude}
				columns={
					tableColumns[tableKeys.roles.summary.tabs.users.exclude]
				}
			>
				<Table setSelect={setSelect} isDraggable />
			</TableContainer>
		</DragContainer>
	);
};

RoleUserTab.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RoleUserTab;
