import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {_IamContainer, _PathContainer} from '../../../styles/components/style';
import {usersSelector} from '../../../reducers/users';

const UserSpace = () => {
	const {users} = useSelector(usersSelector.all);

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
