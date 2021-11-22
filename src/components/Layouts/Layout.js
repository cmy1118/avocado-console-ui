import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Auth from '../../reducers/api/Auth/auth';

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
