import React, {useMemo, useState} from 'react';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import {Link} from 'react-router-dom';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';

import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';

const RoleSpace = () => {
	const {roles} = useSelector(IAM_ROLES.selector);
	const [select, setSelect] = useState([]);

	const data = useMemo(() => {
		return roles.map((v) => ({
			...v,
			roleType: v.type,
			numberOfPermissions: v.policies.length,
		}));
	}, [roles]);
	return (
		<IamContainer>
			<PathContainer>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/roles'>역할</Link>
			</PathContainer>
			<Table
				tableKey={tableKeys.roles.basic}
				columns={tableColumns[tableKeys.roles.basic]}
				data={data}
				isSearchFilterable
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isSearchable
				setSelect={setSelect}
			/>
		</IamContainer>
	);
};

export default RoleSpace;
