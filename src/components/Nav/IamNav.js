import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

import {useLocation} from 'react-router-dom';
import {HoverIconButton, Icon, IconButton} from '../../styles/components/icons';
import {
	arrowDownIcon,
	arrowRightIcon,
	burgerMenuIcon,
	dashboardIcon,
	securityIcon,
} from '../../icons/icons';
import PropTypes from 'prop-types';
import qs from 'qs';
import {NavContainer, NavItem, NavItemList} from '../../styles/components/nav';

const _NavHeader = styled.div`
	font-family: NotoSansCJKKR;
	font-size: 15px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.33;
	color: #1e2a42;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 8px 0px 17px;
	border-bottom: 1px solid;
	border-color: #e3e5e5;
`;

const _ResourceItemText = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-style: normal;
	line-height: 1.31;
	letter-spacing: 0.1px;
	color: #212121;
	padding-left: ${(props) => props?.left};
`;

const _ResourceItemTitle = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const _ResourceItem = styled.div`
	font-size: 14px;
	display: flex;
	align-items: center;
	cursor: pointer;
	justify-content: space-between;
	height: 34px;
	border-left: 3px solid;
	padding: 0px 17px 0px 12px;
	padding-left: ${(props) => props?.left};
	border-color: ${(props) => (props.selected ? '#4ca6a8' : '#ffffff')};
	font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
	background: ${(props) => (props.selected ? '#e4f3f4' : '#ffffff')};

	&:hover {
		background-color: ${(props) => !props.selected && '#f8f9fa'};
	}
`;

const _NavContents = styled.div`
	padding: 8px 0px;
`;

const _ClosedNavContainer = styled(NavContainer)`
	width: 52px;
	min-width: 52px;
	align-items: center;
`;

const _ClosedNavHeader = styled(_NavHeader)`
	padding: 0px;
`;

const _HoverIcon = styled.div`
	width: 34px;
	height: 34px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;

	&:hover {
		background-color: #e4f3f4;
		.closed-nav-icon {
			color: #4ca6a8;
		}
	}
`;

const iamNav = {
	title: 'IAM 관리자',
	contents: {
		dashboard: {title: '대시보드'},
		iam: {
			title: '접근 관리',
			contents: {
				user: '사용자',
				group: '사용자 그룹',
				role: '역할',
				policy: '정책',
			},
		},
	},
};

const IamNav = ({isOpened, setIsOpened}) => {
	const location = useLocation();
	const pathname = qs.parse(location).pathname;
	const [isUnfolded, setIsUnfolded] = useState(false);

	const onClickFoldNav = useCallback(() => {
		setIsOpened(!isOpened);
	}, [setIsOpened, isOpened]);

	const onClickFoldFolder = useCallback(() => {
		setIsUnfolded(!isUnfolded);
	}, [isUnfolded]);

	return isOpened ? (
		<NavContainer className={isOpened ? 'nav' : 'nav close'}>
			<_NavHeader>
				<div>{iamNav.title}</div>
				<HoverIconButton onClick={onClickFoldNav}>
					{burgerMenuIcon}
				</HoverIconButton>
			</_NavHeader>

			<_NavContents>
				<NavItem to='/iam'>
					<_ResourceItem selected={pathname === '/iam' ? 1 : 0}>
						<Icon size={'micro'} margin={'0px'}>
							{arrowRightIcon}
						</Icon>
						<Icon
							margin={'0px 8px 0px 1px'}
							size={'sm'}
							itype={pathname === '/iam' ? 'selected' : 0}
						>
							{dashboardIcon}
						</Icon>
						<_ResourceItemTitle>
							{iamNav.contents.dashboard.title}
						</_ResourceItemTitle>
					</_ResourceItem>
				</NavItem>

				<_ResourceItem onClick={onClickFoldFolder}>
					<IconButton size={'micro'} margin={'0px'}>
						{isUnfolded ? arrowDownIcon : arrowRightIcon}
					</IconButton>
					<Icon margin={'0px 8px 0px 1px'} size={'sm'}>
						{securityIcon}
					</Icon>
					<_ResourceItemTitle>
						{iamNav.contents.iam.title}
					</_ResourceItemTitle>
				</_ResourceItem>
				{isUnfolded && (
					<NavItemList>
						<NavItem to='/users'>
							<_ResourceItem
								left={'58px'}
								selected={pathname.includes('users')}
							>
								<_ResourceItemText>
									{iamNav.contents.iam.contents.user}
								</_ResourceItemText>
							</_ResourceItem>
						</NavItem>
						<NavItem to='/groups'>
							<_ResourceItem
								left={'58px'}
								selected={pathname.includes('groups') ? 1 : 0}
							>
								<_ResourceItemText>
									{iamNav.contents.iam.contents.group}
								</_ResourceItemText>
							</_ResourceItem>
						</NavItem>

						<NavItem to='/roles'>
							<_ResourceItem
								left={'58px'}
								selected={pathname.includes('roles') ? 1 : 0}
							>
								<_ResourceItemText>
									{iamNav.contents.iam.contents.role}
								</_ResourceItemText>
							</_ResourceItem>
						</NavItem>
						<NavItem to='/policies'>
							<_ResourceItem
								left={'58px'}
								selected={pathname.includes('policies') ? 1 : 0}
							>
								<_ResourceItemText>
									{iamNav.contents.iam.contents.policy}
								</_ResourceItemText>
							</_ResourceItem>
						</NavItem>
					</NavItemList>
				)}
			</_NavContents>
		</NavContainer>
	) : (
		<_ClosedNavContainer>
			<_ClosedNavHeader>
				<_HoverIcon onClick={onClickFoldNav}>
					<HoverIconButton
						margin={'0px'}
						className={'closed-nav-icon'}
					>
						{burgerMenuIcon}
					</HoverIconButton>
				</_HoverIcon>
			</_ClosedNavHeader>

			<_NavContents>
				<NavItem to='/iam'>
					<_HoverIcon>
						<HoverIconButton
							size={'sm'}
							margin={'0px'}
							className={'closed-nav-icon'}
						>
							{dashboardIcon}
						</HoverIconButton>
					</_HoverIcon>
				</NavItem>
				<NavItem to='/users'>
					<_HoverIcon>
						<HoverIconButton
							size={'sm'}
							margin={'0px'}
							className={'closed-nav-icon'}
						>
							{securityIcon}
						</HoverIconButton>
					</_HoverIcon>
				</NavItem>
			</_NavContents>
		</_ClosedNavContainer>
	);
};

IamNav.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	leftSize: PropTypes.number.isRequired,
};

export default IamNav;
