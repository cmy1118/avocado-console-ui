import React from 'react';
import PropTypes from 'prop-types';
import {searchIcon} from '../../../../icons/icons';
import {Icon} from '../../../../styles/components/icons';
import {placeholders} from './SearchConstants';
import {FormProvider, useForm} from 'react-hook-form';
import RHF_Textbox from '../../../RecycleComponents/ReactHookForm/RHF_Textbox';

/******************************************************
 * Table API 검색을 위한 컴포넌트
 *
 * @param tableKey :테이블키
 * @param setSearch :Table 조회를 위한 textBox 값변경 함수
 *******************************************************/
function Search({tableKey, setSearch}) {
	const handleSubmit = (data) => {
		console.log('검색:', data['search'].trim());
		setSearch(data['search'].trim());
	};

	const methods = useForm();

	return (
		<FormProvider {...methods}>
			<RHF_Textbox
				placeholder={placeholders[tableKey]}
				front={
					<Icon size={'sm'} margin_right={'0px'}>
						{searchIcon}
					</Icon>
				}
				name={'search'}
				onSubmit={methods.handleSubmit(handleSubmit)}
			/>
		</FormProvider>
	);
}
Search.propTypes = {
	tableKey: PropTypes.string,
	setGlobalFilter: PropTypes.func,
	setSearch: PropTypes.func,
};
export default Search;
