import React, {useEffect} from 'react';
import TemplateElement from '../../TemplateElement';
import {
	patternFormatOptions,
	usageOptions,
} from '../../../../../../utils/options';
import TemplateElementContainer from '../../TemplateElementContainer';
import useRadio from '../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../hooks/useTextBox';
import PropTypes from 'prop-types';
import UserAccountPatternTemplate from '../UserAccountPatternTemplate';

const userIdPattern = {
	title: '사용자 ID 패턴',
	description: [
		'사용자 ID에 특정 패턴을 설정합니다.',
		'패턴 최대 길이는 3~10자 로 제한 하며 특수문자 사용은 할수 없습니다',
	],
	contents: {
		usage: {
			title: '사용 여부',
			options: {use: '사용함', nonuse: '사용 안함'},
		},
		patternFormat: {
			title: '패턴 형식',
			options: {prefix: '접두사', suffix: '접미사'},
		},
		patternInput: {
			title: '패턴 입력',
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 계정 패턴(사용자 ID 패턴) 폼
 **************************************************/
const UserIdPattern = ({data}) => {
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'usage',
		options: usageOptions,
	});
	const [
		patternFormat,
		patternFormatRadioButton,
		setPatternFormat,
	] = useRadio({
		name: 'patternFormat',
		options: patternFormatOptions,
	});
	const [patternInput, patternInputTextBox, setPatternInput] = useTextBox({
		name: 'patternInput',
	});

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(data?.attribute, 'usage')
		) {
			setUsage(
				data.attribute.usage
					? usageOptions[0].key
					: usageOptions[1].key,
			);
			if (data.attribute.usage) {
				if (data.attribute.pattern)
					setPatternInput(data.attribute.pattern);

				if (data.attribute.patternType) {
					setPatternFormat(data.attribute.patternType);
				}
			}
		}
	}, [data]);
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
							title={userIdPattern.contents.patternFormat.title}
							render={patternFormatRadioButton}
						/>
						<TemplateElement
							title={userIdPattern.contents.patternInput.title}
							render={patternInputTextBox}
						/>
					</div>
				);
			}}
		/>
	);
};

UserIdPattern.propTypes = {
	data: PropTypes.object,
};
export default UserIdPattern;
