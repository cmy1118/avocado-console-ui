import React from 'react';
import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';

const NewForm = ({initialValues, onSubmit, setValues, innerRef, children}) => {
	return (
		<Formik
			initialValues={initialValues} // 초기값
			onSubmit={(values, {setSubmitting}) => {
				onSubmit(values); // values submit 처리
				setSubmitting(false);
			}}
			validate={(values) => {
				setValues && setValues(values); // 외부에서 데이터 변화 감지해야 하는 경우
			}}
			innerRef={innerRef} // submit control 할 때
		>
			{() => (
				<Form>
					{React.Children.map(children, (child) => {
						return child;
					})}
				</Form>
			)}
		</Formik>
	);
};

NewForm.propTypes = {
	initialValues: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	innerRef: PropTypes.object,
	setValues: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default NewForm;
