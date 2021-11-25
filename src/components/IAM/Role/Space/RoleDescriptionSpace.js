import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {useHistory, useLocation} from 'react-router-dom';
import {
	CurrentPathBarLink,
	CurrentPathBar,
	NextPath,
} from '../../../../styles/components/currentPathBar';
import RoleSummary from '../Components/RoleSummary';
import TabBar from '../../TabBar';
import RolePolicyTab from '../Components/Tabs/RolePolicyTab';
import RoleUserTab from '../Components/Tabs/RoleUserTab';
import RoleGroupTab from '../Components/Tabs/RoleGroupTab';
import {useDispatch, useSelector} from 'react-redux';
// import RolePolicyTab from '../Components/Tabs/RolePolicyTab';
// import RoleUserTab from '../Components/Tabs/RoleUserTab';
// import RoleGroupTab from '../Components/Tabs/RoleGroupTab';
// import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import {HoverIconButton, IconButton} from '../../../../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {FOLD_DATA} from '../../../../utils/data';
import {LiText} from '../../../../styles/components/text';

import {
	CoveredByTabContent,
	TabContainer,
	TabContentSpace,
} from '../../../../styles/components/iam/iamTab';
import user from '../../../../reducers/api/IAM/User/User/user';
import {
	DescriptionPageContainer,
	SummaryList,
} from '../../../../styles/components/iam/descriptionPage';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../styles/components/iam/iam';
import {tableKeys} from '../../../../Constants/Table/keys';
import PAGINATION from '../../../../reducers/pagination';

const RoleDescriptionSpace = ({roleId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {search} = useLocation();
	const {page} = useSelector(PAGINATION.selector);

	const {roles} = useSelector(IAM_ROLES.selector);
	console.log('!!!', roles, roleId);
	const role = useMemo(() => roles.find((v) => v.id === roleId), [
		roles,
		roleId,
	]);
	const [isSummaryOpened, setIsSummaryOpened] = useState(true);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	// const onClickFoldSummary = useCallback(() => {
	// 	setIsSummaryOpened(!isSummaryOpened);
	// }, [isSummaryOpened]);

	const onClickFoldSummary = useCallback(() => {
		setIsSummaryOpened(!isSummaryOpened);
		if (isSummaryOpened) {
			history.push({
				pathname: `/roles/${roleId}`,
				search: 'tabs=role',
			});
		} else {
			history.push({
				pathname: `/roles/${roleId}`,
			});
		}
	}, [history, isSummaryOpened, roleId]);

	const TabBarInfo = [
		{name: '권한', href: 'role'},
		{name: '사용자', href: 'user'},
		{name: '사용자 그룹', href: 'group'},
	];

	const onClickLinkToAddRolePage = useCallback(() => {
		history.push('/roles/add');
	}, [history]);

	useEffect(() => {
		if (roleId && !role) {
			history.push('/404');
		}
		history.push(`${roleId}`);
	}, [roleId, role, history]);

	useEffect(() => {
		if (page[tableKeys.roles.basic]) {
			dispatch(
				IAM_ROLES.asyncAction.getsAction({
					range: page[tableKeys.roles.basic],
				}),
			);
		}
	}, [dispatch, page]);
	return (
		<IamContainer>
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/roles'>역할</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to={`/roles/${roleId}`}>
					{role?.name}
				</CurrentPathBarLink>
			</CurrentPathBar>
			<DescriptionPageContainer>
				<div>
					<TitleBar>
						<TitleBarText>
							<HoverIconButton
								color={'font'}
								size={'m'}
								margin={'0px'}
								onClick={onClickFoldSummary}
							>
								{isSummaryOpened ? arrowDownIcon : arrowUpIcon}
							</HoverIconButton>
							요약 [ {role?.name} ]
						</TitleBarText>
						<TitleBarButtons>
							<NormalButton onClick={onClickLinkToAddRolePage}>
								역할 만들기
							</NormalButton>
							<TransparentButton margin={'0px 0px 0px 5px'}>
								삭제
							</TransparentButton>
						</TitleBarButtons>
					</TitleBar>

					<SummaryList>
						<LiText>역할 이름 : {role?.name}</LiText>
						<LiText>역할 유형 : {role?.type}</LiText>
						<LiText>역할 설명 : {role?.description}</LiText>
						<LiText>생성 일시 : {role?.createdTime}</LiText>
						<LiText>
							마지막 작업 일시 : 2021.09.21. 16:05:18{' '}
						</LiText>
						<LiText>마지막 활동 : 사용자 접근정책 변경</LiText>
						<LiText>마지막 활동 사용자 : 김영우 (kyoung634)</LiText>
					</SummaryList>
				</div>
				<CoveredByTabContent isOpened={isSummaryOpened}>
					<RoleSummary
						Id={roleId}
						param={'roles'}
						setIsOpened={setIsSummaryOpened}
					/>
				</CoveredByTabContent>

				<TabContainer isOpened={!isSummaryOpened}>
					<TabBar
						Tabs={TabBarInfo}
						param={'roles'}
						id={roleId}
						isOpened={isSummaryOpened}
						setIsOpened={setIsSummaryOpened}
					/>
					<TabContentSpace>
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'role' && (
							<RolePolicyTab
								roleId={roleId}
								space={'RolePolicyTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
							/>
						)}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'user' && (
							<RoleUserTab
								roleId={roleId}
								space={'RoleUserTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
							/>
						)}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'group' && (
							<RoleGroupTab
								roleId={roleId}
								space={'RoleGroupTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
							/>
						)}
					</TabContentSpace>
				</TabContainer>
			</DescriptionPageContainer>
		</IamContainer>
	);
};

RoleDescriptionSpace.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RoleDescriptionSpace;
