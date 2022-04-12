import React from 'react';
import styled from 'styled-components';
import background from '../../images/background/bg-img-1@2x.png';

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
	return <_Container></_Container>;
};

export default Kakao;
