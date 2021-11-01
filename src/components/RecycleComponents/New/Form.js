import React from 'react';
import * as formik from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import FormikErrorFocus from 'formik-error-focus';

const Form = ({
	initialValues,
	onSubmit,
	setValues,
	innerRef,
	validation,
	children,
}) => {
	return (
		<formik.Formik
			initialValues={initialValues} // 초기값
			onSubmit={(values, {setSubmitting}) => {
				onSubmit(values); // values submit 처리
				setSubmitting(false);
			}}
			validate={(values) => {
				setValues && setValues(values); // 외부에서 데이터 변화 감지해야 하는 경우
			}}
			innerRef={innerRef} // submit control 할 때
			validationSchema={Yup.object(validation)}
		>
			{() => (
				<formik.Form>
					{React.Children.map(children, (child) => {
						return child;
					})}
					<FormikErrorFocus
						// See scroll-to-element for configuration options: https://www.npmjs.com/package/scroll-to-element
						offset={0}
						align={'middle'}
						focusDelay={200}
						ease={'linear'}
						duration={500}
					/>
				</formik.Form>
			)}
		</formik.Formik>
	);
};

Form.propTypes = {
	initialValues: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	innerRef: PropTypes.object.isRequired,
	setValues: PropTypes.func,
	validation: PropTypes.object,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Form;
