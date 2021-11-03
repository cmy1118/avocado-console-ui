import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IamNav from '../Nav/IamNav';
import Header from '../Header';

const _Container = styled.div`
	flex: 1;
	height: 100%;
	width: 100%;
	position: relative;

	.mainContainer {
		margin-left: 255px;
		// transition: all 0.5s ease-in-out;
	}
	.mainContainer.close {
		margin-left: 0;
		// transition: 0.5s ease-in-out;
	}

	.nav {
		position: absolute;
		left: 0px;
		display: inline-block;
		transition: all 0.5s ease-in-out;
		height: ;
	}
	.nav.close {
		position: absolute;
		left: 17px;
		transform: translateX(-255px);
		transition: all 0.5s ease-in-out;
	}
`;

const _Space = styled.div`
	height: 100%;
	display: flex;
	transition: transform 0.5s ease-in-out;
`;

const _MainSpace = styled.div``;

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
				<IamNav
					leftSize={2}
					isOpened={isNavOpened}
					setIsOpened={setIsNavOpened}
				/>
				<_MainSpace style={{paddingLeft: '17px'}}>
					{children}
				</_MainSpace>
				{/*<Aside />*/}
			</_Space>
		</_Container>
	);
};

IamLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default IamLayout;
