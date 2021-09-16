import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import UserSpace from '../components/User/Space/UserSpace';
import AddUserSpace from '../components/User/Space/AddUserSpace';
import UserDescriptionSpace from '../components/User/Space/UserDescriptionSpace';

import {useDispatch, useSelector} from 'react-redux';
import {usersAction, usersSelector} from '../reducers/users';

const User = ({match}) => {
	const dispatch = useDispatch();

	return (
		<>
			{match.path === '/user/add' ? (
				<AddUserSpace />
			) : match.params?.id ? (
				<UserDescriptionSpace userId={match.params.id} />
			) : (
				<UserSpace />
			)}
		</>
	);
};

User.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string.isRequired,
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
};

export default User;
