import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import useRadio from '../../../../../../../hooks/useRadio';
import {
	blockingTypeOptions,
	blockingInitTypeOptions,
	policyOption,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/policyOptions';
import useTextBox from '../../../../../../../hooks/useTextBox';
import TemplateLayout from '../../Outline/TemplateLayout';
import TemplateElement from '../../Outline/TemplateElement';
import {RowDiv} from '../../../../../../../styles/components/style';

const passwordExpired = {
	title: '비밀번호 사용 기간',
	description: [
		'사용자의 계정의 비밀번호 사용기간을 제어하는 정책을 설정합니다.',
		'정상화 후에는 반드시 비밀번호를 변경해햐 합니다.',
		'비밀번호 사용기간은 최대 1000일을 초과하여 설정 할 수 없습니다.',
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
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 계정 처리(비밀번호 사용 기간) 폼
 **************************************************/
const PasswordExpired = ({data, setTemplateData}) => {
	//usage : 비밀번호 사용 기간 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'passwordExpiredUsage',
		options: usageOptions,
	});
	//expiryDays : 계정 사용 기간
	const [expiryDays, expiryDaysTextBox, setExpiryDays] = useTextBox({
		name: 'expiryDays',
		disabled: usage === policyOption.usage.none.key,
	});
	//blockingType : 계정 처리 방법
	const [blockingType, blockingTypeRadioButton, setBlockingType] = useRadio({
		name: 'passwordExpiredBlockingType',
		options: blockingTypeOptions,
		disabled: usage === policyOption.usage.none.key,
	});
	// accountNormalization : 계정 정상화
	const [
		blockingInitType,
		blockingInitTypeButton,
		setBlockingInitType,
	] = useRadio({
		name: 'passwordExpiredBlockingInitType',
		options: blockingInitTypeOptions,
		disabled: usage === policyOption.usage.none.key,
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
				attributes.expiryDays = expiryDays;
				attributes.blockingInitType = blockingInitType;
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
		//비밀번호 사용 여부 세팅
		setUsage(
			setUsageOptionByAttribute(
				data?.attribute,
				'usage',
				policyOption.usage.use.key,
				policyOption.usage.none.key,
			),
		);
		//사용 기간
		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(data.attribute, 'expiryDays')
		) {
			console.log(data.attribute.expiryDays);
			setExpiryDays(data.attribute.expiryDays);
		}
		//계정 처리 방법
		if (data?.attribute?.blockingType) {
			setBlockingType(data.attribute.blockingType);
		}

		if (data?.attribute?.blockingInitType) {
			setBlockingInitType(data.attribute.admin_temp_password);
		}
	}, [data]);

	return (
		<TemplateLayout
			title={passwordExpired.title}
			description={passwordExpired.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={passwordExpired.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={passwordExpired.contents.expiryDays.title}
							render={() => {
								return (
									<RowDiv>
										{expiryDaysTextBox()}
										{
											passwordExpired.contents.expiryDays
												.message
										}
									</RowDiv>
								);
							}}
						/>
						<TemplateElement
							title={passwordExpired.contents.blockingType.title}
							render={blockingTypeRadioButton}
						/>
						<TemplateElement
							title={
								passwordExpired.contents.accountNormalization
									.title
							}
							render={blockingInitTypeButton}
						/>
					</div>
				);
			}}
		/>
	);
};

PasswordExpired.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};

export default PasswordExpired;
