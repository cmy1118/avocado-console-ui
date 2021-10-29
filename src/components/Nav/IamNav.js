import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

import {NavContainer, NavItemList} from '../../styles/components/style';
import {Link} from 'react-router-dom';
import {HoverIconButton, IconButton} from '../../styles/components/icons';
import {arrowDownIcon, arrowRightIcon, burgerMenuIcon} from '../../icons/icons';

const _Header = styled.div`
	display: flex;
	align-items: center;
	height: 54px;
	padding: 18px 16px 19px;
`;

const _NavItem = styled.div`
	display: flex;
`;

const IamNav = () => {
	const [isUnfolded, setIsUnfolded] = useState(false);
	const onClickCloseNav = useCallback(() => {
		document.querySelector('.iam-nav-bar').classList.toggle('close');
	}, []);

	const onClickFoldFolder = useCallback(() => {
		setIsUnfolded(!isUnfolded);
	}, [isUnfolded]);
	return (
		<NavContainer className={'iam-nav-bar'}>
			<_Header>
				<div>IAM</div>
				<HoverIconButton margin_right={'6px'} onClick={onClickCloseNav}>
					{burgerMenuIcon}
				</HoverIconButton>
			</_Header>
			<Link to='/'>대시보드</Link>
			<_NavItem>
				접근 관리
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
					<Link to='/users'>사용자</Link>
					<Link to='/groups'>사용자 그룹</Link>
					<Link to='/roles'>역할</Link>
					<Link to='/policies'>정책</Link>
				</NavItemList>
			)}
		</NavContainer>
	);
};

export default IamNav;
