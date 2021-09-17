import React from 'react';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';

const AddRolicySpace = () => {
	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policy'>정책</Link>
				<div>{' > '}</div>
				<Link to='/policy/add'>정책 추가</Link>
			</PathContainer>
			<div>Add Rolicy Space</div>
		</IamContainer>
	);
};

export default AddRolicySpace;
