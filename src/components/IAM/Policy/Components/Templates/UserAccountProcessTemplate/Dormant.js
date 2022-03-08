import React, {useEffect} from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {accountBlockingTypeOptions} from '../../../../../../utils/options';
import useRadio from '../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../styles/components/style';
import PropTypes from 'prop-types';

const dormant = {
	title: '휴면',
	description: [
		'일정 기간동안 미접속 사용자의 계정을 처리하기 위해 정책을 설정합니다.',
		'정상화 후 재로그인 시에 패스워드를 변경해야 합니다.',
	],
	contents: {
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
const Dormant = ({data}) => {
	//blockingType : 계정 처리 방법
	const [blockingType, blockingTypeRadioButton, setBlockingType] = useRadio({
		name: 'dormantBlockingType',
		options: accountBlockingTypeOptions,
	});
	// unconnectedDays: 연속 미접속 기간
	const [
		unconnectedDays,
		unconnectedDaysTextBox,
		setUnconnectedDays,
	] = useTextBox({
		name: 'unconnectedDays',
	});

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		//계정 처리 방법 default value 존재
		if (data?.blockingType) {
			//계정 처리 방법 세팅
			setBlockingType(data.blockingType);
		}
		//연속 미접속 기간 default value 존재
		if (data?.unconnectedDays) {
			//연속 미접속 기간 세팅
			setUnconnectedDays(data.unconnectedDays);
		}
	}, [data, setBlockingType, setUnconnectedDays]);

	return (
		<TemplateElementContainer
			title={dormant.title}
			description={dormant.description}
			render={() => {
				return (
					<div>
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
};

export default Dormant;
