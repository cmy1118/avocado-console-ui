import React, {useCallback, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import TableContainer from '../../Table/TableContainer';

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
				numberOfPermissions: v.permissions.length,
			};
		}) || [],
	);

	const [select, setSelect] = useState({});
	const onClickAddRow = useCallback(() => {
		const lastValues = data.slice().pop();
		console.log(lastValues);
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
		console.log(data);
	}, [data]);

	const onClickDeleteRow = useCallback(() => {
		if (select[0]) {
			console.log(select);
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
				<button onClick={onClickSaveRow}>태그 저장</button>
				<button onClick={onClickDeleteRow}>태그 삭제</button>
			</div>
			<TableContainer
				tableKey={tableKeys.groups.summary.tabs.tags.basic}
				data={data}
				columns={tableColumns[tableKeys.groups.summary.tabs.tags.basic]}
			>
				<Table setSelect={setSelect} />
			</TableContainer>
		</>
	);
};

GroupOnDescPageTags.propTypes = {
	groupId: PropTypes.string,
};

export default GroupOnDescPageTags;
