import React, {useEffect} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import PropTypes from 'prop-types';
import {useWatch} from 'react-hook-form';

const FormComboBox = ({
	name,
	register,
	errors,
	placeholder,
	options,
	setValue,
	control,
}) => {
	const value = useWatch({name, control});
	useEffect(() => {
		if (setValue) setValue(value);
	}, [value]);
	return (
		<>
			<select {...register(name)}>
				<option value='' hidden>
					{placeholder}
				</option>
				{options.map((v) => (
					<option key={v.value} value={v.value}>
						{v.name}
					</option>
				))}
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

FormComboBox.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	register: PropTypes.func,
	watch: PropTypes.func,
	setValue: PropTypes.func,
	errors: PropTypes.object,
	control: PropTypes.object,
};

export default FormComboBox;
