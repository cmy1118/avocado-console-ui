import PropTypes from 'prop-types';
import ResourceSelectionContainer from './ResourceSelectionContainer';
import {
	policyOption,
	resourceOptions,
} from '../../../../../../../utils/policyOptions';
import TemplateLayout from '../../Outline/TemplateLayout';
import React, {useEffect, useState} from 'react';
import useRadio from '../../../../../../../hooks/useRadio';

const resource = {
	title: '자원',
	description: [
		'자원 추가는 정책(권한) 부여 권한이 있는 자원만 추가 가능하며, 모든 자원 은 부여 권한이 있는 모든 자원 입니다.',
		'자원 그룹 : 선택한 그룹의 하위 자원만 해당 정책이 적용되며 하위의 그룹은 해당 되지 않습니다.',
		"'특정자원' 추가 후 '모든자원'으로 선택 변경 시 기존에 선택된 자원은 모두 삭제 됩니다.",
		'정책은 선택한 자원 그룹의 하위 자원과 자원을 모두 합하여 적용됩니다.',
	],
};

/**************************************************
 * ambacc244 - PAM 템플릿 자원 폼
 **************************************************/
const Resource = ({data, setTemplateData}) => {
	//resource: 자원 선택 방식
	const [resourceType, resourceTypeRadioButton, setResourceType] = useRadio({
		name: 'connectResource',
		options: resourceOptions,
	});
	//selected: 선택된 자원 & 그룹
	const [selected, setSelected] = useState({});

	/**************************************************
	 * ambacc244 - 자원 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		if (data?.attribute?.ruleType) {
			setTemplateData({
				applicationCode: data.applicationCode.code,
				attribute: {
					ruleType: data?.attribute.ruleType,
				},
			});
		}
	}, [data, setTemplateData]);

	/**************************************************
	 * ambacc244 - 자원 default 값 세팅
	 **************************************************/
	useEffect(() => {
		if (data?.attribute?.selectType) setSelected(data.attribute.selectType);
	}, [data]);

	return (
		<TemplateLayout
			title={resource.title}
			description={resource.description}
			render={() => {
				return (
					<div>
						{resourceTypeRadioButton()}
						<div>----------------------------------</div>
						<ResourceSelectionContainer
							disabled={
								resourceType === policyOption.resource.all.key
							}
							setSelected={setSelected}
						/>
					</div>
				);
			}}
		/>
	);
};

Resource.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};

export default Resource;
