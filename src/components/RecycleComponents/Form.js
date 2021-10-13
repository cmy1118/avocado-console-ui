import React, {useEffect} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as yup from 'yup';

export const _Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Form = ({id, schema = {}, children, onSubmit, watcher}) => {
	const {
		register,
		formState: {errors, isSubmitSuccessful},
		handleSubmit,
		reset,
		watch,
	} = useForm({resolver: yupResolver(yup.object().shape(schema))});

	useEffect(() => {
		if (!watcher) return;
		// throttle or debounce 작업이 필요할 듯.
		const subscription = watch((value) => {
			watcher(value);
		});
		return () => subscription?.unsubscribe();
	}, [watch]);

	useEffect(() => {
		if (isSubmitSuccessful) reset();
	}, [isSubmitSuccessful, reset]);

	return (
		<_Form id={id} onSubmit={handleSubmit(onSubmit)}>
			{React.Children.map(children, (child) => {
				return child?.props?.name
					? React.createElement(child.type, {
							...{
								...child.props,
								register: register,
								errors: errors,
								key: child.props.name,
							},
					  })
					: child;
			})}
		</_Form>
	);
};

Form.propTypes = {
	id: PropTypes.string,
	children: PropTypes.array,
	schema: PropTypes.object,
	onSubmit: PropTypes.func,
	watcher: PropTypes.func,
};

export default Form;
