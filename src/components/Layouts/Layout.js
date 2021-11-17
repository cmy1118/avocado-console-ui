import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import AUTH_USER from '../../reducers/api/Auth/authUser';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const _Container = styled.div`
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
	width: 100%;
	position: relative;
`;

const Layout = ({children}) => {
	const history = useHistory();
	const {user, companyId} = useSelector(AUTH_USER.selector);

	useEffect(() => {
		if (!user) {
			history.push('/login/' + companyId);
		}
	}, [user, companyId]);

	return (
		<_Container>
			<Header />
			{children}
			<Footer />
		</_Container>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
