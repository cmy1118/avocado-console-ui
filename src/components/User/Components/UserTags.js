import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {tableKeys} from '../../../utils/data';
import Table from '../../Table/Table';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
let index = 0;

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

	const columns = getColumnsAsKey[tableKeys.addTagToUserOnDescPage];

	const onClickAddRow = useCallback(() => {
		console.log(data);
		setData([
			...data,
			{
				name: '',
				id: index,
				value: '',
				permissions: [],
				numberOfPermissions: 0,
			},
		]);
		index++;
	}, [data]);

	const onClickDeleteRow = useCallback(() => {
		console.log(data);
	}, [data]);

	console.log(data);

	return (
		<>
			<div>태그 추가</div>

			<div>
				<button onClick={onClickAddRow}>태그 추가</button>
				<button onClick={onClickDeleteRow}>태그 삭제</button>
			</div>
			<Table
				tableKey={tableKeys.addTagToUserOnDescPage}
				data={data}
				columns={columns}
				isSelectable
				setData={setData} // data 내부의 값을 조작할 필요가 있는경우
			/>
		</>
	);
};

UserTags.propTypes = {
	userId: PropTypes.string,
};

export default UserTags;
