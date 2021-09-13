import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';

const RoleDescriptionSpace = ({roleId}) => {
	return (
		<_IamContainer>
			<div>
				<_PathContainer>
					<Link to='/'>IAM</Link>
					<div>{' > '}</div>
					<Link to='/role'>역할</Link>
					<div>{' > '}</div>
					<Link to={`/role/${roleId}`}>{roleId}</Link>
				</_PathContainer>
			</div>
			<div>Role Description Space</div>
		</_IamContainer>
	);
};

RoleDescriptionSpace.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RoleDescriptionSpace;
