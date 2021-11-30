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
	CurrentPathBar,
	CurrentPathBarLink,
	NextPath,
} from '../../../../styles/components/currentPathBar';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import TableContainer from '../../../Table/TableContainer';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import PAM_SESSION from '../../../../reducers/api/PAM/session';

const UserSpace = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [users, setUsers] = useState([]);
	const [total, setTotal] = useState(0);
	const {page} = useSelector(PAGINATION.selector);
	const [select, setSelect] = useState({});

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
				[DRAGGABLE_KEY]: v.userUid,
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

	useEffect(() => {
		if (page[tableKeys.users.basic]) {
			dispatch(
				IAM_USER.asyncAction.findAllAction({
					range: page[tableKeys.users.basic],
				}),
			)
				.unwrap()
				.then((users) => {
					console.log(users);
					setTotal(
						totalNumberConverter(users.headers['content-range']),
					);
					dispatch(
						PAM_SESSION.asyncAction.findSessionAction({
							userUids: users.data.map((v) => v.userUid),
						}),
					)
						.unwrap()
						.then((users) => {
							console.log(users);
						});
				});
		}
	}, [dispatch, page]);

	return (
		<IamContainer>
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM </CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/users'>사용자 </CurrentPathBarLink>
			</CurrentPathBar>

			<TitleBar>
				<div>사용자 : {total}</div>
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
			</TitleBar>

			<TableContainer
				tableKey={tableKeys.users.basic}
				columns={tableColumns[tableKeys.users.basic]}
				data={userData}
			>
				<TableOptionsBar isSearchFilterable />
				<Table setSelect={setSelect} />
			</TableContainer>
		</IamContainer>
	);
};

export default UserSpace;
