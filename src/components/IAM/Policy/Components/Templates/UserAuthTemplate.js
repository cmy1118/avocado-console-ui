import React from 'react';

import DeviceAuth from './UserAuthTemplate/DeviceAuth';
import MFA from './UserAuthTemplate/MFA';
import FailOver from './UserAuthTemplate/FailOver';
import IdentityVerification from './UserAuthTemplate/IdentityVerification';
import PropTypes from 'prop-types';

/**************************************************
 * ambacc244 - 사용자 인증 템플릿 컴포넌트
 **************************************************/
const UserAuthTemplate = ({templateId}) => {
	return (
		<div>
			<DeviceAuth />
			<MFA />
			<FailOver />
			<IdentityVerification />
		</div>
	);
};

UserAuthTemplate.propTypes = {
	templateId: PropTypes.string,
};

export default UserAuthTemplate;
