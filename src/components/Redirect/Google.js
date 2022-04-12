import React, {useEffect} from 'react';
import styled from 'styled-components';
import background from '../../images/background/bg-img-1@2x.png';
import {useDispatch, useSelector} from 'react-redux';
import AUTH from '../../reducers/api/Auth/auth';

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
	const {clientAuth, alternativeAuth} = useSelector(AUTH.selector);

	// useEffect(() => {
	// 	if (clientAuth && alternativeAuth) {
	// 		dispatch(AUTH.asyncAction.altAuthVerificationAction());
	// 	}
	// }, [clientAuth, alternativeAuth, dispatch]);
	//
	useEffect(() => {
		const requestGoogleAuth = async () => {
			try {
				const clientAuth = await dispatch(
					AUTH.asyncAction.clientAuthAction({
						companyId: localStorage.getItem('companyId'),
					}),
				);
				const googleAuth = await dispatch(
					AUTH.asyncAction.GoogleAuthAction(),
				);

				console.log(clientAuth, googleAuth);
			} catch (err) {
				console.log(err);
			}
		};

		requestGoogleAuth();
	}, [dispatch]);

	return <_Container></_Container>;
};

export default Google;
