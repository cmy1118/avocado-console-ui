import React from 'react';

import PropTypes from 'prop-types';
import {
	TabContentSpace,
	TempTabContents,
} from '../../../../../styles/components/iam/iamTab';
import qs from 'qs';
import RolePolicyTab from './Tabs/RolePolicyTab';
import RoleUserTab from './Tabs/RoleUserTab';
import RoleGroupTab from './Tabs/RoleGroupTab';
import {useLocation} from 'react-router-dom';
import {HoverIconButton} from '../../../../../styles/components/icons';
import {cancelIcon, errorIcon} from '../../../../../icons/icons';
import TempTab from '../../../TempTab';

const RoleTabContents = ({
	roleId,
	isOpened,
	grantUser,
	setGrantUser,
	validRestrict,
}) => {
	const {search} = useLocation();
	console.log(
		'\tqs.parse(search, {ignoreQueryPrefix: true}).tabs\n:',
		qs.parse(search, {ignoreQueryPrefix: true}).tabs,
	);
	console.log('isOpenned:', isOpened);
	return (
		<TabContentSpace>
			{isOpened ? (
				<TempTab data={'역할'} />
			) : (
				<>
					{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
						'policy' && (
						<RolePolicyTab
							roleId={roleId}
							isSummaryOpened={isOpened}
						/>
					)}
					{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
						'user' && (
						<RoleUserTab
							roleId={roleId}
							isSummaryOpened={isOpened}
							grantUser={grantUser}
							setGrantUser={setGrantUser}
							validRestrict={validRestrict}
						/>
					)}
					{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
						'group' && (
						<RoleGroupTab
							roleId={roleId}
							isSummaryOpened={isOpened}
						/>
					)}
				</>
			)}
		</TabContentSpace>
	);
};

RoleTabContents.propTypes = {
	roleId: PropTypes.string.isRequired,
	isOpened: PropTypes.bool.isRequired,
	grantUser: PropTypes.number,
	setGrantUser: PropTypes.func.isRequired,
	validRestrict: PropTypes.string.isRequired,
};
export default RoleTabContents;
