import React from 'react';
import {Link} from 'react-router-dom';
import {CurrentPathBar} from '../../../../styles/components/currentPathBar';
import {IamContainer} from '../../../../styles/components/iam/iam';

const AddRoleSpace = () => {
	return (
		<IamContainer>
			<CurrentPathBar>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/roles'>역할</Link>
				<div>{' > '}</div>
				<Link to='/roles/add'>역할 추가</Link>
			</CurrentPathBar>

			<div>Add Role Space</div>
		</IamContainer>
	);
};

export default AddRoleSpace;
