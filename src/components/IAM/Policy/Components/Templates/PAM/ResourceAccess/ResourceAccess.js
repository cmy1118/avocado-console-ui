import React, {useCallback, useEffect, useState} from 'react';
import TemplateElementContainer from '../../../TemplateElementContainer';
import Table from '../../../../../../Table/Table';
import PropTypes from 'prop-types';
import ResourceManagement from '../ResourceManagement';
import RRM_RESOURCE from '../../../../../../../reducers/api/RRM/Resource/resource';
import {useDispatch, useSelector} from 'react-redux';
import {tableColumns} from '../../../../../../../Constants/Table/columns';
import {tableKeys} from '../../../../../../../Constants/Table/keys';
import AddAcessResourceAccountDialogBox from '../../../../../../DialogBoxs/Form/AddAcessResourceAccountDialogBox';
import {RowDiv} from '../../../../../../../styles/components/style';
import {AllreplaceStr} from '../../../../../../../utils/dataFitering';
import useRadio from '../../../../../../../hooks/useRadio';
import {
	policyOption,
	resourceOptions,
} from '../../../../../../../utils/policyOptions';
import {FoldableContainer} from '../../../../../../../styles/components/iam/iam';
import ResourceAccessTemplate from './ResourceAccessTemplate';

/**********************************************************************
 * roberto - 자원 접근 권한
 **********************************************************************/
const ResourceAccess = ({templateId, name, description}) => {
	const [resource, resourceRadioButton, setResource] = useRadio({
		name: 'ResourceAccessList',
		options: resourceOptions,
	});

	return (
		<div>
			<TemplateElementContainer
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
};
export default ResourceAccess;
