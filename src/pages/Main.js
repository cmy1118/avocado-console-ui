import React, {useCallback} from 'react';
import {account} from '../utils/auth';
import kt from '../images/backgound/workplace-2@2x.png';
import samsung from '../images/backgound/workplce@2x.png';
import {useSelector} from 'react-redux';
import USER from '../reducers/api/Auth/user';
import {useHistory} from 'react-router-dom';

const Main = () => {
	const history = useHistory();
	const {companyId} = useSelector(USER.selector);

	const onClickMove = useCallback(() => {
		history.push('/iam');
	}, [history]);

	return (
		<>
			{companyId === account.KT.companyId && (
				<img src={kt} onClick={onClickMove} />
			)}
			{companyId === account.SAMSUNG.companyId && (
				<img src={samsung} onClick={onClickMove} />
			)}
		</>
	);
};

export default Main;
