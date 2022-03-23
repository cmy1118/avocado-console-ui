import React, {useState} from 'react';

import PropTypes from 'prop-types';
import TabBar from '../../../TabBar';
import {
	TabContainer,
	TabContentSpace,
} from '../../../../../styles/components/iam/iamTab';
import qs from 'qs';
import RolePolicyTab from './Tabs/RolePolicyTab';
import RoleUserTab from './Tabs/RoleUserTab';
import RoleGroupTab from './Tabs/RoleGroupTab';
import {useLocation} from 'react-router-dom';
import {FOLD_DATA} from '../../../../../utils/data';

const RoleTabContents = ({roleId, isOpened}) => {
	const {search} = useLocation();
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	return (
		<TabContentSpace>
			{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'role' && (
				<RolePolicyTab
					roleId={roleId}
					space={'RolePolicyTab'}
					isFold={isTableFold}
					setIsFold={setIsTableFold}
					isSummaryOpened={isOpened}
				/>
			)}
			{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'user' && (
				<RoleUserTab
					roleId={roleId}
					space={'RoleUserTab'}
					isFold={isTableFold}
					setIsFold={setIsTableFold}
					isSummaryOpened={isOpened}
				/>
			)}
			{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'group' && (
				<RoleGroupTab
					roleId={roleId}
					space={'RoleGroupTab'}
					isFold={isTableFold}
					setIsFold={setIsTableFold}
					isSummaryOpened={isOpened}
				/>
			)}
		</TabContentSpace>
	);
};

RoleTabContents.propTypes = {
	roleId: PropTypes.string.isRequired,
	isOpened: PropTypes.bool.isRequired,
};
export default RoleTabContents;
