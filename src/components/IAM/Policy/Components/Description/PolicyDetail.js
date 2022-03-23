import {SummaryList} from '../../../../../styles/components/iam/descriptionPage';
import {LiText} from '../../../../../styles/components/text';
import {policyManageType} from '../../../../../utils/policy';
import {RowDiv} from '../../../../../styles/components/style';
import {NormalButton} from '../../../../../styles/components/buttons';
import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import useTextArea from '../../../../../hooks/useTextArea';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import {isFulfilled} from '../../../../../utils/redux';
import {useDispatch} from 'react-redux';

export const policySummary = {
	name: '정책 이름 : ',
	description: {
		title: '정책 설명 : ',
		description: '최대 200자 까지 가능합니다.',
		button: {save: '저장'},
	},
	createdTime: '생성 일시 : ',
	lastEventTime: '마지막 작업 일시 : ',
	lastEvent: '마지막 작업 : ',
};

const PolicyDetail = ({policy, setPolicy}) => {
	const dispatch = useDispatch();

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
				id: policy.id,
				name: policy.name,
				description: description,
				maxGrants: policy.maxGrants,
			}),
		);
		//요청에 대한 응답 성공
		if (isFulfilled(res)) {
			setPolicy({...policy, description: description});
		}
	}, [description, policy]);

	useEffect(() => {
		if (policy?.description) {
			setDescription(policy.description);
		}
	}, [policy]);

	return (
		<SummaryList>
			<LiText>
				{policySummary.name}
				{policy?.name} ( {policyManageType[policy?.type.code]} )
			</LiText>
			<LiText>
				<RowDiv>
					{policySummary.description.title}
					<div>
						<RowDiv>
							{descriptionTextArea()}
							<NormalButton onClick={onClickChangeDescription}>
								{policySummary.description.button.save}
							</NormalButton>
						</RowDiv>
						{policySummary.description.description}
					</div>
				</RowDiv>
			</LiText>
			<LiText>
				{policySummary.createdTime}
				{policy?.createdTag.createdTime}
			</LiText>
			<LiText>{policySummary.lastEventTime}</LiText>
			<LiText>{policySummary.lastEvent}</LiText>
		</SummaryList>
	);
};

PolicyDetail.propTypes = {
	policy: PropTypes.object.isRequired,
	setPolicy: PropTypes.func.isRequired,
};

export default PolicyDetail;
