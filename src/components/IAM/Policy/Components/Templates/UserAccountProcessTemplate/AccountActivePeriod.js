import React, {useEffect} from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {accountStatusOptions} from '../../../../../../utils/options';
import useRadio from '../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../styles/components/style';
import PropTypes from 'prop-types';
import LoginFailure from './LoginFailure';

const accountActivePeriod = {
	title: '계정 사용 기간',
	description: [
		' 사용자의 계정으로 애플리케이션을 접속할 수 있는 기간을 제어하는 정책을 설정합니다.',
		'관리자 정상화 후 기간 연장합니다.',
	],
	contents: {
		activePeriod: {
			title: '사용 기간',
			message: '일',
		},
		accountStatus: {
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
const AccountActivePeriod = ({data}) => {
	const [activePeriod, activePeriodTextBox, setActivePeriod] = useTextBox({
		name: 'activePeriod',
	});
	const [accountStatus, setAccountRadioButton, setAccountStatus] = useRadio({
		name: 'accountStatus',
		options: accountStatusOptions,
	});

	useEffect(() => {
		if (data?.attribute?.expiryDays) {
			setActivePeriod(data.attribute.expiryDays);
		}
		if (data?.attribute?.blockingType) {
			setAccountStatus(data.attribute.blockingType);
		}
	}, [data]);

	return (
		<TemplateElementContainer
			title={accountActivePeriod.title}
			description={accountActivePeriod.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={
								accountActivePeriod.contents.activePeriod.title
							}
							render={() => {
								return (
									<RowDiv>
										{activePeriodTextBox()}
										{
											accountActivePeriod.contents
												.activePeriod.message
										}
									</RowDiv>
								);
							}}
						/>
						<TemplateElement
							title={
								accountActivePeriod.contents.accountStatus.title
							}
							render={setAccountRadioButton}
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
};
export default AccountActivePeriod;
