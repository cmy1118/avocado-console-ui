import React, {useEffect} from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {
	accountStatusOptions,
	gracePeriodUsageOptions,
} from '../../../../../../utils/options';
import useRadio from '../../../../../../hooks/useRadio';
import PropTypes from 'prop-types';
import LoginFailure from './LoginFailure';
import useTextBox from '../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../styles/components/style';

const resignation = {
	title: '퇴사(탈퇴)',
	description: [
		'사용자 퇴사로 인한 사용자 계정 접근을 제어하기 위한 정책을 설정합니다.',
		'유예 기간동안은 접근 및 권한이 유지되며, 관리자에 의해 정상화가 가능합니다.',
		'유예 기간동안은 접근 및 권한이 유지됩니다.',
	],
	contents: {
		accountStatus: {
			title: '계정 처리 방법',
			options: {
				lock: '잠금',
				delete: '삭제',
			},
		},
		gracePeriod: {
			title: '유예 기간',
			options: {
				no: '없음',
				yes: '있음',
			},
		},
		accountNormalization: {
			title: '계정 정상화',
			message: '관리자 정상화',
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 계정 처리(퇴사/탈퇴) 폼
 **************************************************/
const Resignation = ({data}) => {
	const [
		accountStatus,
		accountStatusRadioButton,
		setAccountStatus,
	] = useRadio({
		name: 'accountStatus',
		options: accountStatusOptions,
	});
	const [
		gracePeriodUsage,
		gracePeriodUsageRadioButton,
		setGracePeriodUsage,
	] = useRadio({
		name: 'gracePeriodUsage',
		options: gracePeriodUsageOptions,
	});
	const [gracePeriod, gracePeriodTextBox, setGracePeriod] = useTextBox({
		name: 'gracePeriod',
		disabled:
			gracePeriodUsage === gracePeriodUsageOptions[1].key ? true : false,
	});

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		if (data?.attribute?.blockingType) {
			setAccountStatus(data.attribute.blockingType);
		}
		if (data?.attribute?.applyDays) {
			if (data.attribute.applyDays === 0) {
				setGracePeriodUsage(gracePeriodUsageOptions[1].key);
			} else {
				setGracePeriodUsage(gracePeriodUsageOptions[0].key);
				setGracePeriod(data.attribute.applyDays);
			}
		}
	}, [data]);

	return (
		<TemplateElementContainer
			title={resignation.title}
			description={resignation.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={resignation.contents.accountStatus.title}
							render={accountStatusRadioButton}
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
};

export default Resignation;
