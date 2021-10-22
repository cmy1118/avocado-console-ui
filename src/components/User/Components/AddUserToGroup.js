import React, {useMemo, useState, useEffect} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../utils/data';
import DropButton from '../../Table/DropButton';
import styled from 'styled-components';

const _Tables = styled.div`
	display: flex;
`;

import PropTypes from 'prop-types';

const DndKey = 'groupsIncludedInUserOnAddPage_DndKey';
const leftTableKey = 'groupsIncludedInUserOnAddPage';
const RightTableKey = 'groupsExcludedFromUserOnAddPage';

const AddUserToGroup = ({setAllData}) => {
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const [rightDataIds, setRightDataIds] = useState([]);
	const [select, setSelect] = useState([]);

	const dataLeft = useMemo(() => {
		const dropDataTypeId = groups
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => v.clientGroupTypeId);
		return groups
			.filter((v) => !dropDataTypeId.includes(v.clientGroupTypeId))
			.map((v) => ({
				...v,
				numberOfUsers: v.members.length,
			}));
	}, [groups, rightDataIds]);

	const dataRight = useMemo(() => {
		return groups
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
			}));
	}, [groups, rightDataIds]);

	useEffect(() => {
		setAllData({key: 'groupsExcludedFromUserOnAddPage', data: dataRight});
	}, [setAllData, dataRight]);

	return (
		<>
			<div>그룹에 사용자에 추가</div>
			<_Tables>
				<Table
					tableKey='groupsIncludedInUserOnAddPage'
					columns={
						getColumnsAsKey['groupsIncludedInUserOnAddPageColumns']
					}
					data={dataLeft}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					isSearchable
					dndKey={DndKey}
					setData={setRightDataIds}
					setSelect={setSelect}
				/>
				<DropButton
					leftTableKey={leftTableKey}
					RightTableKey={RightTableKey}
					select={select}
					rightDataIds={rightDataIds}
					setRightDataIds={setRightDataIds}
				/>
				<div>
					<div>추가 그룹: {rightDataIds.length}건</div>
					<Table
						tableKey='groupsExcludedFromUserOnAddPage'
						columns={
							getColumnsAsKey[
								'groupsExcludedFromUserOnAddPageColumns'
							]
						}
						data={dataRight}
						isPageable
						isNumberOfRowsAdjustable
						isColumnFilterable
						isSortable
						isSelectable
						isDnDPossible
						dndKey={DndKey}
						setData={setRightDataIds}
						setSelect={setSelect}
						control
					/>
				</div>
			</_Tables>
		</>
	);
};
AddUserToGroup.propTypes = {
	setAllData: PropTypes.func.isRequired,
};

export default AddUserToGroup;
