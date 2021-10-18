import React, {useEffect} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as yup from 'yup';

// export const _Form = styled.form`
// 	display: flex;
// 	flex-direction: column;
// `;

const Form = ({id, schema = {}, children, onSubmit}) => {
	const {
		register,
		formState: {errors, isSubmitSuccessful},
		handleSubmit,
		reset,
		watch,
		control,
	} = useForm({resolver: yupResolver(yup.object().shape(schema))});

	useEffect(() => {
		if (isSubmitSuccessful) reset();
	}, [isSubmitSuccessful, reset]);

	return (
		<form id={id} onSubmit={handleSubmit(onSubmit)}>
			{React.Children.map(children, (child) => {
				return child?.props?.name
					? React.createElement(child.type, {
							...{
								...child.props,
								register: register,
								errors: errors,
								watch: watch,
								control: control,
								key: child.props.name,
							},
					  })
					: child;
			})}
		</form>
	);
};

Form.propTypes = {
	id: PropTypes.string,
	children: PropTypes.array,
	schema: PropTypes.object,
	onSubmit: PropTypes.func,
};

export default Form;