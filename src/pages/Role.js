import React from 'react';
import PropTypes from 'prop-types';

import RoleSpace from '../components/IAM/Role/Space/RoleSpace';
import RoleDescriptionSpace from '../components/IAM/Role/Space/RoleDescriptionSpace';
import CreateRoleSpace from '../components/IAM/Role/Space/CreateRoleSpace';

const Role = ({match}) => {
	return (
		<>
			{match.path === '/roles/add' ? (
				<CreateRoleSpace />
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
