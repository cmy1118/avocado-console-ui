import React, {useCallback, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import {TableSpace} from '../../../styles/components/table';
import TableOptionText from '../../Table/Options/TableOptionText';
import {dummyPermission} from '../../../utils/dummyData';
import TableContainer from '../../Table/TableContainer';
import {AppBarButtons} from '../../../styles/components/style';
import styled from 'styled-components';
import TableOptionsBar from '../../Table/TableOptionsBar';

const _TableSpace = styled(TableSpace)`
	margin-top: 20px;
	padding: 10px 16px 0px 16px;
`;

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

	const [select, setSelect] = useState({});
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
			<TableSpace>
				태그 추가
				<AppBarButtons>
					<NormalButton onClick={onClickAddRow}>
						태그 추가
					</NormalButton>
					<NormalButton onClick={onClickSaveRow}>
						태그 저장
					</NormalButton>
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={onClickDeleteRow}
					>
						태그 삭제
					</TransparentButton>
				</AppBarButtons>
			</TableSpace>
			<TableOptionText data={'tags'} />

			<TableContainer
				tableKey={tableKeys.users.summary.tabs.tags.basic}
				data={data}
				columns={tableColumns[tableKeys.users.summary.tabs.tags.basic]}
			>
				<Table setSelect={setSelect} />
			</TableContainer>

			{select[tableKeys.users.summary.tabs.tags.basic]?.length === 1 && (
				<div>
					<_TableSpace>
						태그 [
						{
							select[tableKeys.users.summary.tabs.tags.basic][0]
								.name
						}{' '}
						:{' '}
						{
							select[tableKeys.users.summary.tabs.tags.basic][0]
								.value
						}
						]의 정책 :
						<TransparentButton margin='0px 0px 0px 5px'>
							연결 해제
						</TransparentButton>
					</_TableSpace>

					<TableContainer
						tableKey={tableKeys.users.summary.tabs.tags.basic}
						data={dummyPermission.filter((v) =>
							select[
								tableKeys.users.summary.tabs.tags.basic
							][0].permissions.includes(v.id),
						)}
						columns={
							tableColumns[
								tableKeys.users.summary.tabs.tags.permissions
									.include
							]
						}
					>
						<TableOptionsBar />
						<Table />
					</TableContainer>

					<_TableSpace>
						태그 [
						{
							select[tableKeys.users.summary.tabs.tags.basic][0]
								.name
						}{' '}
						:{' '}
						{
							select[tableKeys.users.summary.tabs.tags.basic][0]
								.value
						}
						]의 다른 정책 :
						<AppBarButtons>
							<NormalButton>정책 생성</NormalButton>
							<NormalButton margin='0px 0px 0px 5px'>
								정책 연결
							</NormalButton>
						</AppBarButtons>
					</_TableSpace>

					<TableContainer
						tableKey={tableKeys.users.summary.tabs.tags.basic}
						data={dummyPermission.filter(
							(v) =>
								!select[
									tableKeys.users.summary.tabs.tags.basic
								][0].permissions.includes(v.id),
						)}
						columns={
							tableColumns[
								tableKeys.users.summary.tabs.tags.permissions
									.exclude
							]
						}
					>
						<TableOptionsBar />
						<Table />
					</TableContainer>
				</div>
			)}
		</>
	);
};

UserOnDescPageTags.propTypes = {
	userId: PropTypes.string,
};

export default UserOnDescPageTags;
