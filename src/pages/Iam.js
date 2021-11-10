import React from 'react';

import styled from 'styled-components';
import dashboard from '../images/backgound/dashboard@2x.png';

const _MainSpace = styled.div`
	height: 100%;
	background: #f0f3f6;
	display: flex;
	justify-content: center;
`;

const _Container = styled.div`
	margin-top: 54px;
	background-image: url(${dashboard});
	background-position: center;
	width: 100%;
	height: 90%;
	background-size: contain;
	background-repeat: no-repeat;
	image-rendering: -moz-crisp-edges;
	mage-rendering: -o-crisp-edges;
	image-rendering: -webkit-optimize-contrast;
	-ms-interpolation-mode: nearest-neighbor;
	image-rendering: crisp-edges;
`;

const Iam = () => {
	return (
		<_MainSpace>
			<_Container />
		</_MainSpace>
	);
};

export default Iam;
