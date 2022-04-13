import React, {useEffect} from 'react';
import styled from 'styled-components';
import background from '../../images/background/bg-img-1@2x.png';
import {useDispatch} from 'react-redux';
import AUTH from '../../reducers/api/Auth/auth';
import {altAuthType} from '../../utils/auth';

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

const Kakao = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const requestKakaoAuth = async () => {
			try {
				const clientAuth = await dispatch(
					AUTH.asyncAction.clientAuthAction(),
				);
				const kakaoAuth = await dispatch(
					AUTH.asyncAction.kakaoAuthAction(),
				);
				console.log(clientAuth, kakaoAuth);
				await dispatch(
					AUTH.asyncAction.altAuthVerificationAction({
						altAuthType: altAuthType.kakao,
						clientToken: clientAuth.payload.access_token,
						altAuthToken: kakaoAuth.payload.access_token,
					}),
				);
			} catch (err) {
				console.log(err);
			}
		};

		requestKakaoAuth();
	}, [dispatch]);

	return <_Container></_Container>;
};

export default Kakao;
