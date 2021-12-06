import React, {useEffect, useMemo, useState} from 'react';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';

import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import {
	CurrentPathBar,
	CurrentPathBarLink,
	NextPath,
} from '../../../../styles/components/currentPathBar';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';

const RoleSpace = () => {
	const dispatch = useDispatch();
	// const {roles} = useSelector(IAM_ROLES.selector);
	const {page} = useSelector(PAGINATION.selector);
	const [select, setSelect] = useState({});
	const [roles, setRoles] = useState([]);
	const data = useMemo(() => {
		return (
			roles?.map((v) => ({
				...v,
				roleType: v.type,
				numberOfPermissions: v.numberOfPermissions,
				[DRAGGABLE_KEY]: v.id,
			})) || []
		);
	}, [roles]);

	console.log(roles);

	useEffect(() => {
		const arr = [];
		if (page[tableKeys.roles.basic]) {
			dispatch(
				IAM_ROLES.asyncAction.getsAction({
					range: page[tableKeys.roles.basic],
				}),
			)
				.unwrap()
				.then((res) => {
					res.data.map((v) => {
						arr.push({
							id: v.id,
							name: v.name,
							description: v.description,
							createdTime: v.createdTag.createdTime,
							numberOfPermissions: v.grantedCount,
							type: v.maxGrants === '1' ? 'Private' : 'Public',
						});
					});

					setRoles(arr);
				});
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

			<Table
				setSelect={setSelect}
				tableKey={tableKeys.roles.basic}
				columns={tableColumns[tableKeys.roles.basic]}
				data={data}
				isPaginable
				isSearchable
				isSearchFilterable
				isColumnFilterable
			/>
		</IamContainer>
	);
};

export default RoleSpace;
