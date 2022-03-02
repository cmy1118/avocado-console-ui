import React from 'react';
import PropTypes from 'prop-types';

import {
	CurrentPathBar,
	CurrentPathBarLink,
	NextPath,
} from '../../styles/components/currentPathBar';
import {RowDiv} from '../../styles/components/style';

/**************************************************
 * ambacc244 - 현재 경로를 나타내 주는 bar
 **************************************************/
//TODO: description 페이지 접근 불가해서 description에 패스가 적용된지 확인 불가능
const CurrentPathBarTemp = ({paths}) => {
	return (
		<CurrentPathBar>
			{paths.map((v, i) => (
				<RowDiv key={v.url}>
					<CurrentPathBarLink to={v.url}>
						{v.label}
					</CurrentPathBarLink>
					{i !== paths.length - 1 && <NextPath>{' > '}</NextPath>}
				</RowDiv>
			))}
		</CurrentPathBar>
	);
};

CurrentPathBarTemp.propTypes = {
	paths: PropTypes.array.isRequired,
};

export default CurrentPathBarTemp;
