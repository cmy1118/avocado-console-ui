import React from 'react';
import PropTypes from 'prop-types';

import {RowDiv} from '../../styles/components/style';
import {homeIcon} from '../../icons/icons';
import styled from 'styled-components';
import {NavItem} from '../../styles/components/nav';

const _Container = styled.div`
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
	line-height: 2.1;
	letter-spacing: -0.25px;
	&:hover {
		color: ${(props) => props?.color || '#389193'};
		text-decoration: underline;
	}
`;

const NextPath = styled.div`
	color: #85919c;
	margin: 0px 6.2px;
	align-items: center;
	font-size: 10px;
	font-weight: 500;
	line-height: 2.1;
	letter-spacing: -0.25px;
`;

/**************************************************
 * ambacc244 - 현재 경로를 나타내 주는 bar
 **************************************************/
//TODO: description 페이지 접근 불가해서 description에 패스가 적용된지 확인 불가능
const CurrentPathBar = ({paths}) => {
	return (
		<_Container>
			<CurrentPathBarLink to={'/'}>{homeIcon}</CurrentPathBarLink>
			{paths && paths.length !== 0 && <NextPath>{' > '}</NextPath>}
			{paths?.map((v, i) => (
				<RowDiv key={v.url}>
					<CurrentPathBarLink to={v.url}>
						{v.label}
					</CurrentPathBarLink>
					{i !== paths.length - 1 && <NextPath>{' > '}</NextPath>}
				</RowDiv>
			))}
		</_Container>
	);
};

CurrentPathBar.propTypes = {
	paths: PropTypes.array,
};

export default CurrentPathBar;
