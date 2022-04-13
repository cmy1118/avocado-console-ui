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
const Google = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const requestGoogleAuth = async () => {
			try {
				const clientAuth = await dispatch(
					AUTH.asyncAction.clientAuthAction(),
				);
				const googleAuth = await dispatch(
					AUTH.asyncAction.googleAuthAction(),
				);

				await dispatch(
					AUTH.asyncAction.altAuthVerificationAction({
						altAuthType: altAuthType.google,
						clientToken: clientAuth.payload.access_token,
						altAuthToken: googleAuth.payload.access_token,
					}),
				);
			} catch (err) {
				console.log(err);
			}
		};

		requestGoogleAuth();
	}, [dispatch]);

	return <_Container></_Container>;
};

export default Google;
