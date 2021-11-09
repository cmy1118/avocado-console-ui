import React, {useCallback} from 'react';
import {account} from '../utils/auth';
import kt from '../images/backgound/workplace-2@2x.png';
import samsung from '../images/backgound/workplce@2x.png';
import {useSelector} from 'react-redux';
import USER from '../reducers/api/Auth/user';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

const _Container = styled.div`
	margin-top: 54px;
	display: grid;
	height: 100%;

	img {
		object-fit: contain;
		height: 100%;
		width: 100%;
		image-rendering: -moz-crisp-edges;
		mage-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		-ms-interpolation-mode: nearest-neighbor;
		image-rendering: crisp-edges;
	}
`;

const Main = () => {
	const history = useHistory();
	const {companyId} = useSelector(USER.selector);

	const onClickMove = useCallback(() => {
		history.push('/iam');
	}, [history]);

	return (
		<_Container>
			{companyId === account.KT.companyId && (
				<img src={kt} onClick={onClickMove} />
			)}
			{companyId === account.SAMSUNG.companyId && (
				<img src={samsung} onClick={onClickMove} />
			)}
		</_Container>
	);
};

export default Main;
