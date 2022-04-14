import React, {useRef} from 'react';
import {Item, Menu, useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {IconButton} from '../../styles/components/icons';

const ContextMenu = ({id, header, options, onClick, width = 180}) => {
	const MenuPosition = useRef();
	const triggerRef = useRef();

	const {show} = useContextMenu({
		id: id,
	});

	function getMenuPosition() {
		const {left, bottom} = triggerRef.current?.getBoundingClientRect();
		MenuPosition.current = {x: left, y: bottom + 8};

		return MenuPosition.current;
	}

	function displayMenu(e) {
		show(e, {
			position: getMenuPosition(),
		});
	}

	return (
		<Container width={width}>
			{/* just display the menu on right click */}
			<IconButton
				size='sm'
				color={'rgba(255, 255, 255, 0.6)'}
				onClick={displayMenu}
				tabIndex={0}
				ref={triggerRef}
				aria-haspopup='true'
			>
				{header}
			</IconButton>

			<Menu id={id} animation='fade'>
				{options.map((item) => {
					return (
						<Item
							key={item.value}
							onClick={() => onClick(item.value)}
						>
							{item.label}
						</Item>
					);
				})}
				{/*<Separator />*/}
				{/*<Submenu label='Submenu'>*/}
				{/*	<Item onClick={handleItemClick}>Sub Item 1</Item>*/}
				{/*	<Item onClick={handleItemClick}>Sub Item 2</Item>*/}
				{/*</Submenu>*/}
			</Menu>
		</Container>
	);
};

ContextMenu.propTypes = {
	header: PropTypes.object,
	options: PropTypes.array,
	width: PropTypes.number,
	id: PropTypes.string,
	onClick: PropTypes.func,
};

export default ContextMenu;

const Container = styled.div`
	.react-contexify {
		min-width: ${(props) => props?.width || 180}px;
	}

	.react-contexify__submenu--is-open,
	.react-contexify__submenu--is-open > .react-contexify__item__content {
	}

	.react-contexify__submenu--is-open > .react-contexify__submenu {
	}

	.react-contexify .react-contexify__submenu {
	}

	.react-contexify__submenu-arrow {
	}

	.react-contexify__separator {
	}

	.react-contexify__will-leave--disabled {
	}

	.react-contexify__item {
	}

	.react-contexify__item:not(.react-contexify__item--disabled):focus {
	}

	.react-contexify__item:not(.react-contexify__item--disabled):hover
		> .react-contexify__item__content,
	.react-contexify__item:not(.react-contexify__item--disabled):focus
		> .react-contexify__item__content {
	}

	.react-contexify__item:not(.react-contexify__item--disabled):hover
		> .react-contexify__submenu {
	}

	.react-contexify__item--disabled {
	}

	.react-contexify__item__content {
		font-size: 13px !important;
		height: 32px;
		width: ${(props) => props?.width || 180}px;
		&:hover {
			background-color: rgba(0, 0, 0, 0.04) !important;
			color: #1e2a42 !important;
		}
	}
`;
