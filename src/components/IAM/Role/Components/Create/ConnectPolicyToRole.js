import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import DropButton from '../../../../Table/DropButton';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../../../reducers/currentTarget';
import {ColDiv, RowDiv, TableHeader} from '../../../../../styles/components/style';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import PropTypes from 'prop-types';
import DragContainer from '../../../../Table/DragContainer';
import PAGINATION from '../../../../../reducers/pagination';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policies';
import {isFulfilled} from '../../../../../utils/redux';
import {totalNumberConverter} from '../../../../../utils/tableDataConverter';
import FoldableContainer from '../../../../Table/Options/FoldableContainer';
import useSelectColumn from "../../../../../hooks/table/useSelectColumn";
import {IamSectionContents} from "../../../../../styles/components/iam/addPage";

const ConnectPolicyToRole = ({setValue}) => {
	const [selectExCludeColumns, exCludeColumns] = useSelectColumn(tableColumns[tableKeys.roles.add.policies.exclude]);
	const [selectIncludeColumns, includeColumns] = useSelectColumn(tableColumns[tableKeys.roles.add.policies.include]);

	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	const [search, setSearch] = useState('');

	const [policies, setPolicies] = useState([]);
	const [selected, setSelected] = useState({});

	const [includedDataIds, setIncludedDataIds] = useState([]);
	const APPLICATION_CODE = {
		iam: 'IAM',
		pam: 'PAM',
	};

	const includedData = useMemo(() => {
		return (
			policies
				.filter((v) => includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					[DRAGGABLE_KEY]: v.id,
				})) || []
		);
	}, [policies, includedDataIds]);
	const excludedData = useMemo(() => {
		return (
			policies.filter((v) => !includedDataIds.includes(v.id)).map((v) => ({
				...v,
				[DRAGGABLE_KEY]: v.id,
			})) || []
		);
	}, [policies, includedDataIds]);

	const getPoliciesApi = useCallback(
		async (search) => {
			if (page[tableKeys.roles.add.policies.exclude]) {
				const res = await dispatch(
					IAM_POLICY_MANAGEMENT_POLICIES.asyncAction.findAll({
						range: page[tableKeys.roles.add.policies.exclude],
						...(search && {keyword: search}),
					}),
				);

				if (isFulfilled(res)) {
					dispatch(
						PAGINATION.action.setTotal({
							tableKey: tableKeys.roles.add.policies.exclude,
							element: totalNumberConverter(
								res.payload.headers['content-range'],
							),
						}),
					);
					res.payload.data.length
						? await getPoliciesDetailApi(res.payload)
						: setPolicies([]);
				}
			}
		},
		[dispatch, page],
	);

	const getPoliciesDetailApi = useCallback((res) => {
		const arr = [];
		res.data.map((v) => {
			arr.push({
				id: v.id,
				name: v.name,
				type: APPLICATION_CODE.iam,
				description: v.description === '' ? '없음' : v.description,
				numberOfUsers: v.grantCount,
				createdTime: v.createdTag.createdTime,
			});
		});

		setPolicies(arr);
	}, []);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.roles.add.policies.exclude,
				data: includedData,
			}),
		);
	}, [dispatch, includedData]);
	useEffect(() => {
		getPoliciesApi(search);
	}, [getPoliciesApi, page, search]);

	return (
		<FoldableContainer title={'역할에 정책 연결'} bottomMargin={true}>
			<DragContainer
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.add.policies.include}
				excludedData={excludedData}
				includedData={includedData}
				maxCount={5}
			>
				<IamSectionContents>
					<TableOptionText data={'rolePolicy'} />
					<RowDiv>
						<Table
							isDraggable
							tableKey={tableKeys.roles.add.policies.exclude}
							columns={exCludeColumns}
							data={excludedData}
							isPaginable
							isSearchable
							isSearchFilterable
							isColumnFilterable
							setSearch={setSearch}
						/>

						<RowDiv alignItems={'center'}>
							<DropButton
								leftTableKey={tableKeys.roles.add.policies.exclude}
								rightTableKey={tableKeys.roles.add.policies.include}
								select={selected}
								dataLeft={excludedData}
								dataRight={includedData}
								rightDataIds={includedDataIds}
								setRightDataIds={setIncludedDataIds}
							/>
						</RowDiv>
						<ColDiv>
							<TableHeader>
								추가 정책: {includedDataIds.length}건
							</TableHeader>
						</ColDiv>

						<Table
							isDraggable
							tableKey={tableKeys.roles.add.policies.include}
							columns={includeColumns}
							data={includedData}
						/>
					</RowDiv>
				</IamSectionContents>
			</DragContainer>
		</FoldableContainer>
	);
};
ConnectPolicyToRole.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	setValue: PropTypes.func,
};
export default ConnectPolicyToRole;
