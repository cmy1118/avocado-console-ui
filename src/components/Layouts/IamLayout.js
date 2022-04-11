import React, {useEffect, useState} from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import IamNav from '../Nav/IamNav';
import Header from '../Header/Header';
import {DragDropContext} from 'react-beautiful-dnd';
import Footer from '../Footer/Footer';
import {useSelector} from 'react-redux';
import AUTH from '../../reducers/api/Auth/auth';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;

	.mainContainer {
		// transition: all 0.5s ease-in-out;
	}
	.mainContainer.close {
		// transition: 0.5s ease-in-out;
	}

	.nav {
		display: inline-block;
		transition: all 0.5s ease-in-out;
	}
	.nav.close {
		// transition: all 0.5s ease-in-out;
	}
`;

const _Space = styled.div`
	display: flex;
	flex: 1 1 auto;
	// transition: transform 0.5s ease-in-out;
`;

const _MainSpace = styled.div`
	display: flex;
	flex: 1 1 auto;
`;

const IamLayout = ({children}) => {
	const [isNavOpened, setIsNavOpened] = useState(true);

	return (
		<DragDropContext>
			<_Container>
				<Header />
				<_Space className={isNavOpened ? 'mainContainer' : 'mainContainer close'}>
					<IamNav
						leftSize={2}
						isOpened={isNavOpened}
						setIsOpened={setIsNavOpened}
					/>
					<_MainSpace>{children}</_MainSpace>
				</_Space>
				<Footer />
			</_Container>
		</DragDropContext>
	);
};

IamLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default IamLayout;
