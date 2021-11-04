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

const RolePolicyTab = ({roleId}) => {
	const [select, setSelect] = useState([]);
	const [rightDataIds, setRightDataIds] = useState([]);

	const dataLeft = useMemo(() => dummyPermission.slice(0, 2), []);
	const dataRight = useMemo(() => dummyPermission.slice(2), []);

	return (
		<>
			<div>
				이 역할의 정책: {dataLeft.length}{' '}
				<TransparentButton>연결 해제</TransparentButton>
			</div>
			<Table
				data={dataLeft}
				tableKey={tableKeys.roles.summary.tabs.permissions.include}
				columns={
					tableColumns[
						tableKeys.roles.summary.tabs.permissions.include
					]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isSearchable
				setSelect={setSelect}
				setData={setRightDataIds}
			/>
			<div>
				이 역할의 다른 정책 : {dataRight.length}{' '}
				<NormalButton>정책 생성</NormalButton>
				<NormalButton>정책 연결</NormalButton>
			</div>
			<Table
				data={dataRight}
				tableKey={tableKeys.roles.summary.tabs.permissions.exclude}
				columns={
					tableColumns[
						tableKeys.roles.summary.tabs.permissions.exclude
					]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isSearchable
				setSelect={setSelect}
				setData={setRightDataIds}
				control
			/>
		</>
	);
};

RolePolicyTab.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RolePolicyTab;
