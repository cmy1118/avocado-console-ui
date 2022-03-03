import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import {IamContainer} from '../../../../styles/components/iam/iam';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import qs from 'qs';

const PolicyDescriptionSpace = ({policyId}) => {
	const {search} = useLocation();

	const [isSummaryOpened, setIsSummaryOpened] = useState(true);

	const paths = useMemo(
		() => [
			{url: '/iam', label: 'IAM'},
			{url: '/groups', label: '사용자 그룹'},
			{url: '/groups/' + policyId, label: policyId},
		],
		[policyId],
	);

	/**************************************************
	 * ambacc244 - current Path Bar의 현재 경로 클릭으로 탭을 닫음
	 **************************************************/
	useEffect(() => {
		//현재 경로에서 탭의 정보가 없음
		if (!qs.parse(search, {ignoreQueryPrefix: true})?.tabs) {
			setIsSummaryOpened(true);
		}
	}, [search]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />

			<div>Rolicy Description Space</div>
		</IamContainer>
	);
};

PolicyDescriptionSpace.propTypes = {
	policyId: PropTypes.string.isRequired,
};

export default PolicyDescriptionSpace;
