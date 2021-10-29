import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Icon} from '../../styles/components/icons';
import {searchIcon} from '../../icons/icons';
import {Input} from '../../styles/components/input';
import PropTypes from 'prop-types';

const Container = styled.div`
	.focus {
		border-color: #4ca6a8;
	}
`;
const _Input = styled(Input)`
	display: flex;
	flex: 1;
	border: none;
	background: transparent;
`;

const SubContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 6px 10px;
	font-family: NotoSansCJKKR;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.43;
	letter-spacing: 0.25px;
	text-align: left;
	font-color: #757575;
	box-sizing: border-box;
	border-radius: 4px;
	border: solid 1px #e3e5e5;
	height: 34px;
	width: ${(props) => props.width || '580px'};
	background-color: ${(props) =>
		props.back === 'gray' ? '#f0f3f6' : '#fff'};
`;

const _Icon = styled(Icon)`
	color: #959ea1;
`;

const SearchInput = ({value, onChange, placeholder, width, back}) => {
	const onFocusContainer = useCallback((e) => {
		e.target.parentElement.classList.add('focus');
	}, []);
	const onBlurContainer = useCallback((e) => {
		e.target.parentElement.classList.remove('focus');
	}, []);

	return (
		<Container>
			<SubContainer back={back}>
				<_Icon size={'sm'} margin_right={'0px'}>
					{searchIcon}
				</_Icon>
				<_Input
					onFocus={onFocusContainer}
					onBlur={onBlurContainer}
					type={'search'}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					width={width}
				/>
			</SubContainer>
		</Container>
	);
};

SearchInput.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	width: PropTypes.string,
	back: PropTypes.oneOf(['gray', 'white']),
};

export default SearchInput;
