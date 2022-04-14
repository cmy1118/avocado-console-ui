import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../RecycleComponents/ReactHookForm/CheckBox';
import styled from 'styled-components';
import AllCheckBox from '../RecycleComponents/ReactHookForm/AllCheckBox';

const _CheckboxContainer = styled.div`
	height: 32px;
	display: flex;
	align-items: center;
	padding: 0px 10px;
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
	cursor: pointer;
`;

// eslint-disable-next-line react/display-name
const TableColumnFilterContextMenu = ({allColumns}) => {
	const filteredList = useMemo(() => {
		return allColumns.filter(
			(v) => !v.disableChangeVisible && v.id !== 'selection',
		);
	}, [allColumns]);

	return (
		<>
			<_CheckboxContainer>
				<AllCheckBox
					name={'columnFilters'}
					values={filteredList.map((column) => column.id)}
					label={'모두 선택'}
				/>
			</_CheckboxContainer>
			<div
				style={{
					width: '100%',
					height: '1px',
					background: '#e3e5e5',
				}}
			/>
			{filteredList.map((column) => (
				<_CheckboxContainer key={column.id}>
					<CheckBox
						name={'columnFilters'}
						value={column.id}
						label={column.Header}
					/>
				</_CheckboxContainer>
			))}
		</>
	);
};
TableColumnFilterContextMenu.propTypes = {
	allColumns: PropTypes.array.isRequired,
};
export default TableColumnFilterContextMenu;
