import React, {useCallback, useMemo, useState} from 'react';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {tableKeys} from '../../../utils/data';
import Table from '../../Table/Table';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {useSelector} from 'react-redux';

const AddTagToUser = () => {
	const {user} = useSelector(CURRENT_TARGET.selector);
	const columns = getColumnsAsKey[tableKeys.addTagsToUserOnAddPage];
	const [data, setData] = useState(user.tags);
	const [selected, setSelected] = useState({});

	console.log(selected);

	const tagData = useMemo(() => {
		return data.map((v) => {
			return {
				...v,
				id: v.name,
				numberOfPermissions: v.permissions.length,
			};
		});
	}, [data]);

	const onClickAddRow = useCallback(() => {
		console.log(data);
		setData([
			...data,
			{
				name: '',
				value: '',
				permissions: [],
			},
		]);
	}, [data]);

	const onClickDeleteRow = useCallback(() => {
		console.log(data);
	}, [data]);

	return (
		<>
			<div>태그 추가</div>

			<div>
				<button onClick={onClickAddRow}>태그 추가</button>
				<button onClick={onClickDeleteRow}>태그 삭제</button>
			</div>
			<Table
				tableKey={tableKeys.addTagsToUserOnAddPage}
				data={tagData}
				columns={columns}
				isSelectable
				setData={setData}
				setSelected={setSelected}
				selected={selected}
			/>
		</>
	);
};
export default AddTagToUser;
