import React from 'react';
import {IamContainer} from '../../../styles/components/style';
import {Link} from 'react-router-dom';
import {CurrentPathContainer} from '../../../styles/components/currentPath';

const PolicySpace = () => {
	return (
		<IamContainer>
			<CurrentPathContainer>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policies'>정책</Link>
			</CurrentPathContainer>

			<div>Policy Space</div>
		</IamContainer>
	);
};

export default PolicySpace;
