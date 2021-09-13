import React from 'react';
import {Link} from 'react-router-dom';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';

const AddRoleSpace = () => {
	return (
		<_IamContainer>
			<_PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/role'>역할</Link>
				<div>{' > '}</div>
				<Link to='/role/add'>역할 추가</Link>
			</_PathContainer>
			<div>Add Role Space</div>
		</_IamContainer>
	);
};

export default AddRoleSpace;
