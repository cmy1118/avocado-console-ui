import React from 'react';

import styled from 'styled-components';
import dashboard from '../images/backgound/dashboard.png';

const _Container = styled.div`
	margin-top: 54px;
	background-image: url(${dashboard});
	object-fit: contain;
	height: 100%;
	width: 100%;
	background-size: cover;
`;

const Iam = () => {
	return <_Container></_Container>;
};

export default Iam;
