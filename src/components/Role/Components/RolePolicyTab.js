import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import Table from '../../Table/Table';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {dummyPermission} from '../../../utils/dummyData';
import TableContainer from '../../Table/TableContainer';
import DragContainer from '../../Table/DragContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';

const RolePolicyTab = ({roleId}) => {
	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);

	const excludedData = useMemo(() => dummyPermission.slice(0, 2), []);
	const includedData = useMemo(() => dummyPermission.slice(2), []);

	return (
		<DragContainer
			selected={select}
			data={includedDataIds}
			setData={setIncludedDataIds}
			includedKey={tableKeys.roles.summary.tabs.permissions.include}
			excludedData={excludedData}
			includedData={includedData}
		>
			<div>
				이 역할의 정책: {excludedData.length}
				<TransparentButton>연결 해제</TransparentButton>
			</div>
			<TableContainer
				data={excludedData}
				tableKey={tableKeys.roles.summary.tabs.permissions.include}
				columns={
					tableColumns[
						tableKeys.roles.summary.tabs.permissions.include
					]
				}
			>
				<TableOptionsBar />
				<Table setSelect={setSelect} isDraggable />
			</TableContainer>
			<div>
				이 역할의 다른 정책 : {includedData.length}
				<NormalButton>정책 생성</NormalButton>
				<NormalButton>정책 연결</NormalButton>
			</div>
			<TableContainer
				data={includedData}
				tableKey={tableKeys.roles.summary.tabs.permissions.exclude}
				columns={
					tableColumns[
						tableKeys.roles.summary.tabs.permissions.exclude
					]
				}
			>
				<TableOptionsBar />
				<Table setSelect={setSelect} isDraggable />
			</TableContainer>
		</DragContainer>
	);
};

RolePolicyTab.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RolePolicyTab;
