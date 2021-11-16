import React from 'react';
import {Link} from 'react-router-dom';
import {CurrentPathBar} from '../../../../styles/components/currentPathBar';
import {IamContainer} from '../../../../styles/components/iam/iam';

const AddRolicySpace = () => {
	return (
		<IamContainer>
			<CurrentPathBar>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policies'>정책</Link>
				<div>{' > '}</div>
				<Link to='/policies/add'>정책 추가</Link>
			</CurrentPathBar>

			<div>Add Rolicy Space</div>
		</IamContainer>
	);
};

export default AddRolicySpace;
