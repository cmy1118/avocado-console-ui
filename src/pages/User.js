import React from 'react';
import PropTypes from 'prop-types';

import UserSpace from '../components/IAM/User/Space/UserSpace';
import AddUserSpace from '../components/IAM/User/Space/AddUserSpace';
import UserDescriptionSpace from '../components/IAM/User/Space/UserDescriptionSpace';

const User = ({match}) => {
	return match.path === '/users/add' ? (
		<AddUserSpace />
	) : match.params?.id ? (
		<UserDescriptionSpace userId={match.params.id} />
	) : (
		<UserSpace />
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
