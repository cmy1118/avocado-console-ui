import React from 'react';
import {Link} from 'react-router-dom';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';

const AddRolicySpace = () => {
	return (
		<_IamContainer>
			<_PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policy'>정책</Link>
				<div>{' > '}</div>
				<Link to='/policy/add'>정책 추가</Link>
			</_PathContainer>
			<div>Add Rolicy Space</div>
		</_IamContainer>
	);
};

export default AddRolicySpace;
