import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {IamContainer} from '../../../styles/components/style';
import {CurrentPathContainer} from '../../../styles/components/currentPath';

const PolicyDescriptionSpace = ({policyId}) => {
	return (
		<IamContainer>
			<CurrentPathContainer>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policies'>정책</Link>
				<div>{' > '}</div>
				<Link to={`/policies/${policyId}`}>{policyId}</Link>
			</CurrentPathContainer>

			<div>Rolicy Description Space</div>
		</IamContainer>
	);
};

PolicyDescriptionSpace.propTypes = {
	policyId: PropTypes.string.isRequired,
};

export default PolicyDescriptionSpace;
