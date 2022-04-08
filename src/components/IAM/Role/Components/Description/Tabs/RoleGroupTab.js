import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../../../../styles/components/buttons';
import Table from '../../../../../Table/Table';

import {tableKeys} from '../../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../../Constants/Table/columns';
import DragContainer from '../../../../../Table/DragContainer';
import {TableTitle} from '../../../../../../styles/components/table';
import FoldableContainer from '../../../../../Table/Options/FoldableContainer';
import TableOptionText from '../../../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {TitleBarButtons} from '../../../../../../styles/components/iam/iam';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';

const roleGroupTab = {
	include: {title: '이 역할의 그룹 : ', button: {delete: '연결 해제'}},
	exclude: {
		title: '이 역할의 다른 그룹 : ',
		button: {create: '그룹 생성', add: '그룹 연결'},
	},
};

/**************************************************
 * ambacc244 - 이 역할을 가지는 그룹과, 가지지 않는 그룹을 보여줌
 **************************************************/
const RoleGroupTab = ({roleId}) => {
	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.roles.summary.tabs.groups.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.roles.summary.tabs.groups.exclude],
	);
	const [selected, setSelected] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const includedData = useMemo(() => {
		return [];
	}, []);
	//excludedData : 이 역할을 할당받지 않은 그룹자
	const excludedData = useMemo(() => {
		return [];
	}, []);

	useEffect(() => {
		setSelected({
			[tableKeys.roles.summary.tabs.groups.include]: includeSelect,
			[tableKeys.roles.summary.tabs.groups.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<TabContentContainer>
			<TableTitle>
				{roleGroupTab.include.title}
				{includedData.length}
				<NormalBorderButton margin={'0px 0px 0px 5px'}>
					{roleGroupTab.include.button.delete}
				</NormalBorderButton>
			</TableTitle>
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.summary.tabs.groups.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<Table
					isDraggable
					data={includedData}
					tableKey={tableKeys.roles.summary.tabs.groups.include}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>
				<FoldableContainer
					title={roleGroupTab.exclude.title + excludedData.length}
					buttons={(isDisabled) => (
						<TitleBarButtons>
							<NormalButton disabled={isDisabled}>
								{roleGroupTab.exclude.button.create}
							</NormalButton>
							<NormalButton
								margin={'0px 0px 0px 5px'}
								disabled={isDisabled}
							>
								{roleGroupTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					)}
				>
					<TableOptionText data={'groups'} />
					<Table
						isDraggable
						data={excludedData}
						tableKey={tableKeys.roles.summary.tabs.groups.exclude}
						columns={excludeColumns}
						isPaginable
						isSearchable
						isSearchFilterable
						isColumnFilterable
					/>
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

RoleGroupTab.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RoleGroupTab;
