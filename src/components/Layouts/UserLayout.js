import React from 'react';
import PropTypes from 'prop-types';

import UserNav from '../Nav/UserNav';
import Header from '../Header';
import styled from 'styled-components';

const _Space = styled.div`
	display: flex;
`;

const UserLayout = ({children}) => {
	return (
		<>
			<Header />
			<_Space>
				<UserNav />
				{children}
			</_Space>
		</>
	);
};

UserLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default UserLayout;
