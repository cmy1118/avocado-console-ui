import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IamNav from '../Nav/IamNav';
import Header from '../Header';
import Aside from '../Aside/Aside';

const _Container = styled.div`
	overflow: hidden;
	flex: 1;
	height: 100%;
	width: 100%;
	position: relative;

	.mainContainer {
		margin-left: 255px;
		transition: margin 0.5s ease-in-out;
	}
	.mainContainer.close {
		margin: 0;
	}

	.nav {
		position: absolute;
		left: 0px;
		display: inline-block;
		transition: transform 0.5s ease-in-out;
		z-index: 1;
	}
	.nav.close {
		background: #f8f9fa;
		transform: translateX(-255px);
		z-index: 5;
	}
`;

const _Space = styled.div`
	display: flex;
	transition: transform 0.5s ease-in-out;
`;

const IamLayout = ({children}) => {
	const [isNavOpened, setIsNavOpened] = useState(true);
	return (
		<_Container>
			<Header />
			<_Space
				className={
					isNavOpened ? 'mainContainer' : 'mainContainer close'
				}
			>
				<IamNav isOpened={isNavOpened} setIsOpened={setIsNavOpened} />
				{children}
				{/*<Aside />*/}
			</_Space>
		</_Container>
	);
};

IamLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default IamLayout;
