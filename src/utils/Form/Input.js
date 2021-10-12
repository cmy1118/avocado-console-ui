import React, {useRef} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import PropTypes from 'prop-types';

const Input = ({name, register, errors, placeholder}) => {
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

Input.propTypes = {
	name: PropTypes.string.isRequired,
	register: PropTypes.func,
	errors: PropTypes.object,
	control: PropTypes.object,
	placeholder: PropTypes.string,
};

export default Input;
