import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import Form from '../../../RecycleComponents/New/Form';
import TextBox from '../../../RecycleComponents/New/TextBox';
import {searchIcon} from '../../../../icons/icons';
import {Icon} from '../../../../styles/components/icons';
import {placeholders} from './SearchConstants';

/******************************************************
 * Table string 검색을 위한 컴포넌트
 *
 * @param tableKey :테이블키
 * @param setGlobalFilter :react-table 제공함수 , string 검색기능
 *******************************************************/
function StrSearch({tableKey, setGlobalFilter}) {
	const ref = useRef(null);
	const handleSubmit = (data) => {
		console.log('검색:', data['search'].trim());
		setGlobalFilter(data['search'].trim());
	};
	return (
		<Form
			onSubmit={handleSubmit}
			innerRef={ref}
			initialValues={{search: ''}}
		>
			<TextBox
				placeholder={placeholders[tableKey]}
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
StrSearch.propTypes = {
	tableKey: PropTypes.string,
	setGlobalFilter: PropTypes.func,
};
export default StrSearch;
