import styled from 'styled-components';

export const Icon = styled.div`
	background: transparent;
	border: none;
	line-height: 0px;
	padding: 0px;

	margin: ${(props) =>
		props?.margin
			? props.margin
			: props?.size
			? props.size === 'sm'
				? ' 0px 6px'
				: props.size === 'xs'
				? '0px 5px'
				: props.size === 'micro'
				? '0px  4px'
				: props.size
			: '0px 8px'};

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

	span {
		//if icon is span, font-size does not apply
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
		width: ${(props) =>
			props?.size
				? props.size === 'sm'
					? '20px'
					: props.size === 'xs'
					? '18px'
					: props.size === 'micro'
					? '16px'
					: props.size
				: '24px'};
		height: ${(props) =>
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
`;

export const IconButton = styled(Icon)`
	cursor: pointer;
`;

export const HoverButton = styled(Icon)`
	cursor: pointer;
	&:hover {
		color: ${(props) => props?.hover_color || '#556367'};
		svg {
			fill: ${(props) => props?.hover_color || '#556367'};
		}
	}
`;
