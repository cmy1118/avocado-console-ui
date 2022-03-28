import React, {useEffect} from 'react';
import TemplateElementContainer from '../../../TemplateElementContainer';
import TemplateElement from '../../../TemplateElement';
import {
	accountBlockingTypeOptions,
	policyOption,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/policyOptions';
import useRadio from '../../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../../styles/components/style';
import PropTypes from 'prop-types';

const accountActivePeriod = {
	title: '계정 사용 기간',
	description: [
		' 사용자의 계정으로 애플리케이션을 접속할 수 있는 기간을 제어하는 정책을 설정합니다.',
		'관리자 정상화 후 기간 연장합니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		expiryDays: {
			title: '사용 기간',
			message: '일',
		},
		blockingType: {
			title: '계정 처리 방법',
		},
		accountNormalization: {
			title: '계정 정상화',
			message: '관리자 해제',
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 계정 처리(계정 사용 기간) 폼
 **************************************************/
const AccountActivePeriod = ({data, setTemplateData}) => {
	//usage : 계정 사용 기간 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'accountActivePeriodUsage',
		options: usageOptions,
	});
	//activePeriod : 계정 사용 기간
	const [expiryDays, expiryDaysTextBox, setExpiryDays] = useTextBox({
		name: 'expiryDays',
		disabled: usage === policyOption.usage.none.key,
	});
	//blockingType : 계정 처리 방법
	const [blockingType, blockingTypeRadioButton, setBlockingType] = useRadio({
		name: 'accountActivePeriodBlockingType',
		options: accountBlockingTypeOptions,
		disabled: usage === policyOption.usage.none.key,
	});

	/**************************************************
	 * ambacc244 - 계정 사용 기간 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		//rule 생성을 위한 ruleType이 존재
		if (data?.attribute?.ruleType) {
			const attributes = {
				usage: usage === policyOption.usage.use.key,
			};
			//사용 여부 true
			if (usage === policyOption.usage.use.key) {
				attributes.expiryDays = expiryDays;
				attributes.blockingType = blockingType;
			}

			setTemplateData({
				resource: data?.resource,
				attribute: {ruleType: data?.attribute.ruleType, ...attributes},
			});
		}
	}, [blockingType, data, expiryDays, setTemplateData, usage]);

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
		//계정 사용 기간 default value 존재
		if (data?.attribute?.expiryDays) {
			//계정 사용 기간 세팅
			setExpiryDays(data?.attribute.expiryDays);
		}
		//계정 처리 방법 default value 존재
		if (data?.attribute?.blockingType) {
			//계정 처리 방법 세팅
			setBlockingType(data?.attribute.blockingType);
		}
	}, [data, setBlockingType, setExpiryDays, setUsage]);

	return (
		<TemplateElementContainer
			title={accountActivePeriod.title}
			description={accountActivePeriod.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={accountActivePeriod.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={
								accountActivePeriod.contents.expiryDays.title
							}
							render={() => {
								return (
									<RowDiv>
										{expiryDaysTextBox()}
										{
											accountActivePeriod.contents
												.expiryDays.message
										}
									</RowDiv>
								);
							}}
						/>
						<TemplateElement
							title={
								accountActivePeriod.contents.blockingType.title
							}
							render={blockingTypeRadioButton}
						/>

						<TemplateElement
							title={
								accountActivePeriod.contents
									.accountNormalization.title
							}
							render={() => {
								return (
									<RowDiv>
										{
											accountActivePeriod.contents
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

AccountActivePeriod.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};
export default AccountActivePeriod;
