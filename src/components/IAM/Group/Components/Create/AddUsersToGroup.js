import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../../reducers/api/IAM/User/User/user';
import DropButton from '../../../../Table/DropButton';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../../../reducers/currentTarget';
import {
	ColDiv,
	RowDiv,
	TableHeader,
} from '../../../../../styles/components/style';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import PropTypes from 'prop-types';
import DragContainer from '../../../../Table/DragContainer';
import PAGINATION from '../../../../../reducers/pagination';
import {
	expiredConverter,
	groupsConverter,
	totalNumberConverter,
} from '../../../../../utils/tableDataConverter';
import useSelectColumn from '../../../../../hooks/table/useSelectColumn';
import FoldableContainer from '../../../../Table/Options/FoldableContainer';
import {CreatePageContainer} from '../../../../../styles/components/iam/addPage';

const AddUsersToGroup = ({setValue}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {page} = useSelector(PAGINATION.selector);

	const [includedDataIds, setIncludedDataIds] = useState([]);

	const [selected, setSelected] = useState({});

	const excludedData = useMemo(() => {
		return (
			users
				.filter((x) => !includedDataIds.includes(x.userUid))
				.map((v) => ({
					...v,
					groupIds: groupsConverter(v.groups || []),
					grantedCount: v.groups ? v.groups.length : 0,
					status: v.status.code,
					createdTime: v.createdTag.createdTime,
					passwordExpiryTime: expiredConverter(v.passwordExpiryTime),
					[DRAGGABLE_KEY]: v.userUid,
				})) || []
		);
	}, [includedDataIds, users]);

	const includedData = useMemo(() => {
		return (
			users
				.filter((x) => includedDataIds.includes(x.userUid))
				.map((v) => ({
					...v,
					id: v.id,
					groupIds: groupsConverter(v.groups || []),
					status: v.status.code,
					createdTime: v.createdTag.createdTime,
					passwordExpiryTime: expiredConverter(v.passwordExpiryTime),
					[DRAGGABLE_KEY]: v.userUid,
				})) || []
		);
	}, [includedDataIds, users]);

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.add.users.include],
		includedData,
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.add.users.exclude],
		excludedData,
	);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.groups.add.roles.include,
				data: includedData,
			}),
		);
	}, [includedData, dispatch]);

	useEffect(() => {
		page[tableKeys.groups.add.users.exclude] &&
			dispatch(
				IAM_USER.asyncAction.findAllAction({
					range: page[tableKeys.groups.add.users.exclude],
				}),
			)
				.unwrap()
				.then((res) => {
					dispatch(
						PAGINATION.action.setTotal({
							tableKey: tableKeys.groups.add.users.exclude,
							element: totalNumberConverter(
								res.headers['content-range'],
							),
						}),
					);
				});
	}, [dispatch, page]);

	useEffect(() => {
		setValue(includedDataIds);
	}, [includedDataIds, setValue]);

	useEffect(() => {
		setSelected({
			[tableKeys.groups.add.users.include]: includeSelect,
			[tableKeys.groups.add.users.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<FoldableContainer title={'그룹에 사용자에 추가'} bottomMargin={true}>
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.groups.add.users.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<CreatePageContainer>
					<TableOptionText data={'groups'} />
					<RowDiv>
						<Table
							isDraggable
							data={excludedData}
							tableKey={tableKeys.groups.add.users.exclude}
							columns={excludeColumns}
							isPaginable
							isSearchable
							// isSearchFilterable
							isColumnFilterable
						/>
						<RowDiv alignItems={'center'}>
							<DropButton
								leftTableKey={
									tableKeys.groups.add.users.exclude
								}
								RightTableKey={
									tableKeys.groups.add.users.include
								}
								select={selected}
								dataLeft={excludedData}
								dataRight={includedData}
								rightDataIds={includedDataIds}
								setRightDataIds={setIncludedDataIds}
							/>
						</RowDiv>
						<ColDiv>
							<TableHeader>
								추가 사용자: {includedDataIds.length}건
							</TableHeader>
							<Table
								isDraggable
								data={includedData}
								tableKey={tableKeys.groups.add.users.include}
								columns={includeColumns}
							/>
						</ColDiv>
					</RowDiv>
				</CreatePageContainer>
			</DragContainer>
		</FoldableContainer>
	);
};
AddUsersToGroup.propTypes = {
	setValue: PropTypes.func,
};
export default AddUsersToGroup;
