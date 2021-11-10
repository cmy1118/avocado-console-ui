import React, {useRef} from 'react';

import PropTypes from 'prop-types';
import Form from '../../../RecycleComponents/New/Form';
import TextBox from '../../../RecycleComponents/New/TextBox';
import {Span} from '../../../../styles/components/text';

const TextBoxOption = ({column: {setFilter, id}}) => {
	const ref = useRef(null);

	return (
		<Form
			initialValues={{[id]: 0}}
			onSubmit={(data) => setFilter(data[id])}
			innerRef={ref}
		>
			<TextBox
				width={'170px'}
				name={id}
				type={'number'}
				back={<Span>일전</Span>}
			/>
		</Form>
	);
};

TextBoxOption.propTypes = {column: PropTypes.object.isRequired};

export default TextBoxOption;
