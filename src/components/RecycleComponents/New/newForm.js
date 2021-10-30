import React from 'react';
import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';

const NewForm = ({initialValues, onSubmit, submitKey, children}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, {setSubmitting}) => {
				onSubmit(values);
				setSubmitting(false);
			}}
		>
			{() => (
				<Form id={submitKey}>
					{React.Children.map(children, (child) => {
						return child;
					})}
				</Form>
			)}
		</Formik>
	);
};

NewForm.propTypes = {
	submitKey: PropTypes.string.isRequired,
	initialValues: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
		.isRequired,
};

export default NewForm;
