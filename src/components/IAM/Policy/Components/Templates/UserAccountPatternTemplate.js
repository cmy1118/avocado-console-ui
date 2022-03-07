import React from 'react';
import UserIdPattern from './UserAccountPatternTemplate/UserIdPattern';
import PaswordPattern from './UserAccountPatternTemplate/PaswordPattern';
import PropTypes from 'prop-types';

/**************************************************
 * ambacc244 - 사용자 계정 패턴 컴포넌트
 **************************************************/
const UserAccountPatternTemplate = ({templateId}) => {
	return (
		<div>
			<UserIdPattern />
			<PaswordPattern />
		</div>
	);
};

UserAccountPatternTemplate.propTypes = {
	templateId: PropTypes.string,
};

export default UserAccountPatternTemplate;
