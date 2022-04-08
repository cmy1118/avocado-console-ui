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
import FoldableContainer from '../../../../Table/Options/FoldableContainer';
import DragContainer from '../../../../Table/DragContainer';
import PAGINATION from '../../../../../reducers/pagination';
import {
	expiredConverter,
	groupsConverter,
} from '../../../../../utils/tableDataConverter';

const ConnectGroupToRole = ({setValue}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {page} = useSelector(PAGINATION.selector);
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [select, setSelect] = useState({});

	const excludedData = useMemo(() => {
		return (
			users
				.filter((x) => !includedDataIds.includes(x.userUid))
				.map((v) => ({
					...v,
					groupIds: groupsConverter(v.groups || []),
					numberOfGroups: v.groups ? v.groups.length : 0,
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
			);
	}, [dispatch, page]);

	useEffect(() => {
		setValue(includedDataIds);
	}, [includedDataIds, setValue]);

	return (
		<FoldableContainer title={'역할에 사용자 그룹 연결'}>
			<TableOptionText data={'rolePolicy'} />
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.add.groups.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<RowDiv>
					<Table
						setSelect={setSelect}
						isDraggable
						data={excludedData}
						tableKey={tableKeys.roles.add.groups.exclude}
						columns={
							tableColumns[tableKeys.roles.add.groups.exclude]
						}
						isPaginable
						isSearchable
						isSearchFilterable
						isColumnFilterable
					/>
					<RowDiv alignItems={'center'}>
						<DropButton
							leftTableKey={tableKeys.roles.add.groups.exclude}
							RightTableKey={tableKeys.roles.add.groups.include}
							select={select}
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
							setSelect={setSelect}
							isDraggable
							data={includedData}
							tableKey={tableKeys.roles.add.groups.include}
							columns={
								tableColumns[tableKeys.roles.add.groups.include]
							}
						/>
					</ColDiv>
				</RowDiv>
			</DragContainer>
		</FoldableContainer>
	);
};
ConnectGroupToRole.propTypes = {
	setValue: PropTypes.func,
};
export default ConnectGroupToRole;
