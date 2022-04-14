import React from 'react';
import {TempTabContents} from '../../styles/components/iam/iamTab';
import {HoverIconButton} from '../../styles/components/icons';
import {errorIcon} from '../../icons/icons';
import PropTypes from 'prop-types';
import UserDescriptionSpace from './User/Space/UserDescriptionSpace';

const TempTab = ({data}) => {
	return (
		<>
			<TempTabContents>
				<HoverIconButton size={'sm'} color={'#389193'}>
					{errorIcon}
				</HoverIconButton>
				<div> {`탭을 선택하여 ${data} 정보를 수정하세요.`}</div>
			</TempTabContents>
		</>
	);
};
TempTab.propTypes = {
	data: PropTypes.string,
};
export default TempTab;
