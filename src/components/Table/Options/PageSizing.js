import React from 'react';
import PropTypes from 'prop-types';
import NewForm from '../../RecycleComponents/New/newForm';
import NewComboBox from '../../RecycleComponents/New/NewComboBox';

const PageSizing = ({pageSize, setPageSize}) => {
	return pageSize ? (
		<NewForm
			submitKey={'PageSizingKey'}
			initialValues={{page: `${pageSize} 행`}}
			onSubmit={(data) => {
				console.log(data);
				setPageSize(parseInt(data.page));
			}}
		>
			<NewComboBox
				width={'90px'}
				name='page'
				options={[
					{value: 20, label: '20 행'},
					{value: 50, label: '50 행'},
					{value: 100, label: '100 행'},
				]}
				submitKey={'PageSizingKey'}
			/>
		</NewForm>
	) : (
		<></>
	);
};

PageSizing.propTypes = {
	pageSize: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
};

export default PageSizing;
