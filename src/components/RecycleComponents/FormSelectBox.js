import React from 'react';
import {ErrorMessage} from '@hookform/error-message';
import PropTypes from 'prop-types';

const FormSelectBox = ({name, register, errors, options}) => {
	return (
		<>
			<select {...register(name)}>
				{options.map((v, i) => {
					return (
						<option key={i} value={v}>
							{v}
						</option>
					);
				})}
			</select>
			<ErrorMessage errors={errors} name={name}>
				{({messages}) =>
					messages &&
					Object.entries(messages).map(([type, message]) => (
						<p key={type}>{message}</p>
					))
				}
			</ErrorMessage>
		</>
	);
};

FormSelectBox.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	register: PropTypes.func,
	errors: PropTypes.object,
	control: PropTypes.object,
};

export default FormSelectBox;
