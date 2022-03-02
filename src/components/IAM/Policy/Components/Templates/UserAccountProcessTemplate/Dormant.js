import React from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {accountStatusOptions} from '../../../../../../utils/options';
import useRadio from '../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../styles/components/style';

const dormant = {
	title: '휴면',
	description: [
		'일정 기간동안 미접속 사용자의 계정을 처리하기 위해 정책을 설정합니다.',
		'정상화 후 재로그인 시에 패스워드를 변경해야 합니다.',
	],
	contents: {
		inactivePeriod: {
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
const Dormant = () => {
	const [accountStatus, accountStatusRadioButton] = useRadio({
		name: 'accountStatus',
		options: accountStatusOptions,
	});
	const [inactivePeriod, inactivePeriodTextBox] = useTextBox({
		name: 'inactivePeriod',
	});

	return (
		<TemplateElementContainer
			title={dormant.title}
			description={dormant.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={dormant.contents.inactivePeriod.title}
							render={() => {
								return (
									<RowDiv>
										{inactivePeriodTextBox()}
										{
											dormant.contents.inactivePeriod
												.message
										}
									</RowDiv>
								);
							}}
						/>
						<TemplateElement
							title={dormant.contents.accountStatus.title}
							render={accountStatusRadioButton}
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

export default Dormant;
