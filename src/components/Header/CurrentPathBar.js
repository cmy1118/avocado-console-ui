import React from 'react';
import PropTypes from 'prop-types';

import {RowDiv} from '../../styles/components/style';
import {homeIcon, nextPathIcon} from '../../icons/icons';
import styled from 'styled-components';
import {NavItem} from '../../styles/components/nav';

const _Container = styled.div`
	height: 21px;
	display: flex;
	padding: 8px 24px 0px 24px;
	border-color: #e3e5e5;
	background: #fffff;
`;

const CurrentPathBarLink = styled(NavItem)`
	display: flex;
	color: #1e2a42;
	font-size: 10px;
	font-weight: 500;
	align-items: center;

	&:hover {
		color: ${(props) => props?.color || '#389193'};
	}
`;

const _NextPath = styled.div`
	display: flex;
	margin: 0px 1px;
	align-items: center;
`;

/**************************************************
 * ambacc244 - 현재 경로를 나타내 주는 bar
 **************************************************/
const CurrentPathBar = ({paths}) => {
	return (
		<_Container>
			<CurrentPathBarLink to={'/'}>{homeIcon}</CurrentPathBarLink>
			{paths && paths.length !== 0 && (
				<_NextPath>{nextPathIcon}</_NextPath>
			)}
			{paths?.map((v, i) => (
				<RowDiv key={v.url}>
					<CurrentPathBarLink to={v.url}>
						{v.label}
					</CurrentPathBarLink>
					{i !== paths.length - 1 && (
						<_NextPath>{nextPathIcon}</_NextPath>
					)}
				</RowDiv>
			))}
		</_Container>
	);
};

CurrentPathBar.propTypes = {
	paths: PropTypes.array,
};

export default CurrentPathBar;
