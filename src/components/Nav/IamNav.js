import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

import {_NavContainer, _NavItemList} from '../../styles/components/style';
import {Link} from 'react-router-dom';
import {IconButton} from '../../styles/components/icons';
import {arrowDownIcon, arrowRightIcon} from '../../icons/icons';

const _NavItem = styled.div`
	display: flex;
`;

const IamNav = () => {
	const [isUnfolded, setIsUnfolded] = useState(false);

	const onClickFoldOrUnFoldFolder = useCallback(() => {
		setIsUnfolded(!isUnfolded);
	}, [isUnfolded]);
	return (
		<_NavContainer className={'iam-nav-bar'}>
			<div>IAM</div>
			<Link to='/'>대시보드</Link>
			<_NavItem>
				접근 관리
				<IconButton
					size={'sm'}
					margin={'0px 0px 0px 12px'}
					onClick={onClickFoldOrUnFoldFolder}
				>
					{isUnfolded ? arrowDownIcon : arrowRightIcon}
				</IconButton>
			</_NavItem>
			{isUnfolded && (
				<_NavItemList>
					<Link to='/user'>사용자</Link>
					<Link to='/group'>사용자 그룹</Link>
					<Link to='/role'>역할</Link>
					<Link to='/policy'>정책</Link>
				</_NavItemList>
			)}
		</_NavContainer>
	);
};

export default IamNav;
