import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import Table from '../../Table/Table';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {dummyPermission} from '../../../utils/dummyData';

const RoleInfoTab = ({roleId}) => {
	const {roles} = useSelector(IAM_ROLES.selector);

	const [select, setSelect] = useState([]);
	const [rightDataIds, setRightDataIds] = useState([]);

	const dataLeft = useMemo(() => dummyPermission, []);
	const dataRight = useMemo(() => dummyPermission, []);

	return (
		<>
			<div>
				이 역할의 정책: {dataLeft.length}{' '}
				<TransparentButton>연결 해제</TransparentButton>
			</div>
			<Table
				data={dataLeft}
				tableKey={tableKeys.users.summary.tabs.roles.include}
				columns={
					tableColumns[tableKeys.users.summary.tabs.roles.include]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={tableKeys.users.summary.tabs.roles.dnd}
				setSelect={setSelect}
				setData={setRightDataIds}
			/>
			<div>
				이 역할의 다른 정책 : {dataRight.length}{' '}
				<NormalButton>정책 생성</NormalButton>
				<NormalButton>정책 연결</NormalButton>
			</div>
			<Table
				data={dataRight}
				tableKey={tableKeys.users.summary.tabs.roles.exclude}
				columns={
					tableColumns[tableKeys.users.summary.tabs.roles.exclude]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={tableKeys.users.summary.tabs.roles.dnd}
				setSelect={setSelect}
				setData={setRightDataIds}
				control
			/>
		</>
	);
};

RoleInfoTab.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RoleInfoTab;
