import React, {useCallback, useState} from 'react';
import {TableTitle} from '../../../styles/components/table';
import {HoverIconButton} from '../../../styles/components/icons';
import {arrowDownIcon, arrowRightIcon} from '../../../icons/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {CollapsbleContent} from '../../../styles/components/style';

export const _Container = styled.div`
	.fold-title {
		border-bottom: 2px transparent dotted;
	}

	.fold-title.close {
		border-bottom: 2px #e3e5e5 dotted;
	}
`;

const _TableFoldTitle = styled.div`
	display: flex;
	align-items: center;
`;

const _ButtonContainer = styled.div`
	button {
		background: #e7e9ea;
		color: #ffffff;
		&:hover {
			background: #e7e9ea;
			color: #ffffff;
		}
	}
`;

const FoldableContainer = ({disabled = false, buttons, children, title}) => {
	const [isFold, setIsFold] = useState(false);

	const onClickFold = useCallback(() => {
		console.log(disabled);
		if (!disabled) {
			setIsFold((prev) => !prev);
			// setIsFold({...isFold, [space]: !isFold[space]});
		}
	}, [disabled, setIsFold]);
	return (
		<_Container>
			<TableTitle className={isFold ? 'fold-title' : 'fold-title close'}>
				<>
					<_TableFoldTitle>
						<HoverIconButton
							color={'font'}
							size={'m'}
							margin={'0px'}
							onClick={onClickFold}
						>
							{isFold ? arrowDownIcon : arrowRightIcon}
						</HoverIconButton>
						{title}
					</_TableFoldTitle>
					{buttons ? (
						!isFold ? (
							<_ButtonContainer>
								{buttons(!isFold)}
							</_ButtonContainer>
						) : (
							buttons(!isFold)
						)
					) : (
						''
					)}
				</>
			</TableTitle>
			<CollapsbleContent height={isFold ? '374px' : '0px'}>
				{children ? children : ''}
			</CollapsbleContent>
		</_Container>
	);
};
FoldableContainer.propTypes = {
	children: PropTypes.object,
	buttons: PropTypes.object,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	disabled: PropTypes.bool,
};
export default FoldableContainer;
