import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';

const PolicyDescriptionSpace = ({policyId}) => {
	return (
		<_IamContainer>
			<div>
				<_PathContainer>
					<Link to='/'>IAM</Link>
					<div>{' > '}</div>
					<Link to='/policy'>정책</Link>
					<div>{' > '}</div>
					<Link to={`/policy/${policyId}`}>{policyId}</Link>
				</_PathContainer>
			</div>
			<div>Rolicy Description Space</div>
		</_IamContainer>
	);
};

PolicyDescriptionSpace.propTypes = {
	policyId: PropTypes.string.isRequired,
};

export default PolicyDescriptionSpace;
