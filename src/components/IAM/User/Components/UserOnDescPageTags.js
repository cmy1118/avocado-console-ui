import React, {useCallback, useEffect, useState} from 'react';
import Table from '../../../Table/Table';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {TableTitle} from '../../../../styles/components/table';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableContainer from '../../../Table/TableContainer';
import styled from 'styled-components';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {TitleBarButtons} from '../../../../styles/components/iam/iam';
import IAM_USER_TAG from '../../../../reducers/api/IAM/User/Tag/tags';

const _TableSpace = styled(TableTitle)`
	margin-top: 30px;
	height: 30px;
`;

const UserOnDescPageTags = ({userUid, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const [user, setUser] = useState(null);
	const [data, setData] = useState([]);

	const [select, setSelect] = useState({});
	const onClickAddRow = useCallback(() => {
		const lastValues = data.slice().pop();
		if (lastValues?.name === '' || lastValues?.value === '') {
			alert('입력하지 않은 값이 있습니다.');
			return;
		}
		setData([
			...data,
			{
				name: '',
				value: '',
				permissions: [],
				[DRAGGABLE_KEY]: `${tableKeys.users.summary.tabs.tags.basic} ${data.length}`,
			},
		]);
	}, [data]);

	const onClickSaveRow = useCallback(() => {
		if (data[0]) {
			data.forEach((v) => {
				dispatch(
					IAM_USER_TAG.asyncAction.createAction({
						userUid,
						name: v.name,
						value: v.value,
					}),
				);
			});
		}
	}, [data, dispatch, userUid]);

	const onClickDeleteRow = useCallback(() => {
		if (select[tableKeys.users.summary.tabs.tags.basic][0]) {
			select[tableKeys.users.summary.tabs.tags.basic].forEach((tag) => {
				dispatch(
					IAM_USER_TAG.asyncAction.deleteAction({
						userUid,
						name: tag.name,
					}),
				);
			});
			setData(
				data.filter(
					(v) =>
						!select[tableKeys.users.summary.tabs.tags.basic]
							.map((x) => x.name)
							.includes(v.name),
				),
			);
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [data, dispatch, select, userUid]);

	useEffect(() => {
		console.log(user);
		if (!user && !isSummaryOpened) {
			dispatch(
				IAM_USER.asyncAction.findByUidAction({
					userUid,
				}),
			)
				.unwrap()
				.then((user) => {
					setUser(user);
					setData(
						user.tags
							? user.tags.map((tag) => ({
									...tag,
									id: tag.name,
									[DRAGGABLE_KEY]: tag.name,
							  }))
							: [],
					);
				});
		}
	}, [dispatch, isSummaryOpened, user, userUid]);

	return (
		<TabContentContainer>
			<TableTitle>
				태그 추가
				<TitleBarButtons>
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
				</TitleBarButtons>
			</TableTitle>
			<TableOptionText data={'tags'} />

			<TableContainer
				height={'200px'}
				tableKey={tableKeys.users.summary.tabs.tags.basic}
				data={data}
				setData={setData}
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
						tableKey={
							tableKeys.users.summary.tabs.tags.permissions
								.include
						}
						height={'200px'}
						data={
							[]
							// dummyPermission.filter((v) =>
							// select[
							// 	tableKeys.users.summary.tabs.tags.basic
							// ][0].permissions.includes(v.id),
							// )
						}
						columns={
							tableColumns[
								tableKeys.users.summary.tabs.tags.permissions
									.include
							]
						}
					>
						<TableOptionsBar />
						<Table setSelect={setSelect} />
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
						<TitleBarButtons>
							<NormalButton>정책 생성</NormalButton>
							<NormalButton margin='0px 0px 0px 5px'>
								정책 연결
							</NormalButton>
						</TitleBarButtons>
					</_TableSpace>

					<TableContainer
						tableKey={
							tableKeys.users.summary.tabs.tags.permissions
								.exclude
						}
						data={
							[]
							// dummyPermission.filter(
							// (v) =>
							// 	!select[
							// 		tableKeys.users.summary.tabs.tags.basic
							// 	][0].permissions.includes(v.id),
							// )
						}
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
		</TabContentContainer>
	);
};

UserOnDescPageTags.propTypes = {
	userUid: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default UserOnDescPageTags;
