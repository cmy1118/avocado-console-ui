import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import TemplateLayout from '../../Layout/TemplateLayout';
import TemplateElement from '../../Layout/TemplateElement';
import {RowDiv} from '../../../../../../../styles/components/style';
import {
	blockingTypeOptions,
	policyOption,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/policy/options';
import useTextBox from '../../../../../../../hooks/useTextBox';
import useRadio from '../../../../../../../hooks/useRadio';

const dormant = {
	title: '휴면',
	description: [
		'일정 기간동안 미접속 사용자의 계정을 처리하기 위해 정책을 설정합니다.',
		'정상화 후 재로그인 시에 패스워드를 변경해야 합니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		unconnectedDays: {
			title: '연속 미접속 기간',
			message: '일',
		},
		accountStatus: {
			title: '계정 처리 방법',
			options: {
				lock: '잠금',
				delete: '삭제',
			},
		},
		accountNormalization: {
			title: '계정 정상화',
			message: '본인 확인 인증',
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 계정 처리(휴면) 폼
 **************************************************/
const Dormant = ({data, setTemplateData}) => {
	//usage : 휴면 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'dormantUsage',
		options: usageOptions,
	});
	//blockingType : 계정 처리 방법
	const [blockingType, blockingTypeRadioButton, setBlockingType] = useRadio({
		name: 'dormantBlockingType',
		options: blockingTypeOptions,
		disabled: usage === policyOption.usage.none.value,
	});
	// unconnectedDays: 연속 미접속 기간
	const [
		unconnectedDays,
		unconnectedDaysTextBox,
		setUnconnectedDays,
	] = useTextBox({
		name: 'unconnectedDays',
		//1 ~
		regex: /^([1-9]|[1-9][0-9]*)$/,
		disabled: usage === policyOption.usage.none.value,
	});

	/**************************************************
	 * ambacc244 - 휴면 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		//rule 생성을 위한 ruleType이 존재
		if (data?.attribute?.ruleType) {
			const attributes = {
				usage: usage === policyOption.usage.use.value,
			};
			//사용 여부 true
			if (usage === policyOption.usage.use.value) {
				attributes.blockingType = blockingType;
				attributes.unconnectedDays = unconnectedDays;
			}
			setTemplateData({
				resource: data?.resource,
				attribute: {ruleType: data?.attribute.ruleType, ...attributes},
			});
		}
	}, [data, setTemplateData, blockingType, unconnectedDays, usage]);

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		//휴면 사용 여부 세팅
		setUsage(
			setUsageOptionByAttribute(
				data?.attribute,
				'usage',
				policyOption.usage.use.value,
				policyOption.usage.none.value,
			),
		);
		//계정 처리 방법 default value 존재
		if (data?.attribute?.blockingType) {
			//계정 처리 방법 세팅
			setBlockingType(data?.attribute.blockingType);
		}
		//연속 미접속 기간 default value 존재
		if (data?.attribute?.unconnectedDays) {
			//연속 미접속 기간 세팅
			setUnconnectedDays(data?.attribute.unconnectedDays);
		}
	}, [data, setBlockingType, setUnconnectedDays, setUsage]);

	return (
		<TemplateLayout
			title={dormant.title}
			description={dormant.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={dormant.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={dormant.contents.unconnectedDays.title}
							render={() => {
								return (
									<RowDiv>
										{unconnectedDaysTextBox()}
										{
											dormant.contents.unconnectedDays
												.message
										}
									</RowDiv>
								);
							}}
						/>
						<TemplateElement
							title={dormant.contents.accountStatus.title}
							render={blockingTypeRadioButton}
						/>

						<TemplateElement
							title={dormant.contents.accountNormalization.title}
							render={() => {
								return (
									<RowDiv>
										{
											dormant.contents
												.accountNormalization.message
										}
									</RowDiv>
								);
							}}
						/>
					</div>
				);
			}}
		/>
	);
};

Dormant.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};

export default Dormant;
