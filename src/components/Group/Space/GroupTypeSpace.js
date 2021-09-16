import React from 'react';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';
import {Link} from 'react-router-dom';

const GroupTypeSpace = () => {
	return (
		<_IamContainer>
			<_PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/group'>사용자 그룹</Link>
				<div>{' > '}</div>
				<Link to='/group/type'>사용자 유형 관리</Link>
			</_PathContainer>
			<div>그룹 유형관리</div>
		</_IamContainer>
	);
};

export default GroupTypeSpace;
