import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IamNav from '../Nav/IamNav';
import Header from '../Header';
import Aside from '../Aside/Aside';
import {ColDiv} from '../../styles/components/div';

const _Space = styled.div`
	display: flex;
	flex: 1;
`;

const IamLayout = ({children}) => {
	return (
		<ColDiv height={'100%'}>
			<Header />
			<_Space>
				<IamNav />
				{children}
				<Aside />
			</_Space>
		</ColDiv>
	);
};

IamLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default IamLayout;
