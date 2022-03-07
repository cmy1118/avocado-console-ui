import React from 'react';
import UserIdPattern from './UserAccountPatternTemplate/UserIdPattern';
import PaswordPattern from './UserAccountPatternTemplate/PaswordPattern';

/**************************************************
 * ambacc244 - 사용자 계정 패턴 컴포넌트
 **************************************************/
const UserAccountPatternTemplate = () => {
	return (
		<div>
			<UserIdPattern />
			<PaswordPattern />
		</div>
	);
};

export default UserAccountPatternTemplate;
