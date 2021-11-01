import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import Form from '../../RecycleComponents/New/Form';
import ComboBox from '../../RecycleComponents/New/ComboBox';
import styled from 'styled-components';
import {RowDiv} from '../../../styles/components/div';
import {Icon} from '../../../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../../../icons/icons';
import {Span} from '../../../styles/components/text';

const Border = styled.div`
	width: 1px;
	height: 24px;
	background: #e3e5e5;
	margin: auto;
`;

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
			<RowDiv padding={'6px 0px'}>
				<ComboBox
					header={
						<RowDiv>
							<Icon margin={'0px'}>{arrowDownIcon}</Icon>
							<Span
								color={'#556367'}
								margin={'0px 6px 0px 0px'}
								lineHeight={'25px'}
							>{`${pageSize}행`}</Span>
						</RowDiv>
					}
					type={'drop'}
					width={'90px'}
					name='page'
					options={[
						{value: 2, label: '2행'},
						{value: 20, label: '20행'},
						{value: 50, label: '50행'},
						{value: 100, label: '100행'},
					]}
					innerRef={formRef}
				/>
				<Border />
			</RowDiv>
		</Form>
	);
};

PageSizing.propTypes = {
	pageSize: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
};

export default PageSizing;
