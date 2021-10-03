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

	const onCLickLinkToAddUser = useCallback(() => {
		history.push('/user/add');
	}, [history]);

	/******************************************/
	/* roberto : Table_update
    /******************************************/
	const onCLickLinkToDeleteUser = useCallback(() => {
		dispatch(usersAction.deleteUser({currentTarget}));
	}, [dispatch, currentTarget]);
	/******************************************/

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
					<button onClick={onCLickLinkToDeleteUser}>삭제</button>
				</div>
			</SubTitle>
			<TableContainer tableKey='users' />
		</IamContainer>
	);
};
UserSpace.propTypes = {};
export default UserSpace;
