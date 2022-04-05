import {useFormContext, Controller} from 'react-hook-form';
import React, {memo, useState} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import styled from 'styled-components';
import Select from 'react-select';
import {Icon} from '../../../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../../../icons/icons';
import PropTypes from 'prop-types';

const BoxContainer = styled.div`
	margin: 6px;
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
`;

// eslint-disable-next-line react/display-name
const NestedInput = memo(
	({
		name,
		control,
		formState: {errors},
		options,
		isDisabled,
		placeholder,
		width = 200,
	}) => {
		const [isMenuOpen, setIsMenuOpen] = useState(false);

		const dot = (color = 'transparent') => ({
			alignItems: 'center',
			display: 'flex',

			// ':before': {
			// 	backgroundColor: color,
			// 	borderRadius: 10,
			// 	content: '" "',
			// 	display: 'block',
			// 	marginRight: 8,
			// 	height: 10,
			// 	width: 10,
			// },
		});
		const brandColor = '#4ca6a8';

		const colourStyles = {
			menu: (base) => ({...base, width: width}),

			control: (base, state) => ({
				...base,
				background: state.isDisabled ? '#f8f9fa' : 'white',
				boxShadow: state.isFocused ? 0 : 0,
				borderColor: state.isFocused ? brandColor : base.borderColor,
				'&:hover': {
					borderColor: state.isFocused
						? brandColor
						: base.borderColor,
				},
				width: width,
			}),
			option: (styles, {data, isDisabled, isFocused, isSelected}) => {
				// const color = chroma(data.color);
				return {
					...styles,
					backgroundColor: isDisabled
						? undefined
						: isSelected
						? `rgba(228, 243, 244, 0.7)`
						: isFocused
						? // hover시
						  `rgba(0, 0, 0, 0.04)`
						: // color.alpha(0.1).css()
						  undefined,
					color: isDisabled
						? '#ccc'
						: isSelected
						? undefined
						: // ? chroma.contrast(color, 'white') > 2
						  // 	? 'white'
						  // 	: 'black'
						  data.color,
					cursor: isDisabled ? 'not-allowed' : 'default',

					':active': {
						...styles[':active'],
						backgroundColor: !isDisabled
							? isSelected
								? data.color
								: undefined
							: // : color.alpha(0.3).css()
							  undefined,
					},
				};
			},
			input: (styles) => ({...styles, ...dot()}),
			placeholder: (styles) => ({...styles, ...dot('#ccc')}),
			singleValue: (styles, {data}) => ({...styles, ...dot(data.color)}),
		};

		const onMenuOpen = () => setIsMenuOpen(true);
		const onMenuClose = () => setIsMenuOpen(false);

		return (
			<BoxContainer>
				<Controller
					name={name}
					control={control}
					render={({field}) => {
						return (
							<Select
								{...field}
								options={options}
								onMenuOpen={onMenuOpen}
								onMenuClose={onMenuClose}
								components={{
									// eslint-disable-next-line react/display-name
									DropdownIndicator: () => (
										<Icon margin={'0px 2px'}>
											{isMenuOpen
												? arrowUpIcon
												: arrowDownIcon}
										</Icon>
									),
									IndicatorSeparator: () => null,
								}}
								placeholder={placeholder}
								isSearchable={false}
								styles={colourStyles}
								isDisabled={isDisabled}
								value={options.find(
									(c) => c.value === field.value,
								)}
								onChange={(e) => field.onChange(e.value)}
							/>
						);
					}}
				/>
				<ErrorMessage
					errors={errors}
					name={name}
					render={({message}) => (
						<ErrorMessageText>{message}</ErrorMessageText>
					)}
				/>
			</BoxContainer>
		);
	},
);

NestedInput.propTypes = {
	name: PropTypes.string,
	control: PropTypes.object,
	formState: PropTypes.object,
	options: PropTypes.array,
	isDisabled: PropTypes.bool,
	placeholder: PropTypes.string,
	setValue: PropTypes.func,
	width: PropTypes.number,
};

const RHF_Combobox = ({name, options, placeholder, width, isDisabled}) => {
	const methods = useFormContext();
	return (
		<NestedInput
			{...methods}
			name={name}
			options={options}
			placeholder={placeholder}
			isDisabled={isDisabled}
			width={width}
		/>
	);
};

RHF_Combobox.propTypes = {
	name: PropTypes.string,
	options: PropTypes.array,
	isDisabled: PropTypes.bool,
	placeholder: PropTypes.string,
	width: PropTypes.number,
};

export default RHF_Combobox;
