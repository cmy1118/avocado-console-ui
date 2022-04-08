import React from 'react';
import PropTypes from 'prop-types';

import PolicySpace from '../components/IAM/Policy/Space/PolicySpace';
import CreatePolicySpace from '../components/IAM/Policy/Space/CreatePolicySpace';
import PolicyDescriptionSpace from '../components/IAM/Policy/Space/PolicyDescriptionSpace';

const Policy = ({match}) => {
	return (
		<>
			{match.path === '/policies/add' ? (
				<CreatePolicySpace />
			) : match.params?.id && match.params?.type ? (
				<PolicyDescriptionSpace
					policyId={match.params.id}
					type={match.params.type}
				/>
			) : (
				match.path === '/policies' && <PolicySpace />
			)}
		</>
	);
};

Policy.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string.isRequired,
		params: PropTypes.shape({
			type: PropTypes.string,
			id: PropTypes.string,
		}),
	}),
};
export default Policy;
