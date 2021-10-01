import React from 'react';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import {Link} from 'react-router-dom';

const RoleSpace = () => {
	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/roles'>역할</Link>
			</PathContainer>
			<div>Role Space</div>
		</IamContainer>
	);
};

export default RoleSpace;
