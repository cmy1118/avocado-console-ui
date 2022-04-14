import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../styles/components/iam/iam';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import {HoverIconButton} from '../../../../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {DescriptionPageContainer} from '../../../../styles/components/iam/descriptionPage';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policies';
import {isFulfilled} from '../../../../utils/redux';
import {
	CoveredByTabContent,
	TabContainer,
} from '../../../../styles/components/iam/iamTab';
import PolicyDetail from '../Components/Description/PolicyDetail';
import TabBar from '../../TabBar';
import PolicyTabContents from '../Components/Description/PolicyTabContents';
import PolicySummary from '../Components/Description/PolicySummary';
import DIALOG_BOX from '../../../../reducers/dialogBoxs';
import {deleteAlertMessages} from '../../../../utils/alertMessage';
import {policyTabs} from '../../../../utils/tabs';

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
	const history = useHistory();
	const location = useLocation();
	const [policy, setPolicy] = useState(null);
	const {nextAction} = useSelector(DIALOG_BOX.selector);

	const isSummaryOpened = useMemo(() => {
		if (location.search) return false;
		else return true;
	}, [location.search]);

	const paths = useMemo(
		() => [
			{url: '/iam', label: 'IAM'},
			{url: '/policies', label: '역할'},
			{url: '/policies/' + type + '/' + policyId, label: policy?.name},
		],
		[policy, policyId, type],
	);

	const TabBarInfo = [
		{name: '규칙/권한', href: policyTabs.detail},
		{name: '역할', href: policyTabs.role},
		{name: '태그', href: policyTabs.tag},
	];

	/**************************************************
	 * ambacc244 - 탭을 열고 닫음
	 **************************************************/
	const onClickFoldTab = useCallback(() => {
		if (isSummaryOpened) {
			history.push({
				pathname: location.pathname,
				search: `tabs=${policyTabs.detail}`,
			});
		} else {
			history.push({
				pathname: location.pathname,
			});
		}
	}, [isSummaryOpened, history]);

	/**************************************************
	 * ambacc244 - 정책 생성 페이지로 이동
	 **************************************************/
	const onClickLinkToAddPolicyPage = useCallback(() => {
		history.push({
			pathname: '/policies/add',
		});
	}, [history]);

	/**************************************************
	 * ambacc244 - 정책 삭제 요청 인식 재확인 요청
	 **************************************************/
	const onClickDeletePolicy = useCallback(() => {
		dispatch(
			DIALOG_BOX.action.openAlert({
				value: deleteAlertMessages.deletePolicy.value,
			}),
		);
	}, [dispatch]);

	/**************************************************
	 * ambacc244 - 정책 삭제
	 **************************************************/
	useEffect(() => {
		const deletePolicy = async () => {
			try {
				await dispatch(
					IAM_POLICY_MANAGEMENT_POLICIES.asyncAction.deletePolicy({
						id: policyId,
					}),
				).unwrap();

				await history.push({pathname: '/policies'});
			} catch (err) {
				console.log(err);
			}
		};

		if (nextAction === deleteAlertMessages.deletePolicy.value)
			deletePolicy();
	}, [nextAction, policyId]);

	/**************************************************
	 * ambacc244 - 정책 상세 설명 정보 세팅
	 **************************************************/
	useEffect(() => {
		const getPolicy = async () => {
			const res = await dispatch(
				IAM_POLICY_MANAGEMENT_POLICIES.asyncAction.findPolicyById({
					id: policyId,
				}),
			);

			if (isFulfilled(res)) {
				setPolicy(res.payload);
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
								onClick={onClickFoldTab}
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

					{policy && (
						<PolicySummary policy={policy} setPolicy={setPolicy} />
					)}
				</div>

				<CoveredByTabContent isOpened={isSummaryOpened}>
					<PolicyDetail policyId={policyId} />
				</CoveredByTabContent>

				<TabContainer isOpened={!isSummaryOpened}>
					<TabBar Tabs={TabBarInfo} />
					<PolicyTabContents policyId={policyId} />
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
