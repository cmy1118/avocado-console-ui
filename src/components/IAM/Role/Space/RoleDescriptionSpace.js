import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useLocation} from 'react-router-dom';
import RoleSummary from '../Components/Description/RoleSummary';
import TabBar from '../../TabBar';
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
import CurrentPathBar from '../../../Header/CurrentPathBar';
import RoleTabContents from '../Components/Description/RoleTabContents';
import {roleTabs} from '../../../../utils/tabs';
import TemplateElement from '../../Policy/Components/Templates/Layout/TemplateElement';
import useRadio from '../../../../hooks/useRadio';
import {
	gracePeriodUsageOptions,
	GRANT_RESTRICT_OPTIONS,
	grantRestrictOptions,
	policyOption,
} from '../../../../utils/policy/options';
import useTextBox from '../../../../hooks/useTextBox';

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

const RoleDescriptionSpace = ({roleId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [role, setRole] = useState(null);

	/**************************************************
	 * 부여제한 기능
	 **************************************************/
	const [
		grantRestrict,
		grantRestrictRadioButton,
		setGrantRestrict,
	] = useRadio({
		name: 'grantRestrict',
		options: grantRestrictOptions,
		disabled: grantRestrict === GRANT_RESTRICT_OPTIONS.none.key,
	});

	const [
		grantRestrictNum,
		grantRestrictTextBox,
		setGrantRestrictNum,
	] = useTextBox({
		name: 'gracePeriod',
		//유예 기간 사용 유무 false일때 disabled
		//1 ~
		regex: /^([1-9]|[1-9][0-9]*)$/,
		// disabled:
		// 	grantRestrict === policyOption.gracePeriod.none.key ||
		// 	usage === policyOption.usage.none.key,
	});

	/**************************************************
	 * 요약정보 열고 닫기
	 **************************************************/
	const isSummaryOpened = useMemo(() => {
		if (location.search) return false;
		else return true;
	}, [location.search]);

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
	const TabBarInfo = [
		{name: '권한', href: roleTabs.policy},
		{name: '사용자', href: roleTabs.user},
		{name: '사용자 그룹', href: roleTabs.group},
	];

	/**************************************************
	 * roberto6385 - 이 역할의 상세 설명 접고 펼치기
	 **************************************************/
	const onClickFoldSummary = useCallback(() => {
		if (isSummaryOpened) {
			history.push({
				pathname: location.pathname,
				search: `tabs=${roleTabs.policy}`,
			});
		} else {
			history.push({
				pathname: location.pathname,
			});
		}
	}, [isSummaryOpened]);

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
	useEffect(async () => {
		try {
			//이 역할의 정보 호출
			const roleData = await dispatch(
				IAM_ROLES.asyncAction.findByIdAction({
					id: roleId,
				}),
			).unwrap();
			console.log('roleData:', roleData);
			await setRole(roleData);
			await setDescription(roleData.description);

			await setGrantRestrict(false);
			await setGrantRestrictNum(roleData.length);
		} catch (err) {
			alert('역할 상세 정보 오류');
			console.log(err);
			history.push('/roles');
		}
	}, [
		dispatch,
		history,
		roleId,
		setDescription,
		setGrantRestrict,
		setGrantRestrictNum,
	]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />

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
							<TemplateElement
								render={() => {
									return (
										<RowDiv>
											{grantRestrictRadioButton()}
											{grantRestrictTextBox()}
										</RowDiv>
									);
								}}
							/>
						</LiText>
						<LiText>
							{roleDescriptionSpace.detail.createdDate}
							{/*{role.createdTag ? role.createdTag.createdTime : ''}*/}
						</LiText>

						<LiText>
							{roleDescriptionSpace.detail.getLastActiveTime}
							{/*{role.lastEventLog*/}
							{/*	? role.lastEventLog.eventTime*/}
							{/*	: ''}*/}
						</LiText>
						<LiText>
							{roleDescriptionSpace.detail.lastAction}
							{/*{role.lastEventLog*/}
							{/*	? `${role.lastEventLog.eventTime}[${role.lastEventLog.userName}(${role.lastEventLog.userId})]`*/}
							{/*	: ''}*/}
						</LiText>
					</SummaryList>
				</div>

				<CoveredByTabContent isOpened={isSummaryOpened}>
					<RoleSummary roleId={roleId} />
				</CoveredByTabContent>

				<TabContainer isOpened={!isSummaryOpened}>
					<TabBar Tabs={TabBarInfo} />

					<RoleTabContents
						roleId={roleId}
						isOpened={isSummaryOpened}
					/>
				</TabContainer>
			</DescriptionPageContainer>
		</IamContainer>
	);
};

RoleDescriptionSpace.propTypes = {
	roleId: PropTypes.string.isRequired,
};

export default RoleDescriptionSpace;
