import React, {useCallback, useRef, useState} from 'react';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import {Icon} from '../../../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../../../icons/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useRootClose} from 'react-overlays';
import {ErrorMessageText} from '../../../styles/components/text';

const _Container = styled.div`
	background: #fff;
	cursor: pointer;
	.focus {
		border-color: #4ca6a8;
	}
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	width: 100%;
	font-size: 14px;
	height: 32px;
	box-sizing: border-box;
`;

const IconHeader = styled(_Header)`
	justify-content: space-between;
	width: ${(props) => props.width || '192px'};
	border-radius: 4px;
	border: solid 1px #e3e5e5;
	padding: 6px 10px;
	background: white;
`;

const Option = styled.option`
	// width: ${(props) => props.width};
	height: 32px;
	width: 100%;
	display: flex;
	align-items: center;
	background: ${(props) => props.current && 'rgba(228, 243, 244, 0.7)'};
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
	cursor: pointer;
	font-size: 14px;
	cursor: pointer;
	padding: 5px 10px;
	box-sizing: border-box;
`;

const HeaderOption = styled(Option)`
	padding-left: 6px;
	&:hover {
		background: transparent;
	}
`;

const OptionContainer = styled.div`
	z-index: 99;
	position: absolute;
	width: ${(props) => props.width || '192px'};
	border-radius: 4px;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.19);
	background-color: #fff;
`;

//ErrorMessageText.propTypes = {children: PropTypes.node};
const ComboBox = ({type = 'normal', ...props}) => {
	const ref = useRef();
	const {setFieldValue, errors, touched} = useFormikContext();
	const [field, meta] = useField(props);
	const [isOpened, setIsOpened] = useState(false);

	const onClickOption = useCallback(
		(e) => {
			setFieldValue(
				props.name,
				isNaN(parseInt(e.target.value))
					? e.target.value
					: parseInt(e.target.value),
			);
			// option 클릭시 바로 submit 하고싶은 경우 innerRef를 넣어준다
			if (props.innerRef) props.innerRef.current.handleSubmit();
			setIsOpened(false);
		},
		[props, setFieldValue],
	);

	useRootClose(ref, () => setIsOpened(false), {
		disabled: !isOpened,
	});

	return (
		<_Container>
			{type === 'drop' ? (
				<_Header
					onClick={() => setIsOpened(!isOpened)}
					className={isOpened && ' focus'}
				>
					{props.header ||
						props.options.find((v) => v.value === field.value)
							?.label ||
						field.value}
				</_Header>
			) : (
				<IconHeader
					width={props.width}
					onClick={() => setIsOpened(!isOpened)}
					className={isOpened && ' focus'}
				>
					<HeaderOption {...field}>
						{props.options.find((v) => v.value === field.value)
							? props.options.find((v) => v.value === field.value)
									.label
							: props.header}
					</HeaderOption>
					{isOpened ? (
						<Icon margin={'0px'}>{arrowUpIcon}</Icon>
					) : (
						<Icon margin={'0px'}>{arrowDownIcon}</Icon>
					)}
				</IconHeader>
			)}
			{touched[field.name] && errors[field.name] ? (
				<ErrorMessage name={field.name}>
					{(msg) => <ErrorMessageText>{msg}</ErrorMessageText>}
				</ErrorMessage>
			) : null}
			{isOpened && (
				<OptionContainer ref={ref} width={props.width}>
					{props.options.map((v, i) => {
						return (
							<Option
								onClick={onClickOption}
								key={i}
								current={
									v.value === field.value ||
									v.label === field.value
									// && type === 'normal'
								}
								{...field}
								value={v.value}
							>
								{v.label}
							</Option>
						);
					})}
				</OptionContainer>
			)}
		</_Container>
	);
};

ComboBox.propTypes = {
	name: PropTypes.string,
	header: PropTypes.any,
	type: PropTypes.oneOf(['drop', 'normal']),
	options: PropTypes.array,
	width: PropTypes.string,
	innerRef: PropTypes.object,
};
export default ComboBox;
