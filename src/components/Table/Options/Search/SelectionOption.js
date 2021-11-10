import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import {tableSearchSelectOptions} from '../../../../utils/data';
import Form from '../../../RecycleComponents/New/Form';
import ComboBox from '../../../RecycleComponents/New/ComboBox';

const placeholders = {
	status: '계정상태',
	authType: '인증유형',
	MFA: 'MFA',
	passwordExpiryTime: '비밀번호 수명',
	roleType: '역할 유형',
};

const SelectionOption = ({column: {setFilter, id}}) => {
	const ref = useRef(null);

	return (
		<Form
			initialValues={{[id]: ''}}
			onSubmit={(data) => setFilter(data[id])}
			innerRef={ref}
		>
			<ComboBox
				width={'170px'}
				name={id}
				header={placeholders[id]}
				options={tableSearchSelectOptions[id].map((v) => ({
					value: v.value,
					label: v.label,
				}))}
				innerRef={ref}
			/>
		</Form>
	);
};

SelectionOption.propTypes = {
	column: PropTypes.object.isRequired,
};

export default SelectionOption;
