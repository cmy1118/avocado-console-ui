import React, {useCallback, useRef, useState} from 'react';

import Form from '../../../../../RecycleComponents/New/Form';
import TemplateElement from '../../TemplateElement';
import RadioButton from '../../../../../RecycleComponents/Form/RadioButton';
import {
	patternFormatOptions,
	usageOptions,
} from '../../../../../../utils/options';
import TemplateElementContainer from '../../TemplateElementContainer';
import useRadio from '../../../../../../hooks/useRadio';

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

const UserIdPattern = () => {
	const [usage, usageRadioButton] = useRadio({
		name: 'usage',
		options: usageOptions,
	});
	const [patternFormat, patternFormatRadioButton] = useRadio({
		name: 'patternFormat',
		options: patternFormatOptions,
	});

	const [values, setValues] = useState({
		patternFormat: '',
		patternInput: '',
	});

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
					</div>
				);
			}}
		/>
	);
};

export default UserIdPattern;
