import React from 'react';
import PropTypes from 'prop-types';
import {FormProvider, useForm} from 'react-hook-form';
import RHF_Combobox from '../../../../RecycleComponents/ReactHookForm/RHF_Combobox';
import {placeholders, tableSearchSelectOptions} from './searchFiltersBox';

/****************************************************************************************
 * 컬럼 필터 사용하기위한 요소 추가 옵션
 *
 * path : src/components/Table/Options/Search/searchFiltersBox.js
 ****************************************************************************************/
const SelectionOption = ({column: {setFilter, id}}) => {
	const methods = useForm();

	return (
		<FormProvider {...methods}>
			<RHF_Combobox
				width={170}
				name={id}
				header={placeholders[id]}
				options={tableSearchSelectOptions[id].map((v) => ({
					value: v.value,
					label: v.label,
				}))}
				onSubmit={methods.handleSubmit((data) => setFilter(data[id]))}
			/>
		</FormProvider>
	);
};

SelectionOption.propTypes = {
	column: PropTypes.object.isRequired,
};

export default SelectionOption;
