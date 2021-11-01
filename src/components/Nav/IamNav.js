import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

import {NavContainer, NavItemList} from '../../styles/components/style';
import {Link, NavLink} from 'react-router-dom';
import {HoverIconButton, Icon, IconButton} from '../../styles/components/icons';
import {
	arrowDownIcon,
	arrowRightIcon,
	burgerMenuIcon,
	fileIcon,
	folderIcon,
	moreVertIcon,
} from '../../icons/icons';
import PropTypes from 'prop-types';
import {NaviLink} from '../../styles/components/link';

const _Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 54px;
	padding: 18px 16px 19px;
`;
const _NavItem = styled.div`
	display: flex;
`;
const _OpenNavButton = styled.div`
	outline: none;
	line-height: 0px;
	cursor: pointer;
	position: absolute;
	right: -14px;
	top: 0;
	height: 100%;
	witdh: 14px;
	display: ${(props) => props?.display};
	background: #f8f9fa;
`;

export const NavHeader = styled.div`
	font-size: 16px;
	line-height: 1.25;
	letter-spacing: 0.25px;
	font-style: normal;

	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 15px 16px 15px;
	height: 50px;
	border-bottom: 1px solid;
	border-color: #e3e5e5;
	background: #fffff;
`;
export const ResourceItemTitle = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
`;
export const ResourceItem = styled.div`
	display: flex;
	align-items: center;
	// justify-content: space-between;
	height: 34px;
	border-left: 2px solid;
	padding: 0px 16px 0px 8px;
	padding-left: ${(props) => props?.left};
	border-color: ${(props) => (props.selected ? '#4ca6a8' : '#ffffff')};
	background: ${(props) => (props.selected ? '#e4f3f4' : '#ffffff')};
`;

export const _NavContents = styled.div`
	padding: 17px 18px;
`;

const IamNav = ({isOpened, setIsOpened}) => {
	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);
	const [isUnfolded, setIsUnfolded] = useState(false);
	const onClickCloseNav = useCallback(() => {
		document.querySelector('.iam-nav-bar').classList.toggle('close');
	}, []);

	/********************************************************************/
	const onClickOpenOrCloseNav = useCallback(() => {
		setIsOpened(!isOpened);
	}, [setIsOpened, isOpened]);
	/********************************************************************/

	const onClickFoldFolder = useCallback(() => {
		setIsUnfolded(!isUnfolded);
	}, [isUnfolded]);

	const onClickFoldOrUnfoldFolder = useCallback(() => {
		setIsFolderUnfolded(!isFolderUnfolded);
	}, [isFolderUnfolded]);

	return (
		<NavContainer className={isOpened ? 'nav' : 'nav close'}>
			<NavHeader>
				<div>IAM</div>
				<HoverIconButton
					margin_right={'6px'}
					onClick={onClickOpenOrCloseNav}
				>
					{burgerMenuIcon}
				</HoverIconButton>
			</NavHeader>

			<_NavContents>
				{/*절취*/}

				<_NavItem
				// selected={selectedLink === data.id ? 1 : 0}
				>
					<IconButton margin_right={'12px'} size={'sm'}>
						{folderIcon}
					</IconButton>
					<ResourceItemTitle>
						<NaviLink to='/'>대시보드</NaviLink>
					</ResourceItemTitle>
				</_NavItem>

				<_NavItem>
					<IconButton margin_right={'12px'} size={'sm'}>
						{folderIcon}
					</IconButton>
					<ResourceItemTitle>
						<NaviLink to='/users'>접근 관리</NaviLink>
					</ResourceItemTitle>
					<IconButton
						size={'sm'}
						margin={'0px 0px 0px 12px'}
						onClick={onClickFoldFolder}
					>
						{isUnfolded ? arrowDownIcon : arrowRightIcon}
					</IconButton>
				</_NavItem>

				{isUnfolded && (
					<NavItemList>
						<ResourceItem left={(1 * 11 + 8).toString() + 'px'}>
							<Icon size={'sm'} margin_right={'12px'}>
								{fileIcon}
							</Icon>
							<NaviLink to='/users'>사용자</NaviLink>
						</ResourceItem>

						<ResourceItem left={(1 * 11 + 8).toString() + 'px'}>
							<Icon size={'sm'} margin_right={'12px'}>
								{fileIcon}
							</Icon>
							<NaviLink to='/groups'>사용자 그룹</NaviLink>
						</ResourceItem>

						<ResourceItem left={(1 * 11 + 8).toString() + 'px'}>
							<Icon size={'sm'} margin_right={'12px'}>
								{fileIcon}
							</Icon>
							<NaviLink to='/roles'>역할</NaviLink>
						</ResourceItem>

						<ResourceItem left={(1 * 11 + 8).toString() + 'px'}>
							<Icon size={'sm'} margin_right={'12px'}>
								{fileIcon}
							</Icon>
							<NaviLink to='/policies'>정책</NaviLink>
						</ResourceItem>
					</NavItemList>
				)}
				<_OpenNavButton
					onClick={onClickOpenOrCloseNav}
					display={isOpened ? 'none' : 'inline-block'}
					style={{zIndex: '99'}}
				>
					<div>{moreVertIcon}</div>
				</_OpenNavButton>
			</_NavContents>
		</NavContainer>
	);
};

IamNav.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};

export default IamNav;
