import React from 'react';

import PropTypes from 'prop-types';
import {FormProvider, useForm} from 'react-hook-form';
import {Icon} from '../../../../styles/components/icons';
import {searchIcon} from '../../../../icons/icons';
import RHF_Textbox from '../../../RecycleComponents/ReactHookForm/RHF_Textbox';

const TextBoxOption = ({column: {setFilter, id}}) => {
	const methods = useForm();

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit((data) => setFilter(data[id]))}
			>
				<RHF_Textbox
					name={id}
					front={
						<Icon size={'sm'} margin_right={'0px'}>
							{searchIcon}
						</Icon>
					}
				/>
			</form>
		</FormProvider>
		// <Form
		// 	initialValues={{[id]: 0}}
		// 	onSubmit={(data) => setFilter(data[id])}
		// 	innerRef={ref}
		// >
		// 	<TextBox
		// 		width={'170px'}
		// 		name={id}
		// 		type={'number'}
		// 		back={<Span>일전</Span>}
		// 	/>
		// </Form>
	);
};

TextBoxOption.propTypes = {column: PropTypes.object.isRequired};

export default TextBoxOption;
