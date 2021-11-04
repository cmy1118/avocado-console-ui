import React, {useCallback, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {NormalButton, TransparentButton,} from '../../../styles/components/buttons';
import {TableSpace, TableSpaceButtons} from "../../../styles/components/table";
import TableOptionText from "../../Table/Options/TableOptionText";

const UserOnDescPageTags = ({userId}) => {
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

	const onClickAddRow = useCallback(() => {
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

	return (
		<>
			<TableSpace>태그 추가
				<TableSpaceButtons>
					<NormalButton onClick={onClickAddRow}>태그 추가</NormalButton>
					<NormalButton onClick={onClickSaveRow}>태그 저장</NormalButton>
					<TransparentButton onClick={onClickDeleteRow}>
						태그 삭제
					</TransparentButton>
				</TableSpaceButtons>
			</TableSpace>
			<TableOptionText data={'tags'}/>

			<Table
				tableKey={tableKeys.users.summary.tag}
				data={data}
				columns={tableColumns[tableKeys.users.summary.tag]}
				isSelectable
				setData={setData} // data 내부의 값을 조작할 필요가 있는경우
				setSelect={setSelect}
			/>
		</>
	);
};

UserOnDescPageTags.propTypes = {
	userId: PropTypes.string,
};

export default UserOnDescPageTags;
