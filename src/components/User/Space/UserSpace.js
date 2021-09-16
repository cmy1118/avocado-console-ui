import React, {useCallback, useEffect, useMemo} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';

import Table from '../../Table/Table';
import styled from 'styled-components';
import {usersAction, usersSelector} from '../../../reducers/users';
import {usersColumns} from '../UserColumns';

const _Title = styled.div`
	display: flex;
	justify-content: space-between;
`;

const UserSpace = () => {
	const history = useHistory();
	const {users} = useSelector(usersSelector.all);
	const Users = useMemo(() => users, []);
	const UsersColumns = useMemo(() => usersColumns, []);

	const onCLickLinkToAddUser = useCallback(() => {
		history.push('/user/add');
	}, []);

	return (
		<_IamContainer>
			<_PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/user'>사용자</Link>
			</_PathContainer>

			<_Title>
				<div>사용자: {users.length}</div>
				<div>
					<button onClick={onCLickLinkToAddUser}>사용자 생성</button>
					<button>삭제</button>
				</div>
			</_Title>

			{/*/*******************************************************/}
			{/*  접근관리 설정에따른  Table 컴포넌트                         */}
			{/*/*******************************************************/}
			<Table columns={UsersColumns} data={Users} />
			{/*/*******************************************************/}
		</_IamContainer>
	);
};
UserSpace.propTypes = {};
export default UserSpace;
