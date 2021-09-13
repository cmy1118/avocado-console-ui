import React from 'react';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';
import {Link} from 'react-router-dom';

const RoleSpace = () => {
	return (
		<_IamContainer>
			<_PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/role'>역할</Link>
			</_PathContainer>
			<div>Role Space</div>
		</_IamContainer>
	);
};

export default RoleSpace;
