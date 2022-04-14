import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {RowDiv} from '../../../../styles/components/style';
import {FormProvider, useForm} from 'react-hook-form';
import RHF_Combobox from '../../../RecycleComponents/ReactHookForm/RHF_Combobox';

const Border = styled.div`
	width: 1px;
	height: 24px;
	background: #e3e5e5;
	margin: auto;
`;

const PageSizing = ({pageSize, setPageSize}) => {
	const methods = useForm({
		defaultValues: {
			page: pageSize,
		},
	});

	return (
		<FormProvider {...methods}>
			<RowDiv>
				<RHF_Combobox
					width={90}
					name='page'
					options={[
						{value: 10, label: '10행'},
						{value: 20, label: '20행'},
						{value: 50, label: '50행'},
						{value: 100, label: '100행'},
					]}
					onSubmit={methods.handleSubmit((data) =>
						setPageSize(data.page),
					)}
				/>
				<Border />
			</RowDiv>
		</FormProvider>
	);
};

PageSizing.propTypes = {
	pageSize: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
};

export default PageSizing;
