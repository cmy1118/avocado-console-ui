import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {_IamContainer, _PathContainer} from '../../../styles/components/style';
import {usersAction, usersSelector} from '../../../reducers/users';

const UserSpace = () => {
	const dispatch = useDispatch();
	const {users} = useSelector(usersSelector.all);

	// useEffect(() => {
	// 	dispatch(usersAction.loadUsers());
	// }, []);
	//
	// useEffect(() => {
	// 	console.log(users);
	// }, [users]);
	return (
		<_IamContainer>
			<_PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/user'>사용자</Link>
			</_PathContainer>
			<div>User Space</div>
		</_IamContainer>
	);
};

export default UserSpace;
