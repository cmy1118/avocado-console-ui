import React from 'react';

import styled from 'styled-components';
import dashboard from '../images/backgound/dashboard@2x.png';

const _Container = styled.div`
	margin-top: 54px;
	background-image: url(${dashboard});
	object-fit: contain;
	height: 100%;
	width: 100%;
	background-size: cover;
	image-rendering: -moz-crisp-edges;
	mage-rendering: -o-crisp-edges;
	image-rendering: -webkit-optimize-contrast;
	-ms-interpolation-mode: nearest-neighbor;
	image-rendering: crisp-edges;
`;

const Iam = () => {
	return <_Container></_Container>;
};

export default Iam;
