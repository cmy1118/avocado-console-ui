import React from 'react';
import {Link} from 'react-router-dom';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';

const AddGroupSpace = () => {
	return (
		<_IamContainer>
			<_PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/group'>사용자 그룹</Link>
				<div>{' > '}</div>
				<Link to='/group/add'>사용자 그룹 추가</Link>
			</_PathContainer>
			<div>Add Group Space</div>
		</_IamContainer>
	);
};

export default AddGroupSpace;
