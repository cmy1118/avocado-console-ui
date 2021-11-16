import React from 'react';
import {Link} from 'react-router-dom';
import {CurrentPathBar} from '../../../../styles/components/currentPathBar';
import {IamContainer} from '../../../../styles/components/iam/iam';

const PolicySpace = () => {
	return (
		<IamContainer>
			<CurrentPathBar>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policies'>정책</Link>
			</CurrentPathBar>

			<div>Policy Space</div>
		</IamContainer>
	);
};

export default PolicySpace;
