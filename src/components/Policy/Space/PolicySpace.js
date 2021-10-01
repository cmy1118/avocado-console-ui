import React from 'react';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import {Link} from 'react-router-dom';

const PolicySpace = () => {
	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policies'>정책</Link>
			</PathContainer>
			<div>Rolicy Space</div>
		</IamContainer>
	);
};

export default PolicySpace;
