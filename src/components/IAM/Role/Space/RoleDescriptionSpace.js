import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {useHistory, useLocation} from 'react-router-dom';
import RoleSummary from '../Components/RoleSummary';
import TabBar from '../../TabBar';
import RolePolicyTab from '../Components/Tabs/RolePolicyTab';
import {useDispatch} from 'react-redux';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import {HoverIconButton} from '../../../../styles/components/icons';
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
import useTextArea from '../../../../hooks/useTextArea';
import {RowDiv} from '../../../../styles/components/style';
import RoleUserTab from '../Components/Tabs/RoleUserTab';
import RoleGroupTab from '../Components/Tabs/RoleGroupTab';
import CurrentPathBarTemp from '../../../Header/CurrentPathBarTemp';

const roleDescriptionSpace = {
	title: '요약',
	button: {create: '역할 만들기', delete: '삭제'},
	detail: {
		name: '역할 이름 : ',
		type: '역할 유형 : ',
		description: {
			title: '역할 설명 : ',
			description: '최대 200자 까지 가능합니다.',
			button: {save: '저장'},
		},
		grantRegulation: '부여 제한 : ',
		createdDate: '생성 일시 : ',
		createdUser: '생성 사용자 : ',
		getLastActiveTime: '마지막 작업 일시 : ',
		lastAction: '마지막 활동 : ',
		lastActiveUser: '마지막 활동 사용자 : ',
	},
};

/**************************************************
 * ambacc244 - 이 역할을 상세 정보를 보여줌
 **************************************************/
const RoleDescriptionSpace = ({roleId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {search} = useLocation();
	const [role, setRole] = useState(null);
	const paths = useMemo(
		() => [
			{url: '/iam', label: 'IAM'},
			{url: '/roles', label: '역할'},
			{url: '/roles/' + role?.id, label: role?.name},
		],
		[role],
	);
	//description: 역할 상세 설명
	const [description, setDescription, descriptionTextArea] = useTextArea({
		name: 'description',
		regex: /^.{0,200}$/,
	});

	const [isSummaryOpened, setIsSummaryOpened] = useState(true);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);
	const TabBarInfo = [
		{name: '권한', href: 'role'},
		{name: '사용자', href: 'user'},
		{name: '사용자 그룹', href: 'group'},
	];

	/**************************************************
	 * roberto6385 - 이 역할의 상세 설명 접고 펼치기
	 **************************************************/
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

	/**************************************************
	 * ambacc244 - 역할 생성 페이지로 이동
	 **************************************************/
	const onClickLinkToAddRolePage = useCallback(() => {
		history.push('/roles/add');
	}, [history]);

	/**************************************************
	 * ambacc244 - 역할 상세 수정
	 **************************************************/
	const onClickChangeDescription = useCallback(() => {}, []);

	/**************************************************
	 * roberto6385 - 이 역할의 정보 불러오기
	 **************************************************/
	useEffect(() => {
		//이 역할의 정보 호출
		dispatch(
			IAM_ROLES.asyncAction.findByIdAction({
				id: roleId,
			}),
		)
			.unwrap()
			.then((res) => {
				setRole(res);
				setDescription(res.description);
			})
			//역할의 id가 유효하지 않음
			.catch((err) => {
				console.log(err);
				history.push('/404');
			});
	}, [dispatch, roleId]);

	return (
		<IamContainer>
			{/*<CurrentPathBar>*/}
			{/*	<CurrentPathBarLink to='/iam'>IAM</CurrentPathBarLink>*/}
			{/*	<NextPath>{' > '}</NextPath>*/}
			{/*	<CurrentPathBarLink to='/roles'>역할</CurrentPathBarLink>*/}
			{/*	<NextPath>{' > '}</NextPath>*/}
			{/*	<CurrentPathBarLink*/}
			{/*		onClick={() => setIsSummaryOpened(true)}*/}
			{/*		to={`/roles/${roleId}`}*/}
			{/*	>*/}
			{/*		{role?.name}*/}
			{/*	</CurrentPathBarLink>*/}
			{/*</CurrentPathBar>*/}
			<CurrentPathBarTemp paths={paths} />
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
							{roleDescriptionSpace.title} [ {role?.name} ]
						</TitleBarText>
						<TitleBarButtons>
							<NormalButton onClick={onClickLinkToAddRolePage}>
								{roleDescriptionSpace.button.create}
							</NormalButton>
							<TransparentButton margin={'0px 0px 0px 5px'}>
								{roleDescriptionSpace.button.delete}
							</TransparentButton>
						</TitleBarButtons>
					</TitleBar>

					<SummaryList>
						<LiText>
							{roleDescriptionSpace.detail.name}
							{role?.name}
						</LiText>
						<LiText>{roleDescriptionSpace.detail.type}</LiText>
						<LiText>
							<RowDiv>
								{roleDescriptionSpace.detail.description.title}
								<div>
									<RowDiv>
										{descriptionTextArea()}
										<NormalButton
											onClick={onClickChangeDescription}
										>
											{
												roleDescriptionSpace.detail
													.description.button.save
											}
										</NormalButton>
									</RowDiv>
									{
										roleDescriptionSpace.detail.description
											.description
									}
								</div>
							</RowDiv>
						</LiText>
						<LiText>
							{roleDescriptionSpace.detail.grantRegulation}
						</LiText>
						<LiText>
							{roleDescriptionSpace.detail.createdDate}
							{role?.createdTag.createdTime}
						</LiText>
						<LiText>
							{roleDescriptionSpace.detail.createdUser}
						</LiText>
						<LiText>
							{roleDescriptionSpace.detail.getLastActiveTime}
						</LiText>
						<LiText>
							{roleDescriptionSpace.detail.lastAction}
						</LiText>
						<LiText>
							{roleDescriptionSpace.detail.lastActiveUser}
						</LiText>
					</SummaryList>
				</div>

				<CoveredByTabContent isOpened={isSummaryOpened}>
					<RoleSummary
						isSummaryOpened={isSummaryOpened}
						roleId={roleId}
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
								isSummaryOpened={isSummaryOpened}
							/>
						)}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'user' && (
							<RoleUserTab
								roleId={roleId}
								space={'RoleUserTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
								isSummaryOpened={isSummaryOpened}
							/>
						)}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'group' && (
							<RoleGroupTab
								roleId={roleId}
								space={'RoleGroupTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
								isSummaryOpened={isSummaryOpened}
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
