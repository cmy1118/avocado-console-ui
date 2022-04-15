import React, {useCallback, useState} from 'react';
import {HoverIconButton} from '../../../styles/components/icons';
import {arrowDownIcon, arrowRightIcon} from '../../../icons/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {IamSectionTitleBar} from '../../../styles/components/iam/iam';

const _Container = styled.div`
	background-color: #ffffff;
	box-shadow: 0 3.5px 5.5px 0 rgba(0, 0, 0, 0.02);
	border: solid 1px #e1e7eb;
	margin-bottom: ${(props) => (props.bottomMargin ? '16px' : '0px')};
	border: ${(props) => props.type === 'tab' && 'none'};
`;

const _IamSectionTitleBar = styled(IamSectionTitleBar)`
	padding: ${(props) => props.type === 'tab' && '0px'};
`;

const _TableFoldTitle = styled.div`
	display: flex;
	align-items: center;
`;

const _CollapsbleContent = styled.div`
	height: ${(props) => (props.isOpened ? '474px' : '0px')};
	overflow: scroll;
	transition: height 0.4s ease-out;
`;

const FoldableContainer = ({
	disabled = false,
	buttons,
	children,
	title,
	bottomMargin = false,
	type,
}) => {
	const [isOpened, setIsOpened] = useState(false);

	const onClickFold = useCallback(() => {
		if (!disabled) {
			setIsOpened((prev) => !prev);
		}
	}, [disabled, setIsOpened]);

	return (
		<_Container bottomMargin={bottomMargin} type={type}>
			<_IamSectionTitleBar
				className={isOpened ? 'fold-title' : 'fold-title close'}
				type={type}
			>
				<_TableFoldTitle>
					<HoverIconButton
						size={'m'}
						margin={'0px 2px 0px 0px'}
						onClick={onClickFold}
					>
						{isOpened ? arrowDownIcon : arrowRightIcon}
					</HoverIconButton>
					{title}
				</_TableFoldTitle>
				{buttons && isOpened && buttons(!isOpened)}
			</_IamSectionTitleBar>
			<_CollapsbleContent isOpened={isOpened}>
				{children && children}
			</_CollapsbleContent>
		</_Container>
	);
};

FoldableContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	buttons: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	isFold: PropTypes.object,
	setIsOpened: PropTypes.func,
	disabled: PropTypes.bool,
	bottomMargin: PropTypes.bool,
	type: PropTypes.string,
};
export default FoldableContainer;
