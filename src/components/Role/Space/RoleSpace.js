import React, {useMemo, useState} from 'react';
import {
	AppBarButtons,
	AppBarContentsHeader,
	AppBarNavi,
	IamContainer,
	PathContainer
} from '../../../styles/components/style';
import {Link} from 'react-router-dom';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';

import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import TableContainer from '../../Table/TableContainer';
import {NaviLink} from "../../../styles/components/link";
import {NormalButton, TransparentButton} from "../../../styles/components/buttons";

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
			<AppBarNavi>
			<PathContainer>
				<NaviLink to='/iam'>IAM</NaviLink>
				<div style={{padding: '0px 5px'}}>{' > '}</div>
				<NaviLink to='/roles'>역할</NaviLink>
			</PathContainer>
			</AppBarNavi>

			<AppBarContentsHeader>
				<div>역할 : {roles.length}</div>
				{/*<AppBarButtons>*/}
				{/*	<NormalButton onClick={onClickLinkToAddUserPage}>*/}
				{/*		역할 만들기*/}
				{/*	</NormalButton>*/}
				{/*	<TransparentButton onClick={onClickDeleteUsers}>*/}
				{/*		삭제*/}
				{/*	</TransparentButton>*/}
				{/*</AppBarButtons>*/}
			</AppBarContentsHeader>
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
