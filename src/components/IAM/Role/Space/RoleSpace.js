import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';

import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import {NormalButton, TransparentButton} from '../../../../styles/components/buttons';
import {IamContainer, TitleBar, TitleBarButtons} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import {totalNumberConverter} from '../../../../utils/tableDataConverter';
import {useHistory} from 'react-router-dom';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import {isFulfilled} from "../../../../utils/redux";

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/roles', label: '역할'},
];

const RoleSpace = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {page} = useSelector(PAGINATION.selector);
	const [roles, setRoles] = useState([]);
	const [total, setTotal] = useState(0);
	const [search, setSearch] = useState('');

	const roleData = useMemo(() => {
		return (
			roles?.map((v) => ({
				...v,
				roleType: v.type,
				numberOfPermissions: v.numberOfPermissions,
				[DRAGGABLE_KEY]: v.id,
			})) || []
		);
	}, [roles]);

	const getRoleApi = useCallback(async (search) =>{
			if(page[tableKeys.roles.basic]){
				const res = await dispatch(
					IAM_ROLES.asyncAction.getsAction({
						range: page[tableKeys.roles.basic],
						...(search && {keyword: search}),
					})
				);
				if(isFulfilled(res)){
					dispatch(
						PAGINATION.action.setTotal({
							tableKey: tableKeys.roles.basic,
							element: totalNumberConverter(
								res.payload.headers['content-range'],
							),
						})
					)
					setTotal( totalNumberConverter(res.payload.headers['content-range']))
					res.payload.data.length ? await getRoleDetailApi(res.payload) : setRoles([])
				}
			}
	},[dispatch,page])
	const getRoleDetailApi = useCallback(async (res) => {
		const arr = [];
		res.data.map((v) => {
			arr.push({
				id: v.id,
				name: v.name,
				description: v.description,
				createdTime: v.createdTag.createdTime,
				numberOfPermissions: v.grantedCount,
				type: v.maxGrants === '1' ? 'Private' : 'Public',
			})
		})
		setRoles(arr)
	},[]);
	const onCLickLinkToAddRole = useCallback(() => {
		history.push('/roles/add');
	}, [history]);

	useEffect(() => {
		getRoleApi(search);
	}, [getRoleApi, page, search]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />

			<TitleBar>
				<div>역할 : {total}</div>
				<TitleBarButtons>
					<NormalButton onClick={onCLickLinkToAddRole}>
						역할 생성
					</NormalButton>
					<TransparentButton margin={'0px 0px 0px 5px'}>
						삭제
					</TransparentButton>
				</TitleBarButtons>
			</TitleBar>

			<Table
				tableKey={tableKeys.roles.basic}
				columns={tableColumns[tableKeys.roles.basic]}
				data={roleData}
				isPaginable
				isSearchable
				isSearchFilterable
				isColumnFilterable
				setSearch={setSearch}
			/>
		</IamContainer>
	);
};

export default RoleSpace;
