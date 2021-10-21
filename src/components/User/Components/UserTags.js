import React, {useCallback, useMemo, useState} from 'react';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {tableKeys} from '../../../utils/data';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';

const UserTags = ({userId}) => {
	const {users} = useSelector(IAM_USER.selector);
	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);
	const [data, setData] = useState(
		user.tags.map((v) => {
			return {
				...v,
				id: v.name,
				numberOfPermissions: v.permissions.length,
			};
		}) || [],
	);

	const [select, setSelect] = useState([]);

	const columns = getColumnsAsKey[tableKeys.addTagToUserOnDescPage];

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

	console.log(data);

	return (
		<>
			<div>태그 추가</div>

			<div>
				<button onClick={onClickAddRow}>태그 추가</button>
				<button onClick={onClickSaveRow}>태그 저장</button>
				<button onClick={onClickDeleteRow}>태그 삭제</button>
			</div>
			<Table
				tableKey={tableKeys.addTagToUserOnDescPage}
				data={data}
				columns={columns}
				isSelectable
				setData={setData} // data 내부의 값을 조작할 필요가 있는경우
				setSelect={setSelect}
			/>
		</>
	);
};

UserTags.propTypes = {
	userId: PropTypes.string,
};

export default UserTags;
