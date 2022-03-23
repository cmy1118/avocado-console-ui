import React, {useCallback} from 'react';
import {TableTitle} from '../../../styles/components/table';
import {HoverIconButton, IconButton} from '../../../styles/components/icons';
import {arrowDownIcon, arrowRightIcon} from '../../../icons/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const _TableFoldTitle = styled.div`
	display: flex;
	align-items: center;
`;

//children = button
const TableFold = ({
	disabled = false,
	children,
	title,
	space,
	isFold,
	setIsFold,
}) => {
	const onClickFold = useCallback(() => {
		console.log(disabled);
		if (!disabled) {
			setIsFold({...isFold, [space]: !isFold[space]});
		}
	}, [disabled, isFold, setIsFold, space]);
	return (
		<div>
			<TableTitle
				className={isFold[space] ? 'fold-title' : 'fold-title close'}
			>
				<>
					<_TableFoldTitle>
						<HoverIconButton
							color={'font'}
							size={'m'}
							margin={'0px'}
							onClick={onClickFold}
						>
							{isFold[space] ? arrowDownIcon : arrowRightIcon}
						</HoverIconButton>
						{title}
					</_TableFoldTitle>
					{children ? children : ''}
				</>
			</TableTitle>
		</div>
	);
};
TableFold.propTypes = {
	children: PropTypes.object,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	disabled: PropTypes.bool,
};
export default TableFold;
