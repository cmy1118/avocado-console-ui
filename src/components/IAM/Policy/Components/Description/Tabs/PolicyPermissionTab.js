import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {NormalBorderButton} from '../../../../../../styles/components/buttons';
import {TableTitle} from '../../../../../../styles/components/table';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';

const policyPermissionTab = {
	title: '이 정책의 탬플릿',
	button: {edit: '변경'},
};
const PolicyPermissionTab = ({policyId}) => {
	const onClickEditPolicy = useCallback(() => {}, []);

	return (
		<TabContentContainer>
			<TableTitle>
				{policyPermissionTab.title}
				<NormalBorderButton
					onClick={onClickEditPolicy}
					margin={'0px 0px 0px 5px'}
				>
					{policyPermissionTab.button.edit}
				</NormalBorderButton>
			</TableTitle>
		</TabContentContainer>
	);
};

PolicyPermissionTab.propTypes = {policyId: PropTypes.string.isRequired};

export default PolicyPermissionTab;
