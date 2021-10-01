import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';

const RoleDescriptionSpace = ({roleId}) => {
	return (
		<IamContainer>
			<div>
				<PathContainer>
					<Link to='/'>IAM</Link>
					<div>{' > '}</div>
					<Link to='/roles'>역할</Link>
					<div>{' > '}</div>
					<Link to={`/roles/${roleId}`}>{roleId}</Link>
				</PathContainer>
			</div>
			<div>Role Description Space</div>
		</IamContainer>
	);
};

RoleDescriptionSpace.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RoleDescriptionSpace;
