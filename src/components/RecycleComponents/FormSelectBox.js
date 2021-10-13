import React from 'react';
import {ErrorMessage} from '@hookform/error-message';
import PropTypes from 'prop-types';

const FormSelectBox = ({
	name,
	register,
	errors,
	placeholder,
	options,
	...rest
}) => {
	return (
		<select {...register(name)} {...rest}>
			<option value=''>{placeholder}</option>
			{options.map((v) => (
				<option key={v.value} value={v.value}>
					{v.name}
				</option>
			))}
		</select>
	);
};

FormSelectBox.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	register: PropTypes.func,
	errors: PropTypes.object,
	control: PropTypes.object,
};

export default FormSelectBox;
