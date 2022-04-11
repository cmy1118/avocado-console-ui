import React, {useEffect} from 'react';
import TemplateLayout from '../../Layout/TemplateLayout';
import TemplateElement from '../../Layout/TemplateElement';
import {
	blockingTypeOptions,
	gracePeriodUsageOptions,
	policyOption,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/policy/options';
import useRadio from '../../../../../../../hooks/useRadio';
import PropTypes from 'prop-types';
import useTextBox from '../../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../../styles/components/style';

const resignation = {
	title: '퇴사(탈퇴)',
	description: [
		'사용자 퇴사로 인한 사용자 계정 접근을 제어하기 위한 정책을 설정합니다.',
		'유예 기간동안은 접근 및 권한이 유지되며, 관리자에 의해 정상화가 가능합니다.',
		'유예 기간동안은 접근 및 권한이 유지됩니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		accountStatus: {
			title: '계정 처리 방법',
		},
		gracePeriod: {
			title: '유예 기간',
		},
		accountNormalization: {
			title: '계정 정상화',
			message: '관리자에 의한 정상화',
		},
	},
};

/**************************** **********************
 * ambacc244 - 사용자 계정 처리(퇴사/탈퇴) 폼
 **************************************************/
const Resignation = ({data, setTemplateData}) => {
	//usage : 퇴사/탈퇴 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'resignationUsage',
		options: usageOptions,
	});
	//accountStatus: 계정 처리 방법
	const [blockingType, blockingTypeRadioButton, setBlockingType] = useRadio({
		name: 'resignationBlockingType',
		options: blockingTypeOptions,
		disabled: usage === policyOption.usage.none.key,
	});
	//gracePeriodUsage: 유예 기간 사용 유무
	const [
		gracePeriodUsage,
		gracePeriodUsageRadioButton,
		setGracePeriodUsage,
	] = useRadio({
		name: 'gracePeriodUsage',
		options: gracePeriodUsageOptions,
		disabled: usage === policyOption.usage.none.key,
	});
	//gracePeriod: 유예 기간
	const [gracePeriod, gracePeriodTextBox, setGracePeriod] = useTextBox({
		name: 'gracePeriod',
		//유예 기간 사용 유무 false일때 disabled
		//1 ~
		regex: /^([1-9]|[1-9][0-9]*)$/,
		disabled:
			gracePeriodUsage === policyOption.gracePeriod.none.key ||
			usage === policyOption.usage.none.key,
	});

	/**************************************************
	 * ambacc244 - 퇴사/탈퇴 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		//rule 생성을 위한 ruleType이 존재
		if (data?.attribute?.ruleType) {
			const attributes = {
				usage: usage === policyOption.usage.use.key,
			};
			//사용 여부 true
			if (usage === policyOption.usage.use.key) {
				attributes.blockingType = blockingType;
				attributes.applyDays = gracePeriodUsage ? gracePeriod : 0;
			}
			setTemplateData({
				resource: data?.resource,
				attribute: {ruleType: data?.attribute.ruleType, ...attributes},
			});
		}
	}, [
		blockingType,
		data,
		gracePeriod,
		gracePeriodUsage,
		setTemplateData,
		usage,
	]);

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		setUsage(
			setUsageOptionByAttribute(
				data?.attribute,
				'usage',
				policyOption.usage.use.key,
				policyOption.usage.none.key,
			),
		);
		//계정 처리 방법
		if (data?.attribute?.blockingType) {
			setBlockingType(data.attribute.blockingType);
		}
		//유예기간 존재 && 유예기간이 0 보다 큼
		if (data?.attribute?.applyDays && data?.attribute?.applyDays !== 0) {
			setGracePeriodUsage(policyOption.gracePeriod.use.key);
			setGracePeriod(data.attribute.applyDays);
			//유예기간 존재 하지 않음
		} else {
			setGracePeriodUsage(policyOption.gracePeriod.none.key);
		}
	}, [data, setBlockingType, setGracePeriod, setGracePeriodUsage, setUsage]);

	return (
		<TemplateLayout
			title={resignation.title}
			description={resignation.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={resignation.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={resignation.contents.accountStatus.title}
							render={blockingTypeRadioButton}
						/>
						<TemplateElement
							title={resignation.contents.gracePeriod.title}
							render={() => {
								return (
									<RowDiv>
										{gracePeriodUsageRadioButton()}
										{gracePeriodTextBox()}
									</RowDiv>
								);
							}}
						/>
						<TemplateElement
							title={
								resignation.contents.accountNormalization.title
							}
							render={() => {
								return (
									<div>
										{
											resignation.contents
												.accountNormalization.message
										}
									</div>
								);
							}}
						/>
					</div>
				);
			}}
		/>
	);
};

Resignation.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};

export default Resignation;
