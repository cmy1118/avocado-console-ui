import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

import {NavContainer, NavItemList} from '../../styles/components/style';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {HoverIconButton, Icon, IconButton} from '../../styles/components/icons';
import {
	arrowDownIcon,
	arrowRightIcon,
	burgerMenuIcon,
	dashboardIcon,
	fileIcon,
	folderIcon,
	moreVertIcon,
} from '../../icons/icons';
import PropTypes from 'prop-types';
import {PathLink} from '../../styles/components/currentPath';
import qs from 'qs';

const _NavItem = styled.div`
	box-sizing: border-box;

	align-items: center;
	cursor: pointer;
	justify-content: space-between;
	height: 34px;
	padding: 7px 11px 7px 16px;
	display: flex;
	border-left: 2px solid;
	border-color: ${(props) => (props.selected ? '#4ca6a8' : '#ffffff')};
	background: ${(props) => (props.selected ? '#e4f3f4' : '#ffffff')};
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
	padding: 7px 12px 7px 16px;
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
	// font-size: 14px;
	font-weight: 500;

	font-size: 14px;
	font-style: normal;
	line-height: 1.31;
	letter-spacing: 0.1px;
	color: #212121;

	padding-left: ${(props) => props?.left};
`;
export const ResourceItemText = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: normal;
	font-size: 14px;
	font-style: normal;
	line-height: 1.31;
	letter-spacing: 0.1px;
	color: #212121;
	padding-left: ${(props) => props?.left};
`;
export const ResourceItem = styled.div`
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 34px;
	border-left: 2px solid;
	padding: 7px 28px 7px 16px;
	padding-left: ${(props) => props?.left};
	border-color: ${(props) => (props.selected ? '#4ca6a8' : '#ffffff')};
	background: ${(props) => (props.selected ? '#e4f3f4' : '#ffffff')};
`;

export const _NavContents = styled.div`
	padding: 8px 0px;
`;

const _IamNavClose = styled.div`
	border-right: 1px #e3e5e5 solid;
	display: flex;
	width: 17px;
	cursor: pointer;

	background: #f0f3f6;
	transition: transform 0.5s ease-in-out;
`;

const IamNav = ({isOpened, setIsOpened, leftSize}) => {
	const location = useLocation();
	const pathname = qs.parse(location).pathname;
	const [isUnfolded, setIsUnfolded] = useState(false);

	/********************************************************************/
	const onClickOpenOrCloseNav = useCallback(() => {
		setIsOpened(!isOpened);
	}, [setIsOpened, isOpened]);
	/********************************************************************/

	const onClickFoldFolder = useCallback(() => {
		setIsUnfolded(!isUnfolded);
	}, [isUnfolded]);

	return isOpened ? (
		<NavContainer className={isOpened ? 'nav' : 'nav close'}>
			<NavHeader>
				<div>IAM</div>
				<HoverIconButton
					margin={'0px 0px 0px 0px'}
					onClick={onClickOpenOrCloseNav}
				>
					{burgerMenuIcon}
				</HoverIconButton>
			</NavHeader>

			<_NavContents>
				<PathLink to='/iam'>
					<_NavItem selected={pathname === '/iam' ? 1 : 0}>
						<Icon
							margin={'0px'}
							size={'sm'}
							itype={pathname === '/iam' ? 'selected' : 0}
						>
							{dashboardIcon}
						</Icon>
						<ResourceItemTitle
							left={(leftSize * 2 + 10).toString() + 'px'}
						>
							대시보드
						</ResourceItemTitle>
					</_NavItem>
				</PathLink>
				<PathLink to='/users'>
					<_NavItem>
						<Icon margin={'0px'} size={'sm'}>
							{folderIcon}
						</Icon>
						<ResourceItemTitle
							left={(leftSize * 2 + 10).toString() + 'px'}
						>
							접근 관리
						</ResourceItemTitle>
						<IconButton
							size={'sm'}
							margin={'0px 0px 0px 12px'}
							onClick={onClickFoldFolder}
						>
							{isUnfolded ? arrowDownIcon : arrowRightIcon}
						</IconButton>
					</_NavItem>
				</PathLink>
				{isUnfolded && (
					<NavItemList>
						<PathLink to='/users'>
							<ResourceItem
								left={(leftSize * 11 + 8).toString() + 'px'}
								selected={pathname.includes('users')}
							>
								<Icon
									size={'sm'}
									margin_right={'12px'}
									itype={
										pathname.includes('users')
											? 'selected'
											: 0
									}
								>
									{fileIcon}
								</Icon>
								<ResourceItemText
									left={(leftSize * 2 + 6).toString() + 'px'}
								>
									사용자
								</ResourceItemText>
							</ResourceItem>
						</PathLink>
						<PathLink to='/groups'>
							<ResourceItem
								left={(leftSize * 11 + 8).toString() + 'px'}
								selected={pathname.includes('groups') ? 1 : 0}
							>
								<Icon
									size={'sm'}
									margin_right={'12px'}
									itype={
										pathname.includes('groups')
											? 'selected'
											: 0
									}
								>
									{fileIcon}
								</Icon>
								<ResourceItemText
									left={(leftSize * 2 + 6).toString() + 'px'}
								>
									사용자 그룹
								</ResourceItemText>
							</ResourceItem>
						</PathLink>

						<PathLink to='/roles'>
							<ResourceItem
								left={(leftSize * 11 + 8).toString() + 'px'}
								selected={pathname.includes('roles') ? 1 : 0}
							>
								<Icon
									size={'sm'}
									margin_right={'12px'}
									itype={
										pathname.includes('roles')
											? 'selected'
											: 0
									}
								>
									{fileIcon}
								</Icon>
								<ResourceItemText
									left={(leftSize * 2 + 6).toString() + 'px'}
								>
									역할
								</ResourceItemText>
							</ResourceItem>
						</PathLink>
						<PathLink to='/policies'>
							<ResourceItem
								left={(leftSize * 11 + 8).toString() + 'px'}
								selected={pathname.includes('policies') ? 1 : 0}
							>
								<Icon
									size={'sm'}
									margin_right={'12px'}
									itype={
										pathname.includes('policies')
											? 'selected'
											: 0
									}
								>
									{fileIcon}
								</Icon>
								<ResourceItemText
									left={(leftSize * 2 + 6).toString() + 'px'}
								>
									정책
								</ResourceItemText>
							</ResourceItem>
						</PathLink>
					</NavItemList>
				)}
			</_NavContents>
		</NavContainer>
	) : (
		<_IamNavClose onClick={onClickOpenOrCloseNav}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					height: '100%',
				}}
			>
				{moreVertIcon}
			</div>
		</_IamNavClose>
	);
};

IamNav.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	leftSize: PropTypes.number.isRequired,
};

export default IamNav;
