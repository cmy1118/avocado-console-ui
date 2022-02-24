import React from 'react';

import DeviceAuth from './UserAuthTemplate/DeviceAuth';
import MFA from './UserAuthTemplate/MFA';
import FailOver from './UserAuthTemplate/FailOver';
import IdentityVerification from './UserAuthTemplate/IdentityVerification';

/**************************************************
 * ambacc244 - 사용자 인증 템플릿 컴포넌트
 **************************************************/
const UserAuthTemplate = () => {
	return (
		<div>
			<DeviceAuth />
			<MFA />
			<FailOver />
			<IdentityVerification />
		</div>
	);
};

export default UserAuthTemplate;
