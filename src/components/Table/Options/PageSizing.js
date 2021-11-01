import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import Form from '../../RecycleComponents/New/Form';
import ComboBox from '../../RecycleComponents/New/ComboBox';

const PageSizing = ({pageSize, setPageSize}) => {
	const formRef = useRef(null);

	return (
		<Form
			initialValues={{page: `${pageSize} 행`}}
			onSubmit={(data) => {
				console.log(data);
				setPageSize(data.page);
			}}
			innerRef={formRef}
		>
			<ComboBox
				type={'drop'}
				width={'90px'}
				name='page'
				options={[
					{value: 20, label: '20 행'},
					{value: 50, label: '50 행'},
					{value: 100, label: '100 행'},
				]}
				innerRef={formRef}
			/>
		</Form>
	);
};

PageSizing.propTypes = {
	pageSize: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
};

export default PageSizing;
