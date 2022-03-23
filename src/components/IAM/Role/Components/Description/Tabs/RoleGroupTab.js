import React, {useMemo, useState} from 'react';
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
import TableFold from '../../../../../Table/Options/TableFold';
import TableOptionText from '../../../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {
	FoldableContainer,
	TitleBarButtons,
} from '../../../../../../styles/components/iam/iam';
import {CollapsbleContent} from '../../../../../../styles/components/style';

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
const RoleGroupTab = ({roleId, space, isFold, setIsFold}) => {
	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const includedData = useMemo(() => {
		return [];
	}, []);
	//excludedData : 이 역할을 할당받지 않은 그룹자
	const excludedData = useMemo(() => {
		return [];
	}, []);

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
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.summary.tabs.groups.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<Table
					setSelect={setSelect}
					isDraggable
					data={includedData}
					tableKey={tableKeys.roles.summary.tabs.groups.include}
					columns={
						tableColumns[
							tableKeys.roles.summary.tabs.groups.include
						]
					}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>
				<FoldableContainer>
					<TableFold
						title={roleGroupTab.exclude.title + excludedData.length}
						space={'RoleGroupTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<TitleBarButtons>
							<NormalButton>
								{roleGroupTab.exclude.button.create}
							</NormalButton>
							<NormalButton margin={'0px 0px 0px 5px'}>
								{roleGroupTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					</TableFold>
					<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>
						<TableOptionText data={'groups'} />
						<Table
							setSelect={setSelect}
							isDraggable
							data={excludedData}
							tableKey={
								tableKeys.roles.summary.tabs.groups.exclude
							}
							columns={
								tableColumns[
									tableKeys.roles.summary.tabs.groups.exclude
								]
							}
							isPaginable
							isSearchable
							isSearchFilterable
							isColumnFilterable
						/>
					</CollapsbleContent>
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

RoleGroupTab.propTypes = {
	roleId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default RoleGroupTab;
