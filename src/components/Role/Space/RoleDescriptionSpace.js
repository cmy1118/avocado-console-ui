import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {useHistory, useLocation} from 'react-router-dom';
import {
	AppBarLink,
	CurrentPathContainer,
	NextPath,
} from '../../../styles/components/currentPath';
import RoleSummary from '../Components/RoleSummary';
import TabBar from '../../Tab/TabBar';
import RolePolicyTab from '../Components/RolePolicyTab';
import RoleUserTab from '../Components/RoleUserTab';
import RoleGroupTab from '../Components/RoleGroupTab';
import {useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {HoverIconButton, IconButton} from '../../../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import {FOLD_DATA} from '../../../utils/data';
import {LiText} from '../../../styles/components/text';
import {
	AppBarButtons,
	SubHeader,
	SubHeaderText,
	SummaryList,
} from '../../../styles/components/style';
import styled from 'styled-components';
import {
	CoveredContent,
	DescriptionPageContainer,
	TabContainer,
	TabContents,
	VisibleContent,
} from '../../../styles/components/tab';
import user from '../../../reducers/api/IAM/User/User/user';

const RoleDescriptionSpace = ({roleId}) => {
	const history = useHistory();
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

	const onClickLinkToAddRolePage = useCallback(() => {
		history.push('/roles/add');
	}, []);
	useEffect(() => {
		if (roleId && !role) {
			history.push('/404');
		}
		history.push(`${roleId}`);
	}, [roleId, role, history]);

	return (
		<DescriptionPageContainer>
			<VisibleContent id={'iam-tab-role'}>
				<CurrentPathContainer>
					<AppBarLink to='/iam'>IAM</AppBarLink>
					<NextPath>{' > '}</NextPath>
					<AppBarLink to='/roles'>역할</AppBarLink>
					<NextPath>{' > '}</NextPath>
					<AppBarLink to={`/roles/${roleId}`}>
						{role?.name}
					</AppBarLink>
				</CurrentPathContainer>

				<SubHeader>
					<SubHeaderText>
						<HoverIconButton
							color={'font'}
							size={'m'}
							margin={'0px'}
							onClick={onClickFoldSummary}
						>
							{isSummaryOpened ? arrowDownIcon : arrowUpIcon}
						</HoverIconButton>
						요약 [ {role?.name} ]
					</SubHeaderText>
					<AppBarButtons>
						<NormalButton onClick={onClickLinkToAddRolePage}>
							역할 만들기
						</NormalButton>
						<TransparentButton margin={'0px 0px 0px 5px'}>
							삭제
						</TransparentButton>
					</AppBarButtons>
				</SubHeader>

				<SummaryList>
					<LiText>역할 이름 : {role?.name}</LiText>
					<LiText>역할 유형 : {role?.type}</LiText>
					<LiText>역할 설명 : {role?.description}</LiText>
					<LiText>생성 일시 : {role?.creationDate}</LiText>
					<LiText>마지막 작업 일시 : 2021.09.21. 16:05:18 </LiText>
					<LiText>마지막 활동 : 사용자 접근정책 변경</LiText>
					<LiText>마지막 활동 사용자 : 김영우 (kyoung634)</LiText>
				</SummaryList>
			</VisibleContent>

			<CoveredContent>
				<RoleSummary
					Id={roleId}
					param={'roles'}
					setIsOpened={setIsSummaryOpened}
				/>
			</CoveredContent>

			<TabContainer
				isOpend={!isSummaryOpened}
				height={
					document.getElementsByTagName('BODY')[0]?.clientHeight -
					document
						.getElementById('iam-tab-role')
						?.getBoundingClientRect().bottom
				}
			>
				<TabBar
					Tabs={TabBarInfo}
					param={'roles'}
					Id={roleId}
					isOpened={isSummaryOpened}
					setIsOpened={setIsSummaryOpened}
				/>
				<TabContents>
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
				</TabContents>
			</TabContainer>
		</DescriptionPageContainer>
	);
};

RoleDescriptionSpace.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RoleDescriptionSpace;
