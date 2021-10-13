import React, {useMemo} from 'react';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {tableKeys} from '../../../utils/data';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import Table from '../../Table/Table';

const AddTagToUser = () => {
	const {users} = useSelector(IAM_USER.selector);
	const columns = getColumnsAsKey[tableKeys.addTagsToUserOnAddPage];
	const data = [];

	return (
		<>
			<div>태그 추가</div>

			<div>
				<button>태그 추가</button>
				<button>태그 삭제</button>
			</div>
			<Table
				tableKey={tableKeys.addTagsToUserOnAddPage}
				data={data}
				columns={columns}
			/>
		</>
	);
};
export default AddTagToUser;
