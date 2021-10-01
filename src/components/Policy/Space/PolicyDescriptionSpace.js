import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';

const PolicyDescriptionSpace = ({policyId}) => {
	return (
		<IamContainer>
			<div>
				<PathContainer>
					<Link to='/'>IAM</Link>
					<div>{' > '}</div>
					<Link to='/policies'>정책</Link>
					<div>{' > '}</div>
					<Link to={`/policies/${policyId}`}>{policyId}</Link>
				</PathContainer>
			</div>
			<div>Rolicy Description Space</div>
		</IamContainer>
	);
};

PolicyDescriptionSpace.propTypes = {
	policyId: PropTypes.string.isRequired,
};

export default PolicyDescriptionSpace;
