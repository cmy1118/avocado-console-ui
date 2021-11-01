import React, {useCallback, useRef} from 'react';

import PropTypes from 'prop-types';
import Form from '../../../RecycleComponents/New/Form';
import TextBox from '../../../RecycleComponents/New/TextBox';
import {Label} from '../../../../styles/components/text';

const placeholders = {
	passwordExpiryTime: '비밀번호 수명',
};

const TextBoxOption = ({column: {filterValue, setFilter, id}}) => {
	const ref = useRef(null);

	// const onChangeOption = useCallback(
	// 	(e) => {
	// 		if (e.target.value === '') setFilter(undefined);
	// 		else setFilter(e.target.value);
	// 	},
	// 	[setFilter],
	// );

	return (
		<Form
			initialValues={{[id]: 0}}
			onSubmit={(data) => console.log(data)}
			innerRef={ref}
		>
			<Label>{placeholders[id]}</Label>
			<TextBox name={id} type={'number'} back={<span>일전</span>} />
		</Form>
	);
};

TextBoxOption.propTypes = {column: PropTypes.object.isRequired};

export default TextBoxOption;
