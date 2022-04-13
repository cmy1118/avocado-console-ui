import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import Form from '../../../RecycleComponents/New/Form';
import TextBox from '../../../RecycleComponents/New/TextBox';
import {searchIcon} from '../../../../icons/icons';
import {Icon} from '../../../../styles/components/icons';
import {placeholders} from './SearchConstants';

/******************************************************
 * Table API 검색을 위한 컴포넌트
 *
 * @param tableKey :테이블키
 * @param setSearch :Table 조회를 위한 textBox 값변경 함수
 *******************************************************/
function Search({tableKey, setSearch}) {
	const ref = useRef(null);
	const handleSubmit = (data) => {
		console.log('검색:', data['search'].trim());
		setSearch(data['search'].trim());
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
Search.propTypes = {
	tableKey: PropTypes.string,
	setGlobalFilter: PropTypes.func,
	setSearch: PropTypes.func,
};
export default Search;
