import PropTypes from 'prop-types';
import {TableTitle} from '../../../../../../styles/components/table';
import {NormalBorderButton} from '../../../../../../styles/components/buttons';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import React, {useCallback} from 'react';

const policyTagTab = {
	include: {
		title: '이 정책과 연결된 태그',
		button: {delete: '삭제'},
	},
	exclude: {
		title: '이 정책의 다른 태그',
		button: {add: '태그 추가'},
	},
};

const PolicyTagTab = ({policyId}) => {
	const onClickDeleteTag = useCallback(() => {}, []);

	return (
		<TabContentContainer>
			<TableTitle>
				{policyTagTab.include.title}
				<NormalBorderButton
					onClick={onClickDeleteTag}
					margin={'0px 0px 0px 5px'}
				>
					{policyTagTab.include.button.delete}
				</NormalBorderButton>
			</TableTitle>
		</TabContentContainer>
	);
};

PolicyTagTab.propTypes = {
	policyId: PropTypes.string.isRequired,
};
export default PolicyTagTab;
