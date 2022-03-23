import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import qs from 'qs';

import {TabContentSpace} from '../../../../../styles/components/iam/iamTab';
import PolicyPermissionTab from './Tabs/PolicyPermissionTab';
import PolicyRoleTab from './Tabs/PolicyRoleTab';
import PolicyTagTab from './Tabs/PolicyTagTab';

const PolicyTabContents = ({policyId}) => {
	const {search} = useLocation();
	const tab = useMemo(
		() => qs.parse(search, {ignoreQueryPrefix: true}).tabs,
		[search],
	);

	return (
		<TabContentSpace>
			{tab === 'permission' && (
				<PolicyPermissionTab policyId={policyId} />
			)}
			{tab === 'role' && <PolicyRoleTab policyId={policyId} />}
			{tab === 'tag' && <PolicyTagTab policyId={policyId} />}
		</TabContentSpace>
	);
};

PolicyTabContents.propTypes = {
	policyId: PropTypes.string.isRequired,
};
export default PolicyTabContents;
