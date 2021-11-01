import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import Form from '../../RecycleComponents/New/Form';
import TextBox from '../../RecycleComponents/New/TextBox';
import {searchIcon} from '../../../icons/icons';
import {Icon} from '../../../styles/components/icons';

function Search({tableKey}) {
	const ref = useRef(null);
	const handleSubmit = (data) => {
		console.log('api');
		console.log('tableKey', tableKey);
		console.log('data', data);
	};

	return (
		<Form
			onSubmit={handleSubmit}
			innerRef={ref}
			initialValues={{search: ''}}
		>
			<TextBox
				front={
					<Icon size={'sm'} margin_right={'0px'}>
						{searchIcon}
					</Icon>
				}
				name={'search'}
			/>
		</Form>
	);
}
Search.propTypes = {
	tableKey: PropTypes.string,
};
export default Search;
