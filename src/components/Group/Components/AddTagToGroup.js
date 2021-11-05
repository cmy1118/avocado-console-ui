import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {useDispatch} from 'react-redux';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import TableContainer from '../../Table/TableContainer';

const AddTagToGroup = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [select, setSelect] = useState({});
	const onClickAddRow = useCallback(() => {
		console.log(data);
		const lastValues = data.slice().pop();
		if (lastValues?.name === '' || lastValues?.value === '') {
			alert('입력하지 않은 값이 있습니다.');
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
		console.log(select);
		console.log('삭제 처리 필요');
	}, [select]);

	const tagData = useMemo(() => {
		return data.map((v) => {
			return {
				...v,
				id: v?.name,
				numberOfPermissions: v?.permissions.length,
			};
		});
	}, [data]);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.groups.add.tag,
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
			<TableContainer
				tableKey={tableKeys.groups.add.tag}
				data={tagData}
				columns={tableColumns[tableKeys.groups.add.tag]}
			>
				<Table setSelect={setSelect} />
			</TableContainer>
		</>
	);
};
export default AddTagToGroup;
