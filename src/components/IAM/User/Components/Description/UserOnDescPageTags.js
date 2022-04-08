import React, {useCallback, useEffect, useState} from 'react';
import Table from '../../../../Table/Table';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_USER from '../../../../../reducers/api/IAM/User/User/user';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import {TableTitle} from '../../../../../styles/components/table';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import styled from 'styled-components';
import {TabContentContainer} from '../../../../../styles/components/iam/iamTab';
import {TitleBarButtons} from '../../../../../styles/components/iam/iam';
import IAM_USER_TAG from '../../../../../reducers/api/IAM/User/Tag/tags';
import useSelectColumn from '../../../../../hooks/table/useSelectColumn';

const _TableSpace = styled(TableTitle)`
	margin-top: 30px;
	height: 30px;
`;

const UserOnDescPageTags = ({userUid, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const [user, setUser] = useState(null);
	const [data, setData] = useState([]);

	const [basicSelect, basicColumns] = useSelectColumn(
		tableColumns[tableKeys.users.summary.tabs.tags.basic],
	);

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.summary.tabs.tags.permissions.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.summary.tabs.tags.permissions.exclude],
	);
	const [selected, setSelected] = useState({});

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
				numberOfPermissions: 0,
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
		if (basicSelect.length) {
			basicSelect.forEach((tag) => {
				dispatch(
					IAM_USER_TAG.asyncAction.deleteAction({
						userUid,
						name: tag.name,
					}),
				);
			});
			setData(
				data.filter(
					(v) => !basicSelect.map((x) => x.name).includes(v.name),
				),
			);
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [data, dispatch, basicSelect, userUid]);

	useEffect(() => {
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
									numberOfPermissions: 0,
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

			<Table
				tableKey={tableKeys.users.summary.tabs.tags.basic}
				data={data}
				setData={setData}
				columns={basicColumns}
			/>

			{basicSelect.length === 1 && (
				<div>
					<_TableSpace>
						태그 [{basicSelect[0].name} : {basicSelect[0].value}
						]의 정책 :
						<TransparentButton margin='0px 0px 0px 5px'>
							연결 해제
						</TransparentButton>
					</_TableSpace>

					<Table
						tableKey={
							tableKeys.users.summary.tabs.tags.permissions
								.include
						}
						data={[]}
						columns={includeColumns}
					/>

					<_TableSpace>
						태그 [{basicSelect[0].name} : {basicSelect[0].value}
						]의 다른 정책 :
						<TitleBarButtons>
							<NormalButton>정책 생성</NormalButton>
							<NormalButton margin='0px 0px 0px 5px'>
								정책 연결
							</NormalButton>
						</TitleBarButtons>
					</_TableSpace>

					<Table
						tableKey={
							tableKeys.users.summary.tabs.tags.permissions
								.exclude
						}
						data={[]}
						columns={excludeColumns}
					/>
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
