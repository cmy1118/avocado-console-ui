import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IamNav from '../Nav/IamNav';
import Header from '../Header';
import Aside from '../Aside/Aside';

const _Space = styled.div`
	display: flex;
`;

const IamLayout = ({children}) => {
	return (
		<>
			<Header />
			<_Space>
				<IamNav />
				{children}
				<Aside />
			</_Space>
		</>
	);
};

IamLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default IamLayout;
