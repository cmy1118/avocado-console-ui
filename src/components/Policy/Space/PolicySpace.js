import React from 'react';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';
import {Link} from 'react-router-dom';

const PolicySpace = () => {
	return (
		<_IamContainer>
			<_PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policy'>정책</Link>
			</_PathContainer>
			<div>Rolicy Space</div>
		</_IamContainer>
	);
};

export default PolicySpace;
