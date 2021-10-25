import React, {useCallback, useMemo} from 'react';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {tableKeys} from '../../../utils/data';
import Table from '../../Table/Table';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {useDispatch, useSelector} from 'react-redux';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';

const AddTagToGroup = () => {
	const dispatch = useDispatch();
	const {group, currentTarget} = useSelector(CURRENT_TARGET.selector);
	const columns = getColumnsAsKey[tableKeys.addTagsToGroupOnAddPage];
	const target = currentTarget[tableKeys.addTagsToGroupOnAddPage];

	const onClickAddRow = useCallback(() => {
		dispatch(CURRENT_TARGET.action.addTagDataOnAddGroup());
	}, [dispatch]);

	const onClickDeleteRow = useCallback(() => {
		if (!target) return;
		dispatch(CURRENT_TARGET.action.deleteTagDataOnAddGroup(target));
	}, [dispatch, target]);

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
				<NormalButton onClick={onClickAddRow}>태그 추가</NormalButton>
				<TransparentButton onClick={onClickDeleteRow}>
					태그 삭제
				</TransparentButton>
			</div>
			<Table
				tableKey={tableKeys.addTagsToGroupOnAddPage}
				data={data}
				columns={columns}
				isSelectable
			/>
		</>
	);
};
export default AddTagToGroup;
