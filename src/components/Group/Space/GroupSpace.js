import React from 'react';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';
import {Link} from 'react-router-dom';

const GroupSpace = () => {
	return (
		<_IamContainer>
			<_PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/group'>사용자 그룹</Link>
			</_PathContainer>
			<div>Group Space</div>
		</_IamContainer>
	);
};

export default GroupSpace;
