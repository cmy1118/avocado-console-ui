import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {CurrentPathBar} from '../../../../styles/components/currentPathBar';
import {IamContainer} from '../../../../styles/components/iam/iam';

const PolicyDescriptionSpace = ({policyId}) => {
	return (
		<IamContainer>
			<CurrentPathBar>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policies'>정책</Link>
				<div>{' > '}</div>
				<Link to={`/policies/${policyId}`}>{policyId}</Link>
			</CurrentPathBar>

			<div>Rolicy Description Space</div>
		</IamContainer>
	);
};

PolicyDescriptionSpace.propTypes = {
	policyId: PropTypes.string.isRequired,
};

export default PolicyDescriptionSpace;
