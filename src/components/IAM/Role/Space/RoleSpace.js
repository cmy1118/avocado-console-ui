import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';

import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {
	IamContainer,
	IamContents,
	IamSection,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import {totalNumberConverter} from '../../../../utils/tableDataConverter';
import {useHistory} from 'react-router-dom';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';
import {RowDiv} from '../../../../styles/components/style';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/roles', label: '역할'},
];

const RoleSpace = () => {
	const [select, columns] = useSelectColumn(
		tableColumns[tableKeys.roles.basic],
	);
	const dispatch = useDispatch();
	const history = useHistory();
	// const {roles} = useSelector(IAM_ROLES.selector);
	const {page} = useSelector(PAGINATION.selector);
	const [roles, setRoles] = useState([]);
	const [total, setTotal] = useState(0);
	const [search, setSearch] = useState('');

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

	const onCLickLinkToAddRole = useCallback(() => {
		history.push('/roles/add');
	}, [history]);

	const getDetailApi = useCallback((res) => {
		const arr = [];
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
	}, []);

	const getDataApi = useCallback(
		(search) => {
			const arr = [];
			if (page[tableKeys.roles.basic]) {
				dispatch(
					IAM_ROLES.asyncAction.getsAction({
						range: page[tableKeys.roles.basic],
						keyword: search ? search : '',
					}),
				)
					.unwrap()
					.then((res) => {
						setTotal(
							totalNumberConverter(res.headers['content-range']),
						);
						res.data.length ? getDetailApi(res) : setRoles([]);
					})
					.catch((error) => {
						console.error('error:', error);
						setTotal(totalNumberConverter(0));
						setRoles([]);
					});
			}
		},
		[dispatch, getDetailApi, page],
	);

	useEffect(() => {
		getDataApi(search);
	}, [getDataApi, page, search]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />

			<TitleBar>
				<RowDiv
					alignItems={'center'}
					width={'100%'}
					justifyContent={'space-between'}
				>
					<div>역할 : {total}</div>
					<TitleBarButtons>
						<NormalButton onClick={onCLickLinkToAddRole}>
							역할 생성
						</NormalButton>
						<TransparentButton margin={'0px 0px 0px 5px'}>
							삭제
						</TransparentButton>
					</TitleBarButtons>
				</RowDiv>
			</TitleBar>
			<IamContents>
				<IamSection>
					<Table
						tableKey={tableKeys.roles.basic}
						columns={columns}
						data={data}
						isPaginable
						isSearchable
						setSearch={setSearch}
						isSearchFilterable
						isColumnFilterable
					/>
				</IamSection>
			</IamContents>
		</IamContainer>
	);
};

export default RoleSpace;
