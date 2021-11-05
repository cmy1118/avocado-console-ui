import React from 'react';

import styled from 'styled-components';
import background from '../images/dashboard@2x.png';

const MainContainer = styled.div`
	background-image: url(${background});
	object-fit: contain;
	height: 100%;
	width: 100%;
	background-size: cover;
`;

const Main = () => {
	return <MainContainer></MainContainer>;
};

export default Main;
