import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {NormalBorderButton} from '../../../../../../styles/components/buttons';
import {TableTitle} from '../../../../../../styles/components/table';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import Table from '../../../../../Table/Table';
import {tableColumns} from '../../../../../../Constants/Table/columns';
import {tableKeys} from '../../../../../../Constants/Table/keys';

const policyPermissionTab = {
	title: '이 정책의 탬플릿',
	button: {edit: '변경'},
};

/**************************************************
 * ambacc244 - 현 정책이 가지는 규칙/권한을 보여주는 탭 컴포넌트
 **************************************************/
const PolicyPermissionTab = ({policyId}) => {
	const [permission, setPermission] = useState([]);

	/**************************************************
	 * ambacc244 - 현재 정책이 가지는 규칙/권한을 수정
	 **************************************************/
	const onClickEditPolicy = useCallback(() => {}, []);

	/**************************************************
	 * ambacc244 - 현재 정책이 가지는 규칙/권한을 요청
	 **************************************************/
	useEffect(() => {}, [policyId]);

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

			<Table
				columns={tableColumns[tableKeys.policy.summary.tabs.permission]}
				tableKey={tableKeys.policy.summary.tabs.permission}
				data={permission}
			/>
		</TabContentContainer>
	);
};

PolicyPermissionTab.propTypes = {policyId: PropTypes.string.isRequired};

export default PolicyPermissionTab;