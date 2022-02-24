import React from 'react';
import LoginFailure from './UserAccountProcessTemplate/LoginFailure';
import Dormant from './UserAccountProcessTemplate/Dormant';
import AccountActivePeriod from './UserAccountProcessTemplate/AccountActivePeriod';
import PasswordValidityPeriod from './UserAccountProcessTemplate/PasswordValidityPeriod';
import ChangeGroup from './UserAccountProcessTemplate/ChangeGroup';
import Resignation from './UserAccountProcessTemplate/Resignation';

/**************************************************
 * ambacc244 - 사용자 계정 처리 컴포넌트
 **************************************************/
const UserAccountProcessTemplate = () => {
	return (
		<div>
			<LoginFailure />
			<Dormant />
			<AccountActivePeriod />
			<PasswordValidityPeriod />
			<ChangeGroup />
			<Resignation />
		</div>
	);
};
export default UserAccountProcessTemplate;
