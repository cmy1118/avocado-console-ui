import React from 'react';
import PropTypes from 'prop-types';
import {searchIcon} from '../../../../icons/icons';
import {Icon} from '../../../../styles/components/icons';
import {placeholders} from './SearchConstants';
import RHF_Textbox from '../../../RecycleComponents/ReactHookForm/RHF_Textbox';
import {FormProvider, useForm} from 'react-hook-form';

/******************************************************
 * Table string 검색을 위한 컴포넌트
 *
 * @param tableKey :테이블키
 * @param setGlobalFilter :react-table 제공함수 , string 검색기능
 *******************************************************/
function StrSearch({tableKey, setGlobalFilter}) {
	const handleSubmit = (data) => {
		console.log('검색:', data['search'].trim());
		setGlobalFilter(data['search'].trim());
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
StrSearch.propTypes = {
	tableKey: PropTypes.string,
	setGlobalFilter: PropTypes.func,
};
export default StrSearch;
