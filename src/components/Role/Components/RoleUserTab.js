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

const RoleUserTab = ({roleId}) => {
	const {roles} = useSelector(IAM_ROLES.selector);
	const {users} = useSelector(IAM_USER.selector);

	const [select, setSelect] = useState([]);
	const [rightDataIds, setRightDataIds] = useState([]);

	const role = useMemo(() => roles.find((v) => v.id === roleId), [
		roles,
		roleId,
	]);

	const dataLeft = useMemo(() => {
		return users
			.filter((v) => role.users.includes(v.uid))
			.map((v, i) => ({
				...v,
				numberOfGroups: v.groups.length,
				grantUser: dummyUsers[i],
			}));
	}, [users, role]);

	const dataRight = useMemo(
		() =>
			users
				.filter((v) => !role.users.includes(v.uid))
				.map((v) => ({...v, numberOfGroups: v.groups.length})),
		[users, role],
	);

	return (
		<>
			<div>
				이 역할의 사용자: {dataLeft.length}{' '}
				<NormalBorderButton>연결 해제</NormalBorderButton>
			</div>
			<Table
				data={dataLeft}
				tableKey={tableKeys.roles.summary.tabs.users.include}
				columns={
					tableColumns[tableKeys.roles.summary.tabs.users.include]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isSearchable
				setSelect={setSelect}
				setData={setRightDataIds}
			/>
			<div>
				이 역할의 다른 사용자 : {dataRight.length}{' '}
				<NormalButton>사용자 생성</NormalButton>
				<NormalButton>사용자 연결</NormalButton>
			</div>
			<Table
				data={dataRight}
				tableKey={tableKeys.roles.summary.tabs.users.exclude}
				columns={
					tableColumns[tableKeys.roles.summary.tabs.users.exclude]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isSearchable
				setSelect={setSelect}
				setData={setRightDataIds}
				control
			/>
		</>
	);
};

RoleUserTab.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RoleUserTab;
