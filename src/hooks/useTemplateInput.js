import React, {useState} from 'react';

/**************************************************
 * seob - 템플릿의 input text 양식 폼
 *
 * unitName: input의 단위 명 ex) ~일, ~초 ...
 * initialValue: 초기값
 ***************************************************/
const useTemplateInput = ({unitName, initialValue}) => {
	// input value
	const [value, setValue] = useState(initialValue || '');

	const templateInput = () => (
		<label>
			<input
				type='text'
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			{unitName}
		</label>
	);
	return [value, templateInput];
};

export default useTemplateInput;
