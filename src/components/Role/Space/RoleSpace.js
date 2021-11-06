import React, {useMemo, useState} from 'react';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import {Link} from 'react-router-dom';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';

import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import TableContainer from '../../Table/TableContainer';

const RoleSpace = () => {
	const {roles} = useSelector(IAM_ROLES.selector);
	const [select, setSelect] = useState({});
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
			<TableContainer
				tableKey={tableKeys.roles.basic}
				columns={tableColumns[tableKeys.roles.basic]}
				data={data}
			>
				<Table setSelect={setSelect} />
			</TableContainer>
		</IamContainer>
	);
};

export default RoleSpace;
