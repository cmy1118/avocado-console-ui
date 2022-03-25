import PropTypes from 'prop-types';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {TableTitle} from '../../../../../../styles/components/table';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../../../../styles/components/buttons';
import React, {useCallback, useEffect, useState} from 'react';
import TableFold from '../../../../../Table/Options/TableFold';
import {
	FoldableContainer,
	TitleBarButtons,
} from '../../../../../../styles/components/iam/iam';
import {CollapsbleContent} from '../../../../../../styles/components/style';
import {tableKeys} from '../../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../../Constants/Table/columns';
import Table from '../../../../../Table/Table';
import DragContainer from '../../../../../Table/DragContainer';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';

const policyRoleTab = {
	include: {
		title: '이 정책과 연결된 역할 :',
		button: {delete: '삭제'},
	},
	exclude: {
		title: '이 정책의 다른 역할 :',
		button: {add: '역할 추가'},
	},
};

const PolicyRoleTab = ({policyId}) => {
	const onClickDeletePolicy = useCallback(() => {}, []);
	const [isFold, setIsFold] = useState(true);
	const [inRoleIds, setInRoleIds] = useState([]);

	const [inRole, setInRole] = useState([]);
	const [exRole, setExRole] = useState([]);
	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.policy.summary.tabs.role.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.policy.summary.tabs.role.exclude],
	);
	const [selected, setSelected] = useState({});

	useEffect(() => {
		setSelected({
			[tableKeys.policy.summary.tabs.role.include]: includeSelect,
			[tableKeys.policy.summary.tabs.role.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<TabContentContainer>
			<TableTitle>
				{policyRoleTab.include.title + inRole.length}
				<NormalBorderButton
					onClick={onClickDeletePolicy}
					margin={'0px 0px 0px 5px'}
				>
					{policyRoleTab.include.button.delete}
				</NormalBorderButton>
			</TableTitle>

			<DragContainer
				selected={selected}
				data={inRoleIds}
				setData={setInRoleIds}
				includedKey={tableKeys.policy.summary.tabs.role.include}
				excludedData={exRole}
				includedData={inRole}
			>
				<Table
					isDraggable
					data={inRole}
					tableKey={tableKeys.policy.summary.tabs.role.include}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>

				<FoldableContainer>
					<TableFold
						title={policyRoleTab.include.title + exRole.length}
						space={'RoleUserTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<TitleBarButtons>
							<NormalButton margin={'0px 0px 0px 5px'}>
								{policyRoleTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					</TableFold>
					<CollapsbleContent
						height={isFold['RoleUserTab'] ? '374px' : '0px'}
					>
						<Table
							isDraggable
							data={exRole}
							tableKey={
								tableKeys.policy.summary.tabs.role.exclude
							}
							columns={excludeColumns}
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

PolicyRoleTab.propTypes = {
	policyId: PropTypes.string.isRequired,
};
export default PolicyRoleTab;
