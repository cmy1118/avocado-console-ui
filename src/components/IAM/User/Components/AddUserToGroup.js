import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import DropButton from '../../../Table/DropButton';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../../reducers/currentTarget';
import {ColDiv, RowDiv, TableHeader} from '../../../../styles/components/style';
import TableOptionText from '../../../Table/Options/TableOptionText';
import PropTypes from 'prop-types';
import TableFold from '../../../Table/Options/TableFold';
import DragContainer from '../../../Table/DragContainer';
import TableContainer from '../../../Table/TableContainer';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import {DRAGGABLE_KEY} from '../../../../Constants/Table/keys';

const AddUserToGroup = ({space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const {page} = useSelector(PAGINATION.selector);

	const includedData = useMemo(() => {
		return (
			groups
				.filter((v) => includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					userGroupType: v.userGroupType.name,
					[DRAGGABLE_KEY]: v.id,
				})) || []
		);
	}, [groups, includedDataIds]);

	const excludedData = useMemo(() => {
		return (
			groups
				.filter((v) => !includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					userGroupType: v.userGroupType.name,
					[DRAGGABLE_KEY]: v.id,
				})) || []
		);
	}, [groups, includedDataIds]);

	console.log('excludedData ::', excludedData);
	console.log('includedData ::', includedData);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.users.add.groups.exclude,
				data: includedData,
			}),
		);
	}, [dispatch, includedData]);

	useEffect(() => {
		page[tableKeys.users.add.groups.exclude] &&
			dispatch(
				IAM_USER_GROUP.asyncAction.findAllAction({
					range: page[tableKeys.users.add.groups.exclude],
				}),
			);
	}, [dispatch, page]);

	return (
		<FoldableContainer>
			<TableFold
				title={'그룹에 사용자에 추가'}
				space={space}
				isFold={isFold}
				setIsFold={setIsFold}
			/>
			{isFold[space] ? (
				<>
					<TableOptionText data={'groups'} />
					<DragContainer
						selected={select}
						data={includedDataIds}
						setData={setIncludedDataIds}
						includedKey={tableKeys.users.add.groups.include}
						excludedData={excludedData}
						includedData={includedData}
					>
						<RowDiv>
							<TableContainer
								tableKey={tableKeys.users.add.groups.exclude}
								columns={
									tableColumns[
										tableKeys.users.add.groups.exclude
									]
								}
								data={excludedData}
							>
								<TableOptionsBar />
								<Table setSelect={setSelect} isDraggable />
							</TableContainer>
							<RowDiv alignItems={'center'}>
								<DropButton
									leftTableKey={
										tableKeys.users.add.groups.exclude
									}
									RightTableKey={
										tableKeys.users.add.groups.include
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
									추가 그룹: {includedDataIds.length}건
								</TableHeader>
								<TableContainer
									tableKey={
										tableKeys.users.add.groups.include
									}
									columns={
										tableColumns[
											tableKeys.users.add.groups.include
										]
									}
									data={includedData}
								>
									<Table setSelect={setSelect} isDraggable />
								</TableContainer>
							</ColDiv>
						</RowDiv>
					</DragContainer>
				</>
			) : (
				''
			)}
		</FoldableContainer>
	);
};
AddUserToGroup.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};
export default AddUserToGroup;
