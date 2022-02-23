import React, {useState} from 'react';

const useTemplateInput = ({unitName}) => {
	const [value, setValue] = useState('');

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
