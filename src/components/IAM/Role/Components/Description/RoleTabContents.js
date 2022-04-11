import React from 'react';

import PropTypes from 'prop-types';
import {TabContentSpace} from '../../../../../styles/components/iam/iamTab';
import qs from 'qs';
import RolePolicyTab from './Tabs/RolePolicyTab';
import RoleUserTab from './Tabs/RoleUserTab';
import RoleGroupTab from './Tabs/RoleGroupTab';
import {useLocation} from 'react-router-dom';

const RoleTabContents = ({roleId, isOpened}) => {
	const {search} = useLocation();

	return (
		<TabContentSpace>
			{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'policy' && (
				<RolePolicyTab roleId={roleId} isSummaryOpened={isOpened} />
			)}
			{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'user' && (
				<RoleUserTab roleId={roleId} isSummaryOpened={isOpened} />
			)}
			{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'group' && (
				<RoleGroupTab roleId={roleId} isSummaryOpened={isOpened} />
			)}
		</TabContentSpace>
	);
};

RoleTabContents.propTypes = {
	roleId: PropTypes.string.isRequired,
	isOpened: PropTypes.bool.isRequired,
};
export default RoleTabContents;
