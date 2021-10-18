import React, {useCallback, useMemo, useState} from 'react';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {tableKeys} from '../../../utils/data';
import Table from '../../Table/Table';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {useDispatch, useSelector} from 'react-redux';

const AddTagToUser = () => {
	const dispatch = useDispatch();
	const {user, currentTarget} = useSelector(CURRENT_TARGET.selector);
	const columns = getColumnsAsKey[tableKeys.addTagsToUserOnAddPage];
	const target = currentTarget[tableKeys.addTagsToUserOnAddPage];

	const [tagData, setTagData] = useState([]);

	console.log(tagData);

	const onClickAddRow = useCallback(() => {
		dispatch(CURRENT_TARGET.action.addTagDataOnAddUser());
	}, [dispatch]);

	const onClickDeleteRow = useCallback(() => {
		if (!target) return;
		dispatch(CURRENT_TARGET.action.deleteTagDataOnAddUser(target));
	}, [dispatch, target]);

	const data = useMemo(() => {
		return user.tags.map((v, i) => {
			return {
				...v,
				id: i,
				numberOfPermissions: v.permissions.length,
			};
		});
	}, [user]);

	return (
		<>
			<div>태그 추가</div>

			<div>
				<button onClick={onClickAddRow}>태그 추가</button>
				<button onClick={onClickDeleteRow}>태그 삭제</button>
			</div>
			<Table
				tableKey={tableKeys.addTagsToUserOnAddPage}
				data={data}
				columns={columns}
				isSelectable
				setData={setTagData}
			/>
		</>
	);
};
export default AddTagToUser;
