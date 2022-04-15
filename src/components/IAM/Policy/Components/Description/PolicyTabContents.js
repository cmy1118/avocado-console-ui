import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import qs from 'qs';

import {TabContentSpace} from '../../../../../styles/components/iam/iamTab';
import PolicyDetailTab from './Tabs/PolicyDetailTab';
import PolicyRoleTab from './Tabs/PolicyRoleTab';
import PolicyTagTab from './Tabs/PolicyTagTab';
import {policyTabs} from '../../../../../utils/tabs';
import TempTab from '../../../TempTab';

const PolicyTabContents = ({policyId, isOpened}) => {
	const {search} = useLocation();
	const tab = useMemo(
		() => qs.parse(search, {ignoreQueryPrefix: true}).tabs,
		[search],
	);

	return (
		<TabContentSpace>
			{isOpened ? (
				<TempTab data={'정책'} />
			) : (
				<>
					{tab === policyTabs.detail && (
						<PolicyDetailTab policyId={policyId} />
					)}
					{tab === policyTabs.role && (
						<PolicyRoleTab policyId={policyId} />
					)}
					{tab === policyTabs.tag && (
						<PolicyTagTab policyId={policyId} />
					)}
				</>
			)}
		</TabContentSpace>
	);
};

PolicyTabContents.propTypes = {
	policyId: PropTypes.string.isRequired,
	isOpened: PropTypes.bool,
};
export default PolicyTabContents;
