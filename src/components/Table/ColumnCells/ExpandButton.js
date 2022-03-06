import React, {useEffect} from 'react';
import {IconButton} from '../../../styles/components/icons';
import {keyboardArrowDownIcon, NavigateNextIcon} from '../../../icons/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const ExpandButton = ({row, onOpen}) => {
	// useEffect(() => {
	// 	if (!row.isExpanded) onClick(row, row.isExpanded);
	// }, [onClick, row]);

	return (
		<Container {...row.getToggleRowExpandedProps()}>
			<IconButton
				size={'sm'}
				itype={row.isExpanded && 'confirm'}
				margin={'0px 6px 0px 0px'}
				onClick={() => onOpen({row, isExpanded: row.isExpanded})}
			>
				{row.isExpanded ? keyboardArrowDownIcon : NavigateNextIcon}
			</IconButton>
			{row.original.name}
		</Container>
	);
};

ExpandButton.propTypes = {
	row: PropTypes.object,
	onOpen: PropTypes.func,
};

export default ExpandButton;
