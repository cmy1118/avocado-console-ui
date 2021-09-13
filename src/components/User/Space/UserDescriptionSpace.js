import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';

const UserDescriptionSpace = ({userId}) => {
	return (
		<_IamContainer>
			<div>
				<_PathContainer>
					<Link to='/'>IAM</Link>
					<div>{' > '}</div>
					<Link to='/user'>사용자</Link>
					<div>{' > '}</div>
					<Link to={`/user/${userId}`}>{userId}</Link>
				</_PathContainer>
			</div>
			<div> Description Space</div>
		</_IamContainer>
	);
};

UserDescriptionSpace.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserDescriptionSpace;
