import React from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import qs from 'qs';

import {TabContentSpace} from '../../../../../styles/components/iam/iamTab';
import PolicyPermissionTab from './Tabs/PolicyPermissionTab';
import PolicyRoleTab from './Tabs/PolicyRoleTab';
import PolicyTagTab from './Tabs/PolicyTagTab';

const PolicyTabContents = ({policyId}) => {
	const {search} = useLocation();

	return (
		<TabContentSpace>
			{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
				'permission' && <PolicyPermissionTab policyId={policyId} />}
			{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'role' && (
				<PolicyRoleTab policyId={policyId} />
			)}
			{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'tag' && (
				<PolicyTagTab policyId={policyId} />
			)}
		</TabContentSpace>
	);
};

PolicyTabContents.propTypes = {
	policyId: PropTypes.string.isRequired,
};
export default PolicyTabContents;
