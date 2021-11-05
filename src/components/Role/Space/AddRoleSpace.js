import React from 'react';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';

const AddRoleSpace = () => {
	return (
		<IamContainer>
			<PathContainer>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/roles'>역할</Link>
				<div>{' > '}</div>
				<Link to='/roles/add'>역할 추가</Link>
			</PathContainer>
			<div>Add Role Space</div>
		</IamContainer>
	);
};

export default AddRoleSpace;
