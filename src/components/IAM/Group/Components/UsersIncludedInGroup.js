import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import DropButton from '../../../Table/DropButton';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../../reducers/currentTarget';
import {ColDiv, RowDiv, TableHeader} from '../../../../styles/components/style';
import TableOptionText from '../../../Table/Options/TableOptionText';
import PropTypes from 'prop-types';
import TableFold from '../../../Table/Options/TableFold';
import TableContainer from '../../../Table/TableContainer';
import DragContainer from '../../../Table/DragContainer';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import {
	expiredConverter,
	groupsConverter,
} from '../../../../utils/tableDataConverter';

const UsersIncludedInGroup = ({space, isFold, setValue, setIsFold}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {page} = useSelector(PAGINATION.selector);
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [select, setSelect] = useState({});

	console.log(users);
	console.log(includedDataIds);

	const excludedData = useMemo(() => {
		return (
			users
				.filter((x) => !includedDataIds.includes(x.userUid))
				.map((v) => ({
					...v,
					groupIds: groupsConverter(v.groupIds || []),
					numberOfGroups: v.groupIds ? v.groupIds.length : 0,
					status: v.status.code,
					createdTime: v.createdTag.createdTime,
					passwordExpiryTime: expiredConverter(v.passwordExpiryTime),
					DRAGGABLE_KEY: v.userUid,
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
					groupIds: groupsConverter(v.groupIds || []),
					status: v.status.code,
					createdTime: v.createdTag.createdTime,
					passwordExpiryTime: expiredConverter(v.passwordExpiryTime),
					DRAGGABLE_KEY: v.userUid,
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
		<FoldableContainer>
			<TableFold
				title={'그룹에 사용자에 추가'}
				space={'UsersIncludedInGroup'}
				isFold={isFold}
				setIsFold={setIsFold}
			/>
			{isFold[space] && (
				<>
					<TableOptionText data={'groups'} />
					<DragContainer
						selected={select}
						data={includedDataIds}
						setData={setIncludedDataIds}
						includedKey={tableKeys.groups.add.users.include}
						excludedData={excludedData}
						includedData={includedData}
					>
						<RowDiv>
							<TableContainer
								data={excludedData}
								tableKey={tableKeys.groups.add.users.exclude}
								columns={
									tableColumns[
										tableKeys.groups.add.users.exclude
									]
								}
							>
								<TableOptionsBar />
								<Table setSelect={setSelect} isDraggable />
							</TableContainer>
							<RowDiv alignItems={'center'}>
								<DropButton
									leftTableKey={
										tableKeys.groups.add.users.exclude
									}
									RightTableKey={
										tableKeys.groups.add.users.include
									}
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
								<TableContainer
									data={includedData}
									tableKey={
										tableKeys.groups.add.users.include
									}
									columns={
										tableColumns[
											tableKeys.groups.add.users.include
										]
									}
								>
									<Table setSelect={setSelect} isDraggable />
								</TableContainer>
							</ColDiv>
						</RowDiv>
					</DragContainer>
				</>
			)}
		</FoldableContainer>
	);
};
UsersIncludedInGroup.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	setValue: PropTypes.func,
	space: PropTypes.string,
};
export default UsersIncludedInGroup;
