import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import Form from '../../../../RecycleComponents/New/Form';
import ComboBox from '../../../../RecycleComponents/New/ComboBox';
import {placeholders, tableSearchSelectOptions} from "./searchFiltersBox";

/****************************************************************************************
 * 컬럼 필터 사용하기위한 요소 추가 옵션
 *
 * path : src/components/Table/Options/Search/searchFiltersBox.js
 ****************************************************************************************/
const SelectionOption = ({column: {setFilter, id}}) => {
	const ref = useRef(null);

	return (
		<Form
			initialValues={{[id]: ''}}
			onSubmit={(data) => setFilter(data[id])}
			innerRef={ref}
		>
			<ComboBox
				width={'170px'}
				name={id}
				header={placeholders[id]}
				options={tableSearchSelectOptions[id].map((v) => ({
					value: v.value,
					label: v.label,
				}))}
				innerRef={ref}
			/>
		</Form>
	);
};

SelectionOption.propTypes = {
	column: PropTypes.object.isRequired,
};

export default SelectionOption;
