import React, {useMemo, useState} from 'react';
import {
	AppBarButtons,
	IamContainer,
	SubHeader,
} from '../../../styles/components/style';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';

import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import TableContainer from '../../Table/TableContainer';
import {
	AppBarLink,
	CurrentPathContainer,
	NextPath,
} from '../../../styles/components/currentPath';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import TableOptionsBar from '../../Table/TableOptionsBar';

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
			<CurrentPathContainer>
				<AppBarLink to='/iam'>IAM</AppBarLink>
				<NextPath>{' > '}</NextPath>
				<AppBarLink to='/roles'>역할</AppBarLink>
			</CurrentPathContainer>

			<SubHeader>
				<div>역할 : {roles.length}</div>
				<AppBarButtons>
					<NormalButton>역할 만들기</NormalButton>
					<TransparentButton margin={'0px 0px 0px 5px'}>
						삭제
					</TransparentButton>
				</AppBarButtons>
			</SubHeader>

			<TableContainer
				tableKey={tableKeys.roles.basic}
				columns={tableColumns[tableKeys.roles.basic]}
				data={data}
			>
				<TableOptionsBar isSearchFilterable />
				<Table setSelect={setSelect} />
			</TableContainer>
		</IamContainer>
	);
};

export default RoleSpace;
