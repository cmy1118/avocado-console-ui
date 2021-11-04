import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {useLocation} from 'react-router-dom';

import {
	AppBarNavi,
	IamContainer,
	PathContainer,
} from '../../../styles/components/style';
import {NaviLink} from '../../../styles/components/link';
import RoleSummary from '../Components/RoleSummary';
import TabBar from '../../Tab/TabBar';
import RolePolicyTab from '../Components/RolePolicyTab';
import RoleUserTab from '../Components/RoleUserTab';
import RoleGroupTab from '../Components/RoleGroupTab';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';

const RoleDescriptionSpace = ({roleId}) => {
	const {search} = useLocation();
	const {roles} = useSelector(IAM_ROLES.selector);
	const role = useMemo(() => roles.find((v) => v.id === roleId), [
		roles,
		roleId,
	]);

	const [isSumarryOpend, setIsSumarryOpend] = useState(true);

	const TabBarInfo = [
		{name: '권한', href: 'role'},
		{name: '사용자', href: 'user'},
		{name: '사용자 그룹', href: 'group'},
	];

	return (
		<IamContainer>
			<AppBarNavi>
				<PathContainer>
					<NaviLink to='/'>IAM</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/roles'>역할</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to={`/roles/${roleId}`}>{role?.name}</NaviLink>
				</PathContainer>
			</AppBarNavi>
			<RoleSummary roleId={roleId} />

			<div>
				<div className={isSumarryOpend ? 'tabBar fix' : 'tabBar'}>
					<TabBar
						Tabs={TabBarInfo}
						param={'roles'}
						Id={roleId}
						isOpened={isSumarryOpend}
						setIsOpened={setIsSumarryOpend}
					/>
				</div>
				{!isSumarryOpend && (
					<div style={{padding: '10px 16px'}}>
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'role' && <RolePolicyTab roleId={roleId} />}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'user' && <RoleUserTab roleId={roleId} />}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'group' && <RoleGroupTab roleId={roleId} />}
					</div>
				)}
			</div>
		</IamContainer>
	);
};

RoleDescriptionSpace.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RoleDescriptionSpace;
