import React, {useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';

import {usersAction, usersSelector} from '../../../reducers/users';
import TableContainer from '../../Table/TableContainer';
import {currentTargetSelector} from '../../../reducers/currentTarget';

const UserSpace = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {users} = useSelector(usersSelector.all);
	const {currentTarget} = useSelector(currentTargetSelector.all);

	const onClickLinkToAddUserPage = useCallback(() => {
		history.push('/users/add');
	}, [history]);

	/******************************************/
	/* roberto : Table_update
    /******************************************/
	const onClickDeleteUsers = useCallback(() => {
		dispatch(usersAction.deleteUser({currentTarget}));
	}, [dispatch, currentTarget]);
	/******************************************/

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/users'>사용자</Link>
			</PathContainer>

			<SubTitle>
				<div>사용자: {users.length}</div>
				<div>
					<button onClick={onClickLinkToAddUserPage}>
						사용자 생성
					</button>
					<button onClick={onClickDeleteUsers}>삭제</button>
				</div>
			</SubTitle>

			{/*/*******************************************************/}
			{/*  roberto : Table_update 선택기능추가                      */}
			{/*  접근관리 설정에따른  TableContainer 컴포넌트                 */}
			{/*/*******************************************************/}
			{/*<Table tableKey='users' />*/}
			<TableContainer tableKey='users' />

			{/*/*******************************************************/}
		</IamContainer>
	);
};
UserSpace.propTypes = {};
export default UserSpace;
