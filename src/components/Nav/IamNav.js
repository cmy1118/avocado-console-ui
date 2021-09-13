import React, {useCallback, useState} from 'react';
import {_NavContainer} from '../../styles/components/style';
import {Link} from 'react-router-dom';

const IamNav = () => {
	const [isOpened, setIsOpend] = useState(false);

	const onClickFoldOrUnFoldFolder = useCallback(() => {
		setIsOpend(!isOpened);
	}, [isOpened]);
	return (
		<_NavContainer>
			<div>대시보드</div>
			<div>
				접근 관리 <button onClick={onClickFoldOrUnFoldFolder}>B</button>
			</div>
			{isOpened && (
				<_NavContainer>
					<Link to='/user'>사용자</Link>
					<Link to='/group'>사용자 그룹</Link>
					<Link to='/role'>역할</Link>
					<Link to='/policy'>정책</Link>
				</_NavContainer>
			)}
		</_NavContainer>
	);
};

export default IamNav;
