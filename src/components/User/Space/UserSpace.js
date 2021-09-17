import React, {useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';

import Table from '../../Table/Table';
import {usersSelector} from '../../../reducers/users';

const UserSpace = () => {
	const history = useHistory();
	const {users} = useSelector(usersSelector.all);

	const onCLickLinkToAddUser = useCallback(() => {
		history.push('/user/add');
	}, [history]);

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/user'>사용자</Link>
			</PathContainer>

			<SubTitle>
				<div>사용자: {users.length}</div>
				<div>
					<button onClick={onCLickLinkToAddUser}>사용자 생성</button>
					<button>삭제</button>
				</div>
			</SubTitle>

			{/*/*******************************************************/}
			{/*  접근관리 설정에따른  Table 컴포넌트                         */}
			{/*/*******************************************************/}
			<Table tableKey='users' />
			{/*/*******************************************************/}
		</IamContainer>
	);
};
UserSpace.propTypes = {};
export default UserSpace;
