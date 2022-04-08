import React from 'react';
import TemplateLayout from '../../Layout/TemplateLayout';
import PropTypes from 'prop-types';
import useRadio from '../../../../../../../hooks/useRadio';
import {
	policyOption,
	resourceOptions,
} from '../../../../../../../utils/policy/options';
import ResourceAccessTemplate from './ResourceAccessTemplate';

/**********************************************************************
 * roberto - 자원 접근 권한
 **********************************************************************/
const ResourceAccess = ({templateId, name, description, categoryType}) => {
	const [resource, resourceRadioButton, setResource] = useRadio({
		name: 'ResourceAccessList',
		options: resourceOptions,
	});

	return (
		<div>
			<TemplateLayout
				title={name}
				description={description}
				render={() => {
					return (
						<div>
							{resourceRadioButton()}
							{/*자원 접근 권한 하위 접근 목록 테이블 컴포넌트*/}
							<ResourceAccessTemplate
								isShow={
									!(
										resource ===
										policyOption.resource.all.key
									)
								}
							/>
						</div>
					);
				}}
			/>
		</div>
	);
};
ResourceAccess.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
	categoryType: PropTypes.string,
};
export default ResourceAccess;
