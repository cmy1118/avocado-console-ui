import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';

import {tableSearchSelectOptions} from '../../../../utils/data';
import Form from '../../../RecycleComponents/New/Form';
import ComboBox from '../../../RecycleComponents/New/ComboBox';
import {Label} from '../../../../styles/components/text';

const placeholders = {
	status: '계정상태',
	authType: '인증유형',
	MFA: 'MFA',
};

const SelectionOption = ({column: {filterValue, setFilter, id}}) => {
	const ref = useRef(null);
	// const onChangeOption = useCallback(
	// 	(e) => {
	// 		setFilter(e.target.value);
	// 	},
	// 	[setFilter],
	// );

	return (
		<Form
			initialValues={{[id]: ''}}
			onSubmit={(data) => console.log(data)}
			innerRef={ref}
		>
			<Label>{placeholders[id]}</Label>
			<ComboBox
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

SelectionOption.propTypes = {column: PropTypes.object.isRequired};

export default SelectionOption;
