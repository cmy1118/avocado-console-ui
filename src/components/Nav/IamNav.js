import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

import {NavContainer, NavItemList} from '../../styles/components/style';
import {Link} from 'react-router-dom';
import {IconButton} from '../../styles/components/icons';
import {arrowDownIcon, arrowRightIcon} from '../../icons/icons';

const _NavItem = styled.div`
	display: flex;
`;

const IamNav = () => {
	const [isUnfolded, setIsUnfolded] = useState(false);

	const onClickFoldFolder = useCallback(() => {
		setIsUnfolded(!isUnfolded);
	}, [isUnfolded]);
	return (
		<NavContainer className={'iam-nav-bar'}>
			<div>IAM</div>
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
