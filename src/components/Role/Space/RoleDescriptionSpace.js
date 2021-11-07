import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {useLocation} from 'react-router-dom';

import {
	AppBarButtons, AppBarContentsHeader,
	AppBarNavi, DetailContainer,
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
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {IconButton} from "../../../styles/components/icons";
import {arrowDownIcon, arrowUpIcon} from "../../../icons/icons";
import {TransparentButton} from "../../../styles/components/buttons";
import {FOLD_DATA} from "../../../utils/data";

const RoleDescriptionSpace = ({roleId}) => {
	const {search} = useLocation();
	const {roles} = useSelector(IAM_ROLES.selector);
	const role = useMemo(() => roles.find((v) => v.id === roleId), [
		roles,
		roleId,
	]);

	const [isSummaryOpened, setIsSummaryOpened] = useState(true);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);


	const onClickFoldSummary = useCallback(() => {
		setIsSummaryOpened(!isSummaryOpened);
	}, [isSummaryOpened]);
	const TabBarInfo = [
		{name: '권한', href: 'role'},
		{name: '사용자', href: 'user'},
		{name: '사용자 그룹', href: 'group'},
	];

	return (
		<DetailContainer>
			<AppBarNavi>
				<PathContainer>
					<NaviLink to='/iam'>IAM</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/roles'>역할</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to={`/roles/${roleId}`}>{role?.name}</NaviLink>
				</PathContainer>
			</AppBarNavi>

			<AppBarContentsHeader>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<IconButton
						color={'font'}
						size={'m'}
						margin={'0px'}
						onClick={onClickFoldSummary}
					>
						{isSummaryOpened ? arrowDownIcon : arrowUpIcon}
					</IconButton>
					요약 [ {role?.id} ]
				</div>
				<AppBarButtons>
					<TransparentButton>삭제</TransparentButton>
				</AppBarButtons>
			</AppBarContentsHeader>


			{isSummaryOpened && (
			<RoleSummary roleId={roleId}
						 isOpened={isSummaryOpened}
						 setIsOpened={setIsSummaryOpened}/>)
			}


			<div>
				<div className={isSummaryOpened ? 'tabBar fix' : 'tabBar'}>
					<TabBar
						Tabs={TabBarInfo}
						param={'roles'}
						Id={roleId}
						isOpened={isSummaryOpened}
						setIsOpened={setIsSummaryOpened}
					/>
				</div>
				{!isSummaryOpened && (
					<div style={{padding: '10px 16px'}}>
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'role' && <RolePolicyTab roleId={roleId}
						space={'RolePolicyTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}/>}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'user' && <RoleUserTab roleId={roleId}
						space={'RoleUserTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}/>}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'group' && <RoleGroupTab roleId={roleId}
						space={'RoleGroupTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}/>}
					</div>
				)}
			</div>
		</DetailContainer>
	);
};

RoleDescriptionSpace.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RoleDescriptionSpace;
