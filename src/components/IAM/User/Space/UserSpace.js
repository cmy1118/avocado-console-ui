import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import {
	descValues,
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
	CurrentPathBar,
	CurrentPathBarLink,
	NextPath,
} from '../../../../styles/components/currentPathBar';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import PAM_SESSION from '../../../../reducers/api/PAM/session';
import IAM_USER_POLICY from '../../../../reducers/api/IAM/User/Policy/policy';
import * as _ from 'lodash';
import {RowDiv} from '../../../../styles/components/style';

const UserSpace = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [users, setUsers] = useState([]);
	const {page, total} = useSelector(PAGINATION.selector);
	const [search, setSearch] = useState('');
	const [select, setSelect] = useState({});

	const userData = useMemo(() => {
		console.log(users);
		return (
			users?.map((v) => ({
				...v.user,
				groups: groupsConverter(v.user.groups || []),
				status: v.user.status.code,
				createdTime: v.user.createdTag.createdTime,
				passwordExpiryTime: expiredConverter(v.user.passwordExpiryTime),
				tags: tagsConverter(v.user.tags),
				authType:
					v.policies.find((v) => v.policyType === 'AlternativeAuthN')
						?.attributeName === 'Google'
						? '대체인증'
						: 'ID/PWD',
				MFA: v.policies.find((v) => v.policyType === 'MFA')
					? `${
							v.policies.find((v) => v.policyType === 'MFA')
								?.attributeName
					  } (${descValues(
							v.policies.find(
								(v) => v.policyType === 'IdentityVerification',
							)?.attributeName,
					  )})`
					: '없음',
				lastConsoleLogin: v.session.lastConsoleLoginTime,
				[DRAGGABLE_KEY]: v.user.userUid,
			})) || []
		);
	}, [users]);

	const onClickLinkToAddUserPage = useCallback(() => {
		history.push('/users/add');
	}, [history]);

	const onClickDeleteUsers = useCallback(() => {
		if (select[tableKeys.users.basic][0]) {
			select[tableKeys.users.basic].forEach((v) => {
				dispatch(
					IAM_USER.asyncAction.deleteAction({
						userUid: v.userUid,
					}),
				);
			});
		}
	}, [dispatch, select]);

	const getUsersDetailApi = useCallback(
		(res) => {
			const arr = [];
			dispatch(
				PAM_SESSION.asyncAction.findSessionAction({
					userUids: res.data.map((v) => v.userUid),
				}),
			)
				.unwrap()
				.then((sessions) => {
					res.data.forEach((sessionUser) => {
						dispatch(
							IAM_USER_POLICY.asyncAction.getsAction({
								userUid: sessionUser.userUid,
							}),
						)
							.unwrap()
							.then((policy) => {
								arr.push({
									user: sessionUser,
									session: sessions.data.find(
										(session) =>
											sessionUser.userUid ===
											session.userUid,
									),
									policies: _.uniqBy(
										_.flatten(
											_.flatten(
												policy.map(
													(v) => v.policyTemplates,
												),
											).map((x) => x.details),
										),
										'policyType',
									),
								});
								if (arr.length === res.data.length) {
									setUsers(arr);
								}
							});
					});
				});
		},
		[dispatch],
	);

	const getUsersApi = useCallback(
		(search) => {
			if (page[tableKeys.users.basic]) {
				dispatch(
					IAM_USER.asyncAction.findAllAction({
						range: page[tableKeys.users.basic],
						...(search && {keyword: search}),
					}),
				)
					.unwrap()
					.then((res) => {
						dispatch(
							PAGINATION.action.setTotal({
								tableKey: tableKeys.users.basic,
								element: totalNumberConverter(
									res.headers['content-range'],
								),
							}),
						);
						res.data.length ? getUsersDetailApi(res) : setUsers([]);
					})
					.catch((error) => {
						console.error('error:', error);
						dispatch(
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
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM </CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/users'>사용자 </CurrentPathBarLink>
			</CurrentPathBar>

			<TitleBar>
				<RowDiv width={'100%'} justifyContent={'space-between'}>
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

			<Table
				tableKey={tableKeys.users.basic}
				columns={tableColumns[tableKeys.users.basic]}
				data={userData}
				isPaginable
				isSearchable
				isSearchFilterable
				isColumnFilterable
				setSearch={setSearch}
			/>
		</IamContainer>
	);
};

export default UserSpace;
