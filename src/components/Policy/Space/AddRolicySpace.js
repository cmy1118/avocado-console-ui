import React from 'react';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';

const AddRolicySpace = () => {
	return (
		<IamContainer>
			<PathContainer>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policies'>정책</Link>
				<div>{' > '}</div>
				<Link to='/policies/add'>정책 추가</Link>
			</PathContainer>
			<div>Add Rolicy Space</div>
		</IamContainer>
	);
};

export default AddRolicySpace;
