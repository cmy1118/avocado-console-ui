import React from 'react';
import PropTypes from 'prop-types';

import PolicySpace from '../components/Policy/Space/PolicySpace';
import AddRolicySpace from '../components/Policy/Space/AddRolicySpace';
import PolicyDescriptionSpace from '../components/Policy/Space/PolicyDescriptionSpace';

const Policy = ({match}) => {
	return (
		<>
			{match.path === '/policies/add' ? (
				<AddRolicySpace />
			) : match.params?.id ? (
				<PolicyDescriptionSpace policyId={match.params.id} />
			) : (
				<PolicySpace />
			)}
		</>
	);
};

Policy.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string.isRequired,
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
};
export default Policy;
