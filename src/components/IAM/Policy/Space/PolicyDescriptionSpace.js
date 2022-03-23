import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../styles/components/iam/iam';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import qs from 'qs';
import {HoverIconButton} from '../../../../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {
	DescriptionPageContainer,
	SummaryList,
} from '../../../../styles/components/iam/descriptionPage';
import {useDispatch} from 'react-redux';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import {isFulfilled} from '../../../../utils/redux';
import {LiText} from '../../../../styles/components/text';
import {RowDiv} from '../../../../styles/components/style';
import useTextArea from '../../../../hooks/useTextArea';
import {policyManageType} from '../../../../utils/policy';
import {
	CoveredByTabContent,
	TabContainer,
} from '../../../../styles/components/iam/iamTab';
import PolicySummary from '../Components/Description/PolicySummary';
import TabBar from '../../TabBar';

const policyDescriptionSpace = {
	button: {create: '정책 생성', delete: '삭제'},
	title: '요약',
	type: {iam: 'IAM', pam: 'PAM'},
	detail: {
		name: '정책 이름 : ',
		description: {
			title: '정책 설명 : ',
			description: '최대 200자 까지 가능합니다.',
			button: {save: '저장'},
		},
		createdTime: '생성 일시 : ',
		lastEventTime: '마지막 작업 일시 : ',
		lastEvent: '마지막 작업 : ',
	},
};

const PolicyDescriptionSpace = ({policyId, type}) => {
	const dispatch = useDispatch();

	const {search} = useLocation();

	const [policy, setPolicy] = useState(null);

	const [isSummaryOpened, setIsSummaryOpened] = useState(true);

	const onClickFoldSummary = useCallback(() => {}, []);

	const onClickLinkToAddPolicyPage = useCallback(() => {}, []);

	const onClickDeletePolicy = useCallback(() => {}, []);

	const paths = useMemo(
		() => [
			{url: '/iam', label: 'IAM'},
			{url: '/policies', label: '역할'},
			{url: '/policies/' + type + '/' + policyId, label: policyId},
		],
		[policyId, type],
	);

	const TabBarInfo = [
		{name: '규칙/권한', href: 'permission'},
		{name: '역할', href: 'role'},
		{name: '태그', href: 'tag'},
	];
	//description: 정책 상세 설명
	const [description, setDescription, descriptionTextArea] = useTextArea({
		name: 'description',
		regex: /^.{0,200}$/,
	});

	/**************************************************
	 * ambacc244 - 정책 상세 설명 변경
	 **************************************************/
	const onClickChangeDescription = useCallback(async () => {
		//TODO: name, maxGrants 삭제 예정
		const res = await dispatch(
			IAM_POLICY_MANAGEMENT_POLICIES.asyncAction.updatePolicy({
				id: policyId,
				name: policy.name,
				description: description,
				maxGrants: policy.maxGrants,
			}),
		);
		//요청에 대한 응답 성공
		if (isFulfilled(res)) {
			setPolicy({...policy, description: description});
		}
	}, [policyId, description, policy]);

	/**************************************************
	 * ambacc244 - current Path Bar의 현재 경로 클릭으로 탭을 닫음
	 **************************************************/
	useEffect(() => {
		//현재 경로에서 탭의 정보가 없음
		if (!qs.parse(search, {ignoreQueryPrefix: true})?.tabs) {
			setIsSummaryOpened(true);
		}
	}, [search]);

	useEffect(() => {
		const getPolicy = async () => {
			const res = await dispatch(
				IAM_POLICY_MANAGEMENT_POLICIES.asyncAction.findPolicyById({
					id: policyId,
				}),
			);

			if (isFulfilled(res)) {
				console.log(res.payload);
				setPolicy(res.payload);
				setDescription(res.payload.description);
			}
		};

		getPolicy();
	}, [policyId]);

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
							{policyDescriptionSpace.title} [ {policy?.name} ] -{' '}
							{policyDescriptionSpace.type[type]}
						</TitleBarText>

						<TitleBarButtons>
							<NormalButton onClick={onClickLinkToAddPolicyPage}>
								{policyDescriptionSpace.button.create}
							</NormalButton>
							<TransparentButton
								onClick={onClickDeletePolicy}
								margin={'0px 0px 0px 5px'}
							>
								{policyDescriptionSpace.button.delete}
							</TransparentButton>
						</TitleBarButtons>
					</TitleBar>

					<SummaryList>
						<LiText>
							{policyDescriptionSpace.detail.name}
							{policy?.name} ({' '}
							{policyManageType[policy?.type.code]} )
						</LiText>
						<LiText>
							<RowDiv>
								{
									policyDescriptionSpace.detail.description
										.title
								}
								<div>
									<RowDiv>
										{descriptionTextArea()}
										<NormalButton
											onClick={onClickChangeDescription}
										>
											{
												policyDescriptionSpace.detail
													.description.button.save
											}
										</NormalButton>
									</RowDiv>
									{
										policyDescriptionSpace.detail
											.description.description
									}
								</div>
							</RowDiv>
						</LiText>
						<LiText>
							{policyDescriptionSpace.detail.createdTime}
							{policy?.createdTag.createdTime}
						</LiText>
						<LiText>
							{policyDescriptionSpace.detail.lastEventTime}
						</LiText>
						<LiText>
							{policyDescriptionSpace.detail.lastEvent}
						</LiText>
					</SummaryList>
				</div>

				<CoveredByTabContent isOpened={isSummaryOpened}>
					<PolicySummary
						policyId={policyId}
						setIsOpened={setIsSummaryOpened}
						isSummaryOpened={isSummaryOpened}
					/>
				</CoveredByTabContent>

				<TabContainer isOpened={!isSummaryOpened}>
					<TabBar
						Tabs={TabBarInfo}
						isOpened={isSummaryOpened}
						setIsOpened={setIsSummaryOpened}
					/>
				</TabContainer>
			</DescriptionPageContainer>
		</IamContainer>
	);
};

PolicyDescriptionSpace.propTypes = {
	policyId: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default PolicyDescriptionSpace;
