import React from 'react';
import PropTypes from 'prop-types';

import PolicySpace from '../components/IAM/Policy/Space/PolicySpace';
import AddPolicySpace from '../components/IAM/Policy/Space/AddPolicySpace';
import PolicyDescriptionSpace from '../components/IAM/Policy/Space/PolicyDescriptionSpace';

const Policy = ({match}) => {
	return (
		<>
			{match.path === '/policies/add' ? (
				<AddPolicySpace />
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
