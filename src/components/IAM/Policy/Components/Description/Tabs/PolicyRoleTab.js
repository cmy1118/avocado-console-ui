import PropTypes from 'prop-types';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {TableTitle} from '../../../../../../styles/components/table';
import {NormalBorderButton} from '../../../../../../styles/components/buttons';
import React, {useCallback} from 'react';

const policyRoleTab = {
	include: {
		title: '이 정책과 연결된 역할',
		button: {delete: '삭제'},
	},
	exclude: {
		title: '이 정책의 다른 역할',
		button: {add: '역할 추가'},
	},
};

const PolicyRoleTab = ({policyId}) => {
	const onClickDeletePolicy = useCallback(() => {}, []);

	return (
		<TabContentContainer>
			<TableTitle>
				{policyRoleTab.include.title}
				<NormalBorderButton
					onClick={onClickDeletePolicy}
					margin={'0px 0px 0px 5px'}
				>
					{policyRoleTab.include.button.delete}
				</NormalBorderButton>
			</TableTitle>
		</TabContentContainer>
	);
};

PolicyRoleTab.propTypes = {
	policyId: PropTypes.string.isRequired,
};
export default PolicyRoleTab;
