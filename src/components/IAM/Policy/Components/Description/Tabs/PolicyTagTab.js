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
	IncludeTableContainer,
	TitleBarButtons,
} from '../../../../../../styles/components/iam/iam';
import FoldableContainer from '../../../../../Table/Options/FoldableContainer';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';
import {IamTabSectionContents} from '../../../../../../styles/components/iam/addPage';

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
			<DragContainer
				selected={selected}
				data={inTagIds}
				setData={setInTagIds}
				includedKey={tableKeys.policy.summary.tabs.tag.include}
				excludedData={exTag}
				includedData={inTag}
			>
				<IncludeTableContainer>
					<TableTitle>
						{policyTagTab.include.title}
						<NormalBorderButton
							onClick={onClickDeleteTag}
							margin={'0px 0px 0px 5px'}
						>
							{policyTagTab.include.button.delete}
						</NormalBorderButton>
					</TableTitle>
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
				</IncludeTableContainer>

				<FoldableContainer
					title={policyTagTab.include.title + exTag.length}
					buttons={(isDisabled) => (
						<TitleBarButtons>
							<NormalButton
								margin={'0px 0px 0px 5px'}
								disabled={isDisabled}
							>
								{policyTagTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					)}
					type={'tab'}
				>
					<IamTabSectionContents>
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
					</IamTabSectionContents>
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

PolicyTagTab.propTypes = {
	policyId: PropTypes.string.isRequired,
};
export default PolicyTagTab;
