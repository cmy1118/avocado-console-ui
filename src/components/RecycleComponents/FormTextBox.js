import React, {useEffect} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useWatch} from 'react-hook-form';

const Container = styled.div`
	display: flex;
`;

const FormTextBox = ({
	name,
	register,
	errors,
	control,
	setValue,
	placeholder,
	defaultValue,
	label,
	children,
}) => {
	const value = useWatch({name, control});

	useEffect(() => {
		if (setValue) setValue(value);
	}, [setValue, value]);

	return (
		<Container>
			{label && <label htmlFor={name}>{label}</label>}
			<input
				value={defaultValue}
				readOnly={defaultValue}
				placeholder={placeholder}
				{...register(name)}
			/>
			<ErrorMessage errors={errors} name={name}>
				{({messages}) =>
					messages &&
					Object.entries(messages).map(([type, message]) => (
						<p key={type}>{message}</p>
					))
				}
			</ErrorMessage>
			{React.Children.map(children, (child) => {
				return child;
			})}
		</Container>
	);
};

FormTextBox.propTypes = {
	name: PropTypes.string.isRequired,
	register: PropTypes.func,
	errors: PropTypes.object,
	control: PropTypes.object,
	setValue: PropTypes.func,
	placeholder: PropTypes.string,
	defaultValue: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FormTextBox;
