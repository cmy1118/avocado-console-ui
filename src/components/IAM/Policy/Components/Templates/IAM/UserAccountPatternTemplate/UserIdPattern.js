import React, {useEffect} from 'react';
import TemplateElement from '../../../TemplateElement';
import {
	policyOption,
	patternTypeOptions,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/policyOptions';
import TemplateElementContainer from '../../../TemplateElementContainer';
import useRadio from '../../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../../hooks/useTextBox';
import PropTypes from 'prop-types';

const userIdPattern = {
	title: '사용자 ID 패턴',
	description: [
		'사용자 ID에 특정 패턴을 설정합니다.',
		'패턴 최대 길이는 3~10자 로 제한 하며 특수문자 사용은 할수 없습니다',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		patternType: {
			title: '패턴 형식',
		},
		pattern: {
			title: '패턴 입력',
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 계정 패턴(사용자 ID 패턴) 폼
 **************************************************/
const UserIdPattern = ({data, setTemplateData}) => {
	//usage: 사용자 계정 패턴 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'userPatternUsage',
		options: usageOptions,
	});
	//patternType: 패턴 형식
	const [patternType, patternTypeRadioButton, setPatternType] = useRadio({
		name: 'patternType',
		options: patternTypeOptions,
		disabled: usage === policyOption.usage.none.key,
	});
	//pattern: 패턴
	const [pattern, patternTextBox, setPattern] = useTextBox({
		name: 'pattern',
		disabled: usage === policyOption.usage.none.key,
	});

	/**************************************************
	 * ambacc244 - 사용자 ID 패턴 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		//rule 생성을 위한 ruleType이 존재
		if (data?.ruleType) {
			const attributes = {
				usage: usage === policyOption.usage.use.key,
			};
			//사용 여부 true
			if (usage === policyOption.usage.use.key) {
				attributes.patternType = patternType;
				attributes.pattern = pattern;
			}

			setTemplateData({
				ruleType: data.ruleType,
				...attributes,
			});
		}
	}, [data, pattern, patternType, setTemplateData, usage]);

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		//사용자 계정 패턴 사용 여부 세팅
		setUsage(
			setUsageOptionByAttribute(
				data,
				'usage',
				policyOption.usage.use.key,
				policyOption.usage.none.key,
			),
		);
		//패턴 형식 default value 존재
		if (data?.patternType) setPatternType(data.patternType);
		//패턴 default value 존재
		if (data?.pattern) setPattern(data.pattern);
	}, [data, setPattern, setPatternType, setUsage]);

	return (
		<TemplateElementContainer
			title={userIdPattern.title}
			description={userIdPattern.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={userIdPattern.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={userIdPattern.contents.patternType.title}
							render={patternTypeRadioButton}
						/>
						<TemplateElement
							title={userIdPattern.contents.pattern.title}
							render={patternTextBox}
						/>
					</div>
				);
			}}
		/>
	);
};

UserIdPattern.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};
export default UserIdPattern;
