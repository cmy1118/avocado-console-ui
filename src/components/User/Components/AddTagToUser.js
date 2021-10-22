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
	const [select, setSelect] = useState({});

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
		const lastValues = data.slice().pop();
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

	const onClickDeleteRow = useCallback(() => {
		if (select[0]) {
			setData(data.filter((v) => !select.includes(v.name)));
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [data, select]);

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
				setSelect={setSelect}
			/>
		</>
	);
};

export default AddTagToUser;
