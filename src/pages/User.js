import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import UserSpace from '../components/User/Space/UserSpace';
import AddUserSpace from '../components/User/Space/AddUserSpace';
import UserDescriptionSpace from '../components/User/Space/UserDescriptionSpace';

const User = ({match}) => {
	useEffect(() => {
		console.log(match.params);
	}, [match]);

	return (
		<>
			{match.path === '/users/add' ? (
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
