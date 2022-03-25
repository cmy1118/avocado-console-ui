import PropTypes from 'prop-types';
import {TableTitle} from '../../../../../../styles/components/table';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../../../../styles/components/buttons';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import React, {useCallback, useEffect, useState} from 'react';
import {tableKeys} from '../../../../../../Constants/Table/keys';
import DragContainer from '../../../../../Table/DragContainer';
import Table from '../../../../../Table/Table';
import {tableColumns} from '../../../../../../Constants/Table/columns';
import {
	FoldableContainer,
	TitleBarButtons,
} from '../../../../../../styles/components/iam/iam';
import TableFold from '../../../../../Table/Options/TableFold';
import {CollapsbleContent} from '../../../../../../styles/components/style';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';

const policyTagTab = {
	include: {
		title: '이 정책과 연결된 태그',
		button: {delete: '삭제'},
	},
	exclude: {
		title: '이 정책의 다른 태그',
		button: {add: '태그 추가'},
	},
};

const PolicyTagTab = ({policyId}) => {
	const onClickDeleteTag = useCallback(() => {}, []);
	const [isFold, setIsFold] = useState(true);
	const [inTagIds, setInTagIds] = useState([]);

	const [inTag, setInTag] = useState([]);
	const [exTag, setExTag] = useState([]);

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
				{policyTagTab.include.title}
				<NormalBorderButton
					onClick={onClickDeleteTag}
					margin={'0px 0px 0px 5px'}
				>
					{policyTagTab.include.button.delete}
				</NormalBorderButton>
			</TableTitle>

			<DragContainer
				selected={selected}
				data={inTagIds}
				setData={setInTagIds}
				includedKey={tableKeys.policy.summary.tabs.tag.include}
				excludedData={exTag}
				includedData={inTag}
			>
				<Table
					isDraggable
					data={inTag}
					tableKey={tableKeys.policy.summary.tabs.role.include}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>

				<FoldableContainer>
					<TableFold
						title={policyTagTab.include.title + exTag.length}
						space={'RoleUserTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<TitleBarButtons>
							<NormalButton margin={'0px 0px 0px 5px'}>
								{policyTagTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					</TableFold>
					<CollapsbleContent
						height={isFold['RoleUserTab'] ? '374px' : '0px'}
					>
						<Table
							isDraggable
							data={exTag}
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

PolicyTagTab.propTypes = {
	policyId: PropTypes.string.isRequired,
};
export default PolicyTagTab;
