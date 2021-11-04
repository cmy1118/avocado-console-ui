import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import USER from '../../reducers/api/Auth/user';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import IamNav from '../Nav/IamNav';
import Header from '../Header';

const _Container = styled.div`
	overflow-y: scroll;
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

	const history = useHistory();

	const {user, companyId} = useSelector(USER.selector);

	useEffect(() => {
		if (!user) {
			history.push('/login/' + companyId);
		}
	}, [user, companyId]);

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
				<_MainSpace style={{width: '100%'}}>{children}</_MainSpace>
				{/*<Aside />*/}
			</_Space>
		</_Container>
	);
};

IamLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default IamLayout;
