import React from 'react';
import PropTypes from 'prop-types';

import UserSpace from '../components/IAM/User/Space/UserSpace';
import CreateUserSpace from '../components/IAM/User/Space/CreateUserSpace';
import UserDescriptionSpace from '../components/IAM/User/Space/UserDescriptionSpace';

const User = ({match}) => {
	return match.path === '/users/add' ? (
		<CreateUserSpace />
	) : match.params?.id ? (
		<UserDescriptionSpace userUid={match.params.id} />
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
