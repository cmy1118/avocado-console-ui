import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import USER from '../../reducers/api/Auth/user';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import IamNav from '../Nav/IamNav';
import Header from '../Header';
import {DragDropContext} from 'react-beautiful-dnd';
import Footer from '../Footer';

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
	const history = useHistory();
	const {user, companyId} = useSelector(USER.selector);
	const [isNavOpened, setIsNavOpened] = useState(true);

	useEffect(() => {
		if (!user) {
			history.push('/login/' + companyId);
		}
	}, [user, companyId, history]);

	return (
		<DragDropContext>
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
