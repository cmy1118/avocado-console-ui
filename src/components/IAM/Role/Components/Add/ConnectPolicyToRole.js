import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import DropButton from '../../../../Table/DropButton';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../../../reducers/currentTarget';
import {
	ColDiv, CollapsbleContent,
	RowDiv,
	TableHeader,
} from '../../../../../styles/components/style';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import PropTypes from 'prop-types';
import TableFold from '../../../../Table/Options/TableFold';
import DragContainer from '../../../../Table/DragContainer';
import {FoldableContainer} from '../../../../../styles/components/iam/iam';
import PAGINATION from '../../../../../reducers/pagination';

import IAM_POLICY_MANAGEMENT_POLICIES from "../../../../../reducers/api/IAM/Policy/PolicyManagement/policies";
import {isFulfilled} from "@reduxjs/toolkit";
import {totalNumberConverter} from "../../../../../utils/tableDataConverter";

const ConnectPolicyToRole = ({space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	const [search, setSearch] = useState('');

	const [policies,setPolicies] = useState([]);

	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const APPLICATION_CODE = {
		iam: 'IAM',
		pam: 'PAM',
	};

	const includedData = useMemo(() =>{
		return (
			policies.filter((v) => includedDataIds.includes(v.id)).map((v) => ({
				...v,
				[DRAGGABLE_KEY]: v.id,
			})) || []
		)
	},[policies,includedDataIds])
	const excludedData = useMemo(() => {
		return (
			policies.filter((v) => !includedDataIds.includes(v.id)).map((v) => ({
				...v,
				[DRAGGABLE_KEY]: v.id,
			})) || []
		)
	},[policies,includedDataIds])

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.roles.add.policies.exclude,
				data: includedData,
			}),
		);
	}, [dispatch, includedData]);


	const getPoliciesApi = useCallback(async (search) => {
		if(page[tableKeys.roles.add.policies.exclude]){
			const res = await dispatch(
				IAM_POLICY_MANAGEMENT_POLICIES.asyncAction.findAll({
					range: page[tableKeys.roles.add.policies.exclude],
					...(search && {keyword: search})
				})
			)

			if(isFulfilled(res)){
				dispatch(
					PAGINATION.action.setTotal({
						tableKey: tableKeys.roles.add.policies.exclude,
						element: totalNumberConverter(
							res.payload.headers['content-range'],
						),
					}),
				);
				res.payload.data.length ? await getPoliciesDetailApi(res.payload) : setPolicies([])
			}
		}
	},[dispatch, page])
	const getPoliciesDetailApi = useCallback((res) => {
		const arr = [];
		res.data.map((v) => {
			arr.push({
				id: v.id,
				name: v.name,
				type: APPLICATION_CODE.iam,
				description:v.description === '' ? '없음' : v.description,
				numberOfUsers:v.grantCount,
				createdTime:v.createdTag.createdTime,
			})
		})

		setPolicies(arr)
	},[])

	useEffect (() => {
		getPoliciesApi(search);
	},[getPoliciesApi, page, search])

	return (
		<FoldableContainer>
			<TableFold title={'역할에 정책 연결'} space={space} isFold={isFold} setIsFold={setIsFold}/>
			<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>
				<TableOptionText data={'rolePolicy'} />
				<DragContainer
					selected={select}
					data={includedDataIds}
					setData={setIncludedDataIds}
					includedKey={tableKeys.roles.add.policies.include}
					excludedData={excludedData}
					includedData={includedData}
				>
					<RowDiv>
						<Table
							setSelect={setSelect}
							isDraggable
							tableKey={tableKeys.roles.add.policies.exclude}
							columns={tableColumns[tableKeys.roles.add.policies.exclude]}
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
								leftTableKey={tableKeys.roles.add.policies.exclude}
								RightTableKey={tableKeys.roles.add.policies.include}
								dataLeft={excludedData}
							/>

						</RowDiv>

						<ColDiv>
							<TableHeader>
								연결 정책: {includedDataIds.length}건
							</TableHeader>
						</ColDiv>
						<Table
							setSelect={setSelect}
							isDraggable
							tableKey={tableKeys.roles.add.policies.include}
							columns={tableColumns[tableKeys.roles.add.policies.include]}
							data={includedData}
						/>
					</RowDiv>
				</DragContainer>
			</CollapsbleContent>
		</FoldableContainer>
	);
};
ConnectPolicyToRole.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};
export default ConnectPolicyToRole;
