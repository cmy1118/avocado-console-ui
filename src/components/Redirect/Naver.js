import React, {useEffect} from 'react';
import styled from 'styled-components';
import background from '../../images/background/bg-img-1@2x.png';
import {useDispatch} from 'react-redux';
import AUTH from '../../reducers/api/Auth/auth';
import {altAuthType, getParameter} from '../../utils/auth';

const _Container = styled.div`
	width: 100%;
	height: 100%;
	background: #126466;
	background-image: url(${background});
	object-fit: contain;
	background-size: cover;
	background-position: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Naver = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const requestNaverAuth = async () => {
			try {
				const clientAuth = await dispatch(
					AUTH.asyncAction.clientAuthAction(),
				);
				// const naverAuth = await dispatch(
				// 	AUTH.asyncAction.naverAuthAction(),
				// );

				console.log(decodeURIComponent(getParameter('access_token')));
				// console.log(naverAuth);
				// console.log(clientAuth, naverAuth);

				await dispatch(
					AUTH.asyncAction.altAuthVerificationAction({
						altAuthType: altAuthType.naver,
						clientToken: clientAuth.payload.access_token,
						altAuthToken: decodeURIComponent(
							getParameter('access_token'),
						),
					}),
				);
			} catch (err) {
				console.log(err);
			}
		};

		requestNaverAuth();
	}, [dispatch]);

	return <_Container></_Container>;
};

export default Naver;
