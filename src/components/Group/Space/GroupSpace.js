import React, {useCallback} from 'react';
import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';
import {Link, useHistory} from 'react-router-dom';

const GroupSpace = () => {
	const history = useHistory();

	const onCLickLinkToAddGroup = useCallback(() => {
		history.push('/group/add');
	}, [history]);

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/group'>사용자 그룹</Link>
			</PathContainer>
			<SubTitle>
				<div>사용자 그룹: </div>
				<div>
					<button onClick={onCLickLinkToAddGroup}>그룹 생성</button>
					<button>삭제</button>
				</div>
			</SubTitle>
			{/*TODO: group table*/}
		</IamContainer>
	);
};

export default GroupSpace;
