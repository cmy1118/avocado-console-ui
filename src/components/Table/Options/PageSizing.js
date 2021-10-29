import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ComboBox from '../../RecycleComponents/ComboBox';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	.focus {
		border-color: #4ca6a8;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	height: 32px;
	min-width: 90px;
	border-radius: 4px;
	border: solid 1px #e3e5e5;
	background: white;
	padding: 6px 4px 6px 10px;
`;

const PageSizing = ({pageSize, setPageSize}) => {
	const [isOpened, setIsOpened] = useState(false);
	const [value, setValue] = useState({
		value: pageSize,
		label: `${pageSize} 행`,
	});

	useEffect(() => {
		setPageSize(value.value);
	}, [setPageSize, value]);

	return (
		<ComboBox
			isOpened={isOpened}
			setIsOpened={setIsOpened}
			title={value.label}
			value={value.value}
			setValue={setValue}
			options={[
				{value: 20, label: '20 행'},
				{value: 50, label: '50 행'},
				{value: 100, label: '100 행'},
			]}
			width={'120px'}
		/>
	);
};

PageSizing.propTypes = {
	pageSize: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
};

export default PageSizing;
