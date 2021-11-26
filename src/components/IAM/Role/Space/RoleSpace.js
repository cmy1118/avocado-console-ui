import React, {useEffect, useMemo, useState} from 'react';
import {tableKeys, DRAGGABLE_KEY} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';

import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import TableContainer from '../../../Table/TableContainer';
import {
	CurrentPathBar,
	CurrentPathBarLink,
	NextPath,
} from '../../../../styles/components/currentPathBar';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';

const RoleSpace = () => {
	const dispatch = useDispatch();
	const {roles} = useSelector(IAM_ROLES.selector);
	const {page} = useSelector(PAGINATION.selector);
	const [select, setSelect] = useState({});
	const data = useMemo(() => {
		return (
			roles?.map((v) => ({
				...v,
				roleType: v.type,
				numberOfPermissions: v.policies?.length,
				[DRAGGABLE_KEY]: v.id,
			})) || []
		);
	}, [roles]);

	console.log(roles);

	useEffect(() => {
		if (page[tableKeys.roles.basic]) {
			dispatch(
				IAM_ROLES.asyncAction.getsAction({
					range: page[tableKeys.roles.basic],
				}),
			);
		}
	}, [dispatch, page]);

	return (
		<IamContainer>
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/roles'>역할</CurrentPathBarLink>
			</CurrentPathBar>

			<TitleBar>
				<div>역할 : {roles?.length}</div>
				<TitleBarButtons>
					<NormalButton>역할 만들기</NormalButton>
					<TransparentButton margin={'0px 0px 0px 5px'}>
						삭제
					</TransparentButton>
				</TitleBarButtons>
			</TitleBar>

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
