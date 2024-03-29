import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const _Container = styled.div`
	height: ${(props) => (props.error ? '70px' : '100%')};
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
`;

const ErrorMessageText = styled.span`
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.75;
	letter-spacing: 0.1px;
	text-align: left;
	color: #f34722;
	white-space: nowrap;
	position: absolute;
	top: 50px;
`;

const Input = styled.input`
	display: flex;
	width: 100%;
	align-items: center;
	font-size: 13px;
	// height: 32px;
	border: none;
	background: ${(props) => (props.disabled ? '#f8f9fa' : 'transparent')};
	box-sizing: border-box;
	outline: none;
	&::-webkit-input-placeholder {
		color: ${(props) => (props.placeholder_text_color ? '#D7D7D7' : '')};
	}
`;

const SubContainer = styled.div`
	display: flex;
	align-items: ${(props) =>
		props?.direction === 'col' ? 'initial' : 'center'};
	flex-direction: ${(props) =>
		props?.direction === 'col' ? 'column' : 'row'};
	padding: 6px 10px;
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
	border: ${(props) => props.isFocused && 'solid 1px'};
	border-color: ${(props) =>
		props.error ? '#d45959' : props.isFocused ? '#4ca6a8' : '#e3e5e5'};
	height: 32px;
	width: ${(props) => props.width + 'px'};
	background: ${(props) => (props.disabled ? '#f8f9fa' : 'white')};
`;

const TableTextBox = ({cell, isEditable = true, yup}) => {
	const [value, setValue] = useState(cell.value || '');
	const [errorMessage, setErrorMessage] = useState('');
	const [isFocused, setIsFocused] = useState(false);

	// console.log('==============');
	// console.log(cell.row.index);
	// console.log(cell.row.original[cell.column.id]);
	// console.log(cell.rows.map((v) => v.original));

	const handleChange = useCallback((e) => {
		const {value} = e.target;
		setValue(value);
	}, []);

	const handleFocus = useCallback((e) => {
		setIsFocused(true);
	}, []);

	const handleBlur = useCallback(() => {
		console.log(value);

		const data = cell.rows.map((v, i) => {
			if (i === cell.row.index)
				return {...v.original, [cell.column.id]: value};
			else return v.original;
		});

		cell.setData(data);
		setIsFocused(false);
	}, [cell, value]);

	const handleKeyDown = useCallback(
		(e) => {
			// tab key를 누른경우
			let key = '';
			let toggle = false;
			if (e.keyCode === 9) {
				for (const k of Object.keys(cell.tableRefs.current)) {
					if (k === `${cell.row.index}/${cell.column.id}`) {
						toggle = true;
						continue;
					}
					if (toggle) {
						key = k;
						break;
					}
				}
			}
			console.log(key);
			if (key !== '') cell.tableRefs.current[key].click();
		},
		[cell.column.id, cell.row.index, cell.tableRefs],
	);

	useEffect(() => {
		const validate = async () => {
			try {
				await yup.validate(value, {abortEarly: false});
				setErrorMessage('');
			} catch (err) {
				err.inner.forEach((e) => {
					setErrorMessage(e.message);
				});
			}
		};
		yup && validate();
	}, [value, yup]);

	useEffect(() => {
		console.log(cell.tableRefs.current);
		for (let v of Object.values(cell.tableRefs.current)) {
			if (!v) return;
			if (v.value === '') {
				v.focus();
				return;
			}
		}
	}, [cell.tableRefs]);

	return (
		<_Container error={errorMessage !== ''}>
			<SubContainer error={errorMessage !== ''} isFocused={isFocused}>
				<Input
					name={cell.column.id}
					value={value}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					readOnly={!isEditable && !cell.row.original.new}
					{...(cell.tableRefs && {
						ref: (ele) =>
							(cell.tableRefs.current[
								`${cell.row.index}/${cell.column.id}`
							] = ele),
					})}
				/>
			</SubContainer>
			{errorMessage !== '' && (
				<ErrorMessageText>{errorMessage}</ErrorMessageText>
			)}
		</_Container>
	);
};

TableTextBox.propTypes = {
	cell: PropTypes.object.isRequired,
	isEditable: PropTypes.bool,
	yup: PropTypes.object,
};

export default TableTextBox;
