import React, {useCallback, useMemo, useState} from 'react';
import Table from '../../../Table/Table';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {tableColumns} from '../../../../Constants/Table/columns';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {TableTitle} from '../../../../styles/components/table';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import TableOptionText from '../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {TitleBarButtons} from '../../../../styles/components/iam/iam';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';

const GroupOnDescPageTags = ({groupId}) => {
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groupId,
		groups,
	]);

	const [data, setData] = useState(
		group.tags.map((v) => {
			return {
				...v,
				id: v.name,
				// numberOfPermissions: v.permissions.length,
				[DRAGGABLE_KEY]: v.id,
				numberOfRoles: v.permissions.length,
			};
		}) || [],
	);

	const [select, columns] = useSelectColumn(
		tableColumns[tableKeys.groups.summary.tabs.tags.basic],
	);

	const onClickAddRow = useCallback(() => {
		const lastValues = data.slice().pop();
		//	console.log(lastValues);
		if (lastValues.name === '' || lastValues.value === '') {
			alert('입력하지 않은 값이 있습니다.');
			return;
		}
		setData([
			...data,
			{
				name: '',
				value: '',
				permissions: [],
			},
		]);
	}, [data]);

	const onClickSaveRow = useCallback(() => {
		//	console.log(data);
	}, [data]);

	const onClickDeleteRow = useCallback(() => {
		if (select.length) {
			console.log(select);
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [select]);

	return (
		<TabContentContainer>
			<TableTitle>
				태그 추가
				<TitleBarButtons>
					<NormalButton onClick={onClickAddRow}>
						태그 추가
					</NormalButton>
					<NormalButton onClick={onClickSaveRow}>
						태그 저장
					</NormalButton>
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={onClickDeleteRow}
					>
						태그 삭제
					</TransparentButton>
				</TitleBarButtons>
			</TableTitle>
			<TableOptionText data={'tags'} />
			<Table
				tableKey={tableKeys.groups.summary.tabs.tags.basic}
				data={data}
				columns={columns}
				setData={setData}
			/>
		</TabContentContainer>
	);
};

GroupOnDescPageTags.propTypes = {
	groupId: PropTypes.string,
};

export default GroupOnDescPageTags;
