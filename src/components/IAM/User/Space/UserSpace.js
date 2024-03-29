import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import {
	expiredConverter,
	groupsConverter,
	tagsConverter,
	totalNumberConverter,
} from '../../../../utils/tableDataConverter';
import Table from '../../../Table/Table';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {
	IamContainer,
	IamContents,
	IamSection,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import PAM_SESSION from '../../../../reducers/api/PAM/session';
import {RowDiv} from '../../../../styles/components/style';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';
import {IamSectionContents} from '../../../../styles/components/iam/addPage';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/users', label: '사용자'},
];

const UserSpace = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [users, setUsers] = useState([]);
	const {page, total} = useSelector(PAGINATION.selector);
	const [search, setSearch] = useState('');

	const [select, columns] = useSelectColumn(
		tableColumns[tableKeys.users.basic],
	);

	const userData = useMemo(() => {
		console.log(users);
		return (
			users?.map((v) => ({
				...v,
				groups: groupsConverter(v.groups || []),
				status: v.status.code,
				createdTime: v.createdTag.createdTime,
				passwordExpiryTime: expiredConverter(v.passwordExpiryTime),
				tags: tagsConverter(v.tags),
				authType:
					v?.attributes?.AlternativeAuthN === 'IdAndPassword'
						? 'ID/PWD'
						: '대체인증',
				MFA: v?.attributes?.MFA ? v.attributes.MFA : '없음',
				lastConsoleLogin: v.lastConsoleLogin,
				[DRAGGABLE_KEY]: v.userUid,
			})) || []
		);
	}, [users]);

	const onClickLinkToAddUserPage = useCallback(() => {
		history.push('/users/add');
	}, [history]);

	const onClickDeleteUsers = useCallback(() => {
		if (select.length) {
			select.forEach((v) => {
				dispatch(
					IAM_USER.asyncAction.deleteAction({
						userUid: v.userUid,
					}),
				);
			});
		}
	}, [dispatch, select]);

	const getUsersDetailApi = useCallback(
		(data) => {
			dispatch(
				PAM_SESSION.asyncAction.findSessionAction({
					userUids: data.map((v) => v.userUid),
				}),
			)
				.unwrap()
				.then((sessions) => {
					setUsers(
						data.map((v) => ({
							...v,
							lastConsoleLogin: sessions.data.find(
								(val) => v.userUid === val.userUid,
							).lastConsoleLoginTime,
						})),
					);
				});
		},
		[dispatch],
	);

	const getUsersApi = useCallback(
		async (search) => {
			if (page[tableKeys.users.basic]) {
				await dispatch(
					IAM_USER.asyncAction.findAllAction({
						range: page[tableKeys.users.basic],
						...(search && {keyword: search}),
					}),
				)
					.unwrap()
					.then(async (res) => {
						await dispatch(
							PAGINATION.action.setTotal({
								tableKey: tableKeys.users.basic,
								element: totalNumberConverter(
									res.headers['content-range'],
								),
							}),
						);
						res.data.length
							? getUsersDetailApi(res.data)
							: setUsers([]);
					})
					.catch(async (error) => {
						console.error('error:', error);
						await dispatch(
							PAGINATION.action.setTotal({
								tableKey: tableKeys.users.basic,
								element: 0,
							}),
						);
						setUsers([]);
					});
			}
		},
		[dispatch, getUsersDetailApi, page],
	);

	useEffect(() => {
		getUsersApi(search);
	}, [getUsersApi, page, search]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />
			<TitleBar>
				<RowDiv
					alignItems={'center'}
					width={'100%'}
					justifyContent={'space-between'}
				>
					<div>사용자 : {total[tableKeys.users.basic] || 0}</div>
					<TitleBarButtons>
						<NormalButton onClick={onClickLinkToAddUserPage}>
							사용자 생성
						</NormalButton>
						<TransparentButton
							margin={'0px 0px 0px 5px'}
							onClick={onClickDeleteUsers}
						>
							삭제
						</TransparentButton>
					</TitleBarButtons>
				</RowDiv>
			</TitleBar>

			<IamContents>
				<IamSection>
					<IamSectionContents>
						<Table
							tableKey={tableKeys.users.basic}
							columns={columns}
							data={userData}
							isPaginable
							isSearchable
							isSearchFilterable
							isColumnFilterable
							setSearch={setSearch}
						/>
					</IamSectionContents>
				</IamSection>
			</IamContents>
		</IamContainer>
	);
};

export default UserSpace;
