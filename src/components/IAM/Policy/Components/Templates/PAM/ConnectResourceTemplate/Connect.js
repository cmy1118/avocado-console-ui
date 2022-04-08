import TemplateLayout from '../../Layout/TemplateLayout';
import React, {useEffect} from 'react';
import useRadio from '../../../../../../../hooks/useRadio';
import {inputTypeOptions} from '../../../../../../../utils/policy/options';
import PropTypes from 'prop-types';

const connect = {
	title: '로그인 방식',
	description: [
		'원격 자원에 접속 하는 방식을 설정합니다.',
		'자동 로그인은 사용자가 계정ID 나 패스워드를 알지 못하는 상태지만 로그인이 가능한 방식입니다.',
		'직접 로그인 방식은 계정 ID/Password 또는 Key Pairs를 직접 선택, 입력하여 로그인 하는 방식 입니다.',
		'수동 로그인 방식은 사용자는 접속할 계정 ID만으로 접속이 가능한 방식 입니다.',
	],
};

/**************************************************
 * ambacc244 - 자원 접속 방식(로그인 방식) 폼
 **************************************************/
const Connect = ({data, setTemplateData}) => {
	//connect: 로그인 방식
	const [inputType, inputTypeRadioButton, setInputType] = useRadio({
		name: 'connectType',
		options: inputTypeOptions,
	});

	/**************************************************
	 * ambacc244 - 로그인 방식 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		if (data?.attribute?.ruleType) {
			setTemplateData({
				applicationCode: data.applicationCode.code,
				attribute: {
					ruleType: data?.attribute.ruleType,
					inputType: inputType,
				},
			});
		}
	}, [inputType, data, setTemplateData]);

	/**************************************************
	 * ambacc244 - 로그인 방식 default 값 세팅
	 **************************************************/
	useEffect(() => {
		if (data?.attribute?.inputType) setInputType(data.attribute.inputType);
	}, [data]);

	return (
		<TemplateLayout
			title={connect.title}
			description={connect.description}
			render={inputTypeRadioButton}
		/>
	);
};

Connect.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};

export default Connect;
