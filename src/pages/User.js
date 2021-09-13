import React from 'react';
import PropTypes from 'prop-types';

import UserSpace from '../components/User/Space/UserSpace';
import AddUserSpace from '../components/User/Space/AddUserSpace';
import UserDescriptionSpace from '../components/User/Space/UserDescriptionSpace';
import IamLayout from '../components/Layouts/IamLayout';

const User = ({match}) => {
	return (
		<IamLayout>
			{match.path === '/user/add' ? (
				<AddUserSpace />
			) : match.params?.id ? (
				<UserDescriptionSpace userId={match.params.id} />
			) : (
				<UserSpace />
			)}
		</IamLayout>
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
