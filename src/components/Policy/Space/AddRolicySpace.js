import React from 'react';
import {Link} from 'react-router-dom';
import {IamContainer} from '../../../styles/components/style';
import {CurrentPathContainer} from '../../../styles/components/currentPath';

const AddRolicySpace = () => {
	return (
		<IamContainer>
			<CurrentPathContainer>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policies'>정책</Link>
				<div>{' > '}</div>
				<Link to='/policies/add'>정책 추가</Link>
			</CurrentPathContainer>

			<div>Add Rolicy Space</div>
		</IamContainer>
	);
};

export default AddRolicySpace;
