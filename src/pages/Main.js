import React, {useCallback} from 'react';
import {account} from '../utils/auth';
import kt from '../images/backgound/workplace-2@2x.png';
import samsung from '../images/backgound/workplce@2x.png';
import {useSelector} from 'react-redux';
import AUTH_USER from '../reducers/api/Auth/authUser';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

const _Container = styled.div`
	display: grid;
	height: 100%;
	background: #f8f9fa;
	display: flex;
	align-items: start;
	justify-content: center;
	overflow: hidden;
`;

const _ImageContainer = styled.div`
	background: #f8f9fa;
	max-width: 1500px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: start;

	img {
		object-fit: contain;
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
	const {companyId} = useSelector(AUTH_USER.selector);

	const onClickMove = useCallback(() => {
		history.push('/iam');
	}, [history]);

	return (
		<_Container>
			{companyId === account.KT.companyId && (
				<_ImageContainer>
					<img src={kt} onClick={onClickMove} />
				</_ImageContainer>
			)}
			{companyId === account.SAMSUNG.companyId && (
				<_ImageContainer>
					<img src={samsung} onClick={onClickMove} />
				</_ImageContainer>
			)}
		</_Container>
	);
};

export default Main;
