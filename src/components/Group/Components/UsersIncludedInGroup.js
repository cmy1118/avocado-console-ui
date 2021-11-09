import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import DropButton from '../../Table/DropButton';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {ColDiv, RowDiv, TableHeader} from '../../../styles/components/div';
import {TableFoldContainer} from '../../../styles/components/table';
import TableOptionText from '../../Table/Options/TableOptionText';
import PropTypes from 'prop-types';
import TableFold from '../../Table/Options/TableFold';
import TableContainer from '../../Table/TableContainer';
import DragContainer from '../../Table/DragContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';

const UsersIncludedInGroup = ({space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [select, setSelect] = useState({});
	const excludedData = useMemo(() => {
		const dropDataName = users
			.map(({uid: id, id: _id, ...rest}) => ({
				id,
				_id,
				...rest,
			}))
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => v.name);
		return users
			.filter((v) => !dropDataName.includes(v.name))
			.map((v) => ({
				...v,
				numberOfGroups: v.groups.length,
			}));
	}, [users, includedDataIds]);

	const includedData = useMemo(() => {
		return users
			.map(({uid: id, id: _id, ...rest}) => ({
				id,
				_id,
				...rest,
			}))
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
			}));
	}, [users, includedDataIds]);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.groups.add.roles.include,
				data: includedData,
			}),
		);
	}, [includedData, dispatch]);

	return (
		<TableFoldContainer>
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
								width={'700px'}
								height={'300px'}
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
									width={'400px'}
									height={'300px'}
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
		</TableFoldContainer>
	);
};
UsersIncludedInGroup.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};
export default UsersIncludedInGroup;
