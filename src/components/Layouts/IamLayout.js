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
	// overflow-y: scroll;
	display: flex;
	overflow: auto;

	flex-direction: column;
	// flex: 1;
	height: 100%;
	width: 100%;
	position: relative;

	.mainContainer {
		margin-left: 255px;
		overflow: auto;
		// transition: all 0.5s ease-in-out;
	}
	.mainContainer.close {
		margin-left: 0;
		overflow: auto;
		// transition: 0.5s ease-in-out;
	}

	.nav {
		overflow: auto;
		position: fixed;
		top: 54px;
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
	margin-bottom: 30px;
	flex: 1;
	height: 100%;
	display: flex;
	transition: transform 0.5s ease-in-out;
	position: relative;
	margin-bottom: 10px;
`;

const _MainSpace = styled.div`
	height: 100%;
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
		<>
			<DragDropContext>
				<_Container>
					<Header />
					<_Space
						className={
							isNavOpened
								? 'mainContainer'
								: 'mainContainer close'
						}
					>
						<IamNav
							leftSize={2}
							isOpened={isNavOpened}
							setIsOpened={setIsNavOpened}
						/>
						<_MainSpace style={{width: '100%'}}>
							{children}
						</_MainSpace>
					</_Space>
					<Footer />
				</_Container>
			</DragDropContext>
			{/*<Footer />*/}
		</>
	);
};

IamLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default IamLayout;
