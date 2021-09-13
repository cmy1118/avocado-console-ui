import React from 'react';
import styled from 'styled-components';

const _Container = styled.div`
	display: flex;
	justify-content: space-between;
	height: 54px;
`;

const Header = () => {
	return (
		<_Container>
			<div>Avocado Console Management</div>
			<div>Search bar</div>
			<div>Icons</div>
		</_Container>
	);
};

export default Header;
