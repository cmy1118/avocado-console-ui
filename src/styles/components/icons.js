import styled from 'styled-components';

export const Icon = styled.div`
	background: transparent;
	border: none;
	line-height: 0px;
	padding: 0px;
	margin: ${(props) =>
		props?.margin ||
		(props?.size
			? props.size === 'sm'
				? ' 0px 6px'
				: props.size === 'xs'
				? '0px 5px'
				: props.size === 'micro'
				? '0px 4px'
				: props.size
			: '0px 8px')};

	color: ${(props) =>
		props?.color ||
		(props?.itype === 'confirm'
			? '#178082'
			: props?.itype === 'warning'
			? '#d45959'
			: props?.itype === 'font'
			? '#212121'
			: props?.itype === 'selected'
			? '#4ca6a8'
			: '#8e95a0')};

	font-size: ${(props) =>
		props?.size
			? props.size === 'm'
				? '24px'
				: props.size === 'sm'
				? '20px'
				: props.size === 'xs'
				? '18px'
				: props.size === 'micro'
				? '16px'
				: props.size
			: '24px'};

	span {
		font-size: ${(props) =>
			props?.size
				? props.size === 'sm'
					? '20px'
					: props.size === 'xs'
					? '18px'
					: props.size === 'micro'
					? '16px'
					: props.size
				: '24px'};
	}

	svg {
		fill: ${(props) =>
			props?.color ||
			(props?.itype === 'confirm'
				? '#178082'
				: props?.itype === 'warning'
				? '#d45959'
				: props?.itype === 'font'
				? '#212121'
				: props?.itype === 'selected'
				? '#4ca6a8'
				: '#8e95a0')};

		width: ${(props) =>
			props?.size
				? props.size === 'm'
					? '24px'
					: props.size === 'sm'
					? '20px'
					: props.size === 'xs'
					? '18px'
					: props.size === 'micro'
					? '16px'
					: props.size
				: '24px'};
		height: ${(props) =>
			props?.size
				? props.size === 'm'
					? '24px'
					: props.size === 'sm'
					? '20px'
					: props.size === 'xs'
					? '18px'
					: props.size === 'micro'
					? '16px'
					: props.size
				: '24px'};
	}
`;
export const IconButton = styled(Icon)`
	cursor: pointer;
`;
export const HoverIconButton = styled(Icon)`
	cursor: pointer;
	background: ${(props) =>
		props.background ? props.background : 'transparent'};
	&:hover {
		color: ${(props) => props?.hover_color || '#616a7b'};
		svg {
			fill: ${(props) => props?.hover_color || '#616a7b'};
		}
	}
`;
