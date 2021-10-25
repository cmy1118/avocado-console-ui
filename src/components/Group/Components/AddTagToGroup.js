import React, {useCallback, useMemo} from 'react';
import Table from '../../Table/Table';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {useSelector} from 'react-redux';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';

const AddTagToGroup = () => {
	const {group} = useSelector(CURRENT_TARGET.selector);

	const onClickAddRow = useCallback(() => {
		console.log('추가 처리');
	}, []);

	const onClickDeleteRow = useCallback(() => {
		console.log('삭제 처리');
	}, []);

	const data = useMemo(() => {
		return group.tags.map((v, i) => {
			return {
				...v,
				id: i,
				numberOfPermissions: v.permissions.length,
			};
		});
	}, [group]);

	return (
		<>
			<div>태그 추가</div>

			<div>
				<button onClick={onClickAddRow}>태그 추가</button>
				<button onClick={onClickDeleteRow}>태그 삭제</button>
			</div>
			<Table
				tableKey={tableKeys.groups.add.tag}
				data={data}
				columns={tableColumns[tableKeys.groups.add.tag]}
				isSelectable
			/>
		</>
	);
};
export default AddTagToGroup;
