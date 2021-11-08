import React from 'react';
import {Link} from 'react-router-dom';
import {IamContainer} from '../../../styles/components/style';
import {CurrentPathContainer} from '../../../styles/components/currentPath';

const AddRoleSpace = () => {
	return (
		<IamContainer>
			<CurrentPathContainer>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/roles'>역할</Link>
				<div>{' > '}</div>
				<Link to='/roles/add'>역할 추가</Link>
			</CurrentPathContainer>

			<div>Add Role Space</div>
		</IamContainer>
	);
};

export default AddRoleSpace;
