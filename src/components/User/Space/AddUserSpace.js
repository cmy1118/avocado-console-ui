import React from 'react';
import {Link} from 'react-router-dom';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';

const AddUserSpace = () => {
	return (
		<_IamContainer>
			<_PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/user'>사용자</Link>
				<div>{' > '}</div>
				<Link to='/user/add'>사용자 추가</Link>
			</_PathContainer>
			<div>Add User Space</div>
		</_IamContainer>
	);
};

export default AddUserSpace;
