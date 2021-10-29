import React from 'react';
import {Label, Span} from '../../styles/components/text';
import {Icon} from '../../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../../icons/icons';
import {PositionRelativeDiv} from '../../styles/components/div';
import DropDownContext from './DropDownContext';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ErrorMessage} from '@hookform/error-message';

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
	width: ${(props) => props.width || '90px'};
	font-size: 14px;
	height: 32px;
	min-width: 90px;
	border-radius: 4px;
	border: solid 1px #e3e5e5;
	background: white;
	padding: 6px 4px 6px 10px;
`;

const ComboBox = ({
	label,
	name,
	register,
	errors,
	isOpened,
	setIsOpened,
	title,
	options,
	value,
	setValue,
	width,
}) => {
	return (
		<Container>
			{label && <Label>{label}</Label>}
			<Header
				onClick={() => setIsOpened(!isOpened)}
				width={width}
				className={isOpened ? 'focus' : ''}
			>
				<Span>{title}</Span>
				{isOpened ? (
					<Icon margin={'0px'}>{arrowUpIcon}</Icon>
				) : (
					<Icon margin={'0px'}>{arrowDownIcon}</Icon>
				)}

				{errors && (
					<ErrorMessage errors={errors} name={name}>
						{({messages}) =>
							messages &&
							Object.entries(messages).map(([type, message]) => (
								<p key={type}>{message}</p>
							))
						}
					</ErrorMessage>
				)}
			</Header>
			<PositionRelativeDiv>
				<DropDownContext
					name={name}
					register={register}
					isOpened={isOpened}
					setIsOpened={setIsOpened}
					setValue={setValue}
					value={value}
					options={options}
					width={width}
				/>
			</PositionRelativeDiv>
		</Container>
	);
};

ComboBox.propTypes = {
	name: PropTypes.string,
	register: PropTypes.func,
	errors: PropTypes.object,
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	value: PropTypes.any,
	setValue: PropTypes.func,
	width: PropTypes.string,
	label: PropTypes.string,
};

export default ComboBox;
