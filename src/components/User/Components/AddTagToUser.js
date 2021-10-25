import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {useDispatch} from 'react-redux';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {useSelector} from 'react-redux';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';

const AddTagToUser = () => {
	const dispatch = useDispatch();
	const {user} = useSelector(CURRENT_TARGET.selector);
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

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.users.add.tag,
				data: tagData,
			}),
		);
	}, [tagData, dispatch]);

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
				tableKey={tableKeys.users.add.tag}
				data={tagData}
				columns={tableColumns[tableKeys.users.add.tag]}
				isSelectable
				setData={setData}
				setSelect={setSelect}
			/>
		</>
	);
};

export default AddTagToUser;
