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

const roleUserTab = {
	include: {title: '이 역할의 사용자 : ', button: {delete: '연결 해제'}},
	exclude: {
		title: '이 역할의 다른 사용자 : ',
		button: {create: '사용자 생성', add: '사용자 연결'},
	},
};

/**************************************************
 * ambacc244 - 이 역할을 가지는 사용자와, 가지지 않는 사용자를 보여줌
 **************************************************/
const RoleUserTab = ({roleId, space, isFold, setIsFold}) => {
	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);
	//includedData : 이 역할을 할당받은 사용자
	const includedData = useMemo(() => {
		return [];
	}, []);
	//excludedData : 이 역할을 할당받지 않은 사용자
	const excludedData = useMemo(() => {
		return [];
	}, []);

	return (
		<TabContentContainer>
			<TableTitle>
				{roleUserTab.include.title}
				{includedData.length}
				<NormalBorderButton margin={'0px 0px 0px 5px'}>
					{roleUserTab.include.button.delete}
				</NormalBorderButton>
			</TableTitle>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.summary.tabs.users.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<Table
					setSelect={setSelect}
					isDraggable
					data={includedData}
					tableKey={tableKeys.roles.summary.tabs.users.include}
					columns={
						tableColumns[tableKeys.roles.summary.tabs.users.include]
					}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>
				<FoldableContainer>
					<TableFold
						title={roleUserTab.include.title + excludedData.length}
						space={'RoleUserTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<TitleBarButtons>
							<NormalButton>
								{roleUserTab.exclude.button.create}
							</NormalButton>
							<NormalButton margin={'0px 0px 0px 5px'}>
								{roleUserTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					</TableFold>
					<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>
						<TableOptionText data={'usersRoles'} />

						<Table
							setSelect={setSelect}
							isDraggable
							data={excludedData}
							tableKey={
								tableKeys.roles.summary.tabs.users.exclude
							}
							columns={
								tableColumns[
									tableKeys.roles.summary.tabs.users.exclude
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

RoleUserTab.propTypes = {
	roleId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default RoleUserTab;
