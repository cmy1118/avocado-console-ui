import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../../reducers/api/IAM/User/User/user';
import DropButton from '../../../../Table/DropButton';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../../../reducers/currentTarget';
import {ColDiv, CollapsbleContent, RowDiv, TableHeader} from '../../../../../styles/components/style';
import PropTypes from 'prop-types';
import TableFold from '../../../../Table/Options/TableFold';
import DragContainer from '../../../../Table/DragContainer';
import {FoldableContainer} from '../../../../../styles/components/iam/iam';
import PAGINATION from '../../../../../reducers/pagination';
import {isFulfilled} from "@reduxjs/toolkit";
import {totalNumberConverter} from "../../../../../utils/tableDataConverter";

const ConnectUserToRole = ({space, isFold, setIsFold, usage , maxGrants}) => {
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	const [search, setSearch] = useState('');

	const [users,setUsers] = useState([]);

	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);

	const includedData = useMemo(() =>{
		return (
			users.filter((v) => includedDataIds.includes(v.userUid)).map((v) => ({
				...v,
				[DRAGGABLE_KEY]: v.userUid,
			})) || []
		)
	},[users,includedDataIds]);
	const excludedData = useMemo(() => {
		return (
			users.filter((v) => !includedDataIds.includes(v.userUid)).map((v) => ({
				...v,
				[DRAGGABLE_KEY]: v.userUid,
			})) || []
		)
	},[users,includedDataIds])

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.roles.add.users.exclude,
				data: includedData,
			}),
		);
	}, [dispatch, includedData]);

	const getUsersApi = useCallback( async (search) =>{
		if(page[tableKeys.roles.add.users.exclude]){
			const res = await dispatch(
				IAM_USER.asyncAction.findAllAction({
					range: page[tableKeys.roles.add.users.exclude],
					...(search && {keyword: search}),
				}),
			)

			if(isFulfilled(res)){
				dispatch(
					PAGINATION.action.setTotal({
						tableKey: tableKeys.roles.add.users.exclude,
						element: totalNumberConverter(
							res.payload.headers['content-range'],
						),
					}),
				);
				res.payload.data.length ? await getUsersDetailApi(res.payload) : setUsers([]);
			}
		}
	},[dispatch, page])
	const getUsersDetailApi = useCallback(async (res) => {
		const arr = [];

		await res.data.map(async (v) => {
			arr.push({
				...v,
				lastConsoleLogin: v.lastConsoleLoginTime,
				createdTime: v.createdTag.createdTime,
				numberOfGroups: v.groups ? v.groups.length : 0
			})
		})
		setUsers(arr)
	},[])

	useEffect (() => {
		getUsersApi(search);
	},[getUsersApi, page, search])

	return (

		<FoldableContainer>
			<TableFold title={'사용자 연결'} space={space} isFold={isFold} setIsFold={setIsFold}/>
			<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>

				<DragContainer
					selected={select}
					data={includedDataIds}
					setData={setIncludedDataIds}
					includedKey={tableKeys.roles.add.users.include}
					excludedData={excludedData}
					includedData={includedData}
					maxCount = {maxGrants}
					usage = {usage}
				>
					<RowDiv>
						<Table
							setSelect={setSelect}
							isDraggable
							tableKey={tableKeys.roles.add.users.exclude}
							columns={tableColumns[tableKeys.roles.add.users.exclude]}
							data={excludedData}
							isPaginable
							isSearchable
							isSearchFilterable
							isColumnFilterable
							setSearch={setSearch}
						/>

						<RowDiv alignItems={'center'}>
							<DropButton
								select={select}
								dataRight={includedData}
								rightDataIds={includedDataIds}
								setRightDataIds={setIncludedDataIds}
								leftTableKey={tableKeys.roles.add.users.exclude}
								rightTableKey={tableKeys.roles.add.users.include}
								dataLeft={excludedData}
								maxCount = {maxGrants}
								usage = {usage}
							/>
						</RowDiv>

						<ColDiv>
							<TableHeader>
								추가 사용자 : {includedDataIds.length} <br/>
							</TableHeader>
						</ColDiv>

						<Table
							setSelect={setSelect}
							isDraggable
							tableKey={tableKeys.roles.add.users.include}
							columns={tableColumns[tableKeys.roles.add.users.include]}
							data={includedData}
						/>
					</RowDiv>
				</DragContainer>
			</CollapsbleContent>
		</FoldableContainer>
	);
};
ConnectUserToRole.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	usage:PropTypes.string,
	maxGrants:PropTypes.number
};
export default ConnectUserToRole;
