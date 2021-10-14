import React, {useEffect} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import PropTypes from 'prop-types';
import {useWatch} from 'react-hook-form';

const FormTextBox = ({
	name,
	register,
	errors,
	control,
	setValue,
	placeholder,
}) => {
	const value = useWatch({name, control});

	useEffect(() => {
		if (setValue) setValue(value);
	}, [setValue, value]);

	return (
		<>
			<input placeholder={placeholder} {...register(name)} />
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

FormTextBox.propTypes = {
	name: PropTypes.string.isRequired,
	register: PropTypes.func,
	errors: PropTypes.object,
	control: PropTypes.object,
	setValue: PropTypes.func,
	placeholder: PropTypes.string,
};

export default FormTextBox;
