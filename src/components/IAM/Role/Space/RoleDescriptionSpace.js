import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {useHistory, useLocation} from 'react-router-dom';
import {
	CurrentPathBar,
	CurrentPathBarLink,
	NextPath,
} from '../../../../styles/components/currentPathBar';
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

const RoleDescriptionSpace = ({roleId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {search} = useLocation();
	const [role, setRole] = useState(null);

	const [description, setDescription, descriptionTextArea] = useTextArea({
		name: 'description',
		regex: /^.{0,200}$/,
	});

	const [isSummaryOpened, setIsSummaryOpened] = useState(true);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

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

	/**************************************************
	 * ambacc244 - 역할 상세 수정
	 *  ***************************************************/
	const onClickChangeDescription = useCallback(() => {}, []);

	useEffect(() => {
		if (roleId && !role) {
			history.push('/404');
		}
		history.push(`/roles/${roleId}`);
	}, [roleId, role, history]);

	useEffect(() => {
		dispatch(
			IAM_ROLES.asyncAction.findByIdAction({
				id: roleId,
			}),
		)
			.unwrap()
			.then((res) => {
				setRole(res);
				setDescription(res.description);
			});
	}, [dispatch, roleId]);

	return (
		<IamContainer>
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/roles'>역할</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink
					onClick={() => setIsSummaryOpened(true)}
					to={`/roles/${roleId}`}
				>
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
						<LiText>역할 유형 : </LiText>
						<LiText>
							<RowDiv>
								역할 설명 :{' '}
								<div>
									<RowDiv>
										{descriptionTextArea()}
										<NormalButton
											onClick={onClickChangeDescription}
										>
											저장
										</NormalButton>
									</RowDiv>
									최대 200자 까지 가능합니다.
								</div>
							</RowDiv>
						</LiText>
						<LiText>부여 제한 : </LiText>
						<LiText>
							생성 일시 : {role?.createdTag.createdTime}
						</LiText>
						<LiText>생성 사용자 :</LiText>
						<LiText>마지막 작업 일시 :</LiText>
						<LiText>마지막 활동 :</LiText>
						<LiText>마지막 활동 사용자 : </LiText>
					</SummaryList>
				</div>

				<CoveredByTabContent isOpened={isSummaryOpened}>
					<RoleSummary
						isSummaryOpened={isSummaryOpened}
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
