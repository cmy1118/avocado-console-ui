import React from 'react';
import PropTypes from 'prop-types';

import RoleSpace from '../components/Role/Space/RoleSpace';
import RoleDescriptionSpace from '../components/Role/Space/RoleDescriptionSpace';
import AddRoleSpace from '../components/Role/Space/AddRoleSpace';

const Role = ({match}) => {
	return (
		<>
			{match.path === '/role/add' ? (
				<AddRoleSpace />
			) : match.params?.id ? (
				<RoleDescriptionSpace roleId={match.params.id} />
			) : (
				<RoleSpace />
			)}
		</>
	);
};

Role.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string.isRequired,
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
};

export default Role;
