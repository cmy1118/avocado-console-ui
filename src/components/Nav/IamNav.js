import React from 'react';
import {_NavContainer} from '../../styles/components/style';
import {Link} from 'react-router-dom';

const IamNav = () => {
	return (
		<_NavContainer>
			<div>대시보드</div>
			<Link to='/user'>사용자</Link>
			<Link to='/group'>사용자 그룹</Link>
			<Link to='/role'>역할</Link>
			<Link to='/policy'>정책</Link>
		</_NavContainer>
	);
};

export default IamNav;
